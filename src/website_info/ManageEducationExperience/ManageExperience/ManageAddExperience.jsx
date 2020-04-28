import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel,Table} from 'react-bootstrap';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es);

class ManageAddExperience extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            startDate: new Date(),
            endDate: new Date(),
            company_name:'',
            about_experience:'',
            experience_list:[]
        }
        this.AddExperienceDetails=this.AddExperienceDetails.bind(this);
    }
    handleStartChange = date => {
        this.setState({
          startDate: date
        });
      };
      handleEndChange = date => {
        this.setState({
          endDate:date
        });
      };
    handleCompany=(e)=>{
        this.setState({[e.target.name]:e.target.value});
      }
    handleExperienceDetails=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    AddExperienceDetails(e){
      e.preventDefault();
     var sdate= moment(this.state.startDate).format('DD-MM-YYYY');
     var edate= moment(this.state.endDate).format('DD-MM-YYYY');
      var data={experiences:{
            year_between:sdate +' To '+ edate,
            company_name:this.state.company_name,
            about_experience:this.state.about_experience
      }}

      this.saveExperienceDetails(data);
    }
    saveExperienceDetails(data){
        Services.manageExperienceAdd(data).then((response)=>{
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
                experience_list:response.data.data.education_experience.experience_set
            });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    deleteExperience(id){
        var data={"eid":id};
      Services.manageExperienceDelete(data).then((response)=>{
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
    };
    componentDidMount(){
        this.webAllInfo();
    }

    render(){
        return(
            <React.Fragment>
                <form className="form my_form" onSubmit={this.AddExperienceDetails}>
                    <h5>Manage Experience </h5>
                   <div className="container">
                       <div className="row">
                           <div className="col-lg-6">
                               <h5>Start Date</h5>
                           <DatePicker
                            selected={this.state.startDate}
                            onSelect={this.handleSelect}
                            onChange={this.handleStartChange}
                            className='my_date_picker'
                        />
                           </div>
                           <div className="col-lg-6">
                               <h5>End Date</h5>
                           <DatePicker
                            selected={this.state.endDate}
                            onSelect={this.handleSelect}
                            onChange={this.handleEndChange}
                            className='my_date_picker'
                        />
                           </div>
                           
                       </div>
                        <h5 className="my_form">Company Name</h5>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Company Name" onChange={this.handleCompany} name="company_name" defaultValue="" />
                        </div>
                        <h5 className="my_form">About Experience</h5>
                        <div className="form-group">
                            <textarea type="text" className="form-control" placeholder="Experience Details" onChange={this.handleExperienceDetails} name="about_experience" defaultValue="" />
                        </div>
                        <div className="form-group my_form">
                            <button type="submit" className="btn btn-primary">Add Experience</button>
                        </div>
                   </div>
                </form>
                <div className="contaier my_form">
                    <div className="row" style={{"marginLeft": "15px"}}>
                    <h4>Experience List</h4>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Years</th>
                            <th>Company Name</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.experience_list.map((data,id)=>(
                                <tr key={id}>
                                <td>{id+1}</td>
                                <td>{data.year_between}</td>
                                <td>{data.company_name}</td>
                                <td><button type="button" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteExperience(data._id)}}  className="btn btn-sm btn-danger">Delete</button></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ManageAddExperience;