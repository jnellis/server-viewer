import React from "react";
import {observer} from "mobx-react";


@observer
class GamePicker extends React.Component {


  render() {

    var knownGames = this.props.appState.knownGameMaps.getKnownGames();
    var currentGame = this.props.appState.queryFilter.gameName;
    var options = knownGames.map(
        (game)=> <option key={game} value={game}>{game}</option>); 
    return (
        <div >
          <label for="gamePicker"  >Game </label>
          <select name="gamePicker" onChange={ this.changeCurrentGame }
             value={currentGame}>
            <option key="Any" value=""> any</option>
            {options}
          </select>
        </div>
    )
  }

  changeCurrentGame = (event)=> {
    this.props.appState.queryFilter.updateState("gameName",event.target.value); 
  }
}

export default GamePicker;