import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from ".";

test("should display Profile componente and your content", () => {
  const wrapper = render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  expect(
    wrapper.container.querySelector(
      "#root > div:nth-child(3) > div > div:nth-child(1) > div"
    )
  );

  expect(
    wrapper.container.querySelector(
      "#root > div:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1)"
    )
  );

  expect(
    wrapper.container.querySelector(
      "#root > div:nth-child(3) > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2)"
    )
  );
});
