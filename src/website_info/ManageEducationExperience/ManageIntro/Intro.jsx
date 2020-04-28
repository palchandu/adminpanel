import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageEduExpIntro extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            education_service_intro:''
        }
        this.AddEduExpIntro=this.AddEduExpIntro.bind(this);
        this.handleIntro=this.handleIntro.bind(this);
    }
    handleIntro(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddEduExpIntro(e){
      e.preventDefault();
      var data={
        education_service_intro:this.state.education_service_intro
      }
      this.saveIntro(data);
    }
    saveIntro(data){
        Services.manageEducationIntro(data).then((response)=>{
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
                education_service_intro:response.data.data.education_experience.education_service_intro
            });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.webAllInfo();
    }

    render(){
        return(
            <React.Fragment>
                <form className="form my_form" onSubmit={this.AddEduExpIntro}>
                    <h5>Education & Experience Introduction </h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <textarea  style={{height:'170px'}} type="text" name="education_service_intro"  className="form-control" defaultValue={this.state.education_service_intro} onChange={this.handleIntro} />
                        </div>
                        <div className="col-lg-2 flex-child">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default ManageEduExpIntro;