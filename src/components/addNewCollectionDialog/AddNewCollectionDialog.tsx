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

const AddNewCollectionDialog = () => {
  const [newCollection, setNewCollection] = useState('');
  const [newCollectionFieldError, setNewCollectionFieldError] = useState('');

  const {
    mutateAddNewCollection,
    addNewCollectionLoading,
    addNewCollectionSuccess,
    addNewCollectionError,
  } = useCollectionMutation();

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
    }
  }, [addNewCollectionSuccess]);

  const onCreateNewCollection = useCallback(() => {
    if (!newCollection) {
      setNewCollectionFieldError('Collection name is required');
      return;
    }

    mutateAddNewCollection({ name: newCollection });
  }, [mutateAddNewCollection, newCollection]);

  useEffect(() => {
    if (addNewCollectionSuccess) {
      setNewCollection('');
      Dialog.hide();
    }
  }, [addNewCollectionSuccess]);

  const styles = useStyles(ThemedStyles);

  return (
    <View style={styles.dialogContainer}>
      <TextBlock
        typography={Typography.titleLarge}
        fontWeight={FontWeight.bold}
      >
        Create a new Collection
      </TextBlock>
      <Textfield
        placeholder="Collection Name"
        value={newCollection}
        onChangeText={setNewCollection}
        error={newCollectionFieldError}
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
          disabled={addNewCollectionLoading}
          onPress={onCreateNewCollection}
        >
          {addNewCollectionLoading ? (
            <Loader color={styles.createButton.color} />
          ) : (
            <TextBlock
              typography={Typography.bodyLarge}
              color={styles.createButton.color}
              fontWeight={FontWeight.bold}
            >
              Create
            </TextBlock>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewCollectionDialog;