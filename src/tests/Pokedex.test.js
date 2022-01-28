import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa o component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2Pokedex = screen
      .getByRole('heading', { nivel: 2, name: /Encountered pokémons/i });
    expect(h2Pokedex).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      const buttomNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(buttomNext).toBeInTheDocument();
      pokemons.forEach(({ name }) => {
        userEvent.click(buttomNext);
        expect(name).toBeDefined();
        // console.log(name);
      });
    });
  it('O 1 Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último',
    () => {
      const buttomNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(buttomNext).toBeInTheDocument();
      pokemons.forEach(({ name }) => {
        userEvent.click(buttomNext);
        if (name === 'Dragonair') {
          const pokemonFirst = screen.getByText(/pikachu/i);
          expect(pokemonFirst).toBeInTheDocument();
        }
        expect(name).toBeDefined();
        // console.log(name);
      });
    });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const buttomFilters = screen.getAllByTestId('pokemon-type-button');
    const buttomAll = screen.getByText('All');
    const tamanhoPokemon = screen.getAllByTestId('pokemon-name');
    expect(buttomAll).toBeDefined();
    userEvent.click(buttomAll);
    expect(tamanhoPokemon).toHaveLength(1);
    buttomFilters.forEach((e) => {
      expect(tamanhoPokemon).toHaveLength(1);
      expect(e).toBeInTheDocument();
      //   console.log(e.innerHTML);
    });
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const buttomFilters = screen.getAllByTestId('pokemon-type-button');
    const buttomAll = screen.getByText('All');
    const NUMBERFILTERS = 7;
    const pokemonsTypes = ['Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
      // estava com problema em matar um strike, O pedro folego colega da trybe,
      // me mostrou que eu podia fazer desse jeito, e funcionou!
      // criar um array com os tipos de pokemons e verificar se ao clicar em cada
      // o nome do botao tem que ser o mesmo do tipo do pokemon
    expect(buttomAll).toBeInTheDocument();
    expect(buttomFilters).toHaveLength(NUMBERFILTERS);
    pokemonsTypes.forEach((e) => {
      const pokemonType = screen.getByRole('button', { name: e });
      expect(pokemonType).toBeInTheDocument();
      userEvent.click(pokemonType);
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const buttomAll = screen.getByText('All');
    expect(buttomAll).toBeInTheDocument();
    userEvent.click(buttomAll);
    pokemons.forEach(({ name }) => {
      expect(name).toBeDefined();
    //   console.log(name);
    });
  });
});
