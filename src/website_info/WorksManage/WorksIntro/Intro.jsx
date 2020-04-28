import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageIntro extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            portfolio_data_intro:''
        }
        this.AddWorkIntro=this.AddWorkIntro.bind(this);
        this.handleIntro=this.handleIntro.bind(this);
    }
    handleIntro(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddWorkIntro(e){
      e.preventDefault();
      var data={
        portfolio_data_intro:this.state.portfolio_data_intro
      }
      this.saveIntro(data);
    }
    saveIntro(data){
        Services.manageWorkIntro(data).then((response)=>{
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
                portfolio_data_intro:response.data.data.work.portfolio_data_intro
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
                <form className="form my_form" onSubmit={this.AddWorkIntro}>
                    <h5>Work Introduction Text</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <textarea  style={{height:'170px'}} type="text" name="portfolio_data_intro"  className="form-control" value={this.state.portfolio_data_intro} onChange={this.handleIntro} />
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

export default ManageIntro;