import React from "react";
import Button from "./Button";

const HomeHead = () => {
  return (
    <>
      <section className="bg-backgroundColor container-c my-10 space-y-10 text-center">
        <h1 className="text-textColor">Sustainable. Beautiful. Ethical.</h1>
        <Button>Shop Now</Button>
      </section>
    </>
  );
};

export default HomeHead;
