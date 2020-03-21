import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect,NavLink } from "react-router-dom";
class Sidebar extends Component{
    render(){
        return(
           <React.Fragment>
               <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                    </Link>
                   
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/posts" id="pagesDropdown" role="button">
                    <span>Posts</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/posts_list" id="pagesDropdown" role="button">
                    <span>Post List</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/category" id="pagesDropdown" role="button">
                    <span>Category</span>
                    </Link>
                </li>
                </ul>
           </React.Fragment>
        )
    }
}

export default Sidebar;