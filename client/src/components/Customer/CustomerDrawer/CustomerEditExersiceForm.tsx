import React, { useState } from "react";
import { Form, Select, Tag, Pagination } from "antd";
import { ExerciseType } from "@/models/dataTypes";
import Image from "next/image";
import { tagRender } from "@/utils/renderForTables/Customers/tagRenderForSelectExersice";
import { capitalizeFirstLetter } from "@/utils/utils";

interface CustomerEditExersiceFormProps {
  exersice: ExerciseType[];
}

const CustomerEditExersiceForm = ({
  exersice,
}: CustomerEditExersiceFormProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchExersice, setSearchExersice] = useState("");
  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const searchedExersice = exersice.filter((exersice) =>
    exersice.name.toLowerCase().includes(searchExersice.toLowerCase())
  );

  const displayedExercises = searchedExersice.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Form.Item label="Exercises Program" name="exercisePlan" className="w-full">
      <Select
        placeholder="Select a program"
        mode="multiple"
        showSearch
        placement="topLeft"
        onSearch={(value) => setSearchExersice(value)}
        tagRender={tagRender}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <div className="flex gap-2 w-full justify-center items-center">
              <Pagination
                defaultCurrent={1}
                total={exersice.length}
                pageSize={20}
                size="default"
                onChange={handlePageChange}
              />
              <p
                onClick={() => setSearchExersice("")}
                className="text-blue-500 cursor-pointer"
              >
                Clear Search
              </p>
            </div>
          </div>
        )}
      >
        {displayedExercises.map((exersice) => (
          <Select.Option value={exersice.name} key={exersice._id}>
            <div className="flex justify-between">
              <Image
                src={exersice.gifUrl}
                width={90}
                height={30}
                alt="gif"
                className="rounded-md"
                quality={70}
                unoptimized={true}
              />
              <div className="w-60 text-sm">
                {capitalizeFirstLetter(exersice.name)}
                <p>Primary Muscle</p>
                <Tag color="blue">{exersice.bodyPart}</Tag>
                <p>Secondary Muscle</p>
                {exersice.secondaryMuscle.map((part) => (
                  <Tag color="gray" key={part}>
                    {part}
                  </Tag>
                ))}
              </div>
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustomerEditExersiceForm;
