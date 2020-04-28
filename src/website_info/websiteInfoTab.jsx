import React,{Component} from 'react';
import {Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap';
import SocialIcons from './SocialIcons/SocialIcons';
import ManageFooter from './ManageFooter/Footermanage';
import ManageHeader from './ManageHeader/ManageHeadr';
import ManageTitle from './WorksManage/WorksTitle/Title';
import ManageIntro from './ManageServices/ManageServiceIntro/Intro';
import ManageAddWork from './WorksManage/AddWorks/AddWorks';
import ManageEduExpTitle from './ManageEducationExperience/ManageTitle/Title';
import ManageEduExpIntro from './ManageEducationExperience/ManageIntro/Intro';
import ManageAddEducation from './ManageEducationExperience/ManageEducation/ManageAddEducation';
import ManageAddExperience from './ManageEducationExperience/ManageExperience/ManageAddExperience';
import ManageServiceTitle from './ManageServices/ManageServiceTitle/Title';
import ManageServiceIntro from './ManageServices/ManageServiceIntro/Intro';
import ManageServiceAdd from './ManageServices/ManageAddService/manageAddService';
import ManageAboutTitle from './ManageAbout/AboutTitle/Title';
import ManageAboutIntro from './ManageAbout/AboutIntro/Intro';
import ManageAboutDetails from './ManageAbout/ManageAboutDetail/AboutDetail';
import ManageAddSkill from './ManageAbout/ManageSkills/ManageSkills';
import ManageHomeTitle from './ManageHome/ManageTitle/Title';
import ManageHomeCV from './ManageHome/ManageCV/ManageCV';
import ManageHomeBg from './ManageHome/ManageBgImage/ManageBg';
import ManageHomeAnimation from './ManageHome/ManageAnimatedText/ManageAnimated';
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
              <ManageHomeTitle />
              <ManageHomeCV />
              <ManageHomeBg />
              <ManageHomeAnimation />
            </Tab>
            <Tab eventKey={2} title="About">
              <ManageAboutTitle />
              <ManageAboutIntro />
              <ManageAboutDetails />
              <ManageAddSkill />
            </Tab>
            <Tab eventKey={3} title="Services">
              <ManageServiceTitle />
              <ManageServiceIntro />
              <ManageServiceAdd />
            </Tab>
            <Tab eventKey={4} title="Education And Experience">
             <ManageEduExpTitle />
             <ManageEduExpIntro />
             <ManageAddEducation />
             <ManageAddExperience />
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