import { useEffect, useState } from "react";
import axiosClient from "@/utils/AxiosClient";
import { productsType } from "@/types/Product";

const useFetchProducts = (userId: string | undefined) => {
  const [products, setProducts] = useState<productsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchProducts = async () => {
        try {
          const response = await axiosClient.get(
            `/products/get-products/${userId}`
          );
          setProducts(response.data.products);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [userId]);

  return { products, loading };
};

export default useFetchProducts;
