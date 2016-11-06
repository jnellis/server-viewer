/**
 * Created by Joe Nellis on 6/23/2016.
 */
import React from "react";
import {action} from "mobx";
import {observer} from "mobx-react";
import QueryFilter from "./stores/QueryFilter";

@observer
class MapPicker extends React.Component {

  static propTypes = {
    queryFilter: React.PropTypes.instanceOf(QueryFilter).isRequired
  }

  render() {
    const { mapName:currentMap, availableMaps} = this.props.queryFilter;
    const options = availableMaps.map(name=><option key={name}>{name}</option>);

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
    this.props.queryFilter.updateState("mapName", event.target.value);
  });
}

export default MapPicker;