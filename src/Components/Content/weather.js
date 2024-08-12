import { motion } from "framer-motion";
import { useState } from "react";
export default function Weather({toggle}) {
  const[transition,setTransition]=useState(true);
  return (
    <motion.div id="weather-container" onClick={()=>{toggle();setTransition(!transition)}}
    initial={{scale:0.1,opacity:0}}
    transition={{type:"tween",delay:0.38,duration:0.38}}
    animate={{scale:transition===true?1:0.1,opacity:transition===true?1:0}}
    >
      ok
    </motion.div>
  );
}
