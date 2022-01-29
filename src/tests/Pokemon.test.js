import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testa o component Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(/pikachu/i);
    expect(namePokemon).toBeInTheDocument();
    const imgPokemon = screen.getByAltText(/pikachu/i);
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
    const moreDetails = screen.getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const typePokemon = screen.getByText('Electric');
    expect(typePokemon).toBeInTheDocument();
    const weigthPokemon = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weigthPokemon).toBeInTheDocument();
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link para exibir detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      const moreDetails = screen.getByText(/More details/i);
      expect(moreDetails).toBeInTheDocument();
      userEvent.click(moreDetails);
      const { pathname } = history.location;
      // console.log(pathname);
      expect(pathname).toBe('/pokemons/25');
    });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      const { history } = renderWithRouter(<App />);
      const details = screen.getByText(/More details/i);
      // console.log(details.innerHTML);
      userEvent.click(details);
      const check = screen.getByRole('checkbox');
      userEvent.click(check);
      history.push('/favorites');
      // const { pathname } = history.location;
      // console.log(pathname);
      const imgFavorites = screen.getByAltText(/favorite/i);
      // console.log(imgFavorites.innerHTML);
      expect(imgFavorites).toHaveAttribute('src', '/star-icon.svg');
      expect(imgFavorites).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    });
});
