import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import skyline from '../../assets/shanghai.jpg';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../redux/reducer';


class Dashboard extends Component {
    logout() {
        axios.post('/api/logout').then(() => {
          let username = '';
          let userId = 0;
          this.props.updateUser(username, userId);
        });
        this.props.history.push('/')
      }
    

    render() {
        console.log(this.props)
        
    return (
      <div className="Dashboard">
            Dashboard
            {this.props.username}
            <button onClick={()=> this.logout()}>Logout</button>
            <Link to="/Login">Login</Link>
        </div>
    )
  } 
}


const mapStateToProps = state => {
  const { username } = state
  return {
      username
  }
}


export default connect(mapStateToProps,{updateUser})(Dashboard);
