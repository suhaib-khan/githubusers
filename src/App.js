import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import AddUser from './components/Users/AddUser';
import List from './components/Users/List';
import UserDetails from './components/Users/UserDetails';
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/users/:username' component={UserDetails} />
        <Route path='/users' component={List} />
        <Route path='/add-user' component={AddUser} />
      </Switch>
    </div>
  );
}

export default App;
