import buildClient from '../api/buildClient'

const FrontPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in, {currentUser.email}!</h1> : <h1>You are not signed in...</h1>
};

FrontPage.getInitialProps = async context => {
  const client = buildClient(context)

  const { data } = await client.get('/api/users/currentuser')
  return data;
};

export default FrontPage;
