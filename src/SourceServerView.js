/*
 * SourceServerView.js
 *
 * Copyright (c) 2016.  Joe Nellis
 * Distributed under MIT License. See accompanying file License.txt or at
 * http://opensource.org/licenses/MIT
 *
 */

import React, {Component} from "react";
import {observer} from "mobx-react";
import GameServerFilter from "./GameServerFilter";


@observer
class SourceServerView extends Component {
 
  render() {
    console.log(this.props);
    return (
        <GameServerFilter {...this.props}/>

    );
  }


  initializeWebSocket() {
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
      this.webSocket = new WebSocket("wss://127.0.0.1/ws");
      this.webSocket.onmessage = function (event) {
        if (null !== event.data) {
          console.log(event.data);
          var s = JSON.parse(event.data);
          this.setState({results: s});
        }
      }.bind(this);
      this.webSocket.onopen = function (event) {
        var ta = document.getElementById('query-results');
        console.log("WebSocket opened.");
      };
      this.webSocket.onclose = function (event) {
        console.log("WebSockect closed");
      }
    }
    else {
      alert("Your browser does not support Web Socket.");
    }
  }

  submitQuery(queryFilter) {
    if (queryFilter) {
      console.log("sending " + queryFilter);
      if (!window.WebSocket) {
        return;
      }
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send(queryFilter);
      }
      else {
        alert("The socket is not open.");
      }
    }
  }


}

export default SourceServerView;