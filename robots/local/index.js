module.exports = async (connection, algorithm) => {
  const request = require("request");
  const jsdom = require("jsdom").JSDOM;
  const getLinks = algorithm.algo("web/GetLinks/0.1.5")
  const indexer = require('../indexer/')

  async function main() {
    console.log('local: '+new Date())
    const pages = await connection('pages').select('*').whereRaw('revised = 0')

    if (pages.length != 0) {
      var urls = []
      for (let i = 0; i < pages.length; i++) {
        const document = ((new jsdom(pages[i].html)).window).document

        try {
          var tagsA = document.querySelectorAll('a')
          for (let j = 0; j < tagsA.length; j++) {
            if ((tagsA[j].href).indexOf('http') == 0) {
              var link = tagsA[j].href
              urls.push({
                link: link,
                index: i
              })
            }
          }

          await connection('pages').update({
            revised: 1
          }).where({
            url: pages[i].url
          })
        } catch (error) {
          console.log(`local: ouve um erro ao verificar os links da página ${pages[i].url}`)
        }
      }

      for (let i = 0; i < urls.length; i++) {
        var indexStatus = await indexer(urls[i].link, connection)

        if (indexStatus == 'OK') {
          try {
            console.log(`local: a página ${urls[i].link} foi indexada!`)
          } catch (e) {
            console.log(`local: Houve um erro ou indexar a página ${urls[i].link}`)
          }
        } else {
          console.log(`local: Houve um erro ou indexar a página ${urls[i].link}`)
        }
        if (i == urls.length-1) {
          console.log('>>>>>>>local: mais um ciclo concluído')
        }
      }


    } else {
      console.log('local: Sem páginas no momento')
    }
  }
  
  setTimeout(main, 1000*60);

  setInterval(main, 1000*60*30)
}