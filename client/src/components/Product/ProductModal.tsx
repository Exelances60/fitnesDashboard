"use client";
import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, Select, Spin } from "antd";
import { getCookie } from "cookies-next";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import useMessage from "@/hooks/useMessage";
import {
  justRequired,
  minFive,
  productDescriptionRules,
} from "@/utils/FormRules";
import SelectCategoryDropDown from "../SelectCategoryDropDown";

import "react-quill/dist/quill.snow.css";
import TextEditor from "../TextEditor";

const ProductModal = () => {
  const showMessage = useMessage();
  const userInfo = useSelectUserInfo();
  const [file, setFile] = useState<any>();
  const [addProductModal, setAddProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>(
    userInfo?.productCategory || []
  );

  const openAddProductModal = () => {
    setAddProductModal(true);
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    if (userInfo === null) return;
    showMessage("Product Creating", "loading");
    const token = getCookie("token");
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("amount", values.amount);
    formData.append("category", values.category);
    formData.append("ownerId", userInfo?._id);
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.BACK_END_SERVICES}/products/add-product`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        setAddProductModal(false);
        showMessage("Product Created", "success");
      }
    } catch (error: any) {
      showMessage(error.response.data.errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-2xl font-bold text-[#202224] flex w-full justify-between">
      Product
      <Button className="shadow p-5" onClick={openAddProductModal}>
        Add Product
      </Button>
      <Modal
        title="Add Product"
        onCancel={() => {
          setAddProductModal(false);
        }}
        open={addProductModal}
        footer={[
          <Button key="cancel" onClick={() => setAddProductModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="addProductForm"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <Form
            id="addProductForm"
            onFinish={handleFinish}
            className="w-full flex flex-col gap-[10px] justify-center"
            encType="multipart/form-data"
          >
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[...justRequired, ...minFive]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={productDescriptionRules}
            >
              <TextEditor placeholder="Description" />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={justRequired}>
              <Input placeholder="Price" type="number" />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={justRequired}>
              <Input placeholder="Amount" type="number" />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={justRequired}>
              <Select
                placeholder="Select a category"
                dropdownRender={(menu) => (
                  <SelectCategoryDropDown
                    menu={menu}
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                    key={categoryList.length}
                    editable={false}
                  />
                )}
              >
                <Select.Option value="ProteinPowder">
                  Protein Powder
                </Select.Option>
                <Select.Option value="Vitamins">Vitamins</Select.Option>
                <Select.Option value="Supplements">Supplements</Select.Option>
                <Select.Option value="Others">Others</Select.Option>
                {categoryList.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Image" name="image" rules={justRequired}>
              <Upload
                listType="picture"
                maxCount={1}
                onChange={(info) => {
                  setFile(info.file.originFileObj);
                }}
              >
                <Button>Upload Image</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default ProductModal;
