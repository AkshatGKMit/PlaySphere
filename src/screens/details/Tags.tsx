import React from 'react';
import { View } from 'react-native';

import TextBlock from '@components/textBlock';
import { FontWeight, Typography } from '@constants';

const Tags = ({ genres, tags, styles }: DetailsTagsProps) => {
  return (
    <>
      <View style={styles.separator} />
      <View style={styles.contentSection}>
        <TextBlock
          typography={Typography.titleLarge}
          fontWeight={FontWeight.bold}
        >
          Tags
        </TextBlock>
        <View style={styles.wrapContainer}>
          {genres?.slice(0, 4).map(({ id, name: genreName }) => (
            <TextBlock
              key={id}
              style={styles.chip}
            >
              {genreName}
            </TextBlock>
          ))}
          {tags?.slice(0, 4).map(({ id, name: tagName }) => (
            <TextBlock
              key={id}
              style={styles.chip}
            >
              {tagName}
            </TextBlock>
          ))}
        </View>
      </View>
    </>
  );
};

export default Tags;
