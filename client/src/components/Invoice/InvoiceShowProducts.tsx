import React from "react";
import { useState } from "react";
import { currencyFormatter } from "@/utils/utils";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { Divider } from "antd";

interface IInvoiceShowProductsProps {
  order: OrdersType;
}

const InvoiceShowProducts = ({ order }: IInvoiceShowProductsProps) => {
  const [showProducts, setShowProducts] = useState<string[]>([]);

  const toggleProduct = (orderId: string) => {
    if (showProducts.includes(orderId)) {
      setShowProducts(showProducts.filter((id) => id !== orderId));
    } else {
      setShowProducts([...showProducts, orderId]);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <span className="font-bold">Product Info </span>
        <div className="flex flex-col gap-2">
          <DownOutlined onClick={() => toggleProduct(order._id)} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: showProducts.includes(order._id) ? 1 : 0,
          height: showProducts.includes(order._id) ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {order.products.map((product) => (
          <div key={product._id} className="opacity-100">
            <div className="flex justify-between">
              <span className="font-bold">Product ID</span>
              <span>{product._id}</span>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span className="font-bold">Product Image</span>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Product Name</span>
              <span>{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Product Price</span>
              <span>{currencyFormatter(product.price, "TRY")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Product Quantity</span>
              <span>{order.amount}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default InvoiceShowProducts;
