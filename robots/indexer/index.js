module.exports = async (url, connection) => {
  const jsdom = require("jsdom").JSDOM;
  const Crawler = require("crawler");

  const pages = await connection('pages').select('*').where({
    url: url
  })

  if (pages.length == 0) {
    try {

      var c = new Crawler({
        callback: async (error, res, done) => {
          if (error) {
            console.log(`indexer: houve um erro ou acessar a página ${url}`)
          } else {
            const $ = res.$;
            const document = ((new jsdom(res.body)).window).document

            var text = ''
            const paragraphs = document.querySelectorAll('p')
            var tagsA = document.querySelectorAll('a')


            for (let i = 0; i < paragraphs.length; i++) {
              if (paragraphs[i].textContent.length >= 40) {
                text += paragraphs[i].textContent+'\n'
              }
            }

            try {
              if (text.length != 0) {
                await connection('pages').insert({
                  title: $("title").text(),
                  url: url,
                  html: res.body,
                  text: text,
                  safe: 0,
                  revised: 0,
                  linksAmount: tagsA.length
                })
                console.log(`indexer: a página ${url} foi indexada`)
              }
            } catch (error) {
              console.log(`indexer: houve um erro ou indexar a página ${url}`)
            }
          }

          done()
        }
      });

      c.queue(url)

    } catch (e) {
      console.log(`indexer: houve um erro ou indexar a página ${url}`)
    }
  } else {
    console.log('indexer: já indexada!')
  }

  return 'OK'
}