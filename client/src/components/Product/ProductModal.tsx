"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Select,
  Divider,
  Space,
  message,
} from "antd";
import { getCookie } from "cookies-next";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import useMessage from "@/hooks/useMessage";
import { PlusOutlined } from "@ant-design/icons";
import axiosClient from "@/utils/AxiosClient";
import {
  justRequired,
  minFive,
  productDescriptionRules,
} from "@/utils/FormRules";

const ProductModal = () => {
  const showMessage = useMessage();
  const userInfo = useSelectUserInfo();
  const [file, setFile] = useState<any>();
  const [addProductModal, setAddProductModal] = useState(false);
  const [categoryName, setCategoryName] = useState<string>();
  const [categoryList, setCategoryList] = useState<string[]>(
    userInfo?.productCategory || []
  );

  const openAddProductModal = () => {
    setAddProductModal(true);
  };

  const onCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (categoryName === undefined) return;
    message.loading({ content: "Adding Category", key: "category" });
    setCategoryList([...categoryList, categoryName]);
    setCategoryName("");

    try {
      const resposne = await axiosClient.post(
        "/products/add-product-category",
        {
          category: categoryName,
          ownerId: userInfo?._id,
        }
      );
      if (resposne.status === 201) {
        message.success({ content: "Category Added", key: "category" });
      }
    } catch (error) {
      message.error({ content: "Some error pls try again", key: "category" });
    }
  };

  const handleFinish = async (values: any) => {
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
        "http://localhost:8080/products/add-product",
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
    } catch (error) {
      showMessage("Some error pls try again", "error");
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
            <Input.TextArea placeholder="Description" />
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
              dropdownRender={(menu) => {
                return (
                  <div>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        onKeyDown={(e) => e.stopPropagation()}
                        value={categoryName}
                        onChange={onCategoryChange}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </Space>
                  </div>
                );
              }}
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
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
      </Modal>
    </div>
  );
};

export default ProductModal;
