import DataProcessor from '../data-processor';
import BinarySearch from '../binary'

interface IDatas {
  id: number;
  title: string;
  url: string;
  text: string;
  safe: number;
  linksAmount: number;
}

interface IDatas {
  id: number;
  title: string;
  url: string;
  text: string;
  safe: number;
  linksAmount: number;
  categoryId ? : number;
}

class ClassCreator {
  datas: IDatas[]

  constructor(algorithm: any) {
    this.datas = [{
      id: 0,
      title: '',
      url: '',
      text: '',
      safe: 0,
      linksAmount: 0
    }]
  }

  async create() {
    var arr = (this.datas[0].text).split(' ').sort()
    var index = BinarySearch.search(arr, '(Please')
    return [{
      id: 0,
      title: 'string',
      url: 'string',
      text: 'string',
      safe: 0,
      linksAmount: 0,
      categoryId: 0
    }]
  }
}

export default ClassCreator;