import React from 'react';
import { View, Pressable } from 'react-native';

import Icon from '@components/icon';
import { Icons } from '@constants';
import Dialog from '@components/dialog';
import { Colors } from '@themes';

import ThemedStyles from './styles';

const CloseIcon = (styles: ReturnType<typeof ThemedStyles>) => {
  return (
    <View style={styles.closeIcon}>
      <Pressable onPress={() => Dialog.hide()}>
        <Icon
          icon={Icons.materialIcons.close}
          color={Colors.white}
          size={20}
        />
      </Pressable>
    </View>
  );
};

export default CloseIcon;
