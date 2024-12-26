import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Dialog from '@components/dialog';
import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import Textfield from '@components/textfield';
import useStyles from '@config/useStyles';
import { FontWeight, Typography } from '@constants';
import useCollectionMutation from '@network/hooks/useCollectionMutation';

import ThemedStyles from './styles';

const AddOrUpdateCollectionDialog = ({
  collectionName,
  collectionId,
  collectionNames,
  game,
  onSuccess,
}: {
  collectionName?: string;
  collectionId?: number;
  collectionNames?: string[];
  game?: Game;
  onSuccess?: (name: string) => void;
}) => {
  const [newOrUpdateCollection, setNewOrUpdateCollection] = useState('');
  const [newCollectionFieldError, setNewCollectionFieldError] = useState('');

  const {
    mutateAddOrUpdateCollection,
    addOrUpdateCollectionLoading,
    addOrUpdateCollectionSuccess,
    addOrUpdateCollectionError: addOrUpdateCollectionError,
  } = useCollectionMutation();

  useEffect(() => {
    if (collectionName) {
      setNewOrUpdateCollection(collectionName);
    }
  }, [collectionName]);

  useEffect(() => {
    setNewCollectionFieldError('');
  }, [newOrUpdateCollection]);

  useEffect(() => {
    if (addOrUpdateCollectionError) {
      setNewCollectionFieldError(addOrUpdateCollectionError);
    }
  }, [addOrUpdateCollectionError]);

  useEffect(() => {
    if (addOrUpdateCollectionSuccess) {
      setNewOrUpdateCollection('');
      setNewCollectionFieldError('');
    }
  }, [addOrUpdateCollectionSuccess]);

  const onPressAction = useCallback(() => {
    if (!newOrUpdateCollection) {
      setNewCollectionFieldError('Collection name is required');
      return;
    }

    if (collectionNames?.includes(newOrUpdateCollection)) {
      setNewCollectionFieldError(`Collection name ${newOrUpdateCollection} already exists`);
      return;
    }

    mutateAddOrUpdateCollection({
      name: newOrUpdateCollection,
      game,
      updateCollectionId: collectionId,
    });
  }, [collectionId, collectionNames, game, mutateAddOrUpdateCollection, newOrUpdateCollection]);

  useEffect(() => {
    if (addOrUpdateCollectionSuccess) {
      onSuccess?.(newOrUpdateCollection);
      setNewOrUpdateCollection('');

      Dialog.hide();
    }
  }, [addOrUpdateCollectionSuccess, collectionId, newOrUpdateCollection, onSuccess]);

  const styles = useStyles(ThemedStyles);

  return (
    <View style={styles.dialogContainer}>
      <TextBlock
        typography={Typography.titleLarge}
        fontWeight={FontWeight.bold}
      >
        {game
          ? 'Add to new collection'
          : collectionName
          ? 'Update Collection'
          : 'Create a new Collection'}
      </TextBlock>
      <Textfield
        placeholder="Collection Name"
        value={newOrUpdateCollection}
        onChangeText={setNewOrUpdateCollection}
        error={newCollectionFieldError}
        autoFocus
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonButton}
          onPress={() => Dialog.hide()}
        >
          <TextBlock typography={Typography.bodyLarge}>Cancel</TextBlock>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.buttonButton, styles.createButton]}
          disabled={addOrUpdateCollectionLoading}
          onPress={onPressAction}
        >
          {addOrUpdateCollectionLoading ? (
            <Loader color={styles.createButton.color} />
          ) : (
            <TextBlock
              typography={Typography.bodyLarge}
              color={styles.createButton.color}
              fontWeight={FontWeight.bold}
            >
              {game ? 'Create and Add' : collectionName ? 'Update' : 'Create'}
            </TextBlock>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddOrUpdateCollectionDialog;
