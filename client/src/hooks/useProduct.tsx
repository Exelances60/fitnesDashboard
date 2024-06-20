import { fetchProducts } from "@/actions/fetchProdutcs";
import React from "react";

const useProduct = () => {
  const [productData, setProductData] = React.useState([]);

  React.useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetchProducts();

      setProductData(response);
    };
    fetchProductData();
  }, []);

  return productData;
};

export default useProduct;
