import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import './style.css';
import utility from '../../../utility/utility';
class ManageCV extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            cv_url:'',
            file:null
        }
        this.AddCVFile=this.AddCVFile.bind(this);
        this.uploadCV=this.uploadCV.bind(this);
    }
    uploadCV(e){
        e.preventDefault();
        var file=e.target.files[0];
        utility.documentUpload(file).then((response)=>{
            console.log(response.data);
            this.setState({cv_url:response.data});
          })
    }
    AddCVFile(e){
      e.preventDefault();
      var data={
        cv_url:this.state.cv_url
      }
      this.saveHeaderData(data);
    }
    saveHeaderData(data){
        Services.manageCV(data).then((response)=>{
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
                cv_url:response.data.data.home.cv_url
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
                <form className="form" onSubmit={this.AddCVFile}>
                    <h5>CV(Resumae)</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="logo_url" disabled className="form-control" value={this.state.cv_url} />
                        </div>
                        <div className="col-lg-2 flex-child">
                        <input type="file" name="file" id="file" className="inputfile"  onChange={this.uploadCV} />
                        <label className="btn btn-primary uplbtn" htmlFor="file">Upload</label>
                        <button type="submit" className="btn btn-primary savebtn">Save</button>
                    </div>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default ManageCV;