import React,{Component} from 'react';
import Services from '../services/user.services';

class ManageEnquiry extends Component{

    constructor(props){
        super(props);
        this.state={
            enquiry_list:[],
        }
    }

    /*Fetch Category List */
    enquiryList(){
        Services.getContactsInfo().then((response)=>{
            if(response.data.success==true){
                this.setState({enquiry_list:response.data.data.enquiry});
                console.log(this.state.enquiry_list);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.enquiryList();
    }

    render(){
        return(
            <React.Fragment>
                <div className="container">

                    <div className="row list_cat">
                            <h3>All Enquiry</h3>
                            <table className="table table-borderd">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.enquiry_list.length==0 &&
                                        <tr>
                                            <td colSpan="4">No Enquiry</td>
                                        </tr>
                                    }
                                    {
                                       this.state.enquiry_list.map(item=>(
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.message}</td>
                                        </tr>
                                        )) 
                                    }
                                    
                                </tbody>
                            </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ManageEnquiry