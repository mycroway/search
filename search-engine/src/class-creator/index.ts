//import axios from 'axios';

class ClassCreator {
  public datas: any[];
  algorithm: object

  constructor(algorithm: object) {
    this.datas = [];
    this.algorithm = algorithm
  }

  keyword() {
    console.log(this.datas[0])
  }

}

export default ClassCreator;