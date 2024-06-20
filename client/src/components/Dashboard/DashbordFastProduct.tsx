import useProduct from "@/hooks/useProduct";
import React from "react";
import ProductPreview from "../Product/ProductPreview";
import { Spin } from "antd";

const DashbordFastProduct = () => {
  const product = useProduct();
  return (
    <Spin spinning={product.length === 0}>
      <ProductPreview products={product} />
    </Spin>
  );
};

export default DashbordFastProduct;
