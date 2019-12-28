import React from 'react';
import { HashRouter as Router, Route,Switch, } from 'react-router-dom';
import Header from './public/javascript/Components/tools/header'
import Footer from './public/javascript/Components/tools/footer'
import Home from './public/javascript/Components/pages/首頁'
import GmaeInfo from './public/javascript/Components/pages/遊戲資訊'
import './public/stylesheets/gotop.css'

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router>
                <div> 
                    <Header contact={{state:"noUser"}}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/gmaeInfo" component={GmaeInfo}/>
                    <div className="goTop">TOP</div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
export default App;

