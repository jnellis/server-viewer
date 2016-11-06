import React from "react";
import {observer} from "mobx-react";
import {knownGameMaps} from "./stores/KnownGameMaps";
import QueryFilter from "./stores/QueryFilter";

@observer
class GamePicker extends React.Component {

  static propTypes = {
    queryFilter: React.PropTypes.instanceOf(QueryFilter).isRequired
  }

  render() {

    //console.log(JSON.stringify(this.props));
    const knownGames =  knownGameMaps.getKnownGames();
    const currentGame = this.props.queryFilter.gameName;
    const options = knownGames.map(
        (game)=> <option key={game} value={game}>{game}</option>);


    return (
        <div >
          <label htmlFor="gamePicker">Game </label>
          <select name="gamePicker" onChange={ this.changeCurrentGame }
                  value={currentGame}>
            <option key="Any" value="">any</option>
            {options}
          </select>
        </div>
    )
  }

  changeCurrentGame = (event)=> {
    this.props.queryFilter.updateState("gameName", event.target.value);
    this.props.queryFilter.updateState("mapName","");
  }
}

export default GamePicker;