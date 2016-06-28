/**
 * Created by Joe Nellis on 6/23/2016.
 */
import React from "react";
import {observer} from "mobx-react";

@observer
class MapPicker extends React.Component {

  render() {
    const knownMaps = this.props.appState.knownGameMaps.currentMaps().map(
        name => <option key={name}>{name}</option>
    )
     return (
          <select name="maps">
           {knownMaps}
          </select>
    )
  }
}

export default MapPicker;