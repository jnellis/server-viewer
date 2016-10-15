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

import {pageControl, header, tablerow, ip} from "./styles.less";


@observer
class GameServerViewer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      primarySort: this.sortByNumPlayers,
      secondarySort: this.sortByLatency,
      currentPage: 0,
      pageSize: 100
    };
  }

  sortByNumPlayers = (a, b)=> {
    if (!!a.serverInfo && !!b.serverInfo) {
      return b.serverInfo.players - a.serverInfo.players;
    }
    return 0;
  }

  sortByLatency = (a, b)=> a.avgLatency - b.avgLatency;

  pageFilter = (item, index)=>
  index >= this.state.currentPage * this.state.pageSize &&
  index < (this.state.currentPage + 1) * this.state.pageSize;


  render() {

    let numResults = this.props.appState.serverData.receivedMessages.length;

    let maxPage = Math.round(numResults / this.state.pageSize);

    let pageBack = this.state.currentPage > 0 ?
        <button className={pageControl}
                onClick={
                  ()=>this.setState({currentPage: this.state.currentPage - 1})
                }>&lt;&lt;</button> : null;

    let pageForward = this.state.currentPage < maxPage - 1 ?
        <button className={pageControl}
                onClick={
                  ()=>this.setState({currentPage: this.state.currentPage + 1})
                }>&gt;&gt;</button> : null;

    let indexAtStartOfPage = this.state.currentPage * this.state.pageSize;

    let queryResults = this.props.appState.serverData.receivedMessages
        .sort((a, b)=> {
          let firstOrdering = this.state.primarySort(a, b);
          if (firstOrdering != 0) {
            return firstOrdering;
          }
          return this.state.secondarySort(a, b);
        })
        .filter(this.pageFilter)
        .map((queryResult, index) =>
            <QueryResult key={queryResult.from}
                         index={index + indexAtStartOfPage}
                         {...queryResult}/>);

    // console.log(JSON.stringify(
    //     this.props.appState.serverData.receivedMessages[0]
    // ));

    return (
        <div className="container-fluid">
          <div className={tablerow +" "+header}>
            {pageBack} Page {this.state.currentPage + 1}  of {maxPage}{pageForward}
          </div>
          {QueryResult.header(numResults, header)}
          {queryResults}
        </div>
    );
  }

}

export default GameServerViewer;