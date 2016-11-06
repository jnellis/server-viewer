import {computed} from "mobx";
import QueryFilter from "./stores/QueryFilter";
import ServerData from "./stores/ServerData";
import WebWorkerSupport from "./WebWorkerSupport";


export default class AppState {

  filter = new QueryFilter();

  @computed get queryFilter() {
    return (this.filter = !!this.filter.reset ? new QueryFilter() : this.filter)
  }

  data = new ServerData();

  @computed get serverData(){
    if( this.data.reset ){
      this.data = new ServerData();
    }
    return  this.data;
  }

  responseHandler = (response)=> {
    // @computed above should always give us valid serverData object.
    this.serverData.addQueryResult(response);
  }

  // web worker takes a response handler
  webWorker = new WebWorkerSupport( this.responseHandler );

  submitMasterQuery(queryFilter) {
    this.webWorker.postMessage({
      type: "master",
      id: queryFilter.queryId,
      region: queryFilter.region,
      filter: queryFilter.filter,
      needsRules: queryFilter.needsRules
    });
  }
}

