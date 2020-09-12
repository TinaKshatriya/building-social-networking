import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import {signin,authenticate} from "../auth";

class Signin extends Component {

    constructor(){
        super()
        this.state={
            
            email:"",
            password:"",
            error   :"",
            redirectToReferer  :false,
            loading :false
        };
    }

    handleChange = name => event=>{
        this.setState({error:""})
        this.setState({[name]:event.target.value});
    };

    

    clickSubmit = event=>{
        event.preventDefault();
        this.setState({loading:true})
        const {email,password}= this.state;
        const user={
                  email,
               password
            };
               //console.log(user);
              signin(user)
              .then(data => {
               if(data.error) 
               {
                   this.setState({error:data.error ,loading:false});
               }
               else 
               {
                   //authentication
                   authenticate(data,() =>{
                       this.setState({redirectToReferer:true})
                   })
                   //redirct
               }
              })
    };

   
   signinForm = (email,password)=>(
    <form>
   
        
        <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={this.handleChange("email")} type="email" value={email} className="form-control"/>
        </div>
        <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={this.handleChange("password")} type="password" value={password} className="form-control"/>
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
</form>

   )

    render() {
        const {email,password,error,redirectToReferer,loading}= this.state
        if(redirectToReferer){
           return <Redirect to="/"/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className ="alert alert-danger" style={{display: error ? "" :'none'}}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center"><h2>Loading</h2></div> :""}
                {this.signinForm(email,password)}
                <p>
                 <Link to="/forgot-password" className="text-danger">
                   {" "}
                      Forgot Password
                  </Link>
                 </p>
            </div>
        );
    }
}


export default Signin;