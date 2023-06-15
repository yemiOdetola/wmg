'use strict';

import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PrimaryColor = colors.PRIMARY;

export default StyleSheet.create({
  welcome: {
    marginVertical: 12,
  },
  username: {
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  stylesText: {
    fontSize: 24,
    fontWeight: '600',
  },
  balance: {
    height: 82,
    width: '100%',
    backgroundColor: colors.PRIMARY,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    opacity: 0.75,
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#FFF',
  },
  creditLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#000',
  },
  creditVal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
  },
  dark: {
    color: '#000',
  },
  extra: {
    textTransform: 'uppercase',
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
    marginHorizontal: 4,
  },
  req: {
    backgroundColor: '#FFFFFF40',
    padding: 6,
  },
  reqTxt: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#FFF',
    fontWeight: '500',
  },
  credits: {
    backgroundColor: '#f9fafb',
    width: '100%',
    height: 48,
    borderRadius: 2,
    marginBottom: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroup: {
    padding: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    rowGap: 14,
    padding: 20,
  },
  featureIcon: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    width: screenWidth / 2 - 27,
    height: 200,
    borderRadius: 8,
    padding: 20,
  },
  f1: {
    backgroundColor: colors.YELLOW100,
  },
  f2: {
    backgroundColor: colors.ROSE100,
  },
  f3: {
    backgroundColor: colors.BLUE100,
  },
  f4: {
    backgroundColor: colors.GREEN100,
  },
  f5: {
    backgroundColor: '#f9fafb',
  },
  f6: {
    backgroundColor: '#f9aac0',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon1: {
    backgroundColor: colors.YELLOW300,
  },
  icon2: {
    backgroundColor: colors.ROSE200,
  },
  icon3: {
    backgroundColor: colors.BLUE200,
  },
  icon4: {
    backgroundColor: colors.GREEN200,
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 12,
  },
  subtitle: {
    color: '#000',
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 4,
  },
  action: {
    // width: '100%',
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 'auto',
  },
  actionText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  action1: {
    backgroundColor: colors.YELLOW,
  },
  action2: {
    backgroundColor: colors.ROSE,
  },
  action3: {
    backgroundColor: colors.BLUE,
  },
  action4: {
    backgroundColor: colors.GREEN,
  },
});
