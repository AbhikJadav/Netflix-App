import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import NetflixLogo from "../../public/static/netflix.svg";

import ExpandMore from "../../public/static/expand_more.svg";
import ExpandLess from "../../public/static/expand_less.svg";
import { magic } from "../../lib/magic-client";

const NavBar = () => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const [userName, setUserName] = useState("");
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const getEmailHandler = async () => {
    try {
      const { email, publicAddress } = await magic.user.getMetadata();
      if (email) {
        setUserName(email);
      }
    } catch (error) {
      // Handle errors if required!
      console.error("Error retrieving email", error);
    }
  };
  useEffect(() => {
    getEmailHandler();
  }, []);

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  const handleShowDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();

      console.log(await magic.user.isLoggedIn()); // => `false`
      router.push("/login");
    } catch (error) {
      // Handle errors if required!
      console.error("Error logging out", error);
      router.push("/login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image src={NetflixLogo} width={128} height={34} />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropDown}>
              <p className={styles.username}>{userName}</p>
              {!showDropDown ? (
                <Image
                  src={ExpandMore}
                  alt="Expand DropDown"
                  width={24}
                  height={24}
                  style={{ transition: "0.5s ease" }}
                />
              ) : (
                <Image
                  src={ExpandLess}
                  alt="Expand DropDown"
                  width={24}
                  height={24}
                  style={{ transition: "0.5s ease" }}
                />
              )}
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
