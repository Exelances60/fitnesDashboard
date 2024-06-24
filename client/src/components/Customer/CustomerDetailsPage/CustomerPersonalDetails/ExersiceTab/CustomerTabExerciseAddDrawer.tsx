import useDebounce from "@/hooks/useDebounce";
import { useFetchExersice } from "@/hooks/useFetchExersice";
import { Button, Input, Pagination, Tooltip } from "antd";
import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ProgressCircle } from "@tremor/react";
import CustomerTabAddDrawerItem from "./CustomerTabAddDrawerItem";
import CustomerTabAddedCart from "./CustomerTabAddedCart";

interface CustomerTabExerciseAddDrawerProps {
  customer: CustomerType;
}

const CustomerTabExerciseAddDrawer = ({
  customer,
}: CustomerTabExerciseAddDrawerProps) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [showSize, setShowSize] = useState<number>(20);
  const [addedDrawer, setAddedDrawer] = useState<boolean>(false);
  const debounce = useDebounce(search, 500);
  const { data, loading } = useFetchExersice(
    page,
    debounce as string,
    showSize
  );

  const exercies = data.exercises as ExerciseType[];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            placeholder="Search Exercise"
            onChange={(value) => setSearch(value.target.value)}
            className="w-1/2"
            addonAfter={
              <Tooltip title="Clear Search" className="p-1 text-lg">
                <DeleteOutlined onClick={() => setSearch("")} />
              </Tooltip>
            }
          />
          <Button
            type="primary"
            onClick={() => setAddedDrawer(true)}
            icon={<LikeOutlined />}
          >
            Show Added Exercise Cart
          </Button>
        </div>
        <Pagination
          current={page}
          total={data.totalExercisesCount}
          onChange={setPage}
          pageSize={data.pageSize}
          onShowSizeChange={(current, size) => setShowSize(size)}
        />

        {loading ? (
          <ProgressCircle />
        ) : (
          exercies.map((exercise) => (
            <CustomerTabAddDrawerItem
              key={exercise._id}
              exercise={exercise}
              addIcon={true}
            />
          ))
        )}

        <CustomerTabAddedCart
          addedDrawer={addedDrawer}
          setAddedDrawer={setAddedDrawer}
          customer={customer}
        />
      </div>
    </>
  );
};

export default CustomerTabExerciseAddDrawer;
