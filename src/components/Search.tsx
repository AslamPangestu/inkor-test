import styled from "@emotion/styled";

interface Props {
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
  const _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(((event.target as HTMLFormElement)[0] as HTMLInputElement).value);
  };

  return (
    <Container onSubmit={_onSubmit}>
      <input name="keyword" type="search" />
      <button>Search</button>
    </Container>
  );
};

export default Search;
