"use client";
import React, { useState } from "react";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Pagination, Image, Input } from "antd";
import { productsType } from "@/models/dataTypes";

type ProductPreviewProps = {
  products: productsType[];
};

const ProductPreview = ({ products }: ProductPreviewProps) => {
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
          <TableHead className="">
            <TableRow className="rounded-md bg-[#F1F4F9]">
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product._id} className="text-black font-semibold">
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
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell className="flex gap-2 items-center justify-center ">
                  <Badge color="blue" className="cursor-pointer">
                    Edit
                  </Badge>
                  <Badge color="red" className="cursor-pointer">
                    Delete
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
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
