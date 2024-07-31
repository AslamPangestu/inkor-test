import { useEffect, useReducer } from "react";

import Recipe from "@interface/recipe";

interface InitialState {
  data: Array<Recipe>;
  error: string;
  page: number;
  keyword: string;
  loading: boolean;
}

interface ActionState {
  type: string;
  payload: object;
}

const initialState: InitialState = {
  data: [],
  error: "",
  page: 0,
  keyword: "",
  loading: true,
};

const reducer = (state: InitialState, action: ActionState) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const _onFetch = async () => {
      const { page, keyword } = state;

      const { default: GetRecipe } = await import("@useCase/GetRecipe");
      const response = await GetRecipe({ page, limit: 20, keyword });
      dispatch({ type: "setData", payload: { ...response, loading: false } });
    };
    if (state.loading) {
      _onFetch();
    }
  }, [state.loading]);

  return (
    <main>
      <section>Header</section>
      <section>Filter</section>
      {state.loading ? <span>Loading...</span> : <section>Data</section>}
    </main>
  );
};

export default App;
