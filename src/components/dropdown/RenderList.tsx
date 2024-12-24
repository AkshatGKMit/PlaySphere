import React, { memo } from 'react';
import { TouchableOpacity, View, Animated, FlatList } from 'react-native';

import TextBlock from '@components/textBlock';

const RenderItem = ({ item, setFocus, onSelect, styles }: DropdownRenderItemProps) => {
  const { label } = item;

  return (
    <TouchableOpacity
      onPress={() => {
        setFocus(false);
        onSelect?.(item);
      }}
      activeOpacity={0.5}
    >
      <View style={styles.item}>
        <TextBlock style={styles.itemLabel}>{label}</TextBlock>
      </View>
    </TouchableOpacity>
  );
};

const RenderList = ({
  items,
  onSelect,
  onLayout,
  setFocus,
  styles,
  listViewStyles,
  listStyles,
}: DropDownRenderListProps) => (
  <Animated.View style={listViewStyles}>
    <FlatList
      data={items}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => {
        const { id } = item;

        return (
          <RenderItem
            key={id}
            item={item}
            onSelect={onSelect}
            setFocus={setFocus}
            styles={styles}
          />
        );
      }}
      scrollEnabled={items.length > 7}
      showsVerticalScrollIndicator={false}
      onLayout={onLayout}
      style={listStyles}
    />
  </Animated.View>
);

export default memo(RenderList);
