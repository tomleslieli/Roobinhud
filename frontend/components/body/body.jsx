import React from 'react';
import { Link } from 'react-router-dom';
import ChartContainer from '../chart/chart_container'

const Body = ({ currentUser }) => {
  const sessionBody = () => (
    <div className='hidden-during-form'>
        <div className='get-started-container'>
            <div className='phone-animation-container'>
                <img src='https://robinhood-clone-assets.s3.amazonaws.com/phone-animation.gif' alt='get-started-phone-animation'/>
            </div>
            <div className='get-started-separator'/>
            <div className='get-started-text'>
                <p id='investing-is'>Investing is</p>
                <p>simple here</p>
            <Link to="signup">
            <button className='get-started-button'>Get Started</button>
          </Link>
            </div>
        </div>
        <div className='free-stock-ribbon'>
            <div>
                <p>Get your first stock free. Limitations apply.</p>
            </div>
        </div>
        <div className='investing-container'>

        </div>
        <div className='sign-up'>
            <img src='https://robinhood-clone-assets.s3.amazonaws.com/sign-up-banner.png' alttext='sign-up-banner'/>
        </div>
    </div>
  );

  const personalBody = () => (
    <div className='logged-in-body'>
      {/* <ChartContainer store={store}/> */}
      {/* <Newsfeed /> */}
      {/* Portfolio / Watchlists */}
    </div>
  );

  return currentUser ? personalBody() : sessionBody();
};


export default Body;