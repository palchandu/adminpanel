import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Login from './Login'
import Posts from './Posts'
class LayoutNoWrap extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="container-fluid">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/posts' component={Posts}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
                </div>
            </React.Fragment>
        )
    }
}
function NoMatch(){
    return(
        <React.Fragment>
        <div style={{height:"600px",width:"100%"}}> 
            <h1>404 Error</h1>
            <p>Oops! page not found.</p>
        </div>
        </React.Fragment>
    )
}
export default LayoutNoWrap;