import React, { useState } from "react";
import { useFoodContext } from "../hooks/useFoodContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

function FoodDetalis({ datum }) {
  const { dispatch } = useFoodContext();
  const { user } = useAuthContext();

  const [deleteMessage, setdeleteMessage] = useState("");
  const [error, setError] = useState("");
  const handleDelete = async () => {
    if (!user) {
      setError("You Must be login to delete foods");
      return;
    }
    const response = await fetch("/api/food/" + datum._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_FOOD", payload: json });
      setdeleteMessage("Food Deleted Successfully!");
    }
    if (!response.ok) {
      setError("Somthing went wrong!");
    }
    // console.log("delete is clicked", datum._id);
  };
  return (
    <>
      {error && <div className="errorContainer">{error}</div>}
      {deleteMessage && <div className="messageContainer">{deleteMessage}</div>}

      {user && (
        <div className="foodContainer" key={datum._id}>
          <div className="ffff">
            <div className="image">
              <img
                src={
                  datum.imgUrl
                    ? datum.imgUrl
                    : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="food"
              />
            </div>
            <div className="namePrice">
              <h2>{datum.foodName}</h2>
              <p>Price ₹{datum.price}</p>
            </div>
            <p>{datum.desc}</p>
            <div className="addDel">
              <p className="address">{datum.address}</p>
              <span onClick={handleDelete}>Delete</span>
            </div>
            <div className="dateTime">
              {formatDistanceToNow(new Date(datum.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodDetalis;
