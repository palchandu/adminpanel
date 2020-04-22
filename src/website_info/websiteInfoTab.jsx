import React,{Component} from 'react';
import {Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap';
import SocialIcons from './SocialIcons/SocialIcons';
import ManageFooter from './ManageFooter/Footermanage';
import ManageHeader from './ManageHeader/ManageHeadr';
import ManageTitle from './WorksManage/WorksTitle/Title';
import ManageIntro from './WorksManage/WorksIntro/Intro';
import ManageAddWork from './WorksManage/AddWorks/AddWorks';

class WebsiteInfoTab extends Component{
    constructor(props,context){
        super(props,context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
        key: 1,

        };
        
    }
 
    handleSelect(key) {
        this.setState({ key });
    }
 
    render() {
        return (
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title="Home">
              Home
            </Tab>
            <Tab eventKey={2} title="About">
              About
            </Tab>
            <Tab eventKey={3} title="Services">
              Services
            </Tab>
            <Tab eventKey={4} title="Education And Experience">
              Education And Experience
            </Tab>
            <Tab eventKey={5} title="Work">
              <ManageTitle/>
              <ManageIntro/>
              <ManageAddWork/>
            </Tab>
            <Tab eventKey={6} title="Header">
              <ManageHeader/>
            </Tab>
            <Tab eventKey={7} title="Footer">
            <ManageFooter/>
            </Tab>
            <Tab eventKey={8} title="Social Icons">
            <SocialIcons/>
            </Tab>
          </Tabs>
        );
      }
}

export default WebsiteInfoTab;