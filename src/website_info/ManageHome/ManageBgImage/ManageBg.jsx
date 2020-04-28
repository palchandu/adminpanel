import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageBg extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            background_image:''
        }
        this.AddHomeBg=this.AddHomeBg.bind(this);
        this.handleBg=this.handleBg.bind(this);
    }
    handleBg(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddHomeBg(e){
      e.preventDefault();
      var data={
        background_image:this.state.background_image
      }
      this.saveBg(data);
    }
    saveBg(data){
        Services.manageBg(data).then((response)=>{
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
                background_image:response.data.data.home.background_image
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
                <form className="form my_form" onSubmit={this.AddHomeBg}>
                    <h5>Home background image</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="background_image"  className="form-control" value={this.state.background_image} onChange={this.handleBg} />
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

export default ManageBg;