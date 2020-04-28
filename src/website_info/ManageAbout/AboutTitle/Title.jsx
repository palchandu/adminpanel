import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageTitle extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            about_title:''
        }
        this.AddAboutTitle=this.AddAboutTitle.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
    }
    handleTitle(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddAboutTitle(e){
      e.preventDefault();
      var data={
        about_title:this.state.about_title
      }
      this.saveTitle(data);
    }
    saveTitle(data){
        Services.manageAboutTitle(data).then((response)=>{
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
                about_title:response.data.data.about.about_title
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
                <form className="form my_form" onSubmit={this.AddAboutTitle}>
                    <h5>About Title</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="about_title"  className="form-control" value={this.state.about_title} onChange={this.handleTitle} />
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

export default ManageTitle;