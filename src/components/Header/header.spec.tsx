import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from ".";

test("should display Header and header Image", () => {
  const wrapper = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(
    wrapper.getByRole("img", {
      name: /logo/i,
    })
  ).toBeInTheDocument();
});
