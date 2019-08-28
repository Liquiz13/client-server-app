import React from 'react';
import Header from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/Sign/SignIn';
import Users from './components/Users/Users';
import User from './components/User/User';
import SignUp from './components/Sign/Signup';
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends';
import Chat from './components/Chat/Chat';
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <ProtectedRoute path='/profile' component={Profile} />
          <ProtectedRoute path='/friends' component={Friends} />
          <ProtectedRoute path='/chat' component={Chat} />
          <ProtectedRoute path='/users' component={Users} />
          <Route path='/:user_id' component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
