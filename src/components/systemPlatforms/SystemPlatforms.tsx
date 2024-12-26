import React, { useCallback } from 'react';
import { View } from 'react-native';

import Icon from '@components/icon';
import { MainSystemPlatforms, Icons } from '@constants';

import styles from './styles';

const SystemPlatformView = ({ systemPlatforms, starSize }: GameCardSystemPlatformProps) => {
  const getPlatformIcon = useCallback((name: string) => {
    if (name.includes(MainSystemPlatforms.android.name)) {
      return Icons.materialIcons.smartPhone;
    }
    if (name.includes(MainSystemPlatforms.ios.name)) {
      return Icons.materialCommunityIcons.ios;
    }
    if (name.includes(MainSystemPlatforms.linux.name)) {
      return Icons.fontAwesome.linux;
    }
    if (
      name.includes(MainSystemPlatforms.macintosh.name) ||
      name.includes(MainSystemPlatforms.macos.name)
    ) {
      return Icons.materialIcons.apple;
    }
    if (name.includes(MainSystemPlatforms.nintendo.name)) {
      return Icons.materialCommunityIcons.nintendo;
    }
    if (name.includes(MainSystemPlatforms.pc.name)) {
      return Icons.materialCommunityIcons.microsoftWindows;
    }
    if (name.includes(MainSystemPlatforms.playstation.name)) {
      return Icons.materialCommunityIcons.sonyPlaystation;
    }
    if (name.includes(MainSystemPlatforms.xbox.name)) {
      return Icons.materialCommunityIcons.xbox;
    }

    return null;
  }, []);

  const renderedIcons = new Set<string>();

  return (
    <View style={styles.container}>
      {systemPlatforms.map((platform) => {
        const icon = getPlatformIcon(platform.toLowerCase());

        if (icon && !renderedIcons.has(icon.name)) {
          renderedIcons.add(icon.name);
          return (
            <Icon
              icon={icon}
              key={platform}
              size={starSize ?? 12}
            />
          );
        }

        return null;
      })}
    </View>
  );
};

export default SystemPlatformView;
