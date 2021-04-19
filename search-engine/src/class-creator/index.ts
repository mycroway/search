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
  dataProcessor = new DataProcessor

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
    var datasNotCat = this.datas.filter((data: IDatas) => data.categoryId === undefined)

    for (let i = 0; i < this.datas.length; i++) {
      var arr = (this.datas[i].text).split(' ').sort()

      var keywords = await this.dataProcessor.keyword(this.datas[i].text)
      var index = []

      for (let j = 0; j < keywords.length; j++) {
        var status = BinarySearch.search(arr, keywords[j])
        if (status != -1) {
          index.push(status)
        }
      }
      if (index.length < Math.floor(keywords.length / 1.2)) {
        console.log('no')
      } else {
        console.log('foi')
      }
      console.log(index.length)
      console.log(Math.floor(keywords.length / 1.2))
    }

    console.log('ok')

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