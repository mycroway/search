const connection = require('./db/connection')
const googleBot = require('./google/')
const localBot = require('./local/')
const algorithmia = require('algorithmia')
const algorithmiaKey = require('./credentials/algorithmia.json').apiKey
const algorithm = algorithmia.client(algorithmiaKey)

async function main() {
  googleBot(connection)
  localBot(connection, algorithm)
}

main()