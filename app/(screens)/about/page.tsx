import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

// Dynamic import with custom loading
const About = dynamic(() => import("./About"), {
  loading: () => <Loader />,
  ssr: true,
});

export const metadata: Metadata = {
  title: "About",
  description: "Shop for the latest sports apparel.",
};

const page = () => {
  return <About />;
};

export default page;
