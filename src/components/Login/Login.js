import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    if (
      name &&
      name.trim().length > 0 &&
      password &&
      password.trim().length > 0
    ) {
      history.push('/users');
      localStorage.setItem('user_name', name);
    } else {
      setError(`name and password are required`);
    }
  };

  return (
    <div className='login_wrapper'>
      <div className='login_form'>
        <div className='field'>
          <label>Username :</label>
          <input value={name} onChange={nameHandler} name='name' />
        </div>
        <div className='field'>
          <label>Password :</label>
          <input
            type='password'
            value={password}
            onChange={passwordHandler}
            name='password'
          />
        </div>
        <div className='err'>{error}</div>
        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
};

export default Login;
