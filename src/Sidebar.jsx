import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect,NavLink } from "react-router-dom";
import './css/sidebar.css';

const Sidebar=(props)=>{
    console.log('S idebar props',props.is_localstoage)
        if(props.is_localstoage){
        return(
           <React.Fragment>
               <ul className="sidebar navbar-nav">
                <li  className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                    <span>Dashboard</span>
                    </NavLink>
                   
                </li>
                <li  className="nav-item ">
                    <NavLink  className="nav-link" to="/gallery" id="pagesDropdown" role="button">
                    <span>Gallery</span>
                    </NavLink>
                </li>
                <li  className="nav-item ">
                    <NavLink  className="nav-link" to="/posts" id="pagesDropdown" role="button">
                    <span>Posts</span>
                    </NavLink>
                </li>
                <li  className="nav-item ">
                    <NavLink  className="nav-link" to="/posts_list" id="pagesDropdown" role="button">
                    <span>Post List</span>
                    </NavLink>
                </li>
                <li  className="nav-item ">
                    <NavLink  className="nav-link" to="/category" id="pagesDropdown" role="button">
                    <span>Category</span>
                    </NavLink>
                </li>
                <li  className="nav-item ">
                    <NavLink  className="nav-link" to="/website_info" id="pagesDropdown" role="button">
                    <span>Website Info</span>
                    </NavLink>
                </li>
                </ul>
           </React.Fragment>
        )
    }else{
        return('')
    }
}

export default Sidebar;