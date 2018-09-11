import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducer';
import { withRouter } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
            this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            status: '',
            formComplete: true,
            isVerified: false
        }
    }

    register() {
        ((this.state.password !=='') && (this.state.email !=='') ) ?
        axios.post('/api/register', this.state ).then(response => {
            this.props.updateUser(response.data.username, response.data.userId)
            this.props.history.push('/')
        })
        .catch(error => {
           console.log('Axios error POST on register', error)
          }) : this.changeFormStatus()
        }

    changeFormStatus() {
        this.setState({
            formComplete: !this.state.formComplete
        })
    }

    changeFirstName(val) {
        this.setState({
            first_name: val
        })
    }

    changeLastName(val) {
        this.setState({
            last_name: val
        })
    }

    changeUsername(val) {
        this.setState({
           username: val
        })
    }

    changePassword(val) {
        this.setState({
            password: val
        })
    }

    changeEmail(val) {
        this.setState({
        email: val
        })
    }

    changeEmployee(val){
        this.setState({
        status: val
        })
    }

    verifyCallback =(response) => {
        if(response) {
            this.setState({
                isVerified: true
            })
        }
    }

    render(){
        console.log(this.state.formComplete)
        return(
            <div className="Register">
                <div className="registration-header-container"></div>
                <div className="register-input-container">
                    <h1>Sign Up</h1>
                    <div className="above-input">First Name</div>
                    <input onChange={(e) => {this.changeFirstName(e.target.value)}} className="register-input" onInvalid={()=> alert('You must fill out the form!')} required/><br/>
                    <div className="above-input">Last Name</div> <input onChange={(e) => {this.changeLastName(e.target.value)}} className="register-input"/><br/>
                    <div className="above-input">Username</div>  <input  onChange={(e) => {this.changeUsername(e.target.value)}} className="register-input"/><br/>
                    <div className="above-input">Password</div> <input type="password" onChange={(e) => {this.changePassword(e.target.value)}} className="register-input"/><br/>
                    <div className="above-input">Email</div>       <input onChange={(e) => {this.changeEmail(e.target.value)}} className="register-input"/><br/>
                </div>
                        {/* {this.state.formComplete ? null : <p className="register-error">Fill out your form and verify you are human pleeeez</p>} */}
                
                <div className="register-buttons">
                    <Link to="/" className="submit-registration">Go Back</Link>
                    <button onClick={() => this.register()} className="submit-registration sign-up-button">Sign Up</button>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateUser
}


export default withRouter(connect(null, mapDispatchToProps)(Register));


