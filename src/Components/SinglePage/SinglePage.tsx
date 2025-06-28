import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {AppText} from '../Common/AppText';
import theme from '../../Constants/theme';
import ChatContainer from '../ProductDetails/ChatContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImageSlider from '../Slider/ImageSlider';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import Specification from './Specification';
import {fetchProductById} from '../../Redux/Product/ProductSlice';
import {fetchRatings} from '../../Redux/Rating/RatingSlice';
import {RootState} from '../../Redux/store';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import ServiceRating from './ServiceRating';
import {formatDateLabel} from '../Hooks/formatDateLabel';
import {fetchRooms} from '../../Redux/Chat/chatRoomSlice';

type RootStackParamList = {
  ProductDetailsScreen: {id: string};
};
export default function SinglePage() {
  const insets = useSafeAreaInsets();

  const route =
    useRoute<RouteProp<RootStackParamList, 'ProductDetailsScreen'>>();
  const {id} = route.params;
  const dispatch = useAppDispatch();

  const {selectedProduct, loading} = useAppSelector(
    (state: RootState) => state.products,
  );
  console.log('🚀 ~ SinglePage ~ selectedProduct:', selectedProduct);

  const {ratings} = useAppSelector((state: RootState) => state.ratings);
  const {rooms} = useAppSelector(state => state.rooms);
  console.log('🚀 ~ ChatsUsersList ~ rooms:', rooms);

  useEffect(() => {
    dispatch(fetchProductById({id}));
    dispatch(fetchRooms());
    dispatch(fetchRatings({id: selectedProduct?.id ?? ''}));
  }, [dispatch, id, selectedProduct?.id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <AppText>Loading product...</AppText>
      </View>
    );
  }

  const existingRoom = rooms.find(
    room => room?.serviceProductId?.id === selectedProduct.id,
  );

  const roomId = existingRoom?.id ?? null;
  console.log('🚀 ~ SinglePage ~ roomId:', roomId);

  return (
    <View>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: insets.bottom + 70},
        ]}>
        <View style={styles.sliderContainer}>
          <ImageSlider images={selectedProduct?.images ?? []} />
        </View>

        {/* Price and Title */}
        <View style={styles.priceDate}>
          <Text style={styles.price}>₹ {selectedProduct?.price}</Text>
          <AppText style={styles.postYesterDay}>
            {formatDateLabel(selectedProduct?.createdAt ?? '')}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={styles.title}>{selectedProduct?.title}</Text>
          <Text style={styles.postYesterDay}>{selectedProduct?.category}</Text>
        </View>

        {/* User Section */}
        <View style={styles.userContainer}>
          <View style={styles.userProfile}>
            <View style={styles.avatar}>
              <Image
                source={{uri: selectedProduct?.user?.profileImage}}
                style={styles.avatarImage}
              />
            </View>
            <View>
              <Text style={styles.userName}>
                {selectedProduct?.user?.firstName}{' '}
                {selectedProduct?.user?.lastName}
              </Text>
              <Text style={styles.memberSince}>
                Experience: {selectedProduct?.user?.experience} years
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewProfile}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.cardDescription}>
            {selectedProduct?.description}
          </Text>
        </View>

        <Specification serviceData={selectedProduct} />

        {/* Questions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Do you have any question?</Text>
          <Text>✅ Please login to ask a question.</Text>
          <Text>✅ Ask only about the service provided.</Text>
          <Text style={{lineHeight: 20}}>
            ✅ Review the service details before submitting your question.
          </Text>
        </View>

        {/* Similar Ads */}
        <ServiceRating ratings={ratings} id={selectedProduct?.id} />
      </ScrollView>
      <ChatContainer roomId={roomId} selectedProduct={selectedProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderContainer: {
    height: verticalScale(theme.spacing.spacing_184),
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: verticalScale(24),
    marginTop: verticalScale(10),
  },
  imageBox: {
    width: '100%',
    height: 279,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  postYesterDay: {
    color: theme.colors.fontColor2,
  },
  imageText: {
    color: '#fff',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: theme.colors.SecondaryYellow,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    width: horizontalScale(250),
    // marginBottom: 10,
    color: theme.colors.fontColorBlue,
  },
  userContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    marginRight: 10,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  userName: {
    fontWeight: 'bold',
  },
  memberSince: {
    color: 'gray',
  },
  viewProfile: {
    backgroundColor: '#f53b57',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewProfileText: {
    color: '#fff',
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    gap: 10,
  },
  cardSpecification: {
    backgroundColor: theme.colors.white,
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    gap: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  cardDescription: {
    gap: 10,
    lineHeight: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specKey: {
    fontWeight: '500',
    color: 'gray',
  },
  specValue: {
    fontWeight: '400',
    color: theme.colors.fontColorGray,
  },
  similarAdsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  seeAll: {
    color: '#f53b57',
  },
  similarAdsList: {
    flexDirection: 'row',
  },
  similarAdCard: {
    width: 148,
    marginRight: 10,
  },
  similarAdImage: {
    width: 148,
    height: 112,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 6,
  },
  adPrice: {
    color: 'orange',
    fontWeight: 'bold',
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  adAddress: {
    fontSize: 12,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  chatButton: {
    backgroundColor: '#f53b57',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  callButton: {
    borderWidth: 1,
    borderColor: '#f53b57',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  callButtonText: {
    color: '#f53b57',
    fontWeight: 'bold',
  },
});
