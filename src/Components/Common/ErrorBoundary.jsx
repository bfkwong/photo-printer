import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Uh-oh, something catestrophic happened :(</h1>
          <p>Please try again later.</p>
          <p>If this issue keeps occurring, please email us at tech@photoprinter.com so we can fix this for you.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
