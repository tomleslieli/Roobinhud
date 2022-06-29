import React from 'react';
import { useHistory } from "react-router-dom";

class StockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: ''
          }
        // const history = useHistory();
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
        let fetchXValues = [];
        let fetchYValues = [];
        fetch(TIMESERIES)
            .then(
                function(response) {
                    return response.json();
            })
            .then(
                function(data) {
                    for (let key in data['Time Series (Daily)']){
                        fetchXValues.push(key);
                        fetchYValues.push(data['Time Series (Daily)'][key]['1. open']);
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
                    createdObject.fetchXValues = fetchXValues;
                    createdObject.fetchYValues = fetchYValues;
                    })
            // .then(
            //     function() {
            //         console.log('created object', createdObject)
            //     }
            // )
        return createdObject;
    }

    // handleSubmit(e){
    //     e.preventDefault()
    //     e.stopPropagation();
        // this.fetchStockInfo(this.state.ticker)
        // this.props.action({...this.state}) 
    //     this.props.history.push(`/api/stocks/${this.state.id}`)
    // }
    

    async handleSubmit(e){
        e.preventDefault()
        // e.stopPropagation();
        // console.log('THIS IS THE REF123',ref)
        let ref = await this.createAPIObject(this.state.ticker)
        // let ref = JSON.stringify({stock: this.createAPIObject(this.state.ticker)})
        console.log(ref)
        debugger
        this.props.action(ref)
    }

    // componentWillUnmount(){
    //     console.log('IN COMPONENTWILLUNMOUNT',this.state)
    //     this.props.history.push(`/stocks/${this.state.id}`)
    // }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input className='search-bar' type='text' value={this.state.ticker.toUpperCase()} onChange={this.update('ticker')}/>
                </form>

        );
    }
}
 
export default StockForm;