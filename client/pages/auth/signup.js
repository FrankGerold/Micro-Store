import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async event => {
    event.preventDefault();

    try {
      console.log('Email:', email, 'Password:', password);
      const response = await axios.post('/api/users/signup', {
        email,
        password
      });

      console.log(response.data);
    }
    catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    };
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

      {errors.length > 0 &&
        <div className="alert alert-danger">
          <h4>Problem:</h4>
          <ul className="my-0">
            {errors.map(error => <li key={error.message} >{error.message}</li>)}
          </ul>
        </div>
      }

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
