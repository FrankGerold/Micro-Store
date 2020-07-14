import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/useRequest'

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupRequest, formErrors] = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault()

    signupRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      {formErrors}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
