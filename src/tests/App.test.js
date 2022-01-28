import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('testa o component App', () => {
  it('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /home/i });
    const secondLink = screen.getByRole('link', { name: /about/i });
    const thirtLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirtLink).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL /', () => {
    const { history } = renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(firstLink);
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/');
  });

  it('Teste se ao clicar no link About, vai para a barra de navegação correta.', () => {
    const { history } = renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(secondLink);
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/about');
  });

  it('Teste se ao clicar em Fav Pokémons, vai para a barra de navegação correta.', () => {
    const { history } = renderWithRouter(<App />);
    const thirtLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(thirtLink);
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/que-nao-existe/');
    const notFoundTitle = screen.getByText('Page requested not found');
    expect(notFoundTitle).toBeInTheDocument();
  });
});
