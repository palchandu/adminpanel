import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel} from 'react-bootstrap';
class ManageTitle extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            portfolio_data_title:''
        }
        this.AddWorkTitle=this.AddWorkTitle.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
    }
    handleTitle(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddWorkTitle(e){
      e.preventDefault();
      var data={
        portfolio_data_title:this.state.portfolio_data_title
      }
      this.saveTitle(data);
    }
    saveTitle(data){
        Services.manageWorkTitle(data).then((response)=>{
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
                portfolio_data_title:response.data.data.work.portfolio_data_title
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
                <form className="form" onSubmit={this.AddWorkTitle}>
                    <h5>Work Title</h5>
                    <div className="flex-container">
                        <div className="col-lg-10 flex-child">
                            <input type="text" name="portfolio_data_title"  className="form-control" value={this.state.portfolio_data_title} onChange={this.handleTitle} />
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