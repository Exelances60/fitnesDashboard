"use client";
import React, { useRef, useState } from "react";
import { selectSelectedInvoiceData } from "@/store/slices/invoiceSlice";
import { useAppSelector } from "@/store/store";
import { Card } from "@tremor/react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import axiosClient from "@/utils/AxiosClient";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";

const CreateInvoicePDFPage = () => {
  const userInfo = useSelectUserInfo();
  const router = useRouter();
  const ref = useRef(null);

  const selectInvoiceData = useAppSelector(selectSelectedInvoiceData);
  if (!selectInvoiceData) {
    message.error({
      key: "error",
      content: "Please select an invoice to create PDF",
    });
    router.push("/dashboard/invoice");
  }

  const createPDF = async () => {
    const htmlArray = Array.from((ref.current as any).children).map(
      (child: any) => {
        return child.outerHTML;
      }
    );
    const htmlString = htmlArray.join("\n");

    try {
      const response = await axiosClient.post("/orders/createOrderInvoice", {
        htmlString,
      });
      console.log(response.data.pdf);
      if (response.status === 200) {
        message.success({
          key: "success",
          content: "PDF created successfully",
        });
        const pdfBuffer = Buffer.from(response.data.pdf);
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.target = "_blank";
        link.click();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center p-5 gap-2 min-h-[810px]">
      <div
        className="lg:w-1/2 w-full p-10 bg-[#f7f7f7] rounded-md shadow min-h-[770px]"
        ref={ref}
      >
        <div className="w-full flex h-[200px] px-10">
          <div className="flex flex-col w-[70%] h-full  justify-center">
            <div className="w-full flex gap-2">
              <p className="text-3xl text-[#6b7290] font-light">Invoice : </p>
              <p className="font-medium pt-2 text-lg">
                #{selectInvoiceData?._id}
              </p>
            </div>
            <div className="w-full flex gap-2">
              <p className="text-xl text-[#6b7290]">Invoice Date : </p>
              <p className="font-medium pt-1">{new Date().toLocaleString()}</p>
            </div>
            <div className="w-full flex gap-2">
              <p className="text-xl text-[#6b7290]">Status : </p>
              <p className="font-medium pt-1">{selectInvoiceData?.status}</p>
            </div>
            <div className="w-full flex gap-2">
              <p className="text-xl text-[#6b7290]">Total Price : </p>
              <p className="font-bold pt-1">
                {selectInvoiceData?.totalPrice} TRY
              </p>
            </div>
          </div>
          <div className="flex w-[30%] items-center relative px-10 justify-center h-full">
            <img
              src={userInfo?.ownerImage}
              alt="invoice"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-10 w-full">
          <p className="text-[#6b7290]">
            Order Owner : {selectInvoiceData?.orderOwner}
          </p>
          <p className="text-[#6b7290]">
            Order Owner Address : {selectInvoiceData?.adress}
          </p>
          <p className="text-[#6b7290]">
            Order Owner Email : {selectInvoiceData?.orderOwnerEmail}
          </p>
          <p className="text-[#6b7290]">
            Order Owner Phone : {selectInvoiceData?.phone}
          </p>
        </div>
        <hr className="my-3" />
        <table className="w-full border-collapse">
          <thead>
            <tr className="px-10">
              <th className="text-left text-lg text-[#6b7290]">Product</th>
              <th className="text-left text-lg text-[#6b7290]">Quantity</th>
              <th className="text-left text-lg text-[#6b7290]">Price</th>
              <th className="text-left text-lg text-[#6b7290]">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {selectInvoiceData?.products.map((product) => (
              <tr key={product._id} className="px-10">
                <td className="py-2 text-lg flex gap-2 items-center text-[#6b7290]">
                  <img
                    src={product.imageUrl}
                    alt="product"
                    className="w-[50px] h-[50px] object-contain"
                  />
                  {product.name}
                </td>
                <td className="py-2 text-lg text-[#6b7290]">
                  {selectInvoiceData?.amount}
                </td>

                <td className="py-2 text-lg text-[#6b7290]">
                  {product.price} TRY
                </td>
                <td className="py-2 text-lg text-[#6b7290]">
                  {selectInvoiceData?.totalPrice} TRY
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="my-3" />
        <div className="flex justify-between px-10">
          <p className="text-xl text-[#6b7290]">Total Price : </p>
          <p className="font-bold text-[#6b7290] text-lg pt-1">
            {selectInvoiceData?.totalPrice} TRY
          </p>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between px-10">
          <p className="text-xl text-[#6b7290]">Tax : </p>
          <p className="font-bold text-[#6b7290] text-lg pt-1">20%</p>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between px-10">
          <p className="text-xl text-[#6b7290]">Total Price with Tax : </p>
          <p className="font-bold text-[#6b7290] text-lg pt-1">
            {selectInvoiceData?.totalPrice
              ? selectInvoiceData.totalPrice * 1.2
              : null}{" "}
            TRY
          </p>
        </div>
        <hr className="my-3" />
        <p className="font-medium">
          Lütfen 15 gün içinde ödeyiniz. İşbirliğiniz için teşekkür ederiz.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus a
          dolores laudantium nesciunt debitis, illo sapiente facere. Accusantium
          voluptas repellendus, ut enim corporis velit reprehenderit voluptate
          dolorum culpa labore et.
        </p>
      </div>
      <Button type="primary" className="w-[200px]" onClick={createPDF}>
        Create PDF
      </Button>
    </Card>
  );
};

export default CreateInvoicePDFPage;
