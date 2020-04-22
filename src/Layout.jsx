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
import Login from './Login'
import WebsiteInfo from './website_info/websiteInfo';
import Gallery from './ManageImages';
class Layout extends Component{
    constructor(props){
        super(props)
    }
    state={
        is_localstoage:false,
        key_val:1
    }
    
    componentDidMount(){
        if(localStorage.getItem('userData')!=null){
            this.setState({is_localstoage:true,key_val:2})
            console.log('====',this.state.is_localstoage)
        }
    }
    render(){
        console.log('key val',this.state.key_val)
        return(
            <React.Fragment>
                <Router>
                  <Header key={this.state.key_val} is_localstoage={this.state.is_localstoage}/> 
                    <div id="wrapper">
                     <Sidebar key={this.state.key_val} is_localstoage={this.state.is_localstoage} /> 
                        <div id="content-wrapper">
                            <div className="container-fluid">
                                <Switch>
                                    <Route path='/dashboard' component={Dashboard}/>
                                    <Route  path='/gallery' component={Gallery} />
                                    <Route path='/posts' component={Posts}/>
                                    <Route path='/posts_list' component={PostList}/>
                                    <Route path='/category' component={Category}/> 
                                    <Route exact path='/' component={Login}/>
                                    <Route  path='/website_info' component={WebsiteInfo} />
                                    <Route component={NoMatch}/> 
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