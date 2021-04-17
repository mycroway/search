const searchEngine = require("../search-engine");
var s = new searchEngine({
  host: 'localhost',
  user: 'root',
  password: 'Theryston10',
  database: 'mycrowaySearch'
}, {
  name: 'pages',
  columns: ['text']
}, ['safe', 'linksAmount'])
console.log(s.search('ok'))