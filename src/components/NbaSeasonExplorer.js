import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { Set } from 'immutable';
import moment from 'moment-timezone';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import * as nba from '../generated/nba.json'

class NbaSeasonExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedTeams: Set(), showHome: true, showAway: true }
    }


    data() {
        const datasets = Object.keys(nba.gamesByTeam)
            .filter(team => this.state.selectedTeams.contains(team))
            .map(team => {
                if (this.state.showAway && this.state.showHome) {
                    return {
                        name: team + '(when home or away)',
                        data: (nba.gamesByTeam[team].awayResults
                            .map(({ gameTime, points, opponent }) => { return { x: gameTime, y: points, name: 'opponent: ' + opponent } })
                            .concat(nba.gamesByTeam[team].homeResults
                                .map(({ gameTime, points, opponent }) => { return { x: gameTime, y: points, name: 'opponent: ' + opponent } })))
                            .sort((g1, g2) => g1.x < g2.x ? -1 : 1)
                    };
                } else if (this.state.showAway) {
                    return {
                        name: team + '(when away)',
                        data: nba.gamesByTeam[team].awayResults
                            .map(({ gameTime, points, opponent }) => { return { x: gameTime, y: points, name: 'opponent: ' + opponent } })
                            .sort((g1, g2) => g1.x < g2.x ? -1 : 1)
                    };
                } else if (this.state.showHome) {
                    return {
                        name: team + ' (when home)',
                        data: nba.gamesByTeam[team].homeResults
                            .map(({ gameTime, points, opponent }) => { return { x: gameTime, y: points, name: 'opponent: ' + opponent } })
                            .sort((g1, g2) => g1.x < g2.x ? -1 : 1)
                    };
                } else {
                    return { name: team + '(when neither home nor away, 😜)', data: [] }
                }
            });
        console.log(datasets);
        return datasets;
        addEventListener
    }


    render() {
        let graphOptions = {
            title: {
                text: 'Points Scored Over Time '
            },
            yAxis: {
                title: {
                    text: 'Points'
                }
            },
            xAxis: {
                labels: {
                 formatter:function(){console.log('ts:'+JSON.stringify(this.value)); return moment.unix(this.value).format('YYYY-MM-DD')}
                 },
                 title: {
                    text: 'Date'
                }

             },

            series: this.data()
        }

        return (
            <div>
                <div style={{ width: '100%', height: '20%', backgroundColor: 'gold' }}>
                    <h2>NBA Season Explorer</h2>
                    <Checkbox checked={this.state.showHome} label='show home games' onChange={() => this.setState({ showHome: !this.state.showHome })} />
                    <Checkbox checked={this.state.showAway} label='show away games' onChange={() => this.setState({ showAway: !this.state.showAway })} />
                </div>

                <div style={{ width: '100%', height: '30%', backgroundColor: 'palegreen' }}>
                    {nba.teams.map(team => <Checkbox key={team} label={team} onChange={(e, { label: team, checked }) =>
                        this.setState({ selectedTeams: checked ? this.state.selectedTeams.add(team) : this.state.selectedTeams.delete(team) })} />)}
                </div>

                <div style={{ width: '100%', height: '50%', backgroundColor: 'white' }}>
                    <HighchartsReact highcharts={Highcharts} options={graphOptions} />
                    <p>Graph made using (unmodified) highcharts charting library, with their permisisons. (highcharts.com)</p>
                </div>

            </div>);
    }
};

export default NbaSeasonExplorer;
