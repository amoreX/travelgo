import { useState, useEffect } from "react";
import { FoodTry } from "../../Utils/foodtry";
import { Details } from "../../Utils/fooddesc";
import { motion } from "framer-motion";
import { GettingPictures } from "../../Utils/gettingpictures";

export default function Food({ city }) {
  const [foods, setFoods] = useState(null);
  const [foodDetails, setFoodDetails] = useState(null);
  const [error, setError] = useState(null); // Add state to store error

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

  useEffect(() => {
    const gettingFoods = async () => {
      try {
        setTimeout(async () => {
          let q = await FoodTry(city);
          setFoods(q.split(","));
        }, 10000);
      } catch (err) {
        setError(err); // Store the error if it occurs
        console.error("Error fetching food options:", err); // Log the error for debugging
      }
    };

    gettingFoods();
  }, [city]);

  useEffect(() => {
    if (foods) {
      const getFoodandDetails = async () => {
        try {
          const promises = foods.map(async (food) => {
            const description = await Details(food);
            const picUrl = await GettingPictures(food);
            return { name: food, description, picUrl };
          });

          const updatedDetails = await Promise.all(promises);
          setFoodDetails(updatedDetails);
        } catch (err) {
          setError(err); // Store the error if it occurs
          // console.error("Error fetching food details:", err); // Log the error for debugging
        }
      };

      getFoodandDetails();
    }
  }, [foods]);

  useEffect(() => {
    console.log(foodDetails);
  }, [foodDetails]);
  return (
    <div id="foodtotry">
      <div id="content-foods">
        {foodDetails != null ? (
          foodDetails.map((placeObj, ind) => {
            const { name, description, picUrl } = placeObj;
            return (
              <div id="foo" key={ind}>
                <motion.img
                  src={picUrl}
                  alt="loading..."
                  initial={{ scale: 0.1, opacity: 0 }}
                  transition={{
                    type: "tween",
                    delay: 0.2+ind * 0.1,
                    duration: 0.28,
                  }}
                  animate={{ scale: 1, opacity: 1 }}
                />
                <motion.div id="cook-food" 
                initial={{y:20,opacity:0}}
                transition={{type:"tween",delay:0.4+ind*0.1,duration:0.28}}
                animate={{y:0,opacity:1}}
                >
                  <div id="name" style={{ fontSize: "20px" }}>
                    {name}
                  </div>
                  <div id="desc" style={{ color: "grey", fontSize: "16px" }}>
                    {description.substring(0, 60)}
                    {description.length > 70 ? "..." : null}
                  </div>
                </motion.div>
              </div>
            );
          })
        ) : (
          <div id="loading">{loading}</div>
        )}
      </div>

      <div
        id="title"
        style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px" }}
      >
        food to try
      </div>
    </div>
  );
}
