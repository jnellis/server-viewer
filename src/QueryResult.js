/**
 * Created by Joe Nellis on 7/31/2016.
 */

import React from "react";
import {observer} from "mobx-react";

const ServerInfo = ({name, game})=> (
      <td>{name}</td> );


const QueryResult = (props)=> {
  let serverInfo = ServerInfo(props.serverInfo);
  return (
      <tr>
        {serverInfo}
        <td>{ props.avgLatency}ms</td>
        <td>{props.serverInfo.game}</td>
        <td>{props.serverInfo.players}/{props.serverInfo.maxPlayers}</td>
      </tr>
  );
}


export default QueryResult;