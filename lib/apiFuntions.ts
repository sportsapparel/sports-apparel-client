import axios from "axios";

// export const fetchCatgoriesData = async () => {};
export const fetchCategoriesData = async () => {
  try {
    const response = await fetch("/api/categories", {
      method: "GET",
      headers: {
        cache: "no-store",
      },
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data, "cate");
    return data?.data;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    throw new Error("Failed to fetch categories data");
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`/api/product/${id}`, {
      headers: { cache: "no-store" },
    });
    return response.data.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch product data", { cause: error });
  }
};
