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
    flex: 0.75;
  }

  & > button {
    flex: 0.25;
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
