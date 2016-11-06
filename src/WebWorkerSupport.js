/**
 *  Manages the source server query web worker object.
 */
export default class WebWorkerSupport {

  worker;

  constructor(responseHandler) {
    this.initializeWebWorker(responseHandler);
  }

  initializeWebWorker(responseHandler) {
    var QueryWorker = require("worker!./QueryWorker");// webpack dependency
    this.worker = new QueryWorker();

    if (!!responseHandler) {
      this.responseHandler = responseHandler;
    }
    this.worker.onmessage = this.defaultOnMessageHandler;

  }

  responseHandler = (response)=> {
    console.log("received back: " + JSON.stringify(response));
  };

  defaultOnMessageHandler = ( event ) =>{
    var queryResult = JSON.parse(event.data);
    this.responseHandler(queryResult);
  }

  terminate(){
    worker.terminate();
  }

  postMessage(query){


    // bypass built-in browser cloning of object messages
    // and convert to strings and transport only strings.
    var stringifiedQuery = JSON.stringify(query);

    this.worker.postMessage(stringifiedQuery);
  }

}