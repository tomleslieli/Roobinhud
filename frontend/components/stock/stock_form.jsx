import React from 'react';
import { useHistory } from "react-router-dom";

class StockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            stockName: '',
            xValues: [],
            yValues: [],
          }
        // const history = useHistory();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchStockInfo = this.fetchStockInfo.bind(this);
    }
    
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

    // handleSubmit(e){
    //     e.preventDefault()
    //     e.stopPropagation();
    //     this.fetchStockInfo(this.state.ticker)
    //     this.props.action({...this.state}) 
    //     this.props.history.push(`/api/stocks/${this.state.id}`)
    // }

    handleSubmit(e){
        e.preventDefault()
        e.stopPropagation();
        console.log('IN HANDLESUBMIT', this.state);
        this.fetchStockInfo(this.state.ticker)
        this.props.history.push(`/api/stocks/${this.state.id}`)
    }

    componentDidUpdate(prevProps, prevState){
        console.log('IN COMPONENTDIDUPDATE',this.state)
        if(prevState !== this.state){
            this.props.action({...this.state})
        }
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input className='search-bar' type='text' value={this.state.ticker.toUpperCase()} onChange={this.update('ticker')}/>
                </form>

        );
    }
}
 
export default StockForm;