'use strict';

import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PrimaryColor = colors.PRIMARY;

export default StyleSheet.create({
  lable: {
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    fontSize: 14,
    width: screenWidth * .75,
    lineHeight: 20
  },
  timeStamp: {
    alignSelf: 'flex-end',
  },
});
