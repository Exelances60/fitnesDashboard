import { Empty } from "antd";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
} from "@tremor/react";
import ProductRow from "./ProductRow";
import { useTranslations } from "next-intl";

type ProductTableProps = {
  currentProducts: productsType[];
  handleDeleteProduct: (productId: string) => void;
};

const ProductTable = ({
  currentProducts,
  handleDeleteProduct,
}: ProductTableProps) => {
  const t = useTranslations("Product.ProductPreview");
  return (
    <div className="flex flex-col gap-2 p-5">
      <Table>
        <TableHead>
          <TableRow className="rounded-md bg-[#F1F4F9]">
            <TableHeaderCell>{t("productImage")}</TableHeaderCell>
            <TableHeaderCell>{t("productName")}</TableHeaderCell>
            <TableHeaderCell>{t("price")}</TableHeaderCell>
            <TableHeaderCell>{t("amount")}</TableHeaderCell>
            <TableHeaderCell>{t("category")}</TableHeaderCell>
            <TableHeaderCell>{t("createdAt")}</TableHeaderCell>
            <TableHeaderCell>{t("actions")}</TableHeaderCell>
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
