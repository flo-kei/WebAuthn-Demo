import React, { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>WebAuthn Demo</title>
      </Head>
      <main className="mx-2 flex h-screen flex-col">
        <div className="mb-2 h-full">{children}</div>
      </main>
    </>
  );
};

export default Layout;