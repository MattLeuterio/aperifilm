import { GlobalLayout } from '../src/components';
import '../src/styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  return (
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
  )
}

export default MyApp;
