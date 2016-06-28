import {observable} from "mobx";
import KnownGameMaps from "./stores/KnownGameMaps";
import QueryFilter from "./stores/QueryFilter";

class AppState {
  @observable timer = 0;

  knownGameMaps = new KnownGameMaps();

  @observable queryFilter = new QueryFilter();

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
   
}

export default AppState;
