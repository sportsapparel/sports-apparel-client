import React from "react";
import Button from "./Button";
import Link from "next/link";

const HomeHead = () => {
  return (
    <>
      <section className="bg-backgroundColor container-c my-10 space-y-10 text-center">
        <h1 className="text-textColor mb-3">
          Sustainable. Beautiful. Ethical.
        </h1>
        <Link href={`/shop`}>
          <Button>Shop Now</Button>
        </Link>
      </section>
    </>
  );
};

export default HomeHead;
