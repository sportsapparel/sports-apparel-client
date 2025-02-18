import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

// Dynamic import with custom loading
const Home = dynamic(() => import("./Home"), {
  loading: () => <Loader />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "Home | Sports Apparel",
  description: "Home for the latest sports apparel.",
};

const page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default page;
