"use client";
import React, { useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {
  Pagination,
  Image,
  Input,
  Empty,
  Button,
  Popconfirm,
  message,
} from "antd";
import { productsType } from "@/models/dataTypes";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import axiosClient from "@/utils/AxiosClient";
import { useRouter } from "next/navigation";

type ProductPreviewProps = {
  products: productsType[];
};

const ProductPreview = ({ products }: ProductPreviewProps) => {
  const router = useRouter();
  const userInfo = useSelectUserInfo();
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
    message.loading({ content: "Loading...", key: "deleteProduct" });
    try {
      const response = await axiosClient.delete(
        `/products/delete-product/${value}`
      );
      if (response.status === 200) {
        message.success({
          content: "Product deleted successfully",
          key: "deleteProduct",
          duration: 2,
        });
      }
      router.refresh();
    } catch (error) {
      message.error({
        content: "An error occurred while deleting the product",
        key: "deleteProduct",
        duration: 2,
      });
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-semibold"></h1>
        <div className="w-[253px]">
          <Input.Search
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <Table>
          <TableHead>
            <TableRow className="rounded-md bg-[#F1F4F9]">
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <TableRow
                  key={product._id}
                  className="text-black font-semibold"
                >
                  <TableCell>
                    <Image
                      src={`http://localhost:8080/${product.imageUrl}`}
                      width={90}
                      height={90}
                      alt={product.name}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price} &#8378;</TableCell>
                  <TableCell>{product.amount} pcs</TableCell>
                  <TableCell className="flex gap-2 items-center justify-center ">
                    <Button type="primary">Edit</Button>
                    <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => handleDeleteProduct(product._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="w-full flex justify-center items-center"
              />
            )}
          </TableBody>
        </Table>
      </div>
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
    </Card>
  );
};

export default ProductPreview;
