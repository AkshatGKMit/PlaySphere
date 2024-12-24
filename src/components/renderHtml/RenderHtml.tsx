import React from 'react';
import { View } from 'react-native';

import TextBlock from '@components/textBlock';
import { FontWeight } from '@constants';

const RenderHtml = ({ html, children, maxLines }: RenderHtmlProps) => {
  const parseHtml = (text: string) => {
    if (!text) {
      return '';
    }

    const tagPattern = /(<.*?[a-zA-Z0-9].*?>)/;
    const parts = text.split(tagPattern).filter(Boolean);

    return parts.map((part, index) => {
      const match = part.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*)?>$/);
      if (match) {
        const tagName = match[0].toLowerCase();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const attributes = match[2] ? parseAttributes(match[2]) : {};

        switch (tagName) {
          case '<p>':
            return <TextBlock key={index}>{parseHtml(parts[index + 1])}</TextBlock>;
          case '<b>':
            return (
              <TextBlock
                key={index}
                fontWeight={FontWeight.bold}
              >
                {parseHtml(parts[index + 1])}
              </TextBlock>
            );
          case '<br />':
            return '\n';
          default:
            return;
        }
      } else {
        return <TextBlock key={index}>{part}</TextBlock>;
      }
    });
  };

  const parseAttributes = (attrString: string) => {
    const attrs: any = {};
    attrString
      .trim()
      .split(/\s+/)
      .forEach((attr) => {
        const [key, value] = attr.split('=');
        attrs[key] = value ? value.replace(/['"]/g, '') : true;
      });
    return attrs;
  };

  return (
    <View>
      <TextBlock numberOfLines={maxLines}>{parseHtml(html)}</TextBlock>
      {children}
    </View>
  );
};

export default RenderHtml;
