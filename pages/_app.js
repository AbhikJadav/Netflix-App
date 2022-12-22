import "../styles/globals.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import Loader from "../components/Loader/Loader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  const loginHandler = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    loginHandler();
  }, []);

  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
