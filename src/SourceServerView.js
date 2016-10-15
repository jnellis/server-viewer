/*
 * SourceServerView.js
 *
 * Copyright (c) 2016.  Joe Nellis
 * Distributed under MIT License. See accompanying file License.txt or at
 * http://opensource.org/licenses/MIT
 *
 */

import React from "react";
import {observer} from "mobx-react";
import GameServerFilter from "./GameServerFilter";
import GameServerViewer from "./GameServerViewer";


@observer
class SourceServerView extends React.Component {

  render() {


    return (
        <div>
          <GameServerFilter {...this.props}/>
          <GameServerViewer {...this.props}/>
        </div>
    );
  }

}

export default SourceServerView;