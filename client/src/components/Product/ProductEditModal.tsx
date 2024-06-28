import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { useRouter } from "next/navigation";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectEditModalVisible,
  selectProduct,
  setEditModalVisible,
} from "@/store/slices/productPageSlice";
import { justRequired, maxPrice, minFive } from "@/utils/FormRules";
import TextEditor from "../TextEditor";
import { useTranslations } from "next-intl";

const ProductEditModal = () => {
  const t = useTranslations("Product.ProductEditModal");
  const product = useAppSelector(selectProduct);
  const router = useRouter();
  const [form] = Form.useForm();
  const editModalVisible = useAppSelector(selectEditModalVisible);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<any>();
  useEffect(() => {
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      amount: product.amount,
    });
  }, [product, form]);

  const closeModal = () => {
    dispatch(setEditModalVisible(false));
  };

  const handleFinish = async (values: any) => {
    message.loading({ content: t("loading"), key: "loading" });
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("amount", values.amount);
    if (file) {
      formData.append("image", file);
    }
    try {
      const response = await axiosClient.put(
        `${process.env.BACK_END_SERVICES}/products/update-product/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        message.success({ content: t("productUpdated"), key: "loading" });
        closeModal();
        router.refresh();
      }
    } catch (error: any) {
      message.error({ content: error.response.data.message, key: "loading" });
    }
  };

  return (
    <Modal
      title={t("editProduct")}
      open={editModalVisible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="editProductForm"
          htmlType="submit"
        >
          {t("submit")}
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        id="editProductForm"
        encType="multipart/form-data"
      >
        <Form.Item label={t("productName")} name="name" rules={justRequired}>
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          label={t("description")}
          name="description"
          rules={[...justRequired, ...minFive]}
        >
          <TextEditor placeholder={t("description")} />
        </Form.Item>
        <Form.Item
          label={t("price")}
          name="price"
          rules={[...justRequired, ...maxPrice]}
        >
          <Input placeholder={t("price")} type="number" />
        </Form.Item>
        <Form.Item label={t("amount")} name="amount" rules={justRequired}>
          <Input placeholder={t("amount")} type="number" />
        </Form.Item>
        <Form.Item label={t("image")} name="image">
          <Upload
            listType="picture"
            maxCount={1}
            fileList={file ? [file] : []}
            onChange={(info) => {
              setFile(info.file.originFileObj);
            }}
          >
            <Button>{t("uploadImage")}</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;
