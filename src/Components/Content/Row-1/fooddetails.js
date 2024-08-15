
import{useState,useEffect} from "react";
import { FoodTry } from "../../Utils/foodtry";
import { Details } from "../../Utils/fooddesc";
import { GettingPictures } from "../../Utils/gettingpictures";

export default function Food({ city }) {
    const[foods,setFoods]=useState(null);
    const[foodDetails,setFoodDetails]=useState(null);
    const [error, setError] = useState(null); // Add state to store error

  useEffect(() => {
    const gettingFoods = async () => {
      try {
        setTimeout(async()=>{
          let q = await FoodTry(city);
          setFoods(q.split(","));
        },10000);
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
          console.error("Error fetching food details:", err); // Log the error for debugging
        }
      };

      getFoodandDetails();
    }
  }, [foods]);


    useEffect(()=>{
      console.log(foodDetails);
    },[foodDetails]);
    return (
      <div id="foodtotry">
        <div id="content-foods">
        {foodDetails !=null?
          foodDetails.map((placeObj, ind) => {
            const { name, description,picUrl } = placeObj; 
            return (
              <div id="foo" key={ind}>
                <img src={picUrl} alt="loading..."/>
                <div id="cook-food">
                <div id="name" style={{fontSize:"20px"}}>{name}</div>
                <div id="desc" style={{color:"grey",fontSize:"16px"}} >{description.substring(0,60)} {(description.length > 70 ? "..." : null)}</div>

                </div>
              </div>
              

              
            );
          })
        :
        <div>loading...</div>
        }
        </div>

        <div id="title">food to try</div>

      </div>
    );
  }
  