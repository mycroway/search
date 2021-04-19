import algorithmia from 'algorithmia';
import algorithmiaKey from '../credentials/algorithmia'
const algorithm = algorithmia.client(algorithmiaKey)
const textSummarizer = algorithm.algo("specrom/summarizer_bert_3_7_pytorch_1_4/0.2.0?timeout=300")
const autoTag = algorithm.algo("nlp/AutoTag/1.0.1?timeout=300")


interface IDatas {
  id: number;
  title: string;
  url: string;
  text: string;
  safe: number;
  linksAmount: number;
}

class DataProcessor {
  datas: IDatas[];

  constructor() {
    this.datas = [{
      id: 0,
      title: '',
      url: '',
      text: '',
      safe: 0,
      linksAmount: 0
    }]
  }

  async summarized(text: string) {
    var summarized = await textSummarizer.pipe(text)
    summarized = summarized.get()
    return summarized[0].summary_text
  }

  async keyword(text: string) {
    //var newText = await this.summarized(text)
    var keywords = await autoTag.pipe(text)
    var keywords = keywords.get()
    return keywords
  }
}

export default DataProcessor;