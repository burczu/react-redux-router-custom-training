import React from 'react';

const { Provider, Consumer } = React.createContext('transparent');

// składnia ES6: za pomocą "as" możemy przezwać eksportowaną wartość
// w tym przypadku import z tego modułu może mieć postać:
// import { ButtonColorProvider, ButtonColorConsumer } from './context';
export { Provider as ButtonColorProvider, Consumer as ButtonColorConsumer };
