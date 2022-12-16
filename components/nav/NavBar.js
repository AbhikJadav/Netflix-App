import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import NetflixLogo from "../../public/static/netflix.svg";

import ExpandMore from "../../public/static/expand_more.svg";

const NavBar = ({ userName }) => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  const handleShowDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
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
              <p className={styles.username}>
                {userName}
                <Image
                  src={ExpandMore}
                  alt="Expand DropDown"
                  width={24}
                  height={24}
                />
              </p>
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" className={styles.linkName}>
                    Sign out
                  </Link>

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
