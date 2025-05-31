import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UseWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-[110px]">{children}</main>
      <Footer />
    </>
  );
};

export default UseWrapper;
