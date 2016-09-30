import {computed} from "mobx";
import QueryFilter from "./stores/QueryFilter";
import ServerData from "./stores/ServerData";
import WebWorkerSupport from "./WebWorkerSupport";


class AppState {

  filter = new QueryFilter();

  @computed get queryFilter() {
    return this.filter = this.filter.reset ? new QueryFilter() : this.filter;
  }

  data = new ServerData();

  @computed get serverData() {
    return this.data = this.data.reset ? new ServerData() : this.data;
  }

  // web worker takes a
  webWorker = new WebWorkerSupport( (response)=> {
    this.serverData.addQueryResult(response);
  });

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

export default AppState;
