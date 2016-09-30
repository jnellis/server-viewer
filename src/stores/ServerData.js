import {observable, computed, action, asFlat} from "mobx";

class ServerData {

  constructor(){
    setInterval(()=>{
      if(this.burstCache.length > 0) {
        this.receivedMessages.replace(this.receivedMessages.concat(this.burstCache));
        this.burstCache = [];
      }
    }, 250);
  }

  receivedMessages = observable(asFlat([]));

  burstCache = [];

  @observable reset = false;

  @action resetData() {
    this.receivedMessages.clear()
  }

  addQueryResult(queryResult) {
    this.burstCache.push(queryResult);
  }



}

export default ServerData;