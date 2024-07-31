import styled from "@emotion/styled";

interface FormElements extends HTMLFormControlsCollection {
  keyword: HTMLInputElement;
}
interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface Props {
  onSearch: (keyword: string) => void;
}

const Container = styled("form")`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > input {
    flex: 0.68;
    padding: 12px;
    display: inline-block;
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-sizing: border-box;
  }

  & > button {
    flex: 0.32;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
    border: 1px solid #ccc;
    border-left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const Search = ({ onSearch }: Props) => {
  const _onSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    onSearch(event.currentTarget.elements.keyword.value);
  };

  return (
    <Container data-testid="form" onSubmit={_onSubmit}>
      <input data-testid="search-bar" name="keyword" type="search" />
      <button data-testid="submit" type="submit">
        Search
      </button>
    </Container>
  );
};

export default Search;
