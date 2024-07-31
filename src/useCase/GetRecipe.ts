import Recipe, { Credit } from "@interface/recipe";
import Service, { generateQuery } from "@lib/service";
import { GenericAbortSignal } from "axios";

interface Query {
  page: number;
  limit: number;
  keyword: string;
}

const creditAdapter = (values: Array<Credit>) =>
  values.filter((value: Credit) => value.name);

const GetRecipeUseCase = async (
  { page, limit, keyword }: Query,
  signal: GenericAbortSignal | undefined,
  currentData: Array<Recipe>,
) => {
  try {
    const query = generateQuery({ from: page, size: limit, q: keyword });
    const response = await Service.get(`/recipes/list${query}`, {
      signal,
    });

    const data: Array<Recipe> = response.data?.results || [];
    return {
      error: null,
      data: [
        ...currentData,
        ...data.map((item: Recipe) => ({
          ...item,
          credits: creditAdapter(item.credits),
        })),
      ],
    };
  } catch (error) {
    console.error(error);
    return { data: [], error };
  }
};

export default GetRecipeUseCase;
