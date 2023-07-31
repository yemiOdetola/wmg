'use strict';

import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils';
import {usePreferences} from '../../hooks';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
    padding: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    // borderRadius: 8,
    padding: 6,
    paddingBottom: 20,
    // borderWidth: 0.5,
    // borderColor: '#403d39',
    borderBottomColor: '#403d39',
    borderBottomWidth: 0.5,
    marginBottom: 14,
  },
  avatar: {
    width: screenWidth / 4,
  },
  avatarImg: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: 6,
  },
  details: {
    width: (screenWidth / 3) * 2 - 32,
    padding: 10,
    paddingBottom: 0,
  },
  // category: {
  //   alignSelf: 'flex-start',
  //   borderRadius: 14,
  //   paddingHorizontal: 6,
  //   paddingVertical: 5,
  //   marginTop: 'auto',
  // },
  categoryText: {
    fontSize: 14,
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 4,
  },
  location: {
    fontSize: 11,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  eachStat: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  metaIcon: {
    marginTop: 22,
    fontSize: 18,
    color: '#403d39',
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});
