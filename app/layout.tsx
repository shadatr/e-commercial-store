"use client";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import Header from "./components/header";
import Footer from "./components/footer";
import Head from "next/head";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <Head>
        <script src="https://pay.google.com/gp/p/js/pay.js"></script>
      </Head>
      <body>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={2000} rtl={true} />
      </body>
    </html>
  );
};
