const fs = require('fs')

class main {
  constructor(data) {
    this.connection = require('knex')({
      client: 'mysql2',
      connection: data.db.connection
    });
    this.table = data.db.table
  }
  
  async update() {
    this.pages = await this.connection(this.table.name).select('*')
  }

  async search(term) {
    return 'ok'
  }
}

module.exports = main;