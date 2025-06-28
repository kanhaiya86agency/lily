import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import ImageSlider from '../Slider/ImageSlider';
import {AppText} from '../Common/AppText';
import {RouteProp, useRoute} from '@react-navigation/native';
import AddReviewScreen from '../Comments/AddReview';
import ChatContainer from './ChatContainer';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchProductById} from '../../Redux/Product/ProductSlice';
import {RootState} from '../../Redux/store';
import {fetchRatings} from '../../Redux/Rating/RatingSlice';

type RootStackParamList = {
  ProductDetailsScreen: {id: string};
};

const ProductDetails = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'ProductDetailsScreen'>>();
  const {id} = route.params;
  const dispatch = useAppDispatch();

  const {selectedProduct, loading, error} = useAppSelector(
    (state: RootState) => state.products,
  );

  const {ratings} = useAppSelector((state: RootState) => state.ratings);
  console.log('🚀 ~ ProductDetails ~ ratings:', ratings);

  useEffect(() => {
    dispatch(fetchProductById({id}));
    dispatch(fetchRatings('id'));
  }, [dispatch, id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <AppText>Loading product...</AppText>
      </View>
    );
  }

  if (error || !selectedProduct) {
    return (
      <View style={styles.centered}>
        <AppText style={{color: 'red'}}>
          {error ?? 'Failed to load product.'}
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.AppViewContainer}
        contentContainerStyle={{paddingBottom: theme.spacing.spacing_64}}>
        <View style={styles.sliderContainer}>
          <ImageSlider images={selectedProduct.images} />
        </View>

        <AppText style={styles.title}>{selectedProduct.title}</AppText>
        <AppText style={styles.subtitle}>{selectedProduct.type}</AppText>

        <View style={styles.tagContainer}>
          <AppText style={styles.tag}>₹{selectedProduct.price}</AppText>
          <AppText style={styles.tag}>
            {selectedProduct.serviceAreaKM} km radius
          </AppText>
          {selectedProduct.isVerified && (
            <AppText style={[styles.tag, styles.verified]}>Verified</AppText>
          )}
        </View>

        <View style={styles.card}>
          <InfoRow
            icon="place"
            label="Location"
            value={selectedProduct.location}
          />
          <InfoRow
            icon="calendar-today"
            label="Availability"
            value={`${selectedProduct.availableDays.join(', ')} | ${
              selectedProduct.workingHours
            }`}
          />
        </View>

        <AppText style={styles.sectionTitle}>About</AppText>
        <AppText style={styles.description}>
          {selectedProduct.description}
        </AppText>

        <AppText style={styles.sectionTitle}>Skills</AppText>
        <View style={styles.tagGroup}>
          {selectedProduct.skills.map(skill => (
            <AppText key={skill} style={styles.skillTag}>
              {skill}
            </AppText>
          ))}
        </View>

        <AddReviewScreen service={selectedProduct} />
      </ScrollView>
      <View>
        <ChatContainer />
      </View>
    </View>
  );
};

const InfoRow = ({icon, label, value}: any) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={20} color="#555" />
    <AppText style={styles.infoText}>
      <AppText style={{fontWeight: 'bold'}}>{label}:</AppText> {value}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FAFAFA',
  },
  AppViewContainer: {
    marginBottom: verticalScale(theme.spacing.spacing_30),
    paddingHorizontal: horizontalScale(theme.spacing.spacing_10),
  },
  sliderContainer: {
    height: verticalScale(theme.spacing.spacing_184),
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: verticalScale(24),
    marginTop: verticalScale(10),
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    fontSize: 12,
    color: '#333',
  },
  verified: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillTag: {
    backgroundColor: '#EEEEEE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    fontSize: 13,
    color: '#333',
  },
  certTag: {
    backgroundColor: '#BBDEFB',
    color: '#0D47A1',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
  },
  reviewRating: {
    fontSize: 13,
    marginTop: 4,
    color: '#777',
  },
});

export default ProductDetails;
