import React from 'react';
import { Link } from 'react-router-dom';

const Body = ({ currentUser, logout }) => {
  const sessionBody = () => (
    <div className='hidden-during-form'>
        <div className='get-started-container'>
            <div className='phone-animation-container'>
                <img src='https://robinhood-clone-assets.s3.amazonaws.com/phone-animation.gif' alt='get-started-phone-animation'/>
            </div>
            <div className='get-started-separator'/>
            <div className='get-started-text'>
                <p>Investing is</p>
                <p>simple here</p>
            <Link to="signup">
            <button className='get-started-button'>Get Started</button>
          </Link>
            </div>
        </div>
        <div className='free-stock-ribbon'>
            <div>
                <p>Get your free stock free. Limitations apply.</p>
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
    <>
    </>
  );

  return currentUser ? personalBody() : sessionBody();
};


export default Body;