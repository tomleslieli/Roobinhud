import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom';
ChartJS.register(...registerables);

class ShowStock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPrice: 0.0,
            twentyFourHours: 0.0,
        }
    }
    componentDidMount() {
        this.props.fetchStock(this.props.match.params.stockId);
    }

    render() {
        console.log('THIS IS THE STATE', this.state);
        console.log('THIS IS THE PROPS',this.props)

        return(
            <h1>
                {
                    this.props.stock.ticker
                }
            </h1>
        )

        // const { stock, user } = this.props
        // let combined = [];
        
        // for (let i = 0; i <= stock.x_values.length; i++){
        // combined.push({x: stock.x_values[i], y: stock.y_values[i]})
        
        // return(
        //     <div className='dashboard'>
        //     <div className='dashboard-left'>
        //         <div className='stock-info'>
        //             <h1>{this.state.symbol}</h1>
        //             <h3>$00.00</h3>
        //             <h6>+$0.00 (-0.00%) Today</h6>
        //         </div>
        //         <br/>
        //         <div className='line-chart'>
        //             <Line
        //                 height='600px'
        //                 width='1000px'
        //                 data={{
        //                     labels: this.state.yValues,
        //                     datasets: [
        //                         {
        //                         type: 'line',
        //                         data: combined,
        //                         borderColor: '#5AC53B',
        //                         borderWidth: 2,
        //                         backgroundColor: 'white',
        //                         pointBorderColor: 'rgba(0,0,0,0)',
        //                         pointBackgroundColor: 'rgba(0,0,0,0)',
        //                         pointHoverBackgroundColor: '#5AC53B',
        //                         pointHoverRadius: 6,
        //                         }
        //                     ]
        //                 }}
        //                 options={{
        //                     animations: false,
        //                     plugins: {
        //                         legend: {
        //                             display: false,
        //                             labels: {
        //                                 usePointStyle: true
        //                             }
        //                         },
        //                         tooltip: {
        //                             enabled: false,
        //                             mode: 'index',
        //                             intersect: false
        //                         },
        //                     },
        //                     layout: {
        //                         padding: 100
        //                     },
        //                     scales: {
        //                         x: {
        //                             gridLines: {
        //                                 drawBorder: false,
        //                                 zeroLineColor: 'transparent'
        //                             },
        //                             ticks: {
        //                                 display: false
        //                             },
        //                             grid: {
        //                                 display: false,
        //                                 drawBorder: false
        //                             },
        //                         },
        //                         y: {
        //                             gridLines: {
        //                                 drawBorder: false,
        //                                 zeroLineColor: 'transparent'
        //                             },
        //                             ticks: {
        //                                 display: false
        //                             },
        //                             grid: {
        //                                 display: false,
        //                                 drawBorder: false
        //                             }
        //                         }
        //                     }
        //                 }}
        //             />
        //         </div>
        //     </div>
        //     <div className='dashboard-right'>
        //         <div className='watchlists'>
        //             <h5> Lists </h5>
        //             <div className='item-container'>
                        
        //             </div>
        //         </div>
        //     </div>
        //     </div>
        // )}
    }
}

export default ShowStock