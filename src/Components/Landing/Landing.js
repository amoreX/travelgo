//Landing page upon visiting the site

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {Suggestion} from "./getSuggestions";
import { motion } from "framer-motion";
import { search_icon } from "./vars";
import "./Landing.scss";

export default function Landing() {
  const shift = useNavigate();
  const [cityList,setCityList]=useState(["Mumbai", "Kolkata", "Goa"]);
  const [search, setSearch] = useState("");

  const changePage=(input)=>{
    //update city name in useContext here
    console.log(input);
    setTimeout(()=>{
      shift("/content");
    },2000);
  };

  useEffect(() => {
    // console.log(search.length);
    if (search.length<2){
      setCityList(["Mumbai","Kolkata","Goa"]);
    }
    else{
      const newSugg=async()=>{
        let newSuggestions=await  Suggestion(search);
        console.log(newSuggestions);
        newSuggestions=newSuggestions.split(",");
        setCityList(newSuggestions);
      };
      newSugg();
    }
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
          onClick={()=>changePage(search)}
        >
          {search_icon}
        </motion.div>
      </motion.div>
      <div id="suggestions">
        {cityList.map((city, index) => {
          return (
            <motion.div id="city" key={index} onClick={() => {changePage(city);}}
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
