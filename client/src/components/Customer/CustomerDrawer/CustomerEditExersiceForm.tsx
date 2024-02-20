import React, { useState } from "react";
import { Form, Select, Tag, Pagination, Skeleton } from "antd";
import Image from "next/image";
import { tagRender } from "@/utils/renderForTables/Customers/tagRenderForSelectExersice";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useFetchExersice } from "@/hooks/useFetchExersice";
import useDebounce from "@/hooks/useDebounce";
import { ExerciseType } from "@/types/ExercisType";

const CustomerEditExersiceForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchExersice, setSearchExersice] = useState("");
  const debounceSearch = useDebounce(searchExersice, 500);
  const { data, loading, error } = useFetchExersice(
    currentPage,
    debounceSearch as string
  );
  const exercises: ExerciseType[] = data ? data.exercises : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Form.Item
        label="Exercises Program"
        name="exercisePlan"
        className="w-full"
      >
        <Select
          placeholder="Select a program"
          mode="multiple"
          showSearch
          placement="topRight"
          size="large"
          onSearch={(value) => setSearchExersice(value)}
          tagRender={tagRender}
          dropdownRender={(menu) => (
            <div>
              {loading ? (
                <Skeleton active />
              ) : error ? (
                <div>Something went wrong</div>
              ) : (
                <>
                  {menu}
                  <div className="flex gap-2 w-full justify-center items-center">
                    <Pagination
                      defaultCurrent={currentPage}
                      total={data.totalExercisesCount}
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
                </>
              )}
            </div>
          )}
        >
          {exercises.map((exersice) => (
            <Select.Option value={exersice.name} key={exersice._id}>
              <div className="flex justify-between">
                <Image
                  src={`https://fitnesdashboard.onrender.com${exersice.gifUrl}`}
                  width={90}
                  height={30}
                  alt={exersice.name}
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
    </>
  );
};

export default CustomerEditExersiceForm;
