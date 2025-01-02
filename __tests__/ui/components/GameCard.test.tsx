import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import GameCard from '@components/gameCard';
import { gameDetail, TestIds } from '@constants';
import { formatGameDetail } from '@network/dataFormatters';
import { render } from '@utility/test';

const {
  root: rootId,
  gameTitle: gameTitleId,
  gameReleaseDate: gameReleaseDateId,
} = TestIds.unit.gameCard;

describe('<GameCard />', () => {
  const game: Game = formatGameDetail(gameDetail);

  it('Renders Game Card', () => {
    render(<GameCard game={game} />);

    expect(screen.getByTestId(rootId)).toBeTruthy();
  });

  it('Renders Game Card Title', () => {
    render(<GameCard game={game} />);

    expect(screen.getByTestId(gameTitleId).children).toContain(game.name);
  });

  it('Does Not Renders Game Card Release date', () => {
    render(<GameCard game={game} />);

    expect(screen.queryByTestId(gameReleaseDateId)).toBeNull();
  });

  it('Renders Game Card Release date', () => {
    const futureDate = '2030-06-12';

    render(<GameCard game={{ ...game, released: futureDate }} />);

    expect(screen.getByTestId(gameReleaseDateId)).not.toBeNull();
  });
});
