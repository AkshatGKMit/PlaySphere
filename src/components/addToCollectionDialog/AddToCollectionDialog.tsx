import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useStyles from '@config/useStyles';
import { FontWeight, Icons, Typography } from '@constants';
import useGameInCollectionQuery from '@network/hooks/useGameInCollectionQuery';
import useCollectionMutation from '@network/hooks/useCollectionMutation';

import AddNewCollection from './AddNewCollection';
import CloseIcon from './CloseIcon';
import CollectionContainer from './CollectionContainer';
import ThemedStyles from './styles';

const AddToCollectionDialog = ({ game }: { game: Game }) => {
  const { id: gameId } = game;

  const [isAddNew, setAddNew] = useState(false);
  const [newCollection, setNewCollection] = useState('');
  const [newCollectionFieldError, setNewCollectionFieldError] = useState('');
  const [mutatingId, setMutatingId] = useState<number | null>(null);

  const {
    gameInCollections,
    isPending: gameInCollectionsLoading,
    refetch: refetchGameInCollections,
    isRefetching: gameInCollectionsRefetching,
  } = useGameInCollectionQuery(gameId);

  const {
    mutateAddNewCollection,
    addNewCollectionLoading,
    addNewCollectionSuccess,
    addNewCollectionError,
    mutateGameToCollection,
    updateGameLoading,
  } = useCollectionMutation();

  const styles = useStyles(ThemedStyles);

  const onCreateNewCollection = useCallback(() => {
    if (!newCollection) {
      setNewCollectionFieldError('Collection name is required');
      return;
    }

    const nameAtIndex = gameInCollections.findIndex(({ name }) => name === newCollection);
    if (nameAtIndex > -1) {
      setNewCollectionFieldError('Duplicate Name Not Allowed');
      return;
    }

    mutateAddNewCollection({ name: newCollection });
  }, [gameInCollections, mutateAddNewCollection, newCollection]);

  useEffect(() => {
    setNewCollectionFieldError('');
  }, [newCollection]);

  useEffect(() => {
    if (addNewCollectionError) {
      setNewCollectionFieldError(addNewCollectionError);
    }
  }, [addNewCollectionError]);

  useEffect(() => {
    if (addNewCollectionSuccess) {
      setNewCollection('');
      setNewCollectionFieldError('');
      setAddNew(false);
      refetchGameInCollections();
    }
  }, [addNewCollectionSuccess, refetchGameInCollections]);

  const onPressCollection = useCallback(
    ({ id, gameInCollection }: GameInCollection) => {
      setMutatingId(id);
      mutateGameToCollection({ collectionId: id, gameId, isAdding: !gameInCollection });
    },
    [gameId, mutateGameToCollection],
  );

  useEffect(() => {
    if (!updateGameLoading) {
      setMutatingId(null);
    }
  }, [updateGameLoading]);

  return (
    <View style={styles.dialogContainer}>
      {CloseIcon(styles)}
      <TextBlock
        typography={Typography.titleLarge}
        fontWeight={FontWeight.bold}
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
      {isAddNew ? (
        <AddNewCollection
          newCollection={newCollection}
          setNewCollection={setNewCollection}
          newCollectionFieldError={newCollectionFieldError}
          onCreate={onCreateNewCollection}
          onClose={() => setAddNew(false)}
          loading={addNewCollectionLoading}
          styles={styles}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addToCollection}
          onPress={() => setAddNew(true)}
        >
          <Icon
            icon={Icons.materialIcons.add}
            size={20}
            color={styles.createButton.color}
          />
          <TextBlock
            typography={Typography.bodyLarge}
            color={styles.createButton.color}
            fontWeight={FontWeight.semibold}
          >
            Create a new collection
          </TextBlock>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddToCollectionDialog;
