import React,{Component} from 'react';
import './css/dashboard.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import Posts from './Posts';
import PostList from './post_list/PostList';
import Category from './Category'

class Layout extends Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <Header/>
                    <div id="wrapper">
                        <Sidebar />
                        <div id="content-wrapper">
                            <div className="container-fluid">
                                <Switch>
                                    <Route exact path='/' component={Dashboard}/>
                                    <Route path='/posts' component={Posts}/>
                                    <Route path='/posts_list' component={PostList}/>
                                    <Route path='/category' component={Category}/> 
                                    {/* <Route component={NoMatch}/> */}
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
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

export default Layout;