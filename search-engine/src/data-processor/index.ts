

interface IObj {
  text: string;
  id: number;
}

class DataProcessor {
  public datas: any[];

  constructor() {
    this.datas = []
  }

  relevantData() {
    var datasGot = []
    for (let data in this.datas) {
      
      var obj: IObj = {
        id: this.datas[data].id,
        text: this.datas[data].text
      }
      
      datasGot.push(obj)
    }
    return datasGot;
  }
}

export default DataProcessor;