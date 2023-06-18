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
    width: screenWidth * 0.75,
    lineHeight: 20,
  },
  timeStamp: {
    alignSelf: 'flex-end',
  },
  datePicker: {
    // width: screenWidth * 0.8,
    height: 56,
    // borderWidth: 1,
    // borderColor: '#e1e1e1',
    // borderRadius: 2,
    // justifyContent: 'flex-start',
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: 13,
    marginRight: 4,
  },
  totalValue: {
    fontWeight: '300',
    fontSize: 24,
  },
  dateStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
    padding: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: '300',
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    // fontWeight: '500',
  },
  offer: {
    fontWeight: '200',
    fontSize: 20,
    marginBottom: 4,
  },
  weight: {
    fontWeight: '400',
    fontSize: 16,
  },
  item: {
    width: '100%',
    padding: 14,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  checkBox: {
    fontSize: 20,
  },
});
