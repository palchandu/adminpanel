import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel,Table} from 'react-bootstrap';
class ManageAddEducation extends Component{

    constructor(props,context){
        super(props,context);
        this.state={
            service_icon:'',
            service_name:'',
            about_service:'',
            service_list:[]
        }
    }
    AddServiceDetails=(e)=>{
        e.preventDefault();
        var data={services:{
            service_icon:this.state.service_icon,
            service_name:this.state.service_name,
            about_service:this.state.about_service
      }}
      this.saveServiceDetails(data);
    }
    saveServiceDetails(data){
        Services.manageServiceAdd(data).then((response)=>{
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
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    webAllInfo(){
        Services.getWebsiteInfo().then((response)=>{
            if(response.data.success==true){
               this.setState({
                service_list:response.data.data.service.service_set
            });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
componentDidMount(){
    this.webAllInfo();
}
deleteService(id){
    var data={"sid":id};
  Services.manageServiceDelete(data).then((response)=>{
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
};
    render(){
        return(
            <React.Fragment>
                <form className="form my_form" onSubmit={this.AddServiceDetails}>
                    <h5>Manage Services </h5>
                    <div className="container">
                        <h5 className="my_form">Service Icon</h5>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Service Icons" onChange={this.handleChange} name="service_icon" defaultValue="" />
                        </div>

                        <h5 className="my_form">Service Name</h5>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Service Name" onChange={this.handleChange} name="service_name" defaultValue="" />
                        </div>

                        <h5 className="my_form">About Service</h5>
                        <div className="form-group">
                            <textarea maxLength="150" minLength="150" type="text" className="form-control" placeholder="About Service" onChange={this.handleChange} name="about_service" defaultValue="" />
                        </div>
                        <div className="form-group my_form">
                            <button type="submit" className="btn btn-primary">Add Service</button>
                        </div>
                    </div>
                </form>
                <div className="contaier my_form">
                    <div className="row" style={{"marginLeft": "15px"}}>
                    <h4>Services List</h4>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Service Icon</th>
                            <th>Service Name</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.service_list.map((data,id)=>(
                                data!=null?<tr key={id}><td>{id+1}</td><td>{data.service_icon}</td><td>{data.service_name}</td><td><button type="button" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteService(data._id)}}  className="btn btn-sm btn-danger">Delete</button></td></tr>:null
                            ))}
                            
                        </tbody>
                    </Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ManageAddEducation;
