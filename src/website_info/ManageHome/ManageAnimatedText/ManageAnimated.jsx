import React,{Component} from 'react';
import Services from '../../../services/user.services';
import swal from 'sweetalert';
import {FormGroup, FormControl, FormLabel,Table} from 'react-bootstrap';
class ManageAddSkills extends Component{

    constructor(props,context){
        super(props,context);
        this.state={
            animated:[{text_name:null,text_delay:null}],
            animated_list:[],
        }
    }

    handleAddAnimation = () => {
        this.setState({
            animated: this.state.animated.concat([{ text_name: null,text_delay:null }])
        });
      };
      handleRemoveAnimation = idx => () => {
        this.setState({
            animated: this.state.animated.filter((s, sidx) => idx !== sidx)
        });
      };

    handleTextChange = idx => evt => {
        const newAnimated = this.state.animated.map((upanimate, sidx) => {
          if (idx !== sidx) return upanimate;
          return { ...upanimate, text_name: evt.target.value };
        });
        this.setState({ animated: newAnimated });
      };
    handleDelayChange = idx => evt => {
        const newAnimated = this.state.animated.map((upanimate, sidx) => {
          if (idx !== sidx) return upanimate;
          return { ...upanimate, text_delay: evt.target.value };
        });
        this.setState({ animated: newAnimated });
      };
      AddAnimated=e=>{
        e.preventDefault();
        var data={animated:this.state.animated};
        this.saveSkills(data);
       console.log(data);
    }
    saveSkills(data){
        Services.manageAnimated(data).then((response)=>{
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
                animated:response.data.data.home.animated_text
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
                <form className="form my_form" onSubmit={this.AddAnimated}>
                <div className="form-group">
                    <h4>Add Animated Text</h4>
                </div>
                {this.state.animated.map((animate,idx)=>(
                    <div key={idx} className="flex-container" style={{margin: "10px 0px 10px 0px"}}>
                    <div className="flex-child">
                    <input onChange={this.handleTextChange(idx)} placeholder="Text Name" style={{width:'450px'}} type="text" name="text_name" className="form-control" defaultValue={animate.text_name} />
                    </div>
                    <div className="flex-child">
                    <input onChange={this.handleDelayChange(idx)} placeholder="Text Delay" style={{width:'450px'}} type="text" name="text_delay" className="form-control" defaultValue={animate.text_delay} />
                    </div>
                    <div className="flex-child" style={{marginLeft:"5px"}}>
                        <button type="button" onClick={this.handleRemoveAnimation(idx)} className="btn btn-danger"><i className="fas fa-minus"></i></button>
                    </div>
                </div>
                ))}
                
                <div className="form-group" style={{marginTop:'3px'}}>
                <button onClick={this.handleAddAnimation} type="button" className="btn btn-primary"><i className="fas fa-plus"></i></button>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button type="submit" className="btn btn-primary">Save Animation</button>
                    </div>
                </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ManageAddSkills