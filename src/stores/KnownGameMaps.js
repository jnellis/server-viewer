import {observable, asMap} from "mobx";
import steamapps from "./steamapps";


class KnownGameMaps {

  maps = observable(asMap(
      // create an empty arrays for each game to hold the mapNames
      [...steamapps.keys()].reduce(function (acc, gamename) {
        if (!acc[gamename]) {
          acc[gamename] = [];
        }
        return acc;
      }, {
        "Team Fortress 2": ["cp_dustbowl", "pl_badwater"],
        "Counter-Strike: Global Offensive": ["cs_italy"]
      })
  ));

  getGameMaps(gameName) {
    return this.maps.get(gameName) || [];
  }

  getKnownGames() {
    return [...this.maps.keys()] || [];
  }



  lookupAppId(gameName) {
    return steamapps[gameName];
  }


  /**
   * Adds a map of {gameName:[mapName1, mapName2,
   * @param mapOfMaps
   */
  mergeToMapCache( mapOfMaps ) {
    this.maps.merge(map);
  }
}

const knownGameMaps = new KnownGameMaps();    // singleton
const lookupAppId = knownGameMaps.lookupAppId;

export {  knownGameMaps, lookupAppId};