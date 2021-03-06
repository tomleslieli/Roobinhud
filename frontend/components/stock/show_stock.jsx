import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
ChartJS.register(...registerables);

class ShowStock extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.fetchStock(this.props.match.params.stockId);
    }
    
    render() {
        console.log(this.props)
        const { stock, user } = this.props

        // console.log(combined)
        if (stock){
            let combined = [];
            let currentPrice = Number(stock.y_values[stock.y_values.length - 1])
            let dollarChange = (stock.y_values[stock.y_values.length - 2] - currentPrice)
            let percentChange = (dollarChange / currentPrice)
            let symbol;
            let color;
            if (dollarChange >= 0){
                symbol = '+';
                color = '#5AC53B';
            } else {
                symbol = '-';
                color = 'rgb(244, 104, 39)';
                dollarChange = dollarChange * -1
                percentChange = percentChange * -1
            }
            currentPrice = currentPrice.toFixed(2)
            dollarChange = dollarChange.toFixed(2)
            percentChange = percentChange.toFixed(2)
            // currentPrice = Math.abs(currentPrice)

            for (let i = 0; i <= stock.x_values.length; i++){
            combined.push({x: stock.x_values[stock.x_values.length - i + 1], y: stock.y_values[i]})
            }


            return(
            <>
            <div className='show-page'>
                <div className='dashboard'>
                    <div className='dashboard-left'>
                        <div className='stock-info'>
                            <h6>{stock.ticker}</h6>
                            <h3>{stock.stock_name}</h3>
                            <h1>${currentPrice}</h1>
                            <div className='day-change'>
                                <div className='dollar'><h6>{symbol}${dollarChange}</h6></div>
                                <div className='percent'><h6>({symbol}{percentChange}%) Today</h6></div>
                            </div>

                            {/* <h6>+$0.00 (-0.00%) Today</h6> */}
                        </div>
                        <br/>
                        <div className='line-chart'>
                            <Line id='chart' className='line-chart-graph'
                                height='450px'
                                width='800px'
                                data={{
                                    // labels: stock.x_values,
                                    datasets: [
                                        {
                                        type: 'line',
                                        data: combined,
                                        borderColor: color,
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
                    <div className='dashboard-right'>
                                
                    </div>
                </div>
            </div>
            <Footer store={store}/>
            </>

            )
        } else {
            return(
                <>
                <Footer store={store}/>
                </>
            )
        }
    }
}

export default ShowStock