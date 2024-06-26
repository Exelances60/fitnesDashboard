import React from "react";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Divider } from "antd";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

interface IInvoiceShowProductsProps {
  order: OrdersType;
}

const InvoiceShowProducts = ({ order }: IInvoiceShowProductsProps) => {
  const [showProducts, setShowProducts] = useState<string[]>([]);
  const { renderCurrency } = useCurrencyFormatter();

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

      <AnimatePresence>
        {showProducts.includes(order._id) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
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
                  <span>{renderCurrency(product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Product Quantity</span>
                  <span>{order.amount}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InvoiceShowProducts;
