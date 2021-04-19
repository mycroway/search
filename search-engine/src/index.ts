import ClassCreator from './class-creator';
import DataProcessor from './data-processor';
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

interface IResultsSearch {
  title: string;
  url: string;
  safe: number;
  main: string;
}

interface IDatas {
  id: number;
  title: string;
  url: string;
  text: string;
  safe: number;
  linksAmount: number;
}

class searchEngine {
  connection: any;
  datas: IDatas[];
  classCreator = new ClassCreator(algorithm);
  dataProcessor = new DataProcessor();


  constructor(connection: IConnection, sort: string[]) {
    this.connection = Connection(connection)
    this.update()
    this.datas = [{
      id: 0,
      title: '',
      url: '',
      text: '',
      safe: 0,
      linksAmount: 0
    }]
  }

  async update() {
    try {
      this.datas = await this.connection('pages').select(`id`, `title`, `url`, `text`, `safe`, `linksAmount`);
      this.dataProcessor.datas = this.datas
      console.log(await this.dataProcessor.keyword(this.datas[0].text))
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