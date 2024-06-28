import { Input } from "antd";
import { useTranslations } from "next-intl";

const ProductSearch = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const t = useTranslations("Product.ProductPreview");

  return (
    <div className="flex justify-between items-center p-5">
      <h1 className="text-2xl font-semibold"></h1>
      <div className="w-[253px]">
        <Input.Search
          placeholder={t("searchProduct")}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
