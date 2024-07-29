import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { render } from "@testing-library/react";
import { capitalFirstLetter, getRelativeTime } from "../../utils";
import userEvent from "@testing-library/user-event";
import CardBasic from ".";

test("should display the posts", () => {
  const props = {
    number: 1,
    title: "Esse é um post de teste",
    content: "let foo = 42; // foo is now a number",
    date: "2023-10-01T00:00:00Z",
    handleClick: () => {},
  };

  const wrapper = render(
    <BrowserRouter>
      <CardBasic
        content={props.content}
        date={props.date}
        handleClick={props.handleClick}
        number={props.number}
        title={props.title}
      />
    </BrowserRouter>
  );

  expect(wrapper.getByText("Esse é um post de teste")).toBeInTheDocument();

  expect(
    wrapper.getByText("let foo = 42; // foo is now a number")
  ).toBeInTheDocument();

  const formattedDate = capitalFirstLetter(getRelativeTime(props.date));
  expect(wrapper.getByText(formattedDate)).toBeInTheDocument();
});

test("should click in the card and navigate to /posts", async () => {
  const user = userEvent.setup();

  const mockHandleClick = vi.fn();

  const props = {
    number: 1,
    title: "Esse é um post de teste",
    content: "let foo = 42; // foo is now a number",
    date: "2023-10-01T00:00:00Z",
    handleClick: mockHandleClick,
  };

  const wrapper = render(
    /**
     * MemoryRouter é um componente que serve para simular a navegação de rotas.
     * A grande diferença para o Router do browser é que a rota fica salva apenas na memória.
     * initialEntries é um array que simula as rotas que o usuário acessou.
     */
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <CardBasic
              content={props.content}
              date={props.date}
              handleClick={props.handleClick}
              number={props.number}
              title={props.title}
            />
          }
        />

        <Route path="/posts" element={<div>Página de detalhe do Post</div>} />
      </Routes>
    </MemoryRouter>
  );

  const postButton = wrapper.container.querySelector(
    "#root > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)"
  );

  if (postButton) {
    await user.click(postButton);
  }

  expect(mockHandleClick);
  
  expect(wrapper.getByText(props.title)).toBeInTheDocument();
});
