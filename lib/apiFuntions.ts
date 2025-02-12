import axios from "axios";

// export const fetchCatgoriesData = async () => {};
export const fetchCatgoriesData = async () => {
  try {
    const res = await axios.get("/api/categories");
    console.log(res.data, "cate");
    return res?.data?.data;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    throw new Error("Failed to fetch categories data");
  }
};
export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`/api/product/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch product data", { cause: error });
  }
};
