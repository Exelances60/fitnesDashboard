"use client";
import React, { useState } from "react";
import { Card } from "@tremor/react";
import { Pagination, message } from "antd";
import axiosClient from "@/utils/AxiosClient";
import { useRouter } from "next/navigation";
import ProductTable from "./ProductTable";
import ProductSeacrh from "./ProductSearch";
import ProductEditModal from "./ProductEditModal";
import ProductOrderModal from "./ProductOrderModal";
import { useTranslations } from "next-intl";

type ProductPreviewProps = {
  products: productsType[];
};

const ProductPreview = ({ products }: ProductPreviewProps) => {
  const t = useTranslations("Product.ProductPreview");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (value: string) => {
    message.loading({ content: t("loading"), key: "deleteProduct" });
    try {
      const response = await axiosClient.delete(
        `/products/delete-product/${value}`
      );
      if (response.status === 200) {
        message.success({
          content: t("productDeletedSuccessfully"),
          key: "deleteProduct",
          duration: 2,
        });
      }
      router.refresh();
    } catch (error: any) {
      message.error({
        content: `${error.response.data.errorMessage}`,
        key: "deleteProduct",
        duration: 2,
      });
    }
  };

  return (
    <Card>
      <ProductSeacrh setSearch={setSearch} />
      <ProductTable
        currentProducts={currentProducts}
        handleDeleteProduct={handleDeleteProduct}
      />
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={productsPerPage}
          onChange={handlePaginationChange}
        />
      </div>
      <p>
        {productsPerPage} - of {filteredProducts.length}
      </p>
      <ProductEditModal />
      <ProductOrderModal />
    </Card>
  );
};

export default ProductPreview;
