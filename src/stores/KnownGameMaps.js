import {observable, asMap} from "mobx";
import steamapps from "./steamapps";


class KnownGameMaps {

  maps;

  constructor() {

    var temp = [...steamapps.keys()].reduce(function (acc, gamename) {
      acc[gamename] = [];
      return acc;
    }, {});
    temp["Team Fortress 2"] = ["cp_dustbowl", "pl_badwater"];
    temp["Counter-Strike: Global Offensive"] = ["cs_italy"];

    this.maps = observable(asMap(temp));
  }


  getGameMaps(gameName) {
    return this.maps[gameName] || [];
  }

  getKnownGames() {
    return [...this.maps.keys()];
  }


  /**
   * adds a map to the list of known maps
   * @param gameName
   * @param mapName
   */
  addToMapCache(gameName, mapName) {
    if (this.getGameMaps(gameName).isEmpty()) {
      this.maps[gameName] = [];
    }
    this.maps[gameName].push(mapName);
  }
}

export default KnownGameMaps;