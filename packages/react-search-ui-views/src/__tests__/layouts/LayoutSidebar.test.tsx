import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LayoutSidebar from "../../layouts/LayoutSidebar";

it("renders correctly", () => {
  const { container } = render(
    <LayoutSidebar className="sui-layout-sidebar">Hello world!</LayoutSidebar>
  );
  expect(container).toMatchSnapshot();
});

it("renders toggled class based on state", () => {
  const { container } = render(
    <LayoutSidebar className="sui-layout-sidebar">Hello world!</LayoutSidebar>
  );

  const toggleButton = screen.getByText("Show Filters");
  fireEvent.click(toggleButton);

  const sidebar = container.querySelector(".sui-layout-sidebar");
  expect(sidebar).toHaveClass("sui-layout-sidebar--toggled");
});

it("updates isSidebarToggled state on button click", () => {
  const { container } = render(
    <LayoutSidebar className="sui-layout-sidebar">Hello world!</LayoutSidebar>
  );

  const toggleButton = screen.getByText("Show Filters");
  const sidebar = container.querySelector(".sui-layout-sidebar");

  expect(sidebar).not.toHaveClass("sui-layout-sidebar--toggled");

  fireEvent.click(toggleButton);
  expect(sidebar).toHaveClass("sui-layout-sidebar--toggled");

  fireEvent.click(toggleButton);
  expect(sidebar).not.toHaveClass("sui-layout-sidebar--toggled");
});

it("does not render toggle buttons when sidebar content is empty", () => {
  render(
    <LayoutSidebar className="sui-layout-sidebar">
      <div />
    </LayoutSidebar>
  );

  expect(screen.queryByText("Show Filters")).not.toBeInTheDocument();
  expect(screen.queryByText("Save Filters")).not.toBeInTheDocument();
});
