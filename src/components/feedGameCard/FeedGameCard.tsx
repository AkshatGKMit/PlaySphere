import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import GameCard from '@components/gameCard';
import Icon from '@components/icon';
import Loader from '@components/loader';
import { Icons } from '@constants';
import useCollectionMutation from '@network/hooks/useCollectionMutation';
import { Colors } from '@themes';

import styles from './styles';

const FeedGameCard = ({ feed, collectionId }: FeedGameCardProps) => {
  const { game, id: feedId } = feed;

  const { removeGameFromCollectionLoading, mutateRemoveGameFromCollection } =
    useCollectionMutation();

  const onPressDelete = useCallback(() => {
    mutateRemoveGameFromCollection({ collectionId, feedId, game, gameId: game.id });
  }, [collectionId, feedId, game, mutateRemoveGameFromCollection]);

  return (
    <GameCard
      game={game}
      hideAddButton
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressDelete}
        disabled={removeGameFromCollectionLoading}
        style={styles.deleteContainer}
      >
        {removeGameFromCollectionLoading ? (
          <Loader size={'small'} />
        ) : (
          <Icon
            icon={Icons.materialIcons.close}
            color={Colors.white}
            size={16}
          />
        )}
      </TouchableOpacity>
    </GameCard>
  );
};

export default memo(FeedGameCard);
