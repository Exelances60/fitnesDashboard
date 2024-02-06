import { productsType } from "@/models/dataTypes";
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

type productsRowType = {
  product: productsType;
  handleDeleteProduct: (productId: string) => void;
};
const ProductRow = ({ product, handleDeleteProduct }: productsRowType) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const handleClickEditButton = () => {
    setEditModalVisible(true);
  };

  const handleClickOrderButton = () => {
    setOrderModalVisible(true);
  };

  return (
    <TableRow key={product._id} className="text-black ">
      <ProductEditModal
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        product={product}
      />
      <ProductOrderModal
        orderModalVisible={orderModalVisible}
        setOrderModalVisible={setOrderModalVisible}
        product={product}
      />
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
        <Button
          className="ml-2"
          type="primary"
          ghost
          icon={<ShoppingCartOutlined />}
          onClick={handleClickOrderButton}
        >
          Order Now
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default ProductRow;
