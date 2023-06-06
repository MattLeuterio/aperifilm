/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider, useSelector } from "react-redux";
import { wrapper, store } from "../src/store/store";
import { GlobalLayout } from "../src/components";
import { ThemeProvider } from 'styled-components';
import "../src/styles/index.css";
import { IntlProvider } from "react-intl";
import it from "../lang/it.json";
import en from "../lang/en.json";
import { UserProvider } from "@auth0/nextjs-auth0";
import theme from "../src/theme";

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default wrapper.withRedux(MyApp);
