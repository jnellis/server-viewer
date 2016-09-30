/*
 * GameServerViewer.js
 *
 * Copyright (c) 2016.  Joe Nellis
 * Distributed under MIT License. See accompanying file License.txt or at
 * http://opensource.org/licenses/MIT
 *
 */

import React from "react";
import {observer} from "mobx-react";
import QueryResult from "./QueryResult";

const SortableColumnHeader = ()=>{

  return (<th> </th>);
}

@observer
class GameServerViewer extends React.Component {

  primarySort = (a, b)=> {
    if(!!a.serverInfo && !!b.serverInfo){
      return  b.serverInfo.players - a.serverInfo.players;
    }
    return 0;
  }


  secondarySort = (a, b)=> a.avgLatency - b.avgLatency;

  render() {

    let queryResults = this.props.appState.serverData.receivedMessages
        .sort((a, b)=> {
          let firstOrdering = this.primarySort(a,b);
          if(firstOrdering !=0){
            return firstOrdering;
          }
          return this.secondarySort(a, b);
        })
        .filter((item, index)=> index < 200)
        .map(queryResult =>
            <QueryResult key={queryResult.from}  {...queryResult}/>);


    return (
        <table>
          <thead>
          <tr>
            <th>Server</th>
            <th>Latency</th>
            <th>Game</th>
            <th>players</th>
            <th>Map</th>
            <th>bots</th>
            <th>secure</th>
            <th>private</th>
          </tr>
          </thead>
          <tbody>
          {queryResults}
          </tbody>
        </table>
    );
  }

}

export default GameServerViewer;