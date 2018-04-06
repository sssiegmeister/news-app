import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import InputLabel from 'material-ui/Input';
import { connect } from 'react-redux';
import {
  login,
} from '../../redux/actions/user';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser && !newProps.errorFetchingCurrentUser) {
      this.props.history.replace('/main');
    }
  }

  handleChange(event) {
    const { id, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [id]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    // const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      axios.post(
        '/api/users/register',
        {
          first: user.firstName,
          last: user.lastName,
          email: user.email,
          password: user.password,
        },
      ).then(() => {
        this.props.login(user);
        this.props.history.push('/main');
      });
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div style={{width: '60%', margin: '0 auto'}}>
        <h1>Register</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <TextField
            id="firstName"
            label="First name"
            autoComplete="off"
            fullWidth
            onChange={this.handleChange}
          />
          {submitted && !user.firstName ?
            <div className="help-block">First Name is required</div> :
            <div className="help-block" />
          }
          <br />
          <br />
          <TextField
            id="lastName"
            label="Last name"
            autoComplete="off"
            fullWidth
            onChange={this.handleChange}
          />
          {submitted && !user.lastName ?
            <div className="help-block">Last Name is required</div> :
            <div className="help-block" />
          }
          <br />
          <br />
          <TextField
            id="email"
            label="Email"
            autoComplete="off"
            fullWidth
            onChange={this.handleChange}
          />
          {submitted && !user.email ?
            <div className="help-block">Email is required</div> :
            <div className="help-block" />
          }
          <br />
          <br />
          <TextField
            id="password"
            label="Password"
            autoComplete="off"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
          {submitted && !user.password ?
            <div className="help-block">Password is required</div> :
            <div className="help-block" />
          }
          <br />
          <br />
          <TextField
            id="verify password"
            label="Verify Password"
            autoComplete="off"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSubmit}
          >
            Register
          </Button>
          <Button
            variant="raised"
            color="secondary"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, isFetchingCurrentUser, errorFetchingCurrentUser } = state;
  return {
    currentUser,
    isFetchingCurrentUser,
    errorFetchingCurrentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (user) => {
      dispatch(login(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
