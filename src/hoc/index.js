import React from 'react';

export const withLayout = (Component) =>
  class LayoutHandler extends React.Component {
    constructor(props) {
      super(props);

      this.toggleLayout = this.toggleLayout.bind(this);
    }

    state = { layout: 'red' };

    toggleLayout() {
      const { layout } = this.state;

      this.setState({
        layout: layout === 'red' ? 'blue' : 'red',
      });
    }

    render() {
      const { layout } = this.state;
      const newProps = {
        ...this.props,
        ...this.state,
        toggleLayout: this.toggleLayout,
      };

      return (
        <div className={layout}>
          <Component {...newProps} />
        </div>
      );
    }
  };
