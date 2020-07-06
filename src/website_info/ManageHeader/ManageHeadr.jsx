import React,{Component} from 'react';
import Services from '../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import './style.css';
import utility from '../../utility/utility';
class ManageHeader extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            website_logo:'',
            file:null
        }
        this.AddHeader=this.AddHeader.bind(this);
        this.uploadWebsiteLogo=this.uploadWebsiteLogo.bind(this);
    }
    uploadWebsiteLogo(e){
        e.preventDefault();
        var file=e.target.files[0];
        utility.fileUpload(file).then((response)=>{
            console.log(response.data);
            this.setState({website_logo:response.data});
          })
    }
    AddHeader(e){
      e.preventDefault();
      var data={
        website_logo:this.state.website_logo
      }
      console.log('==========',data)
      this.saveHeaderData(data);
    }
    saveHeaderData(data){
        Services.manageHeaderData(data).then((response)=>{
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
                website_logo:response.data.data.website_logo
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
                <form className="form" onSubmit={this.AddHeader}>
                    <h3>Website Logo</h3>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="logo_url" disabled className="form-control" value={this.state.website_logo} />
                        </div>
                        <div className="col-lg-2 flex-child">
                        <input type="file" name="file1" id="file1" className="inputfile" accept="image/*" onChange={this.uploadWebsiteLogo} />
                        <label className="btn btn-primary uplbtn" htmlFor="file1">Upload Logo</label>
                        <button type="submit" className="btn btn-primary savebtn">Save</button>
                    </div>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default ManageHeader;
