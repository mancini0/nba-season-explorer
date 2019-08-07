const csv = require('csv-parser')
const fs = require('fs')
const moment = require('moment-timezone');
const games = [];
let teams = new Set();

fs.createReadStream('nba.csv')
  .pipe(csv())
  .on('data', ({ date, easternTime, away, awayPoints, home, homePoints }) => {
    teams.add(home);
    teams.add(away);
    gameTime = moment(date + " " + easternTime, 'MM/DD/YY hh:mm:ss A').tz('America/New_York').unix()
    games.push({ gameTime, away, awayPoints:parseInt(awayPoints), home, homePoints:parseInt(homePoints) });
  })
  .on('finish', () => {
    teams = Array.from(teams).sort();  
    var gamesByTeam = {};
    teams.forEach(team => {
      gamesByTeam[team]={};
      gamesByTeam[team]["awayResults"] = games.filter(game => game.away === team)
        .map(({ gameTime, awayPoints:points, home }) =>  {return {gameTime, points, opponent:home}});

      gamesByTeam[team]["homeResults"] = games.filter(game => game.home === team)
        .map(({ gameTime, homePoints :points, away }) => {return {gameTime, points, opponent:away }});
    });
    const data = {teams, gamesByTeam};
    fs.writeFile ('./src/generated/nba.json', JSON.stringify(data), function(err) {
      if (err) throw err;
      console.log('generated source file src/generated/nba.json');
      }
  );
  });

  




