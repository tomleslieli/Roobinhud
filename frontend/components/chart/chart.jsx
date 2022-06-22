import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

const data = 
[{
    x:1,
    y:50
},{
    x:2,
    y:10
},{
    x:3,
    y:50
},{
    x:4,
    y:50
},{
    x:5,
    y:60
},{
    x:6,
    y: 30
},{
    x: 7,
    y: 50
},{
    x:8,
    y:45
},{ x:9,
    y:80
}]

const MyChart = () => {

    return (
        <>
            <Line
                data={{
                    labels: [1,2,3,4,5,6,7,8,9,10],
                    datasets: [
                        {
                        type: 'line',
                        data: data,
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
                    animations: {
                        tension: {
                          duration: 1000,
                          easing: 'linear',
                          from: .3,
                          to: 0,
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            // enabled: false,
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
                                display: false
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
                                display: false
                            }
                        }
                    }
                }}
            />
        </>
    )
}

export default MyChart;