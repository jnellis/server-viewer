import React from "react"; 
import {observer} from "mobx-react";
import MapPicker from "./MapPicker";
import GamePicker from "./GamePicker";
import QueryFilter from "./stores/QueryFilter";

/**
 * A user interface for weening the request parameters for a search of
 * game server info from a master server.
 */
@observer
class GameServerFilter extends React.Component { 

  filterComponents() {
    return [
      ["isRunning map", "search", "\\map\\"],
      ["Valve game app id", "number", "\\appid\\"],
      ["Games not matching app id", "number", "\\napp\\"],
      //  ["gametype", "text", "\\gametype\\"],
      //  ["gamedata", "text", "\\gamedata\\"],
      //  ["anygamedata", "text", "\\gamedataor\\"],
      ["Hostname", "search", "\\name_match\\"],
      ["GameServerAddress", "search", "\\gameaddr\\"],
      //  ["gamedir", "search", "\\gamedir\\"],
      ["isRunning Linux", "checkbox", "\\linux\\1"],
      ["isProxy", "checkbox", "\\proxy\\1"],
      ["HasNoPlayers", "checkbox", "\\noplayers\\1"],
      ["whitelisted", "checkbox", "\\white\\1"],
      ["Return one gameserver per IP address", "checkbox", "\\collapse_addr_hash\\1"],
      ["VAC secure", "checkbox", "\\secure\\1"],
      ["isDedicated Server", "checkbox", "\\type\\d"],
      //  ["nor", "checkbox", "\\nor\\"],
      //  ["nand", "checkbox", "\\nand\\"],
      ["notEmpty", "checkbox", "\\empty\\1"],
      ["notFull", "checkbox", "\\full\\1"]
    ];
  }


  render() {
    console.log(this.props);
    return (
        <form className="gameServerFilterForm" onSubmit={this.handleSubmit }>
          <h1>Master Server Query Builder</h1>
          
          <h2>queryString is {this.props.appState.queryFilter.filter }</h2>
          <GamePicker {...this.props} />
          <input type="reset" value="Reset" onClick={this.reset} />
        </form>
    );
  }

  reset = ()=>{ 
    this.props.appState.queryFilter = new QueryFilter();
  }

  /**
   * Send query to master server via web socket
   * @param e   submit button event
   */
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();  
  }
}


export default GameServerFilter;