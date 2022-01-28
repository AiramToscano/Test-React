import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
// visto na monitoria do rod 28/01/2022
describe('testa o component NotFound', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/que-nao-existe/');
    const notFound = screen.getByRole('heading', { name: /Page/i });
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/que-nao-existe/');
    const imgNotFound = screen.getByAltText(/pikachu/i);
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgNotFound)
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
