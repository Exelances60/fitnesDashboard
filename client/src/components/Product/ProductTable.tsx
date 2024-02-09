import { productsType } from "@/models/dataTypes";
import { Empty } from "antd";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
} from "@tremor/react";
import ProductRow from "./ProductRow";

type ProductTableProps = {
  currentProducts: productsType[];
  handleDeleteProduct: (productId: string) => void;
};

const ProductTable = ({
  currentProducts,
  handleDeleteProduct,
}: ProductTableProps) => {
  return (
    <div className="flex flex-col gap-2 p-5">
      <Table>
        <TableHead>
          <TableRow className="rounded-md bg-[#F1F4F9]">
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                handleDeleteProduct={handleDeleteProduct}
              />
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
  );
};

export default ProductTable;
