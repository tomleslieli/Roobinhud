import React from 'react';
import { withRouter } from 'react-router-dom';

class StockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: ''
          }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAPIObject = this.createAPIObject.bind(this);
    }
    
    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    async createAPIObject(ticker) {
        const API_KEY = '1TC1G7P4CUSZNSL2'
        let TIMESERIES = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
        let STOCKNAME = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY}`;
        let createdObject = {}
        let fetchTicker = ticker;
        let fetchName = ''
        let x_values = [];
        let y_values = [];
        fetch(TIMESERIES)
            .then(
                function(response) {
                    return response.json();
            })
            .then(
                function(data) {
                    for (let key in data['Time Series (Daily)']){
                        x_values.push(key);
                        y_values.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                }
            )
        fetch(STOCKNAME)
            .then(
                function(response) {
                    return response.json();
                })
            .then(
                function(data) {
                    fetchName = data['bestMatches'][0]['2. name']
                    fetchTicker = data['bestMatches'][0]['1. symbol'].toUpperCase();
                }
            )
            .then(
                function() {
                    createdObject.ticker = fetchTicker;
                    createdObject.stockName = fetchName;
                    createdObject.x_values = x_values;
                    createdObject.y_values = y_values;
                    })
            // .then(
            //     function() {
            //         console.log('created object', createdObject)
            //     }
            // )
        return createdObject;
    }

    async handleSubmit(e){
        e.preventDefault()
        let ref = await this.createAPIObject(this.state.ticker)
        setTimeout(()=>{
            this.props.action(ref, ref.x_values, ref.y_values)
        },1000)
        let that = this
        setTimeout(()=>{
            let lastObject;
            jQuery.ajax({
                url: '/api/stocks',
                type: 'GET',
                success: function(data){
                    lastObject = data[Object.keys(data).length]
                    that.props.history.push({
                        pathname: `/stocks/${lastObject.id}`,
                        props: that.props,
                        state: that.state
                    })
                }
            })
        },2000)
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input className='search-bar' type='text' value={this.state.ticker.toUpperCase()} onChange={this.update('ticker')}/>
                </form>

        );
    }
}
 
export default withRouter(StockForm);