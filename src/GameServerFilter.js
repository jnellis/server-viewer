import React from "react";
import {action} from "mobx";
import {observer} from "mobx-react";
import MapPicker from "./MapPicker";
import GamePicker from "./GamePicker";

/**
 * A user interface for weening the request parameters for a search of
 * game server info from a master server.
 */
@observer
export default class GameServerFilter extends React.Component {

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

    const queryFilter = this.props.appState.queryFilter;

    return (
        <form className="gameServerFilterForm" onSubmit={this.handleSubmit }>
          <h1>Master Server Query Builder</h1>
          <h2>queryString is {queryFilter.filter }</h2>
          <GamePicker {...{queryFilter}} />
          <MapPicker {...{queryFilter}}/>
          <input type="submit" value="Refresh"/>
          <input type="reset" value="Reset" onClick={this.reset}/>
        </form>
    );
  }

  @action reset = ()=> {
    this.props.appState.queryFilter.resetFilter();
    this.props.appState.serverData.resetData()

  }

  /**
   * Send query to master server via web socket
   * @param e   submit button event
   */
  @action handleSubmit = (event)=> {
    event.preventDefault();
    event.stopPropagation();

    this.props.appState.serverData.resetData();
    this.props.appState.submitMasterQuery(this.props.appState.queryFilter);

  }
}


