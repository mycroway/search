import ClassCreator from './class-creator';
import Connection from './db/connection';
import algorithmia from 'algorithmia';
import algorithmiaKey from './credentials/algorithmia'
const algorithm = algorithmia.client(algorithmiaKey)

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

class searchEngine {
  connection: any;
  table: ITable;
  datas: object[];
  classCreator = new ClassCreator(algorithm);

  constructor (connection: IConnection, table: ITable, sort: string[]) {
    this.connection = Connection(connection)
    this.table = table
    this.update()
    this.datas = [{}]
  }

  async update() {
    try {
      this.datas = await this.connection('pages').select('*');
      this.classCreator.datas = this.datas
      return 'OK'
    } catch (e) {
      return e
    }
  }

  search(term: string): IResultsSearch[] {
    return [{
      title: '',
      url: '',
      safe: 1,
      main: ''
    }]
  }
}

export = searchEngine;