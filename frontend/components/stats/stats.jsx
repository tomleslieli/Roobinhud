import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom';
ChartJS.register(...registerables);

class Stats extends React.Component {
    constructor(props){
        super(props);
    }
    // componentDidMount() {
    //     // console.log(this.props)
    //     this.props.fetchUser(this.props.user.id)
    //     // this.props.fetchPortfolios(this.props.match.params.userId);
    // }
    
    render() {
        const { user, portfolios } = this.props

        // console.log(combined)

            // let combined = [];
            // let currentPrice = Number(stock.y_values[stock.y_values.length - 1])
            // let dollarChange = (stock.y_values[stock.y_values.length - 2] - currentPrice)
            // let percentChange = (dollarChange / currentPrice)
            // let symbol;
            // let color;
            // if (dollarChange >= 0){
            //     symbol = '+';
            //     color = '#5AC53B';
            // } else {
            //     symbol = '-';
            //     color = 'rgb(244, 104, 39)';
            //     dollarChange = dollarChange * -1
            //     percentChange = percentChange * -1
            // }
            // currentPrice = currentPrice.toFixed(2)
            // dollarChange = dollarChange.toFixed(2)
            // percentChange = percentChange.toFixed(2)
            // // currentPrice = Math.abs(currentPrice)

            // for (let i = 0; i <= stock.x_values.length; i++){
            // combined.push({x: stock.x_values[stock.x_values.length - i + 1], y: stock.y_values[i]})
            // }


            return(
            <div className='stats-show'>
                <div className='stats-dashboard'>
                        <div className='stats-info'>
                            <h3>$00.00</h3>
                            <div className='stats-day-change'>
                                <div className='stats-dollar'><h6>+$0.00</h6></div>
                                <div className='stats-percent'><h6>(+0.00%) Today</h6></div>
                            </div>
                        </div>
                        <br/>
                        <div className='stats-line-chart'>
                            <Line id='stats-chart' className='stats-line-chart-graph'
                                height='450px'
                                width='800px'
                                data={{
                                    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                                    datasets: [
                                        {
                                        type: 'line',
                                        data: [462,436,3426,6,246,346,46,226,3426,43,4362,4236,7,547,47, 432, 23 ,64, 23, 234, 208],
                                        borderColor: '#5AC53B',
                                        borderWidth: 2,
                                        backgroundColor: 'white',
                                        pointBorderColor: 'rgba(0,0,0,0)',
                                        pointBackgroundColor: 'rgba(0,0,0,0)',
                                        pointHoverBackgroundColor: 'color',
                                        pointHoverRadius: 6,
                                        }
                                    ]
                                }}
                                options={{
                                    animations: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                            labels: {
                                                usePointStyle: true
                                            }
                                        },
                                        tooltip: {
                                            enabled: false,
                                            mode: 'index',
                                            intersect: false
                                        },
                                    },
                                    layout: {
                                        padding: 100
                                    },
                                    scales: {
                                        x: {
                                            gridLines: {
                                                drawBorder: false,
                                                zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                display: false
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false
                                            },
                                        },
                                        y: {
                                            gridLines: {
                                                drawBorder: false,
                                                zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                display: false
                                            },
                                            grid: {
                                                display: false,
                                                drawBorder: false
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                </div>
            </div>
            )
    }
}

export default Stats;