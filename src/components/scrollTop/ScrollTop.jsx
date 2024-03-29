import { Component } from "react";
import { withRouter } from "react-router";

class ScrollTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollTop);