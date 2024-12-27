import React, { memo } from 'react';
import { View } from 'react-native';

import Dropdown from '@components/dropdown';
import { GameCardShimmer } from '@components/gameCard';
import Loader from '@components/loader';
import { orderByDropdownItems, systemPlatformDropdownItems } from '@constants';
import { generateRandomString } from '@utility/helpers';

export const ListEmptyComponent = memo(
  ({ styles, theme, show = true }: GameListListEmptyComponentProps) => {
    if (!show) {
      return null;
    }

    return (
      <View style={styles.listEmptyContainer}>
        {Array.from({ length: 4 }).map((_, rowIndex) => {
          return (
            <View
              key={generateRandomString(rowIndex) + rowIndex}
              style={styles.listEmptyRow}
            >
              {Array.from({ length: 2 }).map((__, columnIndex) => (
                <GameCardShimmer
                  key={generateRandomString(columnIndex) + rowIndex + columnIndex}
                  theme={theme}
                />
              ))}
            </View>
          );
        })}
      </View>
    );
  },
);

export const ListHeaderComponent = ({
  styles,
  orderBy,
  selectedSystemPlatform,
  setOrderBy,
  setSelectedSystemPlatform,
  listHeaderBackgroundColor,
  show = true,
}: GameListHeaderProps) => {
  if (!show) {
    return null;
  }

  return (
    <View style={[styles.listHeaderContainer, { backgroundColor: listHeaderBackgroundColor }]}>
      <Dropdown
        items={orderByDropdownItems}
        onSelect={setOrderBy}
        value={orderBy}
        buttonInitials="Order By"
      />
      <Dropdown
        items={systemPlatformDropdownItems}
        onSelect={setSelectedSystemPlatform}
        value={selectedSystemPlatform}
        buttonInitials="Platform"
      />
    </View>
  );
};

export const ListFooterComponent = ({ hasData, hasNextPage }: GameListFooterProps) => {
  if (!hasData) {
    return null;
  }

  if (hasNextPage) {
    return <Loader />;
  }

  return null;
};
