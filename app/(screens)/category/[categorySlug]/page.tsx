"use client";
import { useParams } from "next/navigation";
import React from "react";

const Category = () => {
  const { categorySlug } = useParams();
  return <div>{categorySlug}</div>;
};

export default Category;
