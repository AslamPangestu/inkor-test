import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Item from "@components/Item";

import Recipe from "@interface/recipe";

describe("Recipe Item Component", () => {
  it("should render", () => {
    const props: Recipe = {
      id: 1,
      credits: [{ name: "Credit", type: "Credit Type" }],
      description: "Description",
      name: "Name",
      thumbnail_url: "image url",
    };

    render(<Item {...props} />);

    const image = screen.getByTestId("image-recipe");
    const title = screen.getByTestId("title-recipe");
    const createdby = screen.getByTestId("createdby-recipe");
    const description = screen.getByTestId("description-recipe");

    expect(image).toHaveAttribute("src", props.thumbnail_url);
    expect(title.textContent).toBe(props.name);
    expect(createdby.textContent).toBe(`Created By: ${props.credits[0].name}`);
    expect(description.textContent).toBe(props.description);
  });

  it("should render multiple credit", () => {
    const props: Recipe = {
      id: 1,
      credits: [
        { name: "Credit", type: "Credit Type" },
        { name: "Credit 1", type: "Credit Type" },
      ],
      description: "Description",
      name: "Name",
      thumbnail_url: "image url",
    };

    render(<Item {...props} />);

    const createdby = screen.getByTestId("createdby-recipe");

    expect(createdby.textContent).toContain(",");
  });

  it("should render edge case", () => {
    const props: Recipe = {
      id: 1,
      credits: [{ name: null, type: "Credit Type" }],
      description: "",
      name: "Name",
      thumbnail_url: "image url",
    };

    render(<Item {...props} />);

    const createdby = screen.getByTestId("createdby-recipe");
    const description = screen.getByTestId("description-recipe");

    expect(createdby.textContent).toBe("Created By: -");
    expect(description.textContent).toBe("No Description provided");
  });
});
