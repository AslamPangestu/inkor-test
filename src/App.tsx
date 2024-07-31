import { useEffect, useReducer, useRef } from "react";

import Data from "@components/Data";
import Search from "@components/Search";

import Recipe from "@interface/recipe";

import styles from "@styles/index.module.css";

interface InitialState {
  data: Array<Recipe>;
  error: string;
  page: number;
  keyword: string;
  loading: "" | "loading" | "more";
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
  loading: "loading",
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
  const abortRef = useRef<AbortController | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const _onFetch = async () => {
      abortRef.current = new AbortController();
      const { page, keyword, data } = state;

      const { default: GetRecipe } = await import("@useCase/GetRecipe");
      const response = await GetRecipe(
        { page, limit: 20, keyword },
        abortRef.current.signal,
        data,
      );
      dispatch({ type: "setData", payload: { ...response, loading: "" } });
      abortRef.current = null;
    };
    if (state.loading && !abortRef.current) {
      _onFetch();
    }
  }, [state.loading]);

  const _onLoadMore = () => {
    dispatch({
      type: "setData",
      payload: { page: state.page + 1, loading: "more" },
    });
  };

  const _onSearch = (keyword: string) => {
    dispatch({
      type: "setData",
      payload: { keyword, loading: "loading", data: [] },
    });
  };

  return (
    <main className={styles.container}>
      <section>
        <h1>Recipe Dictionary</h1>
      </section>
      <section>
        <Search onSearch={_onSearch} />
      </section>
      <section className={styles.dataContainer} data-state={state.loading}>
        <div data-testid="recipes">
          <Data loading={state.loading} data={state.data} />
        </div>
        {!state.loading && (
          <button data-testid="load-more" onClick={_onLoadMore}>
            Load More
          </button>
        )}
      </section>
    </main>
  );
};

export default App;
