import React,{Component} from 'react';
import Services from './services/user.services';

class Category extends Component{

    constructor(props){
        super(props);
        this.state={
            category:'',
            submitted:false,
            errors:{
                category:''
            },
            add_success:false,
            add_error:false
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          // if we have an error string set valid to false
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.validateForm(this.state.errors)) {
            this.setState({submitted:true});
          }
          if(this.state.category){
            const created_by="5df9ef824ab1af2405c742b6";
            Services.addCategory(this.state.category,created_by).then((response)=>{
               // console.log(response)
               if(response.data.success==true){
                this.setState({"add_success":true})
               }else if(response.data.success==false){
                this.setState({"add_error":true})
               }
            }).catch((error)=>{
                console.log(error);
            })
          }else{
              this.setState({errors:{category:"Category is required!"}});
          }
    }
    handleChange(e){
         const name=e.target.name;
         const value=e.target.value;
         //console.log(name);
         //console.log(value)
        this.setState({[e.target.name]:e.target.value});
        let errors=this.state.errors;
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
        switch(name){
            case 'category':
                errors.category=value.length < 3 ? 'Category can not be less than 3 character':'';
                console.log(name);
                break;
            default:
            break;
        }
    }
    render(){
        const {errors,add_success,add_error} = this.state;
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        {add_success && 
                        <p className='success'>Successfully Category Added.</p>}
                        {add_error && 
                                        <p className='error'>Category Not Added.</p>}
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    {errors.category.length > 0 && 
                                        <p className='error'>{errors.category}</p>}
                                    <input onChange={this.handleChange} className="form-control" type="text" name="category" placeholder="Category" />
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Add Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Category