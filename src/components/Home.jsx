import React, { useEffect } from "react";
import Form from "./form";
import { useFoodContext } from "../hooks/useFoodContext";
import FoodDetalis from "./foodDetalis";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { foods, dispatch } = useFoodContext();
  const { user } = useAuthContext();
  // console.log(foods);
  const fetchData = async () => {
    const response = await fetch("/api/food", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_FOOD", payload: json });
      // console.log(json);
    }
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  return (
    <>
      <div className="container outerFoodContainer">
        <div className="foodLeft">
          {foods?.map((datum) => (
            <FoodDetalis key={datum._id} datum={datum} />
          ))}
        </div>

        <div className="foodRight">
          <Form />
        </div>
      </div>
    </>
  );
}
export default Home;
