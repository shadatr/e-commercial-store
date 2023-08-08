"use client";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import LoginHeader from "../components/loginHeader";
import Footer from "../components/footer";

export default function LoginLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body>
        <LoginHeader />
        <SessionProvider session={session}>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
