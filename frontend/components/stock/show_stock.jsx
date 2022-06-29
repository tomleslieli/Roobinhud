import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

class ShowStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            stock_name: '',
            x_values: [],
            y_values: []
        }
    }
    componentDidMount() {
        this.fetchStock();
    }
    fetchStock() {
        const API_KEY = '1TC1G7P4CUSZNSL2'
        let ticker = 'GME';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
        const that = this;
        let fetchXValues = [];
        let fetchYValues = [];
        let fetchCombined = [];
        fetch(API_CALL)
            .then(
                function(response) {
                    return response.json();
            })
            .then(
                function(data) {
                    for (var key in data['Time Series (Daily)']){
                        fetchXValues.push(key);
                        fetchYValues.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    for (let i = 0; i <= fetchXValues.length; i++){
                        fetchCombined.push({x: fetchXValues[i], y: fetchYValues[i]})
                    }
                    that.setState({
                        xValues: fetchXValues,
                        yValues: fetchYValues,
                        combined: fetchCombined,
                        symbol: ticker
                    });
                }
            )
    }
    render () {
        return (
        <div className='dashboard'>
            <div className='dashboard-left'>
                <div className='stock-info'>
                    <h1>{this.state.symbol}</h1>
                    <h3>$00.00</h3>
                    <h6>+$0.00 (-0.00%) Today</h6>
                </div>
                <br/>
                <div className='line-chart'>
                    <Line
                        height='600px'
                        width='1000px'
                        data={{
                            labels: this.state.yValues,
                            datasets: [
                                {
                                type: 'line',
                                data: this.state.combined,
                                borderColor: '#5AC53B',
                                borderWidth: 2,
                                backgroundColor: 'white',
                                pointBorderColor: 'rgba(0,0,0,0)',
                                pointBackgroundColor: 'rgba(0,0,0,0)',
                                pointHoverBackgroundColor: '#5AC53B',
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
            <div className='dashboard-right'>
                <div className='watchlists'>
                    <h5> Lists </h5>
                    <div className='item-container'>
                        
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default ShowStock;