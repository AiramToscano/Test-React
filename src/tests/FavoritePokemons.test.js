import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('testa o component Favorite Pokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const textFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(textFavorites).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const buttomAll = screen.getByText('All');
    userEvent.click(buttomAll);
    const details = screen.getByText(/More details/i);
    // console.log(details.innerHTML);
    userEvent.click(details);
    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    history.push('/favorites');
    // const { pathname } = history.location;
    // console.log(pathname);
    const favorit = screen.getByTestId('pokemon-name');
    expect(favorit).toBeInTheDocument();
    // console.log(favorit.innerHTML);
  });
});
