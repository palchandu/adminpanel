import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageAboutDetail extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            about_details:''
        }
        this.AddAboutDetail=this.AddAboutDetail.bind(this);
        this.handleIntro=this.handleIntro.bind(this);
    }
    handleIntro(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddAboutDetail(e){
      e.preventDefault();
      var data={
        about_details:this.state.about_details
      }
      this.saveIntro(data);
    }
    saveIntro(data){
        Services.manageAboutDetails(data).then((response)=>{
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
                about_details:response.data.data.about.about_details
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
                <form className="form my_form" onSubmit={this.AddAboutDetail}>
                    <h5>About Details</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <textarea  style={{height:'170px'}} type="text" name="about_details"  className="form-control" value={this.state.about_details} onChange={this.handleIntro} />
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

export default ManageAboutDetail;