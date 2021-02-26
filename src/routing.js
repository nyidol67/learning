import React,{ Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './home/home';
import Header from './component/header';
import Create from './home/create'
import Edit from './home/edit';

class Routing extends Component {
    render(){
        return(
            <BrowserRouter>
             <>
             <Header/>
             <Route exact path="/" component={Home}></Route>
             <Route exact path="/create" component={Create}></Route>
             <Route exact path="/:id/edit" component={Edit}></Route>
             </>
            </BrowserRouter>
        )
    }
}
export default Routing;