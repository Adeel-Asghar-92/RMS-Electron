import React from "react";
import "./favorite.css";

const Favorite = ({isChecked, handleChange}) => {
  // const [isChecked, setIsChecked] = React.useState(false);

  // const handleChange = () => {
  //   setIsChecked(!isChecked);
  // };

  return (
    <div className="favorite-button">
      <input
        type="checkbox"
        id="favorite"
        name="favorite-checkbox"
        value="favorite-button"
        checked={isChecked}
        onChange={handleChange}
        className="!p-0 flex justify-center items-center"
      />
      <label htmlFor="favorite" className="container p-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </label>
    </div>
  );
};

export default Favorite;
