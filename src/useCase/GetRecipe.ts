import Service, { generateQuery } from "@lib/service";

interface Query {
  page: number;
  limit: number;
  keyword: string;
}

const GetRecipeUseCase = async ({ page, limit, keyword }: Query) => {
  try {
    const query = generateQuery({ from: page, size: limit, keyword });
    const response = await Service.get(`/recipes/list${query}`);
    return { error: null, data: response.data.results };
  } catch (error) {
    console.error(error);
    return { data: null, error };
  }
};

export default GetRecipeUseCase;
