import styled from "@emotion/styled";

import Recipe from "@/interface/recipe";

const Container = styled("article")`
  display: flex;
  flex-direction: column;

  & > img {
    width: 100px;
    height: 100px;
  }

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Item = ({ credits, description, name, thumbnail_url }: Recipe) => (
  <Container>
    <img src={thumbnail_url} alt={name} />
    <span className="title-recipe">{name}</span>
    <span className="createdby-recipe">
      Created By:
      {credits.map((credit, index) => {
        return `${credit?.name || "-"}${index < credits.length - 1 ? ", " : ""}`;
      })}
    </span>
    <p>{description ? description : "No Description provided"}</p>
  </Container>
);

export default Item;
