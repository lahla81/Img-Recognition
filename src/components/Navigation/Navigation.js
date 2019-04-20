import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return(
            <nav className='mh2 tr'>
                <p onClick={() => onRouteChange('signin')} className='pa3 f3 link dim purple pointer b'>SIGN OUT</p>
            </nav>
        )
    } else {
        return (
            <nav className='mh2 tr flex justify-end'>
                <p onClick={() => onRouteChange('signin')} className='pa3 f3 link dim purple pointer b'>SIGN IN</p>
                <p onClick={() => onRouteChange('register')} className='pa3 f3 link dim purple pointer b'>RIGISTER</p>
            </nav>
        )    
    }
}
export default Navigation;