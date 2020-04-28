import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel,Table} from 'react-bootstrap';
class ManageAddSkills extends Component{

    constructor(props,context){
        super(props,context);
        this.state={
            skill_add:[{skill:null,percent:null}],
            skiils_list:[],
        }
    }

    handleAddSkill = () => {
        this.setState({
            skill_add: this.state.skill_add.concat([{ skill: null,percent:null }])
        });
      };
      handleRemoveSkill = idx => () => {
        this.setState({
            skill_add: this.state.skill_add.filter((s, sidx) => idx !== sidx)
        });
      };

    handleSkillChange = idx => evt => {
        const newSliderImage = this.state.skill_add.map((uskill, sidx) => {
          if (idx !== sidx) return uskill;
          return { ...uskill, skill: evt.target.value };
        });
        this.setState({ skill_add: newSliderImage });
      };
    handlePercentChange = idx => evt => {
        const newSliderImage = this.state.skill_add.map((uskill, sidx) => {
          if (idx !== sidx) return uskill;
          return { ...uskill, percent: evt.target.value };
        });
        this.setState({ skill_add: newSliderImage });
      };
      AddSkills=e=>{
        e.preventDefault();
        var data={
            skills_percent:this.state.skill_add,
        }
        this.saveSkills(data);
       console.log(data);
    }
    saveSkills(data){
        Services.manageSkillAdd(data).then((response)=>{
            console.log(response);
            if(response.data.success==true){
                swal("Good job!", response.data.message, "success");
                this.webAllInfo();
            }else{
                swal("Good job!", response.data.message, "success");
                this.webAllInfo();
            }
        }).catch((error)=>{
            swal("Good job!", error, "error");
        })
    }
    webAllInfo(){
        Services.getWebsiteInfo().then((response)=>{
            if(response.data.success==true){
               this.setState({
                skill_add:response.data.data.about.skills_percent
            });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        //this.webAllInfo();
    }
    render(){
        return(
            <React.Fragment>
                <form className="form my_form" onSubmit={this.AddSkills}>
                <div className="form-group">
                    <h4>Add Skills</h4>
                </div>
                {this.state.skill_add.map((skills,idx)=>(
                    <div key={idx} className="flex-container" style={{margin: "10px 0px 10px 0px"}}>
                    <div className="flex-child">
                    <input onChange={this.handleSkillChange(idx)} placeholder="Skill Name" style={{width:'450px'}} type="text" name="skill" className="form-control" defaultValue={skills.skill} />
                    </div>
                    <div className="flex-child">
                    <input onChange={this.handlePercentChange(idx)} placeholder="Skill Percent" style={{width:'450px'}} type="text" name="percent" className="form-control" defaultValue={skills.percent} />
                    </div>
                    <div className="flex-child" style={{marginLeft:"5px"}}>
                        <button type="button" onClick={this.handleRemoveSkill(idx)} className="btn btn-danger"><i className="fas fa-minus"></i></button>
                    </div>
                </div>
                ))}
                
                <div className="form-group" style={{marginTop:'3px'}}>
                <button onClick={this.handleAddSkill} type="button" className="btn btn-primary"><i className="fas fa-plus"></i></button>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button type="submit" className="btn btn-primary">Save Skill</button>
                    </div>
                </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ManageAddSkills