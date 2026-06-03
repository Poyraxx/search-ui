import React from "react";

import { appendClassName } from "../view-helpers";

interface LayoutSidebarProps {
  className: string;
  children: React.ReactNode;
}

interface LayoutSidebarState {
  isSidebarToggled: boolean;
  hasSidebarContent: boolean;
}

class LayoutSidebar extends React.Component<
  LayoutSidebarProps,
  LayoutSidebarState
> {
  private sidebarRef = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = { isSidebarToggled: false, hasSidebarContent: false };
  }

  componentDidMount() {
    this.syncSidebarContentState();
  }

  componentDidUpdate() {
    this.syncSidebarContentState();
  }

  toggleSidebar = () => {
    this.setState(({ isSidebarToggled }) => ({
      isSidebarToggled: !isSidebarToggled
    }));
  };

  syncSidebarContentState = () => {
    const sidebar = this.sidebarRef.current;
    const hasSidebarContent = Array.from(sidebar?.childNodes ?? [])
      .filter((node) => {
        return !(
          node instanceof HTMLButtonElement &&
          node.classList.contains("sui-layout-sidebar-toggle")
        );
      })
      .some((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return Boolean(node.textContent?.trim());
        }

        if (!(node instanceof HTMLElement)) return false;

        return (
          Boolean(node.textContent?.trim()) ||
          node.matches("input,select,textarea,button,a") ||
          Boolean(node.querySelector("input,select,textarea,button,a"))
        );
      });

    if (
      hasSidebarContent !== this.state.hasSidebarContent ||
      (!hasSidebarContent && this.state.isSidebarToggled)
    ) {
      this.setState({
        hasSidebarContent,
        isSidebarToggled: hasSidebarContent
          ? this.state.isSidebarToggled
          : false
      });
    }
  };

  renderToggleButton = (label) => {
    if (!this.state.hasSidebarContent) return null;

    return (
      <button
        hidden
        type="button"
        className="sui-layout-sidebar-toggle"
        onClick={this.toggleSidebar}
      >
        {label}
      </button>
    );
  };

  render() {
    const { className, children } = this.props;
    const { isSidebarToggled } = this.state;

    const classes = appendClassName(
      className,
      isSidebarToggled ? `${className}--toggled` : null
    );

    return (
      <>
        {this.renderToggleButton("Show Filters")}
        <div className={classes} ref={this.sidebarRef}>
          {this.renderToggleButton("Save Filters")}
          {children}
        </div>
      </>
    );
  }
}

export default LayoutSidebar;
