import { describe, it, afterAll, afterEach, beforeAll, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

import App from "@/App";

import { BASE_URL } from "@/config";

import Recipe from "@/interface/recipe";

const results: Array<Recipe> = [
  {
    name: "Name",
    description: "Description",
    thumbnail_url: "Url",
    credits: [{ name: "Credit", type: "Type" }],
    id: 0,
  },
];

export const restHandlers = [
  http.get(`${BASE_URL}/recipes/list`, ({ request }) => {
    const url = new URL(request.url);

    const keyword = url.searchParams.get("q");

    if (keyword === "error") {
      return HttpResponse.error();
    }
    return HttpResponse.json({
      results: results.map((item) => ({ ...item, id: new Date().getTime() })),
    });
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("App Component", () => {
  it("should fetch first time", async () => {
    render(<App />);
    const items = await screen.findAllByTestId("title-recipe");
    expect(items.length).toBe(results.length);
  });

  it("should search", async () => {
    render(<App />);
    const input = screen.getByTestId("search-bar");
    const form = screen.getByTestId("form");

    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.submit(form);

    const items = await screen.findAllByTestId("title-recipe");
    expect(items.length).toBe(results.length);
  });

  it("should load more", async () => {
    render(<App />);
    const button = await screen.findByTestId("load-more");
    fireEvent.click(button);

    await screen.findByTestId("title-recipe");
    const items = await screen.findAllByTestId("title-recipe");
    expect(items.length).toBe([...results, ...results].length);
  });

  it("should fetch error", async () => {
    render(<App />);

    await screen.findByTestId("load-more");

    const input = screen.getByTestId("search-bar");
    const form = screen.getByTestId("form");

    fireEvent.change(input, { target: { value: "error" } });
    fireEvent.submit(form);

    const emptyEl = await screen.findByTestId("recipe-empty");
    expect(emptyEl).toBeInTheDocument();
  });
});
