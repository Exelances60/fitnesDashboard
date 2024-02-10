import React from "react";
import { ordersType } from "@/models/dataTypes";
import Image from "next/image";

type OrderDetailModalProps = {
  selectedOrder: ordersType;
};

const OrderDetailModal = ({ selectedOrder }: OrderDetailModalProps) => {
  return (
    <>
      <div className="w-full ">
        <div className="w-full ">
          {selectedOrder?.products.map((product) => (
            <div className="flex gap-2 w-full" key={product._id}>
              <Image
                src={`http://localhost:8080/${product.imageUrl}`}
                alt={product.name}
                width={200}
                height={200}
              />
              <div>
                <p>
                  <span className="font-bold">{product.name}</span> x{" "}
                  {selectedOrder.amount}
                </p>
                <p>
                  <span className="font-bold">Price:</span> {product.price} TL
                </p>
                <p>
                  {product.description.length > 50 ? (
                    <span className="font-bold">
                      Description: {product.description.slice(0, 200)}...
                    </span>
                  ) : (
                    <span className="font-bold">
                      Description: {product.description}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
          <p>
            <span className="font-bold">Order Id:</span> {selectedOrder?._id}
          </p>
          <p>
            <span className="font-bold">Order Owner:</span>{" "}
            {selectedOrder?.orderOwner}
          </p>
          <p>
            <span className="font-bold">Address:</span> {selectedOrder?.adress}
          </p>
          <p>
            <span className="font-bold">Total Price:</span>{" "}
            {selectedOrder?.totalPrice} TL {selectedOrder?.amount}
          </p>
          <p>
            <span className="font-bold">Status:</span> {selectedOrder?.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDetailModal;
