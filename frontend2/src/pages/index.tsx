import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const login = () => {
  console.log("login started");
  
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col p-12 h-full">
        <div className="prose flex min-w-full items-center justify-center">
          <h1 className="justify-self-center">WebAuthn Demo</h1>
        </div>
        <div className="flex h-full items-center justify-center flex-col space-y-4">
          <button className="btn w-1/6" onClick={() => login()}>Login</button>
          <button className="btn w-1/6">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Home;
