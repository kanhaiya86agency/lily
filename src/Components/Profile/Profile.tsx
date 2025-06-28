import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppText} from '../Common/AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIntl} from 'react-intl';
import useAppNavigation from '../Common/useAppNavigation';
import {
  ChangePasswordScreen,
  EditProfileScreen,
  FeedbackScreen,
  LanguageScreen,
  LoginRegisterScreen,
  SendOtpFormScreen,
  ViewProfileScreen,
} from '../../Screens';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {removeToken} from '../../utils/tokenStorage';
import {RootState} from '../../Redux/store';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchUserProfile} from '../../Redux/User/UserThunk';

const Profile = () => {
  const inlt = useIntl();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const {user, loading} = useAppSelector((state: RootState) => state.user);
  console.log('🚀 ~ Profile ~ user:', user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    await removeToken();
    navigation.navigate(SendOtpFormScreen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ViewProfileScreen)}
        style={styles.header}>
        <Image
          source={
            user?.profileImage
              ? {uri: user.profileImage}
              : {uri: 'https://i.pravatar.cc/100'}
          }
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          {loading ? (
            <ActivityIndicator size={20} color={theme.colors.primary} />
          ) : (
            <AppText
              style={
                styles.name
              }>{`${user?.firstName} ${user?.lastName}`}</AppText>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(EditProfileScreen, {
                userData: user,
              })
            }>
            <AppText style={styles.editText}>
              {inlt.formatMessage({id: 'app.setting.edit.profile'})}
            </AppText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.section}>
        {/* <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Icon name="favorite-border" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.wishlist'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Icon name="settings" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.setting'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate(LanguageScreen)}>
          <View style={styles.optionContent}>
            <Icon name="language" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.language'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate(ChangePasswordScreen)}>
          <View style={styles.optionContent}>
            <Icon name="password" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.change.password'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate(NotificationScreen)}>
          <View style={styles.optionContent}>
            <Icon name="notifications" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.change.notification'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate(FeedbackScreen)}>
          <View style={styles.optionContent}>
            <Icon name="feed" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.change.feedback'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <View style={styles.optionContent}>
            <Icon name="logout" size={24} color="#333" />
            <AppText style={styles.optionText}>
              {inlt.formatMessage({id: 'app.setting.Logout'})}
            </AppText>
          </View>
          <Icon name="chevron-right" size={30} color="#999" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: horizontalScale(theme.spacing.spacing_16),
    backgroundColor: '#fff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(theme.spacing.spacing_20),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: horizontalScale(theme.spacing.spacing_80),
    height: verticalScale(theme.spacing.spacing_80),
    borderRadius: horizontalScale(theme.spacing.spacing_40),
  },
  userInfo: {
    marginLeft: horizontalScale(theme.spacing.spacing_16),
  },
  name: {
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
    fontWeight: 'bold',
  },
  editText: {
    color: '#007bff',
    marginTop: verticalScale(theme.spacing.spacing_4),
  },
  section: {
    marginTop: verticalScale(theme.spacing.spacing_16),
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(theme.spacing.spacing_14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: horizontalScale(theme.spacing.spacing_16),
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
  },
});

export default Profile;
