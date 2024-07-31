import Recipe from "@/interface/recipe";
import Service, { generateQuery } from "@lib/service";
import { GenericAbortSignal } from "axios";

interface Query {
  page: number;
  limit: number;
  keyword: string;
}

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
    return { error: null, data: [...currentData, ...response.data.results] };
  } catch (error) {
    console.error(error);
    return { data: [], error };
  }
};

export default GetRecipeUseCase;
