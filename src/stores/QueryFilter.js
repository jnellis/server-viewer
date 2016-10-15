import {observable, computed, action} from "mobx";
import {knownGameMaps, lookupAppId} from "./KnownGameMaps";
import {getShortUID} from "../util";

class QueryFilter {

  @observable region;

  @observable gameName;
  @observable mapName;
  @observable notGameName;
  @observable matchingHostName;
  @observable runningVersion;
  @observable runningModDir;
  @observable onlyFromIpAddr;
  @observable linux;
  @observable proxy;
  @observable secure;
  @observable noPlayers;
  @observable whitelisted;
  @observable returnOneServerPerAddress;
  @observable dedicated;
  @observable notEmpty;
  @observable notFull;
  @observable gameTags;
  @observable hiddenGameTags;
  @observable reset;

  @observable needsRules = false;

  queryId = getShortUID();

  constructor(){
    this.resetFilter();
  }

  @action updateState(key, gameName) {
    if (!key in this) {
      throw error("trying to set invalid prop name: " + key);
    }
    this[key] = gameName;
  }

  @action resetFilter() {

    this.region = "WORLD";

    this.gameName = "";
    this.mapName = "";
    this.notGameName = "";
    this.matchingHostName = "";
    this.runningVersion = "";
    this.runningModDir = "";
    this.onlyFromIpAddr = "";
    this.linux = false;
    this.proxy = false;
    this.secure = true;
    this.noPlayers = false;
    this.whitelisted = false;
    this.returnOneServerPerAddress = false;
    this.dedicated = true;
    this.notEmpty = false;
    this.notFull = false;
    this.gameTags = [];
    this.hiddenGameTags = [];
    this.reset = false;


    this.needsRules = false;

    this.queryId = getShortUID();
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

  toString() {
    return filter;
  }
}

export default QueryFilter;