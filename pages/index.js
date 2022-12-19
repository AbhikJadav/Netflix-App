import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Banner from "../components/Banner/Banner";
import DogPics from "../public/static/clifford.png";
import NavBar from "../components/nav/NavBar";
import Card from "../components/Card/Card";
import SectionCard from "../components/Card/SectionCard";
import { getVideos } from "../lib/videos";

export default function Home() {
  console.log("getVideos:", getVideos());
  const disneyVideos = getVideos();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName={"test@gmail.com"} />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCard title={"Disney"} videos={disneyVideos} size={"large"} />
        <SectionCard title={"Disney"} videos={disneyVideos} size={"medium"} />
      </div>
    </div>
  );
}
