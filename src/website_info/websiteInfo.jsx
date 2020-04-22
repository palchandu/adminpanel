import React,{Component} from 'react';
import './style.css';
import WebsiteInfoTab from './websiteInfoTab';
class WebsiteInfo extends Component{
    constructor(props,context){
        super(props,context);
    }


    render(){
        return(
            <React.Fragment>
                <h3 className="title_head">My Website Info</h3>
                <WebsiteInfoTab />
            </React.Fragment>
        )
    }
}

export default WebsiteInfo;