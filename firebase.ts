import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

export const initiateRealtimedb = () => {
  return firebase
    .app()
    .database('https://wmg-pnot-default-rtdb.firebaseio.com/')
    .ref()
    .on('value', (snapshot: any) => {
      console.log('User data: ', snapshot.val());
    });
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('AUTH STATUS', authStatus); // you can remove the console.log later
    GetFCMToken();
  }
};

const GetFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remotemessage => {
    console.log('remote message', JSON.stringify(remotemessage));
  });
  messaging().onNotificationOpenedApp(remotemessage => {
    console.log('remote message', JSON.stringify(remotemessage));
  });
};
