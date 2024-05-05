import { fetchProducts } from "@/actions/fetchProdutcs";
import ProductModal from "@/components/Product/ProductModal";
import ProductPreview from "@/components/Product/ProductPreview";
import React from "react";

const Product = async () => {
  console.log("Product page");
  const products = await fetchProducts();

  return (
    <div className="flex flex-col gap-4">
      <ProductModal />
      <ProductPreview products={products} />
    </div>
  );
};

export default Product;
