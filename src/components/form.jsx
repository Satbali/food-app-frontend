import React, { useState } from "react";
import { useFoodContext } from "../hooks/useFoodContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Form() {
  const { dispatch } = useFoodContext();
  const [foodName, setFoodName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You Must be login to create foods");
      return;
    }

    try {
      const food = { foodName, imgUrl, desc, price, address };
      const response = await fetch("/api/food", {
        method: "POST",
        body: JSON.stringify(food),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError("somthing went wrong");
        setEmptyFields(json.emptyFields);
      }
      if (response.ok) {
        setFoodName("");
        setImgUrl("");
        setDesc("");
        setPrice("");
        setAddress("");
        dispatch({ type: "CREATE_FOOD", payload: json });
        setMessage("Food added");
        setEmptyFields([]);
        // console.log(json);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="container allForm">
        <div className="formContainer">
          <label htmlFor="foodname">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className={emptyFields?.includes("foodName") ? "error" : ""}
          />
        </div>

        <div className="formContainer">
          <label htmlFor="imgUrl">Image Url : </label>
          <input
            type="text"
            name="imgUrl"
            placeholder="food imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </div>

        <div className="formContainer">
          <label htmlFor="foodname">desc : </label>
          <input
            type="text"
            name="desc"
            placeholder="food desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="formContainer">
          <label htmlFor="price">Price : </label>
          <input
            type="number"
            name="name"
            placeholder="food price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="formContainer">
          <label htmlFor="address">Address : </label>
          <input
            type="text"
            name="address"
            placeholder="food address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>

      {error && <div className="errorContainer">{error}</div>}
      {message && <div className="messageContainer">{message}</div>}
    </>
  );
}

export default Form;
