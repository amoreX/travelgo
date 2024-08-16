import { useState, useEffect } from "react";
import { FoodTry } from "../../Utils/foodtry";
import { Details } from "../../Utils/fooddesc";
import { motion } from "framer-motion";
import { GettingPicturesFood } from "../../Utils/gettingpicturesfood";
export default function Food({ city ,changeD}) {
  const [foods, setFoods] = useState(null);
  const [foodDetails, setFoodDetails] = useState(null);

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
      setTimeout(async () => {
        let q = await FoodTry(city);
        setFoods(q.split(","));
      }, 100);
    };

    gettingFoods();
  }, [city]);

  useEffect(() => {
    if (foods) {
      const getFoodandDetails = async () => {
        const promises = foods.map(async (food) => {
          const description = await Details(food);
          const picUrl = await GettingPicturesFood(food);
          return { name: food, description,picUrl };
        });

        const updatedDetails = await Promise.all(promises);
        setFoodDetails(updatedDetails);
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
                {picUrl && ( // Conditionally render image if available
                  <motion.img
                    src={picUrl}
                    alt="loading..."
                    initial={{ scale: 0.1, opacity: 0 }}
                    transition={{
                      type: "tween",
                      delay: 0.2 + ind * 0.1,
                      duration: 0.28,
                    }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={()=>changeD(name,description)}
                  />
                )}
                <motion.div
                  id="cook-food"
                  initial={{ y: 20, opacity: 0 }}
                  transition={{
                    type: "tween",
                    delay: 0.4 + ind * 0.1,
                    duration: 0.28,
                  }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <div id="name" style={{ fontSize: "20px" }}>
                    {name.toLowerCase().substring(0,19)}
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
        style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px",letterSpacing:"-1px" }}
      >
        food to try
      </div>
    </div>
  );
}
