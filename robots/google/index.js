module.exports = async (connection) => {
  var request = require("request");
  const jsdom = require("jsdom");
  const util = require('util')
  const fs = require('fs')
  const indexer = require('../indexer/')
  const readFile = util.promisify(fs.readFile)

  const {
    JSDOM
  } = jsdom;
  const {
    google
  } = require('googleapis')
  const customSearch = google.customsearch('v1');

  const googleSearchCredencials = require('../credentials/google-search.json');

  async function main() {
    console.log('google: '+new Date())
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
         await indexer(items[i].link, connection)

          try {
            await connection('terms').update({
              revised: 1
            }).where({
              id: terms[indexTerm].id
            })
          } catch (e) {
            console.log(`google: houve um erro ou revisar a página ${items[i].link}`)
          }
        }
        if (indexTerm == terms.length-1) {
          console.log('>>>>>>>google: mais um ciclo concluído')
        }
      }
    } else {
      console.log('google: Sem termos no momento')
    }
  }

  main()

  setInterval(main, 1000*60*60*2)

}