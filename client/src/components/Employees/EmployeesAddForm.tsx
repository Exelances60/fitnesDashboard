import React from "react";
import { Card, Empty, Form, Input, Select, Upload } from "antd";
import {
  EuroCircleOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  emailRules,
  employeeMinAge,
  justRequired,
  maxAge,
  phoneRules,
} from "@/utils/FormRules";
import { allUniverstyList } from "@/mock/allUniverstyList";
import Image from "next/image";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

const ProfilePictureUpload = () => (
  <Form.Item label="Profile Picture" name="profilePicture">
    <Upload name="profilePicture" listType="picture-card" maxCount={1}>
      <div>
        <div>+</div>
      </div>
    </Upload>
  </Form.Item>
);

const ProfileImage = ({ src }: { src: string }) => (
  <Image
    src={src}
    width={80}
    height={80}
    className="object-cover rounded-md mb-2"
    alt="profilePicture"
  />
);

const CustomerCard = ({
  customer,
}: {
  customer: { _id: string; profilePicture: string; name: string };
}) => (
  <div className="flex flex-col gap-2">
    <Card
      key={customer._id}
      className="flex flex-col items-center relative w-16 h-16"
    >
      <Image
        src={`${customer.profilePicture}`}
        fill
        className="object-cover rounded-md"
        alt="profilePicture"
      />
    </Card>
    <p className="font-bold">{customer.name}</p>
  </div>
);

interface EmployeesAddFormProps {
  editMode: boolean;
  employee?: IEmployee;
}

const EmployeesAddForm = ({ editMode, employee }: EmployeesAddFormProps) => {
  const { currentCurrencySymbol } = useCurrencyFormatter();
  return (
    <>
      {!editMode ? (
        <ProfilePictureUpload />
      ) : (
        <ProfileImage src={`${employee?.profilePicture}`} />
      )}
      <div className="flex gap-2">
        <Form.Item
          label="Name"
          name="name"
          required
          className="w-full"
          rules={[...justRequired, { min: 3, message: "Min 3 characters" }]}
        >
          <Input type="text" addonBefore={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          required
          className="w-full"
          rules={phoneRules}
        >
          <Input type="text" addonBefore="+90" />
        </Form.Item>
      </div>
      <div className="flex gap-2">
        <Form.Item
          label="Email"
          name="email"
          required
          rules={emailRules}
          className="w-full"
        >
          <Input type="text" addonBefore={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          required
          rules={[...justRequired, ...maxAge, ...employeeMinAge]}
          className="w-full"
        >
          <Input type="number" />
        </Form.Item>
      </div>
      <Form.Item label="Position" name="position" required rules={justRequired}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Address" name="address" required rules={justRequired}>
        <Input.TextArea />
      </Form.Item>
      <div className="flex gap-2">
        <Form.Item
          label="Hire Date"
          name="hireDate"
          required
          rules={justRequired}
          className="w-full"
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Salary"
          name="salary"
          required
          rules={justRequired}
          className="w-full"
        >
          <Input
            type="number"
            suffix={currentCurrencySymbol}
            addonBefore={<EuroCircleOutlined />}
          />
        </Form.Item>
      </div>
      <div className="flex gap-2">
        <Form.Item
          label="University"
          name="university"
          required
          className="w-full"
          rules={justRequired}
        >
          <Select showSearch>
            <Select.Option value="">Not Select</Select.Option>
            {allUniverstyList.map((university) => {
              return (
                <Select.Option key={university.No} value={university.Adı}>
                  {university.Adı}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Education"
          name="education"
          required
          className="w-full"
          rules={justRequired}
        >
          <Select>
            <Select.Option value="ilkokul">İlkokul</Select.Option>
            <Select.Option value="ortaokul">Ortaokul</Select.Option>
            <Select.Option value="lise">Lise</Select.Option>
            <Select.Option value="önlisans">Ön Lisans</Select.Option>
            <Select.Option value="yüksekLisans">Yüksek Lisans</Select.Option>
          </Select>
        </Form.Item>
      </div>
      {!editMode ? (
        <Form.Item
          label="Documents"
          name="documents"
          className="w-full"
          required
          rules={justRequired}
        >
          <Upload name="documents" listType="picture-card" maxCount={6}>
            <div>
              <div>+</div>
            </div>
          </Upload>
        </Form.Item>
      ) : (
        <>
          <h1>Students</h1>
          <div className="flex gap-2">
            {employee?.customers && employee.customers.length > 0 ? (
              employee.customers.map((customer) => (
                <CustomerCard key={customer._id} customer={customer} />
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EmployeesAddForm;
