import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';
// visto a maioria da logica na monitoria do rod 28/01
describe('testa o component About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
});
