module.exports = async (url, connection) => {
  const request = require("request");
  const jsdom = require("jsdom").JSDOM;
  const util = require('util')
  const requestAsync = util.promisify(request)

  const pages = await connection('pages').select('*').where({
    url: url
  })

  if (pages.length == 0) {
    try {
      var res = await requestAsync(url)

      if (!res.error) {
        const document = ((new jsdom(res.body)).window).document
        try {
          await connection('pages').insert({
            title: document.querySelector('title').textContent,
            url: url,
            html: res.body,
            text: document.body.textContent,
            safe: 0,
            revised: 0
          })
          return 'OK'
        } catch (error) {
          return 'ERROR'
        }
      } else {
        return 'ERROR'
      }
    } catch (e) {
      return 'ERROR'
    }
  } else {
    console.log('indexer: já indexada!')
    return 'ERROR'
  }
}