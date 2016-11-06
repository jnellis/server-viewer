import React from "react";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import SourceServerView from "./SourceServerView";
import AppState from "./AppState";


@observer
export default class App extends React.Component {

  static propTypes = {
    appState: React.PropTypes.instanceOf(AppState).isRequired
  };

  render() {
    return (
        <div>
          <SourceServerView {...this.props}/>
          <DevTools />
        </div>
    );
  }
}
