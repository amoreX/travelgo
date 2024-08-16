import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Etiq } from "../../Utils/getetiq";
export default function Things({ city }) {
  const loading = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
        stroke="#204629"
        strokeWidth="3.55556"
        strokeLinecap="round"
      />
    </svg>
  );

  const [etiq, setEtiq] = useState(null);

  useEffect(() => {
    const gettingEtiq = async () => {
      let g = await Etiq(city);
      setEtiq(g.split(","));
    };
    gettingEtiq();
  }, []);

  useEffect(() => {
    // console.log(etiq);
  }, [etiq]);

  return (
    <div id="things-container">
      <div id="content-things">
        {etiq && (
          <div id="things">
            {etiq.map((each, ind) => {
              return (
                <div id="each-thing">
                  {ind <= 6 ? (
                    <>
                      <motion.span style={{marginLeft:"20px",marginTop:"2px"}}
                      initial={{x:-20,opacity:0}}
                      transition={{type:"tween",delay:0.4+ind*0.1,duration:0.38}}
                      animate={{x:0,opacity:1}}
                      >{each}</motion.span>
                      <motion.div id="bar" 
                      initial={{width:"5%",opacity:0}}
                      transition={{type:"tween",delay:0.4+ind*0.1,duration:0.38}}
                      animate={{width:"100%",opacity:1}}
                      ></motion.div>
                    </>
                  ) : null}
                </div>
              );
            })}{" "}
          </div>
        )}

        {!etiq && <div id="loading">{loading}</div>}
      </div>
      <div id="title" style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px" }}>things to carry</div>
    </div>
  );
}
