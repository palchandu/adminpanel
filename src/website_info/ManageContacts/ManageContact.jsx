import React,{Component} from 'react';
import Services from '../../services/user.services';
import swal from 'sweetalert';
class ManageContacts extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            call_us:'',
            email_us:'',
            visit_us:''
        }

        this.handleContact=this.handleContact.bind(this);
        this.AddContacts=this.AddContacts.bind(this);
    }

    handleContact(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddContacts(e){
      e.preventDefault();
      var data={
        'call_us':this.state.call_us,
        'email_us':this.state.email_us,
        'visit_us':this.state.visit_us
      }
      this.saveContactData(data);
    }
    saveContactData(data){
        Services.addContactsInfo(data).then((response)=>{
            console.log(response);
            if(response.data.success==true){
                swal("Good job!", response.data.message, "success");
                this.contactInfo();
            }else{
                swal("Good job!", response.data.message, "success");
                this.contactInfo();
            }
        }).catch((error)=>{
            swal("Good job!", error, "error");
        })
    }
    contactInfo(){
        Services.getContactsInfo().then((response)=>{
            if(response.data.success==true){
              console.log(response.data.data.social_icons);
               this.setState({
                call_us:response.data.data.call_us,
                email_us:response.data.data.email_us,
                visit_us:response.data.data.visit_us,
            });

            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.contactInfo();
    }

    render(){
        return(
            <React.Fragment>
                <form className="form" onSubmit={this.AddContacts}>
                <div className="form-group">
                    <label htmlFor="call_us">Call Us</label>
                    <input type="text" className="form-control" name="call_us" onChange={this.handleContact} value={this.state.call_us} />
                </div>
                <div className="form-group">
                    <label htmlFor="email_us">Email Us</label>
                    <input type="text" className="form-control" name="email_us" onChange={this.handleContact} value={this.state.email_us} />
                </div>
                <div className="form-group">
                    <label htmlFor="visit_us">Visit Us</label>
                    <input type="text" className="form-control" name="visit_us" onChange={this.handleContact} value={this.state.visit_us} />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default ManageContacts;