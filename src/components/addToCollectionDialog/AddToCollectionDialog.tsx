import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import ActionButton from '@components/actionButton';
import AddOrUpdateCollectionDialog from '@components/addNewCollectionDialog';
import Dialog from '@components/dialog';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { FontWeight, Icons, Typography } from '@constants';
import useGameInCollectionQuery from '@network/hooks/useGameInCollectionQuery';
import useCollectionMutation from '@network/hooks/useCollectionMutation';

import CloseIcon from './CloseIcon';
import CollectionContainer from './CollectionContainer';
import ThemedStyles from './styles';

const AddToCollectionDialog = ({ game }: { game: Game }) => {
  const { id: gameId } = game;

  const [mutatingId, setMutatingId] = useState<number | null>(null);

  const {
    gameInCollections,
    isPending: gameInCollectionsLoading,
    isRefetching: gameInCollectionsRefetching,
  } = useGameInCollectionQuery(gameId);

  const { mutateGameToCollection, updateGameLoading } = useCollectionMutation();

  const styles = useStyles(ThemedStyles);

  useEffect(() => {
    if (!updateGameLoading) {
      setMutatingId(null);
    }
  }, [updateGameLoading]);

  const onPressCollection = useCallback(
    ({ id, gameInCollection }: GameInCollection) => {
      setMutatingId(id);
      mutateGameToCollection({ collectionId: id, gameId, isAdding: !gameInCollection, game });
    },
    [game, gameId, mutateGameToCollection],
  );

  const collectionNames = useMemo(
    () => gameInCollections.map(({ name }) => name),
    [gameInCollections],
  );

  const showAddToNewCollectionDialog = useCallback(() => {
    Dialog.show({
      child: (
        <AddOrUpdateCollectionDialog
          collectionNames={collectionNames}
          game={game}
        />
      ),
      onClose: () => {
        Dialog.show({ child: <AddToCollectionDialog game={game} /> });
      },
    });
  }, [collectionNames, game]);

  return (
    <View style={styles.dialogContainer}>
      {CloseIcon(styles)}
      <TextBlock
        typography={Typography.titleLarge}
        fontWeight={FontWeight.bold}
        style={styles.dialogHeading}
      >
        Select a Collection
      </TextBlock>
      <CollectionContainer
        gameInCollections={gameInCollections}
        gameInCollectionsLoading={gameInCollectionsLoading}
        gameInCollectionsRefetching={gameInCollectionsRefetching}
        mutatingId={mutatingId}
        onPressCollection={onPressCollection}
        updateGameLoading={updateGameLoading}
        styles={styles}
      />
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <TextBlock
          typography={Typography.bodySmall}
          fontWeight={FontWeight.bold}
          color={styles.separator.backgroundColor}
        >
          OR
        </TextBlock>
        <View style={styles.separator} />
      </View>
      <ActionButton
        label="Add to a new collection"
        leadingIcon={Icons.materialIcons.add}
        fontWeight={FontWeight.semibold}
        iconSize={20}
        style={styles.addToCollection}
        onPress={showAddToNewCollectionDialog}
      />
    </View>
  );
};

export default AddToCollectionDialog;
