import { connect } from 'react-redux';
import { fetchUser } from '../../util/session_api_util';
import Stats from './stats';

const mSTP = (state, ownProps) => {
    // user: state.entities.users[state.session.id],

    // portfolio: state.entities.users.portfolios[ownProps.match.params(portfolioId)]
};

const mDTP = dispatch => ({
  fetchStock: stockId => dispatch(fetchStock(stockId)),
  
  // fetchPortfolioItem: portfolioId => dispatch(fetchPortfolioItem),
  // fetchPortfolios: () => dispatch(fetchPortfolio(portfolioId))
});

export default connect(mSTP,mDTP)(Stats);