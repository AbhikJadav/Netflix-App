import React from "react";
import styles from "./Banner.module.css";
import Image from "next/image";
import PlayArrowIcon from "../../public/static/play_arrow.svg";
const Banner = ({ title, subTitle, imgUrl }) => {
  console.log("imgUrl", imgUrl);
  const handleOnPlay = () => {
    console.log("handle play button");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src={PlayArrowIcon}
                alt="Play icon"
                width="32px"
                height="32px"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
        }}
      >
        {/*<Image src={imgUrl} alt={"bgpic"}/>*/}
      </div>
    </div>
  );
};

export default Banner;
