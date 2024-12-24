import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import { Icons, Routes, Typography } from '@constants';
import FloatingDrawer from '@config/floatingDrawer/FloatingDrawer';

const { search: searchRoute } = Routes.Stack;

const Header = ({ styles, headerStyles, children }: HomeHeaderProps) => {
  const { navigate } = useNavigation<StackNavigation>();

  return (
    <View style={headerStyles}>
      <View style={styles.headerRow}>
        <FloatingDrawer />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchContainer}
          onPress={() => navigate(searchRoute)}
        >
          <Icon
            icon={Icons.feather.search}
            size={18}
          />
          <TextBlock typography={Typography.titleMedium}>Search 878,875 games</TextBlock>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default Header;
