import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

// Dynamic import with custom loading
const Contact = dynamic(() => import("./Contact"), {
  loading: () => <Loader />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact for the latest sports apparel.",
};

const page = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default page;
