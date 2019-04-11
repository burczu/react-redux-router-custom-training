import React from 'react';

// HOC jest to funkcja przyjmująca komponent jako parametr
export const withLayout = (Component) =>
  // funkcja ta zwraca inny komponent, które jakoś
  // rozszerzy komponent przekazany jako parametr
  class LayoutHandler extends React.Component {
    constructor(props) {
      super(props);

      this.toggleLayout = this.toggleLayout.bind(this);
    }

    state = { layout: 'red' };

    // przykładowy HOC posiada metodę do zmiany
    // wartości `layout`, która trzyma w swoim stanie
    toggleLayout() {
      const { layout } = this.state;

      this.setState({
        layout: layout === 'red' ? 'blue' : 'red',
      });
    }

    render() {
      const { layout } = this.state;

      // wzbogacamy propsy wrappoweanego komponentu:
      const newProps = {
        ...this.props, // bierzemy wszystkie propsy, które przychodzą z zewnątrz
        ...this.state, // dodajemy cały stan komponentu LayoutHandler
        toggleLayout: this.toggleLayout, // dodajemy metody komponenty LayoutHandler
      };

      return (
        <div className={layout}>
          {/*
            przekazanie wzbogaconych propów do oryginalnego komponentu
            ---
            zauważ wykorzystanie operatora "spread" - przy komponentach React
            działa to tak: jeśli props = { a: 1, b: 2 } to
            <Component {...props} /> jest tożsame z:
            <Component a={props.a} b={props.b} />
          */}
          <Component {...newProps} />
        </div>
      );
    }
  };
