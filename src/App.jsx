import React from "react";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import SourceServerView from "./SourceServerView";


@observer
class App extends React.Component {

  render() {
    return (
        <div>
          <SourceServerView {...this.props}/>
          <DevTools />
        </div>
    );
  }

}
export default App;
