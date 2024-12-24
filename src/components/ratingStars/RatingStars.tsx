import React from 'react';

import Icon from '@components/icon';
import { Icons } from '@constants';
import { Colors } from '@themes';

const RatingStars = (rating: number, starSize: number = 12) => {
  return Array.from({ length: 5 }).map((_, index) => {
    if (index < Math.floor(rating)) {
      return (
        <Icon
          key={index}
          icon={Icons.materialIcons.star}
          color={Colors.yellow}
          size={starSize}
        />
      );
    }

    if (index === Math.floor(rating) && rating % 1 !== 0) {
      return (
        <Icon
          key={index}
          icon={Icons.materialIcons.starHalf}
          color={Colors.yellow}
          size={starSize}
        />
      );
    }

    return (
      <Icon
        key={index}
        icon={Icons.materialIcons.starOutline}
        color={Colors.grey}
        size={starSize}
      />
    );
  });
};

export default RatingStars;
