'use strict';

import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PrimaryColor = colors.PRIMARY;

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {},
  lable: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  // label: {},
  // label: {},
  // label: {},
  // customMarker: {},
});
