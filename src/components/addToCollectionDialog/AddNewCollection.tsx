import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Loader from '@components/loader';
import TextBlock from '@components/textBlock';
import Textfield from '@components/textfield';
import { Typography, FontWeight } from '@constants';

const AddNewCollection = ({
  newCollection,
  newCollectionFieldError,
  setNewCollection,
  onCreate,
  onClose,
  loading,
  styles,
}: AddNewCollectionProps) => {
  return (
    <View style={styles.addNewCollectionContainer}>
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
          style={styles.buttonContainer}
          onPress={onClose}
        >
          <TextBlock typography={Typography.bodyLarge}>Cancel</TextBlock>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.buttonContainer, styles.createButton]}
          disabled={loading}
          onPress={onCreate}
        >
          {loading ? (
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

export default AddNewCollection;
