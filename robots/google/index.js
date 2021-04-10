module.exports = async (connection) => {
  var request = require("request");
  const jsdom = require("jsdom");
  const util = require('util')
  const fs = require('fs')
  const readFile = util.promisify(fs.readFile)

  const {
    JSDOM
  } = jsdom;
  const {
    google
  } = require('googleapis')
  const customSearch = google.customsearch('v1');

  const googleSearchCredencials = require('../credentials/google-search.json');

  setInterval(main, 1000*60*60*4)

  async function main() {
    const terms = await connection('terms').select('*').where({
      indexed: 0
    })
    if (terms.length != 0) {
      for (let indexTerm = 0; indexTerm < terms.length; indexTerm++) {

        const response = await customSearch.cse.list({
          auth: googleSearchCredencials.apiKey,
          cx: googleSearchCredencials.searchEngineId,
          q: terms[indexTerm].text
        });

        const pages = await connection('pages').select('*')

        const items = response.data.items.map(items => items)

        for (let i = 0; i < items.length; i++) {
          var thisPage = pages.find(page => page.url == items[i].link)

          if (!thisPage) {
            request(items[i].link, async function (error, response, body) {
              if (!error) {
                const {
                  document
                } = (new JSDOM(body)).window
                connection('pages').insert({
                  title: items[i].title,
                  url: items[i].link,
                  html: body,
                  text: document.body.textContent,
                  safe: 0,
                  revised: 0,
                  category: terms[indexTerm].category
                }).then(async () => {
                  await connection('terms').update({
                    indexed: 1
                  }).where({
                    id: terms[indexTerm].id
                  })
                  console.log(`google: a pagina ${items[i].link} foi indexada!`)
                }).catch((error) => {
                  console.log(`google: Houve um erro ou indexar a página ${items[i].link}`)
                })
              } else {
                console.log(`google: Houve um erro ou acessar a página ${items[i].link}`)
              }
            });
          } else {
            console.log(`google: pagina duplicada`)
          }
        }
      }
    } else {
      console.log('google: Sem termos no momento')
    }
  }

  main()

  return 'OK'
}