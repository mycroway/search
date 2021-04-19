interface IDatas {
  id: number;
  title: string;
  url: string;
  text: string;
  safe: number;
  linksAmount: number;
}

class ClassCreator {
  datas: IDatas

  constructor(algorithm: any) {
    this.datas = {
      id: 0,
      title: '',
      url: '',
      text: '',
      safe: 0,
      linksAmount: 0
    }
  }
}

export default ClassCreator;