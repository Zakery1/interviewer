import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducer';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            login: false,
            register: false,
            username: '',
            password: ''
        }
    }

    changeHandleUsername(val) {
        this.setState({
            username: val
        })
    }

    changeHandlePassword(val) {
        this.setState({
            password: val
        })
    }


    loginClick(){
        this.setState({
            login: !this.state.login
        })
    }

    login(){
        const username = this.state.username;
        const password = this.state.password;
        axios.post('/api/login', {username, password})
        
        .then(response => {
            this.setState({login: true})
            this.props.updateUser(response.data.username, response.data.userId)
            this.props.history.push('/')
        })
        .catch(error => {
            console.log('Axios error POST on register', error)
            alert('invalid username of password')
            this.setState({username: '', password: ''})
           });    
    }

    render() {
        console.log(this.props.match)
    return (
            <div className="Login">
                <div className="login-page">
                    <div className="login-header-container">
                            <div className="login-header">
                            Welcome to the International Job Finder
                            </div>
                    </div>
                    <div className="login-page-buttons-container">
                    {/* <img className="china-photo" src={chinaPhoto} alt="China-Photo"/> */}
                        {this.state.login ?
                         <div className="login-stuff">
                            <div className="login-inputs">
                                Username:
                                    <input className="username-input" onChange={(e) => {this.changeHandleUsername(e.target.value)}} placeholder="username" type="text"/>
                                Password:
                                    <input className="username-input" onChange={(e) => {this.changeHandlePassword(e.target.value)}} placeholder="password" type="password"/>
                            </div>
                             <div className="login-screen-buttons">
                             <button onClick={() => this.login()} className="login-page-button one">Login</button>
                             <button onClick={() => this.loginClick()} className="login-page-button">Go Back</button>
                                
                                
                             </div>
                         </div>
                         :
                        <div className="login-page-login-signup">
                            <button onClick={() => this.loginClick()} className="login-page-button two">Login</button>
                            <Link to="/Register" className="login-page-button">Sign Up</Link>
                            <Link to="/" className="login-page-button">Continue As Guest</Link>


                            {/* <Link to="/About" className="login-page-button">About</Link> */}
                            
                        </div>
                        
                        }
                       
                    </div>
                 </div>
            </div>
    )
  } 
}

// export default Login;
// export default connect(null,{ updateUser })(Login);
export default withRouter(connect(null,{ updateUser })(Login));

