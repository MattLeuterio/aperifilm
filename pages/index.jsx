import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import Logo from '../src/assets/images/logo-aperifilm.svg';
import { Image } from "../src/atoms";
import { HomeContainer } from "../src/styles/Pages/style";


//export async function getServerSideProps() {}

export default function Home({}) {
  const user = useSelector((state) => state.userData);
  return (
    <HomeContainer>
      <Head>
        <title>Home | Aperifilm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div>
          <FormattedMessage defaultMessage="languageName" id="languageName" />
        </div>

        <Image 
          src={Logo.src} 
          width="100px"
          layout="fixed" 
        />
      </div>
      {user?.email ? (
        <div>
          {user && Object.entries(user).map(([key, value], i) => (
              <p key={i}>{i + 1} - {key}: {value}</p>
            ))}
        </div>
      ) : (
        <div>
          <a href="/api/auth/login">Login</a>
        </div>
      )}
    </HomeContainer>
  );
}
