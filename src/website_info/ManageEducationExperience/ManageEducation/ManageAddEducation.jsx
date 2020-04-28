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

class ManageAddEducation extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            startDate: new Date(),
            endDate: new Date(),
            institute_name:'',
            about_education:'',
            education_list:[]
        }
        this.AddEducationDetails=this.AddEducationDetails.bind(this);
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
    handleInstitute=(e)=>{
        this.setState({[e.target.name]:e.target.value});
      }
    handleEducationDetails=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    AddEducationDetails(e){
      e.preventDefault();
     var sdate= moment(this.state.startDate).format('DD-MM-YYYY');
     var edate= moment(this.state.endDate).format('DD-MM-YYYY');
      var data={educations:{
            year_between:sdate +' To '+ edate,
            institute_name:this.state.institute_name,
            about_education:this.state.about_education
      }}

      this.saveEducationDetails(data);
    }
    saveEducationDetails(data){
        Services.manageEducationAdd(data).then((response)=>{
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
                education_list:response.data.data.education_experience.education_set
            });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    deleteEducation(id){
        var data={"eid":id};
      Services.manageEducationDelete(data).then((response)=>{
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
        console.log(this.state.education_list);
    }

    render(){
        return(
            <React.Fragment>
                <form className="form my_form" onSubmit={this.AddEducationDetails}>
                    <h5>Manage Education </h5>
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
                        <h5 className="my_form">Institute Name</h5>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Institute Name" onChange={this.handleInstitute} name="institute_name" defaultValue="" />
                        </div>
                        <h5 className="my_form">About Education</h5>
                        <div className="form-group">
                            <textarea type="text" className="form-control" placeholder="Education Details" onChange={this.handleEducationDetails} name="about_education" defaultValue="" />
                        </div>
                        <div className="form-group my_form">
                            <button type="submit" className="btn btn-primary">Add Education</button>
                        </div>
                   </div>
                </form>
                <div className="contaier my_form">
                    <div className="row" style={{"marginLeft": "15px"}}>
                    <h4>Education List</h4>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Years</th>
                            <th>Institute Name</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.education_list.map((data,id)=>(
                                data!=null?<tr key={id}><td>{id+1}</td><td>{data.year_between}</td><td>{data.institute_name}</td><td><button type="button" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteEducation(data._id)}}  className="btn btn-sm btn-danger">Delete</button></td></tr>:null
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