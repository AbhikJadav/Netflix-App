import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Banner from "../components/Banner/Banner";
import DogPics from "../public/static/clifford.png";
import NavBar from "../components/nav/NavBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName={"test"} />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.png"
      />
    </div>
  );
}
