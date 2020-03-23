import React,{Component} from 'react';
import Services from './services/user.services';
import './css/category.css'
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
            add_error:false,
            category_list:[],
            show:true,
            category_id:''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
       // this.deleteCategory=this.deleteCategory.bind(this);
    }

    /*Fetch Category List */
    categoriesList(){
        Services.categoryList().then((response)=>{
            if(response.data.success==true){
                this.setState({category_list:response.data.data});
                console.log(this.state.category_list);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    componentDidMount(){
        this.categoriesList();
    }
    /*Delete Category */
    deleteCategory(cateId){
        Services.removeCategory(cateId).then((response)=>{
             console.log(response)
             this.categoriesList();
            // if(response.data.success==true){
            //  this.setState({"add_success":true})
            // }else if(response.data.success==false){
            //  this.setState({"add_error":true})
            // }
         }).catch((error)=>{
             console.log(error);
         })
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
              if(this.state.category_id){
                Services.updateCategory(this.state.category,this.state.category_id).then((response)=>{
                     console.log(response)
                    if(response.data.success==true){
                        this.setState({"add_success":true,show:true,category_id:''})
                        this.categoriesList();

                    }else if(response.data.success==false){
                        this.setState({"add_error":true})
                    }
                    }).catch((error)=>{
                        console.log(error);
                    })
              }else{
                const created_by="5df9ef824ab1af2405c742b6";
                Services.addCategory(this.state.category,created_by).then((response)=>{
                // console.log(response)
                if(response.data.success==true){
                    this.setState({"add_success":true})
                    this.categoriesList();
                }else if(response.data.success==false){
                    this.setState({"add_error":true})
                }
                }).catch((error)=>{
                    console.log(error);
                })
            }
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
                    {this.state.show && <div className="row">
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
                    </div>}
                    {!this.state.show && <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        {add_success && 
                        <p className='success'>Successfully Category Updated.</p>}
                        {add_error && 
                                        <p className='error'>Category Not Updated.</p>}
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="category">Update Category</label>
                                    {errors.category.length > 0 && 
                                        <p className='error'>{errors.category}</p>}
                                    <input onChange={this.handleChange} className="form-control" type="text" name="category" placeholder="Category" value={this.state.category} />
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Update Category</button>
                            </form>
                        </div>
                    </div>}

                    <div className="row list_cat">
                            <h3>All Categories</h3>
                            <table className="table table-borderd">
                                <thead>
                                    <tr>
                                        <th>Category name</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.category_list.length==0 &&
                                        <tr>
                                            <td colSpan="3">No Category</td>
                                        </tr>
                                    }
                                    {
                                       this.state.category_list.map(item=>(
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td><button onClick={()=>this.setState({show:false,category:item.name,category_id:item._id})} className="btn btn-sm btn-primary">Edit</button></td>
                                            <td><button  className="btn btn-sm btn-danger"  onClick={()=>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCategory(item.name)}}>Delete</button></td>
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

export default Category