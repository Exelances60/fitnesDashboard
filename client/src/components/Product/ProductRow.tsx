import { TableRow, TableCell } from "@tremor/react";
import { Popconfirm, Button, Image } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import ProductEditModal from "./ProductEditModal";
import ProductOrderModal from "./ProductOrderModal";
import { useAppDispatch } from "@/store/store";
import {
  setEditModalVisible,
  setOrderModalVisible,
  setProduct,
} from "@/store/slices/productPageSlice";
import { productsType } from "@/types/Product";

type productsRowType = {
  product: productsType;
  handleDeleteProduct: (productId: string) => void;
};
const ProductRow = ({ product, handleDeleteProduct }: productsRowType) => {
  const dispatch = useAppDispatch();

  const handleClickEditButton = () => {
    dispatch(setProduct(product));
    dispatch(setEditModalVisible(true));
  };

  const handleClickOrderButton = () => {
    dispatch(setProduct(product));
    dispatch(setOrderModalVisible(true));
    /*     setOrderModalVisible(true); */
  };

  return (
    <TableRow key={product._id} className="text-black ">
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
      <TableCell>{product.category}</TableCell>
      <TableCell className="md:w-[200px] ">
        <Button
          type="primary"
          onClick={handleClickEditButton}
          icon={
            <motion.div
              animate={{ y: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatType: "reverse",
              }}
            >
              <EditOutlined />
            </motion.div>
          }
        >
          Edit
        </Button>
        <Button
          className="ml-2"
          type="primary"
          ghost
          icon={<ShoppingCartOutlined />}
          onClick={handleClickOrderButton}
        >
          Order Now
        </Button>
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => handleDeleteProduct(product._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            className="ml-2"
            icon={
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  repeatType: "reverse",
                }}
              >
                <DeleteOutlined />
              </motion.div>
            }
          >
            Delete
          </Button>
        </Popconfirm>
      </TableCell>
    </TableRow>
  );
};
export default ProductRow;
