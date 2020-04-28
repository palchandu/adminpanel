import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageEducExpTitle extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            education_service_title:''
        }
        this.AddEducationTitle=this.AddEducationTitle.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
    }
    handleTitle(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddEducationTitle(e){
      e.preventDefault();
      var data={
        education_service_title:this.state.education_service_title
      }
      this.saveTitle(data);
    }
    saveTitle(data){
        Services.manageEducationTitle(data).then((response)=>{
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
                education_service_title:response.data.data.education_experience.education_service_title
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
                <form className="form my_form" onSubmit={this.AddEducationTitle}>
                    <h5>Education & Experience Title</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="education_service_title"  className="form-control" defaultValue={this.state.education_service_title} onChange={this.handleTitle} />
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

export default ManageEducExpTitle;