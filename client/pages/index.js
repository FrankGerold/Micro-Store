import axios from 'axios';

const FrontPage = ({ currentUser }) => {
  console.log('Current user:', currentUser);
  return <h1>home</h1>
};

FrontPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // Means we're on server
    const { data } = await axios.get('http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser', {
      headers: req.headers
    });

    return data;
  }
  else {
    // Means we're in browser
    const { data } = await axios.get('/api/users/currentuser')

    return data;
  }
  return {};
}

export default FrontPage;
