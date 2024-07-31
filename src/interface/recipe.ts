export interface Credit {
  name: string | null;
  type: string;
}
interface Recipe {
  name: string;
  description: string;
  thumbnail_url: string;
  id: number;
  credits: Array<Credit>;
}

export default Recipe;
