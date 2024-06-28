import React from "react";
import Image from "next/image";
import Map from "@/components/Map";
import { useTranslations } from "next-intl";

type OrderDetailModalProps = {
  selectedOrder: OrdersType;
};

const OrderDetailModal = ({ selectedOrder }: OrderDetailModalProps) => {
  const t = useTranslations("Order.OrderContainer");
  return (
    <>
      <div className="w-full ">
        <div className="w-full ">
          {selectedOrder.products ? (
            selectedOrder?.products.map((product) => (
              <div className="flex gap-2 w-full" key={product._id}>
                <Image
                  src={`${product.imageUrl}`}
                  alt={product.name}
                  width={150}
                  height={150}
                  priority={true}
                />
                <div>
                  <p>
                    <span className="font-bold">{product.name}</span> x{" "}
                    {selectedOrder.amount}
                  </p>
                  <p>
                    <span className="font-bold">{t("price")}:</span>{" "}
                    {product.price} TL
                  </p>
                  <p>
                    {product.description.length > 50 ? (
                      <span className="font-bold">
                        {t("description")}: {product.description.slice(0, 200)}
                        ...
                      </span>
                    ) : (
                      <span className="font-bold">
                        {t("description")}: {product.description}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Image
              src={`${process.env.BACK_END_SERVICES}/${selectedOrder.orderImage}`}
              alt={selectedOrder?.orderOwner}
              width={150}
              height={150}
            />
          )}

          <p>
            <span className="font-bold">{t("orderId")}:</span>{" "}
            {selectedOrder?._id}
          </p>
          <p>
            <span className="font-bold">{t("orderOwner")}:</span>{" "}
            {selectedOrder?.orderOwner}
          </p>
          <p>
            <span className="font-bold">{t("address")}:</span>{" "}
            {selectedOrder?.adress}
          </p>
          <p>
            <span className="font-bold">{t("totalPrice")}:</span>{" "}
            {selectedOrder?.totalPrice} TL {selectedOrder?.amount}
          </p>
          <p>
            <span className="font-bold">{t("status")}:</span>{" "}
            {selectedOrder?.status}
          </p>
          <p>
            <span className="font-bold">{t("phone")}:</span>{" "}
            {selectedOrder?.phone}
          </p>
          <p>
            <span className="font-bold">
              {t("email")}: {selectedOrder.orderOwnerEmail}
            </span>{" "}
          </p>
          <p>
            {selectedOrder?.products.map((product, index) => (
              <span className="font-bold" key={index}>
                {t("category")}: {product.category}{" "}
              </span>
            ))}
          </p>
          <div className="w-full h-96 mt-2 p-5">
            <Map address={selectedOrder.adress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailModal;
