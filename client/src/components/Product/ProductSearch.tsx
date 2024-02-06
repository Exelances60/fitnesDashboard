import { Input } from "antd";

const ProductSearch = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex justify-between items-center p-5">
      <h1 className="text-2xl font-semibold"></h1>
      <div className="w-[253px]">
        <Input.Search
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
