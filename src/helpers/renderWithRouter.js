import { render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// codigo da aula ao vivo
function renderWithRouter(Component) {
  const history = createMemoryHistory();

  // const container = render(<Router history={history}>{Component}</Router>);

  return {
    // ...container,
    ...render(<Router history={ history }>{Component}</Router>),
    history,
  };
}

export default renderWithRouter;
