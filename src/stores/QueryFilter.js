import {observable, computed} from "mobx";
import steamapps from "./steamapps";

class QueryFilter {

  @observable gameName = "";
  @observable mapName = "";
  @observable notGameName = "";
  @observable matchingHostName = "";
  @observable runningVersion = "";
  @observable runningModDir = "";
  @observable onlyFromIpAddr = "";
  @observable linux = false;
  @observable proxy = false;
  @observable secure = true;
  @observable noPlayers = false;
  @observable whitelisted = false;
  @observable returnOneServerPerAddress = false;
  @observable dedicated = true;
  @observable notEmpty = false;
  @observable notFull = false;
  @observable gameTags = [];
  @observable hiddenGameTags = [];

  updateState(key, gameName) {
    this[key] = gameName;
  } 

  @computed  get filter() {

    return [
      (!!this.gameName ) ? "\\appid\\" + this.lookupAppId(this.gameName) : "",
      (!!this.mapName) ? "\\map\\" + this.mapName : "",
      (!!this.notGameName) ? "\\napp" + this.lookupAppId(this.notGameName) : "",
      (!!this.matchingHostName) ? "\\name_match\\" + this.matchingHostName : "",
      (!!this.runningVersion) ? "\\version_match" + this.runningVersion : "",
      (!!this.runningModDir) ? "\\gamedir\\" + this.runningModDir : "",
      (!!this.onlyFromIpAddr) ? "\\gameaddr\\" + this.onlyFromIpAddr : "",
      (!!this.linux) ? "\\linux\\1" : ""

    ].join('');
  }


  lookupAppId(gameName) {
    return steamapps[gameName];
  }
}

export default QueryFilter;