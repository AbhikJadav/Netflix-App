import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Banner from "../components/Banner/Banner";
import DogPics from "../public/static/clifford.png";
import NavBar from "../components/nav/NavBar";
import SectionCard from "../components/Card/SectionCard";
import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disneytrailer");
  const travelVideos = await getVideos("travel");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  console.log({ disneyVideos });
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName={"test@gmail.com"} />
      <div className={styles.main}>
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title={"Disney"} videos={disneyVideos} size={"large"} />
          <SectionCard title={"Travel"} videos={travelVideos} size={"medium"} />
          <SectionCard
            title={"Productivity"}
            videos={productivityVideos}
            size={"medium"}
          />
          <SectionCard
            title={"Popular"}
            videos={popularVideos}
            size={"small"}
          />
        </div>
      </div>
    </div>
  );
}
