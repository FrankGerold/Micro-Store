import axios from 'axios';
import { useState} from 'react';

export default ({ url, method, body }) => {
  // Method === 'post', 'get', etc
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null)

      const response = await axios[method](url, body);

      return response.data;
    }

    catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Problem:</h4>
          <ul className="my-0">
            {error.response.data.errors.map(error => <li key={error.message}>{error.message}</li>)}
          </ul>
        </div>
      )
    };
  }

  return [doRequest, errors];
}
