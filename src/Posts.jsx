import React,{Component} from 'react';
import 'react-trumbowyg/dist/trumbowyg.min.css'
import './css/posts.css';
import Trumbowyg from 'react-trumbowyg'
import 'trumbowyg/dist/plugins/upload/trumbowyg.upload.min.js'
import Services from './services/user.services';
import Utility from './utility/utility';
import Checkbox from './Checkbox';
import {Modal} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import queryString from 'query-string';
//import MyLargeModal from './utility/modals';
import { Redirect } from "react-router-dom";
class Posts extends Component{
    
    constructor(props,context){
        super(props,context);
        
        this.state={
            categories:[],
            images_list:[],
            checkedItems: new Map(),
            post_data:'',
            postData:'',
            post_title:'',
            info:{
                success:'',
                error:''
            },
            smShow: false,
            lgShow: false,
            show: false,
            image_url:'',
            post_id:''
        }
        
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleEditorChange=this.handleEditorChange.bind(this);
        this.titleHandle=this.titleHandle.bind(this);
        this.copyUrl=this.copyUrl.bind(this);
        /*Modal */
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }
    /*Modal */
    handleShow() {
        this.setState({ show: true });
      }
    
    handleHide() {
        this.setState({ show: false });
      }

    
    btnEnableDisble(){
        if(this.state.post_data && this.state.post_title && this.state.checkedItems.size>0 ){
            return true
        }else{
            return false;
        }
        
    }
    /*
    get single post details
     */
    getSinglePost(title){
        Services.singlePost(title).then((response)=>{
            if(response.data.success==true){
             this.setState({post_title:response.data.data.title,postData:response.data.data.post_content,post_id:response.data.data._id});
             response.data.data.post_category.map((items)=>{
                this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(items, true) }));
             })

            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        Services.categoryList().then((response)=>{
            if(response.data.success==true){
                this.setState({categories:response.data.data});
                console.log(this.state.categories);
            }
        }).catch((error)=>{
            console.log(error)
        })
        this.setState({postData:''})
        /*Image List */
        Services.imageList().then((response)=>{
            if(response.data.success==true){
                this.setState({images_list:response.data.data});
                console.log(this.state.images_list);
            }
        }).catch((error)=>{
            console.log(error)
        })
        let params = queryString.parse(this.props.location.search);
        if(params.title!=undefined && params.title!=''){
            this.getSinglePost(params.title);
        }
        
    }

    titleHandle(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({post_title:value});
        console.log(name);
    }
    handleChangeCheckbox(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        console.log(this.state.checkedItems);
    }    
    
    
    handleEditorChange = (content) => {
       console.log('Content was updated:', content);
       const value=content.target.innerHTML;
       this.setState({post_data:value});
      }

    copyUrl(e){
        e.preventDefault();
        const url=e.target.getAttribute('src');
        this.setState({image_url:url});
        this.handleHide();
    }
    submitPost(){
        const post_contetnt=this.state.post_data;
        const uid=Utility.userId();
        var cats=[];
        this.state.checkedItems.forEach((values,index)=>{
            cats.push(index);
        })
        const data={
            "post_id":this.state.post_id,
            "title":this.state.post_title,
            "post_content":post_contetnt,
            "uid":uid,
            "category":cats
        }
        if(this.state.post_id!=''){
            
            Services.updatePosts(data).then((response)=>{
                if(response.data.success==true){
                    this.setState({info:{success:response.data.message}});
                }else if(response.data.success==false){
                    this.setState({info:{error:response.data.message}});
                }
                return <Redirect to='/posts' />
            }).catch((error)=>{
                //console.log(error);
            })
        }else{
            Services.addPosts(data).then((response)=>{
                if(response.data.success==true){
                    this.setState({info:{success:response.data.message}});
                }else if(response.data.success==false){
                    this.setState({info:{error:response.data.message}});
                }
                return <Redirect to='/posts' />
            }).catch((error)=>{
                //console.log(error);
            })
        }
      }
    render(){
        const {post_data,info}=this.state;
        let smClose = () => this.setState({ smShow: false });
        let lgClose = () => this.setState({ lgShow: false });
        return(
            
            <React.Fragment>
                <div className="row">
                <div className="col-sm-12 col-md-9 col-lg-9">
                <div className="modal_btn">
                {/*<Button
                bsStyle="primary"
                onClick={() => this.setState({ lgShow: true })}
                >
                Launch large demo modal
                </Button>*/}
                <Button  onClick={this.handleShow}>
                Gallery
                </Button>
                </div>
                
                
                {info.success && <span className="success">
                    {info.success}
                    </span>}
                {info.error && <span className="error">
                    {info.error}
                    </span>}
                <div className="form-group" style={{"marginLeft": "20px"}}>
                    <input onChange={this.titleHandle} name="post_title" type="text" className="form-control" placeholder="Post Title"  value={this.state.post_title}/>
                </div>
                
                <div style={{"marginLeft": "20px","border": "1px solid"}}>{this.state.image_url}</div>
                <Trumbowyg
					id='react-trumbowyg'
					buttons={
						[
                            ['viewHTML'],
                            ['formatting'],
                            'btnGrp-semantic',
                            ['link'],
                            ['insertImage'],
                            'btnGrp-justify',
                            'btnGrp-lists',
                            ['table'], // I ADDED THIS FOR THE TABLE PLUGIN BUTTON
                            ['fullscreen']
						]
                    }
                    data={this.state.postData}
                    placeholder='Type your text!'
                    onChange={this.handleEditorChange}
                    ref="trumbowyg"
				/>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 cat_part">
                    <h5>Categories</h5>
                    <ol>
                    {
                    this.state.categories.map(item => (
                        
                        <li key={item._id}>
                        <label>
                        {item.name}&nbsp;&nbsp;
                        <Checkbox  name={item._id} checked={this.state.checkedItems.get(item._id)} onChange={this.handleChangeCheckbox} />
                        </label>
                        </li>
                    ))
                    }
                    </ol>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <button style={{"marginLeft": "20px"}} disabled={!this.btnEnableDisble()}  onClick={()=>this.submitPost()} type="button" className="btn btn-primary pull-right">Post Publish</button>
                </div>
                {/*<MyLargeModal show={this.state.lgShow} onHide={lgClose} />*/}
                <ButtonToolbar>
                <Modal
                show={this.state.show}
                onHide={this.handleHide}
                dialogClassName="custom-modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                    Galley
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.images_list.map(items =>(
                            <a href="" key={items._id} style={{"padding": "10px 10px 10px 10px"}}><img  onClick={this.copyUrl} style={{"width":"120px","height":"120px","marginTop":"10px"}} src={items.imagePath}/></a>
                        ))
                    }
                   
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                </Modal.Footer>
                </Modal>
                </ButtonToolbar>

                </div>
            </React.Fragment>
        )
    }
}

export default Posts