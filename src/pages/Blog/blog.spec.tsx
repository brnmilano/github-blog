import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // ou MemoryRouter
import Blog from "./index";

test("should display the page title", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );

  expect(getByText("Publicações")).toBeInTheDocument();
});
