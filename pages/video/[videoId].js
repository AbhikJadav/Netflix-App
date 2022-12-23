import React from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";
import { getYouTubeVideoById } from "../../lib/videos";
Modal.setAppElement("#__next");
export async function getStaticProps(context) {
  // const video = {
  //   title: "Hi cute dog",
  //   publishTime: "1990-01-01",
  //   description:
  //     "A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger?A big red dog that is super cute,can he get any bigger? ",
  //   channelTitle: "Paramount Pictures",
  //   viewCount: 10000,
  // };
  const videoId = "4zH5iYM4wJo";
  const videoArray = await getYouTubeVideoById(videoId);
  return {
    props: { video: videoArray.length > 0 ? videoArray[0] : {} },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const listOfVideo = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideo.map((videoId) => ({
    params: {
      videoId,
    },
  }));

  return { paths, fallback: "blocking" };
}
const Video = ({ video }) => {
  const router = useRouter();

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount },
  } = video;
  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        onRequestClose={() => {
          router.back();
        }}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Watch the Video"
      >
        <iframe
          id="player"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        >
          {" "}
        </iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast:</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count:</span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
