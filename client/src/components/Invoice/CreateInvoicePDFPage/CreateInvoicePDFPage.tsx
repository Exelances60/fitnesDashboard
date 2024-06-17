"use client";
import React, { useRef } from "react";
import { selectSelectedInvoiceData } from "@/store/slices/invoiceSlice";
import { useAppSelector } from "@/store/store";
import { Card } from "@tremor/react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

const CreateInvoicePDFPage = () => {
  const userInfo = useSelectUserInfo();
  const router = useRouter();
  const ref = useRef(null);
  const { renderCurrency } = useCurrencyFormatter();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: "Invoice",
  });

  const selectInvoiceData = useAppSelector(selectSelectedInvoiceData);
  if (!selectInvoiceData) {
    message.error({
      key: "error",
      content: "Please select an invoice to create PDF",
    });
    router.push("/dashboard/invoice");
  }

  return (
    <Card className="flex flex-col items-center justify-center p-5 gap-2 min-h-[810px]">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 w-full">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto" ref={ref}>
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
            <div className="flex justify-between">
              <div className="flex items-center gap-1 justify-start flex-col">
                <Image
                  src={userInfo?.ownerImage || "/images/avatar.jpg"}
                  alt="avatar"
                  width={70}
                  height={50}
                />
                <h1 className="text-md font-semibold text-gray-800">
                  {userInfo?.companyName}
                </h1>
              </div>

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">
                  {selectInvoiceData?._id}
                </span>

                <address className="mt-4 not-italic text-gray-800 capitalize">
                  {userInfo?.address}
                </address>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectInvoiceData?.orderOwner}
                </h3>
                <div className="mt-2 not-italic text-gray-500 capitalize">
                  {selectInvoiceData?.adress}
                </div>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {new Date(
                        selectInvoiceData?.createdAt ?? ""
                      ).toLocaleDateString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Price
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Total Price
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200"></div>

                {selectInvoiceData?.products.map((product) => (
                  <div
                    key={product._id}
                    className="sm:grid sm:grid-cols-5 gap-2"
                  >
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Item
                      </h5>
                      <p className="font-medium text-gray-800 ">
                        {product.name}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </h5>
                      <p className="text-gray-800">
                        {selectInvoiceData.amount}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Price
                      </h5>
                      <p className="text-gray-800">
                        {renderCurrency(product.price)}
                      </p>
                    </div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Total Price
                    </h5>
                    <p className="sm:text-end text-gray-800">
                      {renderCurrency(selectInvoiceData.totalPrice)}
                    </p>
                  </div>
                ))}

                <div className="sm:hidden border-b border-gray-200"></div>
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Tax:
                    </dt>
                    <dd className="col-span-2 text-gray-500">%8</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {renderCurrency(selectInvoiceData?.totalPrice ?? 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  {userInfo?.email}
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  {userInfo?.phone}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">© 2024.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-x-3">
        <a
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handlePrint}
        >
          <PrinterOutlined />
          Print
        </a>
      </div>
    </Card>
  );
};

export default CreateInvoicePDFPage;
