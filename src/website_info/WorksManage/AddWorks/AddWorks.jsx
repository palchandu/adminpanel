import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel,Table} from 'react-bootstrap';
import  './style.css';
class ManageAddWork extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            bg_image:'',
            project_name:'',
            project_url:'',
            project_description:'',
            slide_image:[{image_url:null}],
            workslist:[],
            work_id:'',
        }
    }
    handleAddImages = () => {
        this.setState({
            slide_image: this.state.slide_image.concat([{ image_url: null }])
        });
      };
      handleRemoveImages = idx => () => {
        this.setState({
            slide_image: this.state.slide_image.filter((s, sidx) => idx !== sidx)
        });
      };

    handleImagesUrlChange = idx => evt => {
        const newSliderImage = this.state.slide_image.map((slimg, sidx) => {
          if (idx !== sidx) return slimg;
          return { ...slimg, image_url: evt.target.value };
        });
    
        this.setState({ slide_image: newSliderImage });
        console.log(this.state.slide_image);
      };
    handleBgImageChange = evt => {
        this.setState({ bg_image: evt.target.value });
    };
    handleProjectNameChange = evt => {
        this.setState({ project_name: evt.target.value });
    };
    handleProjectURLChange = evt => {
        this.setState({ project_url: evt.target.value });
    };
    handleProjectDescChange = evt => {
        this.setState({ project_description: evt.target.value });
    };
    AddWorks=e=>{
        e.preventDefault();
        var data={works_set:{
            bg_image:this.state.bg_image,
            project_name:this.state.project_name,
            project_url:this.state.project_url,
            project_description:this.state.project_description,
            slide_image:this.state.slide_image,
        },
        work_id:this.state.work_id
        }
        this.saveWorks(data);
    }
    saveWorks(data){
        Services.manageWorkAdd(data).then((response)=>{
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

    updateWork = id => () => {
        this.state.workslist.filter((datas)=>{
            if(id==datas._id){
                this.setState({
                    bg_image:datas.bg_image,
                    project_name:datas.project_name,
                    project_url:datas.project_url,
                    slide_image:datas.slide_image,
                    work_id:id
                })
            }
        })
      };
      deleteWork(id){
          var data={"wid":id};
          console.log(data);
        Services.manageWorkDelete(data).then((response)=>{
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
    webAllInfo(){
        Services.getWebsiteInfo().then((response)=>{
            if(response.data.success==true){
               this.setState({
                workslist:response.data.data.work.works_set
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
                <div className="container">
                    <div className="row">
                        <form className="form my_form" onSubmit={this.AddWorks}>
                        <h5>Add And Remove Work</h5>
                        <div className="container">
                            <div className="form-group">
                                <label>Background Image</label>
                                <input type="text" onChange={this.handleBgImageChange} name="bg_image" className="form-control" placeholder="Background Images" defaultValue={this.state.bg_image} />
                            </div>
                            <div className="form-group">
                                <label>Project Name</label>
                                <input type="text" onChange={this.handleProjectNameChange} name="project_name" className="form-control" placeholder="Project Name" defaultValue={this.state.project_name} />
                            </div>
                            <div className="form-group">
                                <label>Project URL</label>
                                <input type="text" onChange={this.handleProjectURLChange} name="project_url" className="form-control" placeholder="Project URL" defaultValue={this.state.project_url} />
                            </div>
                            <div className="form-group">
                                <label>Project Descriptions</label>
                                <textarea maxLength="200" minLength="150" rows="7" onChange={this.handleProjectDescChange} name="project_description" className="form-control" placeholder="Project Description" defaultValue={this.state.project_description} />
                                
                            </div>
                            <div className="form-group">
                                <h4>Project Slide Images</h4>
                            </div>
                            {this.state.slide_image.map((images,idx)=>(
                                <div key={idx} className="flex-container" style={{margin: "10px 0px 10px 0px"}}>
                                <div className="flex-child">
                                <input onChange={this.handleImagesUrlChange(idx)} style={{width:'950px'}} type="text" name="slide_image" className="form-control" defaultValue={images.image_url} />
                                </div>
                                <div className="flex-child" style={{marginLeft:"5px"}}>
                                    <button type="button" onClick={this.handleRemoveImages(idx)} className="btn btn-danger"><i className="fas fa-minus"></i></button>
                                </div>
                            </div>
                            ))}
                            
                            <div className="form-group" style={{marginTop:'3px'}}>
                            <button onClick={this.handleAddImages} type="button" className="btn btn-primary"><i className="fas fa-plus"></i></button>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                </form>
                    </div>
                    <div className="row works_list">
                                <h4>Works List</h4>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Project Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.workslist.map((data,id)=>(
                                            <tr key={id}>
                                            <td>{id+1}</td>
                                            <td>{data.project_name}</td>
                                            <td><button type="button" onClick={this.updateWork(data._id)} className="btn btn-sm btn-primary">Update</button></td>
                                            <td><button type="button" onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteWork(data._id)}}  className="btn btn-sm btn-danger">Delete</button></td>
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

export default ManageAddWork;