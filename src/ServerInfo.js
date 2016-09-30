
import React from "react";
import {observer} from 'mobx-react';


class ServerInfo extends  React.Component {

  render(){
    let {name, bots} = this.props;
    return (
        <span>
          <td>
            <h4>{ name}</h4>
          </td>
         <td>{bots}</td>
              </span>
    );

  }
}

export default ServerInfo;