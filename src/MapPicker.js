/**
 * Created by Joe Nellis on 6/23/2016.
 */
import React from "react";
import {action} from "mobx";
import {observer} from "mobx-react";

@observer
class MapPicker extends React.Component {

  render() {
    var currentMap = this.props.appState.queryFilter.mapName;
    var availableMaps = this.props.appState.queryFilter.availableMaps;

    var options = availableMaps.map(name=><option key={name}>{name}</option>);
    return (
        <div>
          <label htmlFor="mapPicker">Map</label>
          <select name="mapPicker" onChange={this.changeMap}
                  value={currentMap}>
            <option name="anyMap" value="">any</option>
            {options}
          </select>
        </div>

    )
  }

  changeMap = action((event)=> {
    this.props.appState.queryFilter.updateState("mapName", event.target.value);
  });
}

export default MapPicker;