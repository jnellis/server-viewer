import {observable, computed, action} from "mobx";
import {knownGameMaps, lookupAppId} from "./KnownGameMaps";
import {getShortUID} from "../util";

class QueryFilter {

  @observable region = "WORLD";

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
  @observable reset = false;


  @observable needsRules = false;

  queryId = getShortUID();

  @action updateState(key, gameName) {
    if (!key in this) {
      throw error("trying to set invalid prop name: " + key);
    }
    this[key] = gameName;
  }

  @action resetFilter() {
    return this.reset = true;
  }

  @computed get availableMaps() {
    return knownGameMaps.getGameMaps(this.gameName);
  }

  @computed get filter() {

    return [
      (!!this.gameName ) ? "\\appid\\" + lookupAppId(this.gameName) : "",
      (!!this.mapName) ? "\\map\\" + this.mapName : "",
      (!!this.notGameName) ? "\\napp" + lookupAppId(this.notGameName) : "",
      (!!this.matchingHostName) ? "\\name_match\\" + this.matchingHostName : "",
      (!!this.runningVersion) ? "\\version_match" + this.runningVersion : "",
      (!!this.runningModDir) ? "\\gamedir\\" + this.runningModDir : "",
      (!!this.onlyFromIpAddr) ? "\\gameaddr\\" + this.onlyFromIpAddr : "",
      (!!this.linux) ? "\\linux\\1" : ""

    ].join('');
  }

  toString(){
    return filter;
  }
}

export default QueryFilter;