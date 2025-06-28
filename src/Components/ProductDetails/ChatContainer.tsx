import {View, TouchableOpacity, StyleSheet, Linking, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText} from '../Common/AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import useAppNavigation from '../Common/useAppNavigation';
import {ChatsScreen} from '../../Screens';
import LoginBottomSheet from '../Login/LoginBottomSheet';
import {getToken} from '../../utils/tokenStorage';
import {useIsFocused} from '@react-navigation/native';
import {ProductState} from '../../Redux/Product/ProductType';
import {useAppDispatch} from '../Hooks/hooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChatContainer = ({
  selectedProduct,
  roomId,
}: {
  selectedProduct: ProductState;
  roomId: string | null;
}) => {
  console.log('🚀 ~ ChatContainer ~ selectedProduct:', selectedProduct);
  const navigation = useAppNavigation();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [localToken, setLocalToken] = useState<string | null>(null);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleCallPress = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone call not supported on this device.');
        }
      })
      .catch(err => console.error('Error opening dialer:', err));
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      setLocalToken(token);
    };
    if (isFocused) {
      loadToken();
    }
  }, [dispatch, isFocused]);

  const handleChatsNavigation = () => {
    if (localToken) {
      navigation.navigate(ChatsScreen, {roomId, productData: selectedProduct});
    } else {
      setShowBottomSheet(true);
    }
  };

  return (
    <View style={[styles.bottomBar, {bottom: insets.bottom}]}>
      <View style={styles.bottomBarContainer}>
        <TouchableOpacity
          onPress={handleChatsNavigation}
          style={styles.chatButton}>
          <Icon name="chat-bubble-outline" size={20} color="#fff" />
          <AppText style={styles.buttonTextChat}>Chat</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCallPress('+919876543210')}
          style={styles.callButton}>
          <Icon name="call" size={20} color={theme.colors.SecondaryRed} />
          <AppText style={styles.buttonText}>Call</AppText>
        </TouchableOpacity>
      </View>

      <LoginBottomSheet
        isVisible={showBottomSheet}
        hideBottomSheet={() => setShowBottomSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(theme.spacing.spacing_18),
    gap: horizontalScale(theme.spacing.spacing_10),
    position: 'absolute',
    // bottom: 0,
    // paddingBottom: insets.bottom || 12,
    width: '100%',
    backgroundColor: '#fff',
  },
  bottomBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(theme.spacing.spacing_10),
    width: '100%',
  },
  chatButton: {
    width: horizontalScale(theme.spacing.spacing_154),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.SecondaryRed,
    padding: 12,
    borderRadius: 8,
  },
  callButton: {
    width: horizontalScale(theme.spacing.spacing_154),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.SecondaryRed,
  },
  buttonText: {
    color: theme.colors.SecondaryRed,
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
    marginLeft: 8,
  },
  buttonTextChat: {
    color: theme.colors.white,
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
    marginLeft: 8,
  },
});
export default ChatContainer;
