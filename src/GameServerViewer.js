/*
 * GameServerViewer.js
 *
 * Copyright (c) 2016.  Joe Nellis
 * Distributed under MIT License. See accompanying file License.txt or at
 * http://opensource.org/licenses/MIT
 *
 */

import React from 'react'; 

class GameServerViewer extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
        <div><pre>{this.props.results}</pre></div>
    )
  }
}

export default GameServerViewer;