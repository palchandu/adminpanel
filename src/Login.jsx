import React,{Component} from 'react';
import './css/login.css';
import Services from './services/user.services';
import {  Redirect } from "react-router-dom";
import Layout from './Layout';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class Login extends Component{
   
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            submitted:false,
            loading:false,
            errors: {
                email: '',
                password: '',
              },
            redirectToReferrer: false,
            invalid:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
        const name=e.target.name;
        const value=e.target.value;
        console.log(value)
        let errors=this.state.errors;
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })

        switch(name){
            case 'email':
                errors.email=validEmailRegex.test(value) ? '':'Email is not valid';
                console.log(name);
                break;
            case 'password':
                errors.password= value.length < 5 ? 'Password must be 8 characters long!':'';
                break;
            default:
            break;
        }
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
        if(this.state.email && this.state.password){
            Services.login(this.state.email,this.state.password).then((response)=>{
                if(response.data.success==true){
                    sessionStorage.setItem('userData',JSON.stringify(response.data.data.token));
                    sessionStorage.setItem('userId',JSON.stringify(response.data.data.uid));
                    this.setState({redirectToReferrer: true});
                }else if(response.data.success==false){
                    this.setState({invalid:response.data.message});
                }
            }).catch((error)=>{
                console.log(error)
            })
        }

    }
    render(){
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')){
            return (<Layout/>)
            }

        const { username, password, submitted, loading, error,invalid } = this.state;
        const {errors} = this.state;
        return(
            <React.Fragment>
                
                <div className="card card-login mx-auto mt-5">
                
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <h4 className="text-center">
                        {invalid.length > 0 && 
                                <span className='error'>{invalid}</span>}
                        </h4>

                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group has-error">
                            <div className="form-label-group">
                            <input type="text" name="email" id="inputEmail" onChange={this.handleChange} className="form-control" placeholder="Email address"/>
                            <label htmlFor="inputEmail">Email address</label>
                            </div>
                            {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                            <input type="password" name="password" id="inputPassword" onChange={this.handleChange} className="form-control" placeholder="Password" />
                            <label htmlFor="inputPassword">Password</label>
                            </div>
                            {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <div className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/>
                                Remember Password
                            </label>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block">Login</button>
                        </form>
                        <div className="text-center">
                        <a className="d-block small mt-3" href="register.html">Register an Account</a>
                        <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default Login;