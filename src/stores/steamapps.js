/**
 * Created by Joe Nellis on 6/26/2016.
 */
const steamapps = [ 
  {
    "appid": 10,
    "name": "Counter-Strike"
  },
  {
    "appid": 20,
    "name": "Team Fortress Classic"
  },
  {
    "appid": 30,
    "name": "Day of Defeat"
  },
  {
    "appid": 40,
    "name": "Deathmatch Classic"
  },
  {
    "appid": 50,
    "name": "Half-Life: Opposing Force"
  },
  {
    "appid": 60,
    "name": "Ricochet"
  },
  {
    "appid": 70,
    "name": "Half-Life"
  },
  {
    "appid": 80,
    "name": "Counter-Strike: Condition Zero"
  }, 
  {
    "appid": 205,
    "name": "Source Dedicated Server"
  },
  {
    "appid": 210,
    "name": "Source Dedicated Server"
  },
  {
    "appid": 211,
    "name": "Source SDK"
  },
  {
    "appid": 215,
    "name": "Source SDK Base 2006"
  },
  {
    "appid": 218,
    "name": "Source SDK Base 2007"
  }, 
  {
    "appid": 220,
    "name": "Half-Life 2"
  },
  {
    "appid": 240,
    "name": "Counter-Strike: Source"
  },
  {
    "appid": 260,
    "name": "Counter-Strike: Source Beta"
  },
  {
    "appid": 280,
    "name": "Half-Life: Source"
  },
  {
    "appid": 300,
    "name": "Day of Defeat: Source"
  }, 
  {
    "appid": 320,
    "name": "Half-Life 2: Deathmatch"
  }, 
  {
    "appid": 440,
    "name": "Team Fortress 2"
  }, 
  {
    "appid": 480,
    "name": "Spacewar"
  },
  {
    "appid": 500,
    "name": "Left 4 Dead"
  }, 
  {
    "appid": 520,
    "name": "Team Fortress 2 Beta"
  }, 
  {
    "appid": 550,
    "name": "Left 4 Dead 2"
  }, 
  {
    "appid": 570,
    "name": "Dota 2"
  }, 
  {
    "appid": 620,
    "name": "Portal 2"
  }, 
  {
    "appid": 630,
    "name": "Alien Swarm"
  }, 
  {
    "appid": 730,
    "name": "Counter-Strike: Global Offensive"
  } 
].reduce((gameIdMap, app)=> {
  gameIdMap[app.name] = app.appid;
  return gameIdMap;
},new Map());

console.log(steamapps);
export default steamapps;