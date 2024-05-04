import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import Image from "next/image";
import NOUSERIMAGE from "@/../public/customer/noUser.webp";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import useMessage from "@/hooks/useMessage";

interface SettingImageUploadProps {
  ownerInfo: OwnerType;
}

const SettingImageUpload = ({ ownerInfo }: SettingImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const showMessage = useMessage();

  const handleSaveImage = async () => {
    showMessage("Loading...", "loading");
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("ownerImage", file);
        const response = await axiosClient.putForm(
          "/auth/uploadOwnerImage",
          formData
        );
        if (response.status === 201) {
          dispatch(
            setUser({ ...ownerInfo, ownerImage: response.data.ownerImage })
          );
          showMessage("Image uploaded successfully", "success");
        }
      }
    } catch (error: any) {
      showMessage(
        error.response.data.message || error.message || "Error uploading image",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Image
        src={ownerInfo?.ownerImage ? `${ownerInfo.ownerImage}` : NOUSERIMAGE}
        alt={ownerInfo.companyName}
        width={100}
        height={100}
        className="rounded-full"
      />

      <div className="flex gap-2">
        <Upload
          name="ownerImage"
          listType="picture"
          maxCount={1}
          onChange={(info) => {
            if (info.file.status === "done" && info.file.originFileObj) {
              setFile(info?.file?.originFileObj);
            }
          }}
        >
          <Button loading={loading}>Upload</Button>
        </Upload>
        <Button type="primary" onClick={handleSaveImage} loading={loading}>
          Save
        </Button>
      </div>

      <h1>🏢 {ownerInfo.companyName}</h1>
      <h2>📧 {ownerInfo.email}</h2>
    </>
  );
};

export default SettingImageUpload;
