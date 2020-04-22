import React,{ Component }  from 'react';
import './post_list.css';
import * as ReactBootstrap from 'react-bootstrap';
import Services from '../services/user.services';
import { Link } from "react-router-dom";
class PostList extends Component{

    constructor(prop){
        super(prop)
        this.state={
            post_list:[],
            invalid:'',
            success:'',
            error:'',
        }
    }
    componentDidMount(){
        this.getPostLost();
        if(this.props.location.state!=undefined){
        this.setState({success:this.props.location.state.success,error:this.props.location.state.error});
        setTimeout(function(){
            this.setState({success:undefined,error:undefined});
        }.bind(this),3000)
        }
    }
    getPostLost(){
        Services.postList().then((response)=>{
            console.log(response);
            if(response.data.success==true){
                this.setState({post_list: response.data.data});
                console.log(this.state.post_list);
            }else if(response.data.success==false){

                this.setState({invalid:response.data.message});
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
/*Delete Post */
deletePost(post_id){
    Services.deletePost(post_id).then((response)=>{
        if(response.data.success==true){
            this.getPostLost();
            this.setState({success:response.data.message});
        }else if(response.data.success==false){

            this.setState({invalid:response.data.message});
        }
    }).catch((error)=>{
        console.log(error)
    })
}
    render(){
        
        return(
            <React.Fragment>
                <div className="row posts">
                {this.state.success!=undefined && <span className="success">
                    {this.state.success}
                    </span>}
                {this.state.error!=undefined  && <span className="error">
                    {this.state.error}
                    </span>}
                    <div className="dol-sm-12 col-md-12 col-lg-12">
                        <h3>Post Lists</h3>
                        <ReactBootstrap.Table responsive>
                            <thead>
                                <tr>
                                <th>Title</th>
                                <th>Comments</th>
                                <th>Created Date</th>
                                <th>Created By</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.post_list.map((item=>
                                        <tr>
                                        <td><Link to={"/posts?title="+item.title}>{item.title}</Link></td>
                                        <td>{item.comments.length}</td>
                                        <td>{item.created}</td>
                                        <td>{item.created_by}</td>
                                        <td><button className="btn btn-danger btn-sm" onClick={()=>{ if(window.confirm('Are you sure you wish to delete this item?')) this.deletePost(item._id)}}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                            </ReactBootstrap.Table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PostList