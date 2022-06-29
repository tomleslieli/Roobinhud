import React from 'react';
import { Link } from 'react-router-dom';

const Body = ({ currentUser }) => {
  const sessionBody = () => (
    <div className='hidden-during-form'>
        <div className='get-started-container'>
            <div className='phone-animation-container'>
                <img id='phone-animation' src='https://robinhood-clone-assets.s3.amazonaws.com/phone-animation.gif' alt='get-started-phone-animation'/>
            </div>
              <div className='get-started-right-container'>
                <div className='get-started-text'>
                  <p id='investing-is'>Investing is</p>
                  <p>simple here</p>
                </div>
                <div className='get-started-button-container'>
                <Link to="signup" id='get-started-right'>
                  <button className='get-started-button'>Get Started</button>
                </Link>
                </div>
                
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
            <img id='sign-up-img' src='https://robinhood-clone-assets.s3.amazonaws.com/sign-up-banner.png' alttext='sign-up-banner'/>
        </div>
    </div>
  );

  const personalBody = () => (
    <div className='logged-in-body'>
      <h1>HELLO!!</h1>
    </div>
  );

  return currentUser ? personalBody() : sessionBody();
};


export default Body;