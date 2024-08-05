//Landing page upon visiting the site

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Landing.scss";

export default function Landing() {
  const search_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <defs>
        <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgba(41, 151, 185, 0.6)" }} />
          <stop offset="33%" style={{ stopColor: "rgba(58, 101, 184, 0.6)" }} />
          <stop offset="67%" style={{ stopColor: "rgba(191, 61, 162, 0.6)" }} />
          <stop
            offset="100%"
            style={{ stopColor: "rgba(212, 73, 115, 0.6)" }}
          />
        </linearGradient>
      </defs>

      <path
        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="url(#gradientStroke)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const City_list = ["Mumbai", "Kolkata", "Goa"];
  const [search, setSearch] = useState("");
  const navcity = (input) => {
    console.log(input); // update city to be searched here
  };

  useEffect(() => {
    console.log(search);
  }, [search]);
  return (
    <motion.div
      id="main-container"
      initial={{ opacity: 0 }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
        delay: 0.5,
      }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        id="search-container"
        initial={{ opacity: 0 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.3,
          delay: 1,
        }}
        animate={{ opacity: 1 }}
      >
        <motion.input
          initial={{ width: "0px" }}
          transition={{ type: "tween", ease: "easeInOut", delay: 1.5 }}
          animate={{ width: "64vw" }}
          id="input-field"
          type="text"
          placeholder="try bengaluru..."
          onChange={(e) => setSearch(e.target.value)}
        ></motion.input>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ type: "tween", ease: "easeInOut", delay: 1.5 }}
          animate={{ opacity: 1 }}
        >
          {search_icon}
        </motion.div>
      </motion.div>
      <div id="suggestions">
        {City_list.map((city, index) => {
          return (
            <motion.div id="city" key={index} onClick={() => navcity(city)}
            initial={{y:20,opacity:0}}
            transition={{type:"tween",delay:1.5+index*0.1}}
            animate={{y:0,opacity:1}}
            >
              {city}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
