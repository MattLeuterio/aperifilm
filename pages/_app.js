import { useEffect } from "react";
import { GlobalLayout } from "../src/components";
import it from '../lang/it.json';
import en from '../lang/en.json';
import "../src/styles/index.css";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const messages = {
    it,
    en
  }
  return (
    <IntlProvider locale={router.locale} messages={messages[router.locale]}>
      <GlobalLayout>
        <FormattedMessage defaultMessage="test2" id="test"/>
        <Component {...pageProps} />
      </GlobalLayout>
    </IntlProvider>
  );
};

export default MyApp;
