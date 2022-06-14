import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
import { wrapper, store } from "../src/store/store";
import { GlobalLayout } from "../src/components";
import "../src/styles/index.css";
import { FormattedMessage, IntlProvider } from "react-intl";
import it from "../lang/it.json";
import en from "../lang/en.json";
import { UserProvider } from "@auth0/nextjs-auth0";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [languageSelected, setLanguageSelected] = 
  useState(router.locale);
  const { language } = useSelector((state) => state.userData);

  const messages = {
    it,
    en,
  };

  useEffect(() => {
    const l = language === "" ? router.locale : language;
    setLanguageSelected(l);
  }, [language]);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={languageSelected}
        messages={messages[languageSelected]}
      >
        <UserProvider>
          <GlobalLayout>
            <Component {...pageProps} />
          </GlobalLayout>
        </UserProvider>
      </IntlProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
