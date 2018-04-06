import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  login,
} from '../../redux/actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      submitted: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser && !newProps.errorFetchingCurrentUser) {
      this.props.history.replace('/main');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (!user.email || !user.password) {
      alert('Email and password are required!');
    } else {
      this.props.login(user);
    }
  }

  handleChangeUsername(event) {
    const email = event.target.value;
    this.setState(prevState => (
      {
        user: { ...prevState.user, email },
      }
    ));
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState(prevState => (
      {
        user: { ...prevState.user, password },
      }
    ));
  }

  render() {
    return (
      <div>
        <div style={{width: '60%', margin: '0 auto'}}>

          <h1>Login Page</h1>
          <form>
            <TextField
              id="email"
              label="Email"
              autoComplete="off"
              value={this.state.user.email}
              fullWidth
              onChange={this.handleChangeUsername.bind(this)}
              margin="normal" />
            <br />
            <TextField
              id="password"
              label="Password"
              autoComplete="off"
              type="password"
              value={this.state.user.password}
              fullWidth
              onChange={this.handleChangePassword.bind(this)}
              margin="normal" />
            <br />
            <Button
              class="btn btn-primary btn-block"
              onClick={this.handleSubmit.bind(this)}>
              Login
            </Button>
            <br />
            <Button
              class="btn btn-success btn-block"
              onClick={() => {
                console.log('Going to sign up');
                this.props.history.push('/signup');
              }}
            >
              Signup
            </Button>
            <br />
          </form>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
