import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils';


export default function LevelRate({ rate, iconsize }: any) {

  const color = colors.PRIMARY;
  const noColor = "rgba(255,255,255,0.5)";
  const size = iconsize ? iconsize : 18;
  const iconName = "lightning-bolt";

  return (
    <>
      {rate === 1 ?
        <>
          <Icon name={iconName} color={color} size={size}></Icon>
          <Icon name={iconName} color={noColor} size={size}></Icon>
          <Icon name={iconName} color={noColor} size={size}></Icon>
        </>
        : null
      }
      {rate === 2 ?
        <>
          <Icon name={iconName} color={color} size={size}></Icon>
          <Icon name={iconName} color={color} size={size}></Icon>
          <Icon name={iconName} color={noColor} size={size}></Icon>
        </>
        : null
      }
      {rate >= 3 ?
        <>
          <Icon name={iconName} color={color} size={size}></Icon>
          <Icon name={iconName} color={color} size={size}></Icon>
          <Icon name={iconName} color={color} size={size}></Icon>
        </>
        : null
      }
    </>
  )
}
