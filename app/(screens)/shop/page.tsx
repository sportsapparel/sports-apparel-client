import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

// Dynamic import with custom loading
const Shop = dynamic(() => import("./Shop"), {
  loading: () => <Loader />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop for the latest sports apparel.",
};

const page = () => {
  return (
    <>
      <Shop />
    </>
  );
};

export default page;
