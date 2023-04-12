/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { decodeServerOptions, encodeCredential } from "../util/encoding";

import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";

const login = () => {
  console.log("login started");
};

const register = async () => {
  // Demo data for creating user
  const data = {
    displayName: "a m",
    name: "admin",
  };

  let response: Response;

  let responseJson: PublicKeyCredentialCreationOptions =
    {} as PublicKeyCredentialCreationOptions;
  try {
    // get challenge from server
    response = await fetch("http://localhost:8080/q/webauthn/register", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "same-origin",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    responseJson = await response.json();

    console.log(responseJson);
    
  } catch (err) {
    console.log(err);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const credentialCreationOptions: PublicKeyCredentialCreationOptions =
    decodeServerOptions(responseJson);

  const credential = await navigator.credentials.create({
    publicKey: {
      ...credentialCreationOptions,
    },
  });
  console.log(credential);

  const encodedCredential = encodeCredential(credential);
  console.log(encodedCredential);
  
  // Send the encoded credential to the backend for storage
  await fetch("http://localhost:8080/q/webauthn/callback", {
    method: "POST",
    body: JSON.stringify(encodedCredential),
    mode: "cors",
    credentials: "same-origin",
  });
};

const checkWebAuthnSupport = (
  setWebAuthnSupport: Dispatch<SetStateAction<boolean>>
) => {
  if (!browserSupportsWebAuthn()) {
    console.log("It seems this browser does not support WebAuthn...");
    alert("It seems this browser does not support WebAuthn...");
    return;
  }
  setWebAuthnSupport(true);
  console.log("Supports WebAuthn!");
};

const Home: NextPage = () => {
  const [webAuthnSupport, setWebAuthnSupport] = useState(false);

  useEffect(() => {
    checkWebAuthnSupport(setWebAuthnSupport);
  }, []);

  return (
    <>
      <Head>
        <title>WebAuthn Demo</title>
        <meta name="description" content="A simple demonstration of WebAuthn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full flex-col p-12">
        <div className="prose flex min-w-full items-center justify-center">
          <h1
            className={`justify-self-center ${
              webAuthnSupport ? "text-lime-500" : "text-orange-600"
            }`}
          >
            WebAuthn Demo
          </h1>
        </div>
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <button
            className="btn w-1/6"
            onClick={() => login()}
            disabled={!webAuthnSupport}
          >
            Login
          </button>
          <button
            className="btn w-1/6"
            onClick={async () => {
              await register();
            }}
            disabled={!webAuthnSupport}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
