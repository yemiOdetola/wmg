import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button, Paragraph, Dialog, Portal, TextInput, Title } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { InnerLoading, CustomButton } from '../../components/shared';
import { clearUser } from '../../redux/actions/auth'
import { styles } from '../../utils';

// const auth = getAuth();

export default function Profile(props: any) {
  const dispatch: any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const { loading, user } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      user: state.auth.user,
    }),
    shallowEqual
  );


  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const deleteAccount = () => {
  };

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const signout = () => {
    dispatch(clearUser(props.navigation));
  }

  if (isLoaded) {

    return (

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.HeaderProfile}>
            {user?.avatar ? <Image source={{ uri: user.avatar }} style={styles.ImageProfile} resizeMode={"cover"} />
              : <Image source={require('../../assets/male.jpg')} style={styles.ImageProfile} resizeMode={"cover"} />}

            <View style={{ flexDirection: 'row' }}>
              {user?.name ? <Text style={styles.TextProfile}>{user?.name}</Text> : null}
              {user?.company ? <Text style={styles.memberBadge}>{user?.company}</Text> : null}
            </View>
            <Text style={styles.SmallTextProfile}>{user?.email}</Text>
          </View>

          <View style={{ marginBottom: 40 }}>
            <CustomButton Icon="silverware-fork-knife" Label="Edit Profile" Click={() => onChangeScreen("editProfile")} />
            <CustomButton Icon="fence" Label="Settings" Click={() => onChangeScreen("settings")} />
            <CustomButton Icon="file-document-outline" Label="Terms and conditions" Click={() => onChangeScreen("terms")} />
            <CustomButton Icon="logout" Label="Sign out" Click={signout} />
            <CustomButton Icon="account-cancel-outline" Label="delete my account" Click={() => setVisible(true)} />
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                  <Title>Are you sure you want to delete your account?</Title>
                  <Paragraph style={{ marginVertical: 10 }}>This action can't be undone. We will delete all your data. Type your email address to confirm.</Paragraph>
                  <TextInput
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                </Dialog.Content>
                <Dialog.Actions style={{ marginBottom: 8, marginTop: -20, marginHorizontal: 8 }}>
                  <Button onPress={() => hideDialog()}>Cancel</Button>
                  <Button onPress={() => deleteAccount()}>Confirm</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  } else {
    return (
      <InnerLoading />
    );
  }
}
