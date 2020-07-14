import buildClient from '../api/buildClient'

const FrontPage = ({ currentUser }) => {
  console.log('Current user:', currentUser);
  return <h1>home</h1>
};

FrontPage.getInitialProps = async (context) => {
  const client = buildClient(context)

  const { data } = await client.get('/api/users/currentuser')

  return data;
};

export default FrontPage;
