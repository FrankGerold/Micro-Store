import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/buildClient';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <Header currentUser={currentUser} />
    <Component {...pageProps} />
  </div>
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  console.log('ctx', appContext.ctx);

  const { data } = await client.get('/api/users/currentuser');
  console.log('App data:', data);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  };
  console.log('Page props:', pageProps);

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
