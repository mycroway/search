const connection = require('./db/connection')
const googleBot = require('./google/')

async function main() {
  var googleBotRes = await googleBot(connection)
}

main()