import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import NetflixLogo from "../public/static/netflix.svg";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import ButtonLoader from "../components/ButtonLoader/ButtonLoader";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };
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

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      if (email === "abhik.jadav002@gmail.com") {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            router.push("/");
          }
        } catch {
          console.error("Something went wrong logging in", error);
        }
      } else {
        setIsLoading(false);
        setUserMsg("something went wrong logging in");
      }
    } else {
      setUserMsg("Enter a valid Email Address");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src={NetflixLogo}
                width={128}
                height={34}
                alt="netflix logo"
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? (
              <>
                <ButtonLoader />
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
