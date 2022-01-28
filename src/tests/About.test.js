import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';
// visto a maioria da logica na monitoria do rod 28/01
describe('testa o component App', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2About = screen.getByRole('heading', { name: /pokédex/i });
    expect(h2About).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const textAbout = screen.getAllByText(/pokémons/i);
    // unica palavra que possui nos dois textos
    expect(textAbout).toHaveLength(2);
    textAbout.forEach((e) => {
      expect(e).toBeInTheDocument();
    });
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const imgAbout = screen.getByAltText(/pokédex/i);
    expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgAbout).toHaveAttribute('alt', 'Pokédex');
  });
});
