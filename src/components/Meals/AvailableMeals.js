import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [httperror, sethttperror] = useState();
  useEffect(() => {
    const fetchmeals = async () => {
      const response = await fetch(
        "https://food-order-app-dda73-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("somthing went wrong");
      }
      const responsedata = await response.json();

      const loadedmeals = [];

      for (const key in responsedata) {
        loadedmeals.push({
          id: key,
          name: responsedata[key].name,
          description: responsedata[key].description,
          price: responsedata[key].price,
        });
      }
      setmeals(loadedmeals);
    };
    fetchmeals().catch((error) => {
      sethttperror(error.message);
      setisloading(false);
    });
    setisloading(false);
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
