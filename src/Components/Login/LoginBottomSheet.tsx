import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AppBottomSheet from '../Common/AppBottomSheet';
import {AppText} from '../Common/AppText';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppNavigation from '../Common/useAppNavigation';
import {LoginRegisterScreen, SendOtpFormScreen} from '../../Screens';
import {useIntl} from 'react-intl';
import {LogoIcon} from '../../assets/Icons';

interface Props {
  isVisible: boolean;
  hideBottomSheet: () => void;
}

const screenHeight = Dimensions.get('window').height;

const LoginBottomSheet = ({isVisible, hideBottomSheet}: Props) => {
  const intl = useIntl();
  const navigation = useAppNavigation();
  const handleNavigateToLoginRegister = () => {
    navigation.navigate(SendOtpFormScreen);
    hideBottomSheet();
  };
  return (
    <AppBottomSheet
      snapPoints="100%"
      isOpen={isVisible}
      onHide={hideBottomSheet}
      crossIconSize={true}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={hideBottomSheet}>
            <Icon name="close" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.helpRow}>
              <Icon name="alert-circle-outline" size={24} />
              <AppText style={styles.helpText}>
                {intl.formatMessage({id: 'login.bottom.sheet.help.title'})}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            <LogoIcon />
          </View>
        </View>
        <View style={styles.bottomSection}>
          <ScrollView contentContainerStyle={styles.bottomContent}>
            <TouchableOpacity>
              <AppText style={styles.languageText}>
                {intl.formatMessage({id: 'login.bottom.sheet.language.title'})}
              </AppText>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleNavigateToLoginRegister}
                style={styles.phoneButton}>
                {/* <Icon name="email" size={20} color="#002F34" /> */}
                <AppText style={styles.loginWithEmail}>
                  {intl.formatMessage({
                    id: 'login.bottom.sheet.login.with.email',
                  })}
                </AppText>
              </TouchableOpacity>
            </View>

            {/* <AppText style={styles.orText}>
              {intl.formatMessage({
                id: 'login.bottom.sheet.or.title',
              })}
            </AppText> */}

            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate(SendOtpFormScreen);
                hideBottomSheet();
              }}>
              <AppText style={styles.loginWithEmail}>Phone</AppText>
            </TouchableOpacity> */}

            <AppText style={styles.termsText}>
              {intl.formatMessage({
                id: 'login.bottom.sheet.privacy.title',
              })}{' '}
              <AppText style={styles.underline}>
                {intl.formatMessage({
                  id: 'login.bottom.sheet.terms.title',
                })}
              </AppText>
            </AppText>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <AppText style={styles.orText}>Made in India</AppText>
            <Icon name="heart" color={theme.colors.SecondaryRed} />
          </View>
        </View>
      </View>
    </AppBottomSheet>
  );
};

export default LoginBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(theme.spacing.spacing_8),
    paddingHorizontal: horizontalScale(theme.spacing.spacing_16),
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(4),
  },
  helpText: {
    fontSize: theme.fontSize.fontSize_20,
    fontWeight: theme.fontWeight.fontWeight_600,
  },
  topSection: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  topSectionCountry: {
    fontSize: horizontalScale(theme.fontSize.fontSize_24),
    fontWeight: theme.fontWeight.fontWeight_800,
    color: '#002F34',
  },

  bottomSection: {
    height: screenHeight * 0.4,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: verticalScale(theme.spacing.spacing_20),
  },
  buttonContainer: {
    backgroundColor: theme.colors.white,
    marginHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    alignItems: 'center',
  },
  languageText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: theme.fontSize.fontSize_14,
    color: theme.colors.white,
  },
  loginWithEmail: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: theme.fontSize.fontSize_18,
    fontWeight: theme.fontWeight.fontWeight_600,
    color: theme.colors.black,
  },
  termsText: {
    textAlign: 'center',
    margin: 'auto',
    width: horizontalScale(theme.spacing.spacing_232),
    fontSize: theme.fontSize.fontSize_12,
    marginTop: verticalScale(theme.spacing.spacing_50),
    color: theme.colors.white,
    lineHeight: verticalScale(18),
  },
  underline: {
    textDecorationLine: 'underline',
    color: theme.colors.white,
  },
  orText: {
    // textAlign: 'center',
    fontSize: theme.fontSize.fontSize_14,
    color: theme.colors.white,
  },
  bottomContent: {
    paddingTop: verticalScale(theme.spacing.spacing_20),
    gap: verticalScale(theme.spacing.spacing_20),
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingVertical: verticalScale(theme.spacing.spacing_6),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 8,
    justifyContent: 'center',
    gap: horizontalScale(8),
  },
  phoneText: {
    fontSize: theme.fontSize.fontSize_18,
    color: '#002F34',
  },
});
