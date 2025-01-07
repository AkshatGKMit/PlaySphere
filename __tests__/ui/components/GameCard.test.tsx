import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { act, screen } from '@testing-library/react-native';

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
    jest.useFakeTimers();
    render(<GameCard game={game} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(rootId)).toBeTruthy();
  });

  it('Renders Game Card Title', () => {
    jest.useFakeTimers();
    render(<GameCard game={game} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(gameTitleId).children).toContain(game.name);
  });

  it('Does Not Renders Game Card Release date', () => {
    jest.useFakeTimers();
    render(<GameCard game={game} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.queryByTestId(gameReleaseDateId)).toBeNull();
  });

  it('Renders Game Card Release date', () => {
    const futureDate = '2030-06-12';

    jest.useFakeTimers();
    render(<GameCard game={{ ...game, released: futureDate }} />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(gameReleaseDateId)).not.toBeNull();
  });
});
