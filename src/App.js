import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utility/theme';
import JwtDecode from 'jwt-decode';
// Pages
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/navbar';
import AuthRoute from './utility/authRoute';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = JwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
      return (
        <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <div className="App">
            <Router>
              <Navbar />
              <div className='container'>
              
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={SignUp} />
                </Switch>
              </div>

            </Router>
          </div>
        </Provider>
        </MuiThemeProvider>
      );
    }
}

export default App;
