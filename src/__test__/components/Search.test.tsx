import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Search, { Props } from "@components/Search";

const handleOnSubmitMock = vi.fn();

describe("Search Component", () => {
  it("should render", () => {
    const props: Props = {
      onSearch: () => {},
    };
    render(<Search {...props} />);

    const input = screen.getByTestId("search-bar");
    const form = screen.getByTestId("form");

    form.onsubmit = handleOnSubmitMock;

    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.submit(form);

    expect(handleOnSubmitMock).toHaveBeenCalled();
  });
});
