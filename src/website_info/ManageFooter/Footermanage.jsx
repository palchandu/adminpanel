import React,{Component} from 'react';
import Services from '../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageFooter extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            footer_data:''
        }

        this.handleFooter=this.handleFooter.bind(this);
        this.AddFooter=this.AddFooter.bind(this);
    }

    handleFooter(e){
        console.log(e.target.name);
        this.setState({[e.target.name]:e.target.value});
    }
    AddFooter(e){
      e.preventDefault();
      var data={
        footer_data:this.state.footer_data
      }
      console.log(data);
      this.saveFooterData(data);
    }
    saveFooterData(data){
        Services.manageFooterData(data).then((response)=>{
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
                footer_data:response.data.data.footer_data
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
                <form className="form" onSubmit={this.AddFooter}>
                <FormGroup controlId="formControlsTextarea">
                    <FormLabel>Footer Text</FormLabel>
                    <FormControl style={{ height: 100 }} componentclass="textarea" name="footer_data" placeholder="textarea" onChange={this.handleFooter} value={this.state.footer_data} />
                </FormGroup>
   
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default ManageFooter;