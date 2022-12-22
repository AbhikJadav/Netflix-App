import React from "react";
import Card from "./Card";
import styles from "./SectionCard.module.css";
import Link from "next/link";

const SectionCard = ({ title, videos, size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((element, index) => {
          return (
            <Link href={`/video/${element.id}`}>
              <Card
                imgUrl={element.imgUrl}
                size={size}
                alt="image"
                id={index}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
