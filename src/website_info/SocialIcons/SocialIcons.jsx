import React,{Component} from 'react';
import Services from '../../services/user.services';
import swal from 'sweetalert';
class SocialIcons extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            facebook:'',
            twitter:'',
            linkedin:'',
            youtube:''
        }
        /*Social Icons */
        this.handleSocial=this.handleSocial.bind(this);
        this.AddSocialIcon=this.AddSocialIcon.bind(this);
    }

    handleSocial(e){
        this.setState({[e.target.name]:e.target.value});
    }
    AddSocialIcon(e){
      e.preventDefault();
      var data={
        'facebook':this.state.facebook,
        'twitter':this.state.twitter,
        'linkedin':this.state.linkedin,
        'youtube':this.state.youtube
      }
      this.saveSocialData(data);
    }
    saveSocialData(data){
        Services.manageSocialIcons(data).then((response)=>{
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
              console.log(response.data.data.social_icons);
               this.setState({
                facebook:response.data.data.social_icons.facebook,
                twitter:response.data.data.social_icons.twitter,
                linkedin:response.data.data.social_icons.linkedin,
                youtube:response.data.data.social_icons.youtube,
            });
                console.log(this.state.facebook);
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
                <form className="form" onSubmit={this.AddSocialIcon}>
                <div className="form-group">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" className="form-control" name="facebook" onChange={this.handleSocial} value={this.state.facebook} />
                </div>
                <div className="form-group">
                    <label htmlFor="facebook">Twitter</label>
                    <input type="text" className="form-control" name="twitter" onChange={this.handleSocial} value={this.state.twitter} />
                </div>
                <div className="form-group">
                    <label htmlFor="facebook">Linkedin</label>
                    <input type="text" className="form-control" name="linkedin" onChange={this.handleSocial} value={this.state.linkedin} />
                </div>
                <div className="form-group">
                    <label htmlFor="facebook">Youtube</label>
                    <input type="text" className="form-control" name="youtube" onChange={this.handleSocial} value={this.state.youtube} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
            </React.Fragment>
        )
    }
}

export default SocialIcons;