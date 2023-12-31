/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import React from "react";


export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <ToastContainer position="bottom-right" autoClose={2000} rtl={true} />
      </body>
    </html>
  );
}
