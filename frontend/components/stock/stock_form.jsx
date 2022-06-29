import React from 'react';
import {createStock, updateStock} from '../../actions/stock_actions'
import { useDispatch } from 'react-redux'

class StockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            stockName: '',
            xValues: [],
            yValues: [],
          }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // componentDidMount(){
        // Stock search helper
    // }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }
    fetchStockInfo(ticker) {
        const API_KEY = '1TC1G7P4CUSZNSL2'
        let TIMESERIES = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
        let STOCKNAME = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY}`;
        const that = this;
        let fetchTicker = ticker.toUpperCase();
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
                    that.setState({
                        ticker: fetchTicker,
                        xValues: fetchXValues,
                        yValues: fetchYValues,
                    });
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
                    fetchTicker = data['bestMatches'][0]['1. symbol']
                    that.setState({
                        stockName: fetchName,
                        ticker: fetchTicker
                    })
                }
            )
    }

    handleSubmit(e){
        e.preventDefault()
        this.fetchStockInfo(this.state.ticker)
        this.props.action({...this.state})
    }

    // handleSubmit = async(e) => {
    //     e.preventDefault()
    //     this.fetchStockInfo(this.state.ticker)
    //     let currentState = {...this.state}
    //     let step = await createStock(currentState)
    //     const dispatch = useDispatch()
    //     let result = dispatch(receiveStock(step.data));
    //     this.props.action({...this.state})
    // }

    render() {
        console.log(this.state)
        return (
                <form onSubmit={this.handleSubmit}>
                    <input className='search-bar' type='text' value={this.state.ticker.toUpperCase()} onChange={this.update('ticker')}/>
                </form>

        );
    }
}
 
export default StockForm;