import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataFromLogin, setUserLanguage } from "../src/store/actions/userDataAction";
import Logo from '../src/assets/images/logo-aperifilm.svg';
import Logo2 from '../src/assets/icons/aperitif-bottle-full.png';
import { HeartIcon } from '@heroicons/react/outline';
import { Icon, Image } from "../src/atoms";
import { HomeContainer } from "../src/styles/Pages/style";


//export async function getServerSideProps() {}

export default function Home({}) {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLanguage('it'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDataFromLogin(user));
  }, [user]);

  return (
    <HomeContainer>
      <Head>
        <title>Home | Aperifilm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <FormattedMessage defaultMessage="test2" id="test2" />
        </div>

        <Image 
          src={Logo.src} 
          width="100px"
          layout="fixed" 
        />
      </div>
      {user ? (
        <div>
          <Image 
            src={user?.picture} 
            width="50px"
            layout="fixed" 
          />
            <Icon 
            size="40px"
            stroke="#983295"
            >
              <HeartIcon />
            </Icon>
            Welcome {user?.name}! 

            <div>
              <a href="/api/auth/logout">Logout</a>
            </div>
            <div>
          {user && Object.entries(user).map(([key, value], i) => (
              <p key={i}>{i + 1} - {key}: {value}</p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <a href="/api/auth/login">Login</a>
        </div>
      )}
    </HomeContainer>
  );
}
