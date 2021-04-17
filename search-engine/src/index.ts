import categorizer from './categorizer'
import Connection from './db/connection'

interface IConnection {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface ITable {
  name: string;
  columns: string[];
}

interface IResultsSearch {
  title: string;
  url: string;
  safe: number;
  main: string;
}

interface ISearchEngine {
  update(): Promise < string >;
  search(term: string): IResultsSearch;
}

class searchEngine implements ISearchEngine {

  connection: any
  datas: any
  table: ITable

  constructor (connection: IConnection, table: ITable, sort: string[]) {
    this.connection = Connection(connection)
    this.table = table
    this.update()
  }

  async update() {
    this.datas = await this.connection('pages').select('*');
    return 'OK'
  }

  search(term: string) {
    return {
      title: '',
      url: '',
      safe: 1,
      main: ''
    }
  }
}

export = searchEngine;