import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useSign} from './hooks/sign.hook';
import {useRoutes} from './routes';
import {SignContext} from './context/SignContext';
import {NavBar} from './components/NavBar/NavBar';
import {Loader} from './components/Loader/Loader'
import './index.css';


function App() {
  
    const {token,login,logout,userId,ready} = useSign();
    const isSigned = !!token;
    const routes = useRoutes(isSigned);

    if(!ready){
        return <Loader/>
    }

    return(
        <SignContext.Provider value={{token,login,logout,userId,isSigned}}>
            <BrowserRouter>
                <div className="navs" >
                    {isSigned && <NavBar/>}
                </div>
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </SignContext.Provider>

    )


}

export default App;
