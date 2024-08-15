
import{useState,useEffect} from "react";
import { FoodTry } from "../../Utils/foodtry";
import { Details } from "../../Utils/fooddesc";
import { GettingPictures } from "../../Utils/gettingpictures";

export default function Food({ city }) {
    const [food, setFoods] = useState(null);
    const [details,setDetails]=useState(null);
    useEffect(() => {
      const gettingFood = async () => {
        let p = await FoodTry(city); //
        setFoods(p.split(","));
      };
      gettingFood();
    }, []);
  
    useEffect(() => {
      if (food) {
          const getFoodandDetails = async () => {
              let foodList = await FoodTry(city);
              foodList = foodList.split(",");
        
              const promises = foodList.map(async (place) => {
                const description = await Details(place);
                const pictureUrl = await GettingPictures(place);
                return { name: place, description, pictureUrl }; // Combine data
              });
        
              const updatedPlaces = await Promise.all(promises);
              setDetails(updatedPlaces);
            };
        
            getFoodandDetails();
  
      }
    }, [food]);
    return (
      <div id="foodtotry">
        <div id="content-food">
        {details !=null?
            details.map((placeObj, ind) => {
              const { name, description,pictureUrl } = placeObj; 
              return (
                <div id="khana" key={ind}>
                  <img src={pictureUrl} alt="loading..."/>
                  <div id="cook-food">
                  <div id="name-food" style={{fontSize:"20px"}}>{name}</div>
                  <div id="desc-food" style={{color:"grey",fontSize:"16px"}} >{description.substring(0,64)} {(description.length > 70 ? "..." : null)}</div>
  
                  </div>
                </div>
              );
            })
          :
          <div>loading...</div>
          }
        </div>
        <div id="title">places to visit</div>
      </div>
    );
  }
  