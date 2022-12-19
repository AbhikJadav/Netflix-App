import React, { useState } from "react";
import Image from "next/image";
import style from "./Card.module.css";
import cls from "classnames";
import { motion } from "framer-motion";

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  size,
  id,
}) => {
  const classMap = {
    small: style.smItem,
    medium: style.mdItem,
    large: style.lgItem,
  };
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleOnError = () => {
    console.log("hi error;");
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    );
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <div className={style.container}>
      <motion.div
        className={cls(style.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={handleOnError}
          className={style.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
