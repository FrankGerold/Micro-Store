import { useEffect } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/useRequest';

export default () => {
  const [signoutRequest, err] = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    signoutRequest();
  }, []);

  return <div>Signing Out.....</div>
};
