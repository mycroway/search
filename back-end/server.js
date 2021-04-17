const searchEngine = require("../search-engine");
var s = new searchEngine({
  db: {
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Theryston10',
      database: 'mycrowaySearch'
    },
    table: {
      name: 'pages',
      column: ['text']
    }
  }
})

s.update().then(() => {
  s.search('melhores filmes da Netflix').then(res => {
    console.log(res)
  })
})