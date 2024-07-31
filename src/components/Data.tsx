import Recipe from "@interface/recipe";

import Item from "./Item";
import Loader from "./Loader";

interface Props {
  loading: "" | "loading" | "more";
  data: Array<Recipe>;
}

const Data = ({ loading, data }: Props) => {
  if (loading === "loading") {
    return <Loader size="120px" />;
  }
  if (!data.length) {
    return <span data-testid="recipe-empty">Data Not Found</span>;
  }
  return data.map((item: Recipe) => <Item key={item.id} {...item} />);
};

export default Data;
