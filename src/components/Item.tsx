import styled from "@emotion/styled";

import Recipe from "@interface/recipe";

const Container = styled("article")`
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 0.5rem;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition:
        transform 1s,
        filter 2s ease-in-out;

      :hover {
        transform: scale(1.5);
      }
    }
  }

  & > .title-recipe {
    font-weight: bold;
    font-size: 1.25rem;
  }

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 1rem;
  }
`;

const Item = ({ credits, description, name, thumbnail_url }: Recipe) => (
  <Container>
    <div>
      <img data-testid="image-recipe" src={thumbnail_url} alt={name} />
    </div>
    <span data-testid="title-recipe" className="title-recipe">
      {name}
    </span>
    <div data-testid="createdby-recipe" className="createdby-recipe">
      Created By:{" "}
      {credits.map((credit, index) => {
        return `${credit?.name || "-"}${index < credits.length - 1 ? ", " : ""}`;
      })}
    </div>
    <p data-testid="description-recipe">
      {description ? description : "No Description provided"}
    </p>
  </Container>
);

export default Item;
