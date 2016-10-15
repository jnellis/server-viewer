import React from "react";
import {
    attributes,
    tablerow,
    header,
    column,
    wrapper,
    flags,
    index,
    flag,
    noflag,
    serversMapIpGame,
    serversMap,
    servers,
    map,
    gameIp,
    game,
    ip,
    latencyPlayers,
    latency,
    players,
    good,
    ok,
    bad
} from "./styles.less";

const style = (...args)=> args.join(" ");

export default class QueryResult extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let {serverInfo, from, avgLatency} = this.props;
    let pingCondition = avgLatency <= 50 ? good :
        avgLatency <= 100 ? ok : bad;
    return (
        <div className={tablerow }>

          <div className={style(wrapper, flags)}>
            <div className={style(column, index)}>
              { this.props.index }
            </div>
            <div className={style(wrapper, flags)}>
              <div className={style(column, flag)}>
                <img src="robot.svg" alt="bots on this server"
                     className={!!serverInfo.bots ? "" : noflag }/>
              </div>
              <div className={style(column, flag)}>
                <img src="security-on.svg" alt="VAC secured status"
                     className={!!serverInfo.vac ? "" : noflag}/>
              </div>
              <div className={style(column, flag)}>
                <img src="key.svg" alt="password is required"
                     className={!!serverInfo.visibility ? "" : noflag}/>
              </div>
            </div>
          </div>
          <div className={style(wrapper, attributes)}>
            <div className={style(wrapper, serversMapIpGame)}>
              <div className={style(wrapper, serversMap)}>
                <div className={style(column, servers)}>{serverInfo.name}</div>
                <div className={style(column, map)}>{serverInfo.map}</div>
              </div>
              <div className={style(wrapper, gameIp)}>
                <div className={style(column, game)}>{serverInfo.game}</div>
                <div className={style(column, ip)}>{from}</div>
              </div>
            </div>
            <div className={style(wrapper, latencyPlayers)}>
              <div className={style(column, latency, pingCondition)}>
                {avgLatency}<span>ms</span>
              </div>
              <div className={style(column, players)}>
                {serverInfo.players}/{serverInfo.maxPlayers}
              </div>
            </div>
          </div>
        </div>
    );
  };


  static header(numResults) {
    return (
        <div className={style(tablerow, header)}>

          <div className={style(wrapper, flags)}>
            <div className={style(column, index)}>#</div>
            <div className={style(wrapper, flags)}>
              <div className={style(column, flag)}>
                <img src="robot.svg" alt="bots on this server"/>
              </div>
              <div className={style(column, flag)}>
                <img src="security-on.svg" alt="VAC secured status"/>
              </div>
              <div className={style(column, flag)}>
                <img src="key.svg" alt="password is required"/>
              </div>
            </div>
          </div>
          <div className={style(wrapper, attributes)}>
            <div className={style(wrapper, serversMapIpGame)}>
              <div className={style(wrapper, serversMap)}>
                <div className={style(column, servers)}>
                  Servers ({numResults})
                </div>
                <div className={style(column, map)}>Map</div>
              </div>
              <div className={style(wrapper, gameIp)}>
                <div className={style(column, game)}>Game</div>
                <div className={style(column, ip)}>IP Address</div>
              </div>
            </div>
            <div className={style(wrapper, latencyPlayers)}>
              <div className={style(column, latency)}>Ping</div>
              <div className={style(column, players)}>Players</div>
            </div>
          </div>
        </div>
    );

  }

  static propTypes = {
    server: React.PropTypes.string
  };

  static defaultProps = {
    server: "server name goes here"
  };
}