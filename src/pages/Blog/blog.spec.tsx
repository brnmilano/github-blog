import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Blog from "./index";

test("should display Blog page", () => {
  const wrapper = render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );

  expect(wrapper.container.querySelector("#root > div:nth-child(3) > div"));
});

test("should display content Blog page", () => {
  const wrapper = render(
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  );

  expect(wrapper.getByText("Publicações")).toBeInTheDocument();
  expect(wrapper.getByRole("textbox", { name: /input/i }));
  expect(
    wrapper.container.querySelector(
      "#root > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div"
    )
  );
});
