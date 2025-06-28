import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAppNavigation from '../Common/useAppNavigation';
import CardItem from './CardItem';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {RootState} from '../../Redux/store';
import {fetchProducts} from '../../Redux/Product/ProductSlice';
import theme from '../../Constants/theme';
import LocationBottomSheet from '../Common/LocationBottomSheet';
import {fetchCategories} from '../../Redux/Category/categoryThunk';
import CategoryList from './Category';
import TabComponent from './TabComponent';
import {NotificationScreen} from '../../Screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyState from '../Common/EmptyState';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Dashboard() {
  const handleCardPress = (id: any) => {
    navigation.navigate('productSingle', {id});
  };
  const [isVisibleLocation, setIsVisibleLocation] = useState(false);
  const [query, setQuery] = useState('');
  const navigation = useAppNavigation();
  const [selectedTab, setSelectedTab] = useState('SERVICE');
  const dispatch = useAppDispatch();
  const {products, loading, error} = useAppSelector(state => state.products);

  const {categories} = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const {currentLocation} = useAppSelector(
    (state: RootState) => state.location,
  );

  const [currentCoords, setCurrentCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const locationType = await AsyncStorage.getItem('locationType');
      const storedCoords = await AsyncStorage.getItem('locationCoords');

      if (locationType === 'manual' && storedCoords) {
        const coords = JSON.parse(storedCoords);
        setCurrentCoords(coords);
      } else {
        Geolocation.getCurrentPosition(
          info => {
            const lat = info.coords.latitude;
            const lon = info.coords.longitude;
            const coords = {latitude: lat, longitude: lon};
            setCurrentCoords(coords);
          },
          error => {
            console.warn('Error getting GPS location:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (!currentCoords) {
      return;
    }

    dispatch(
      fetchProducts({
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
        page: 1,
        limit: 10,
        type: selectedTab,
      }),
    );
  }, [dispatch, currentCoords, selectedTab]);

  useEffect(() => {
    if (!currentCoords) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(
        fetchProducts({
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
          search: query.trim() || undefined,
          type: selectedTab,
        }),
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch, currentCoords, selectedTab]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    if (error) {
      return (
        <EmptyState
          title="Something went wrong"
          description="Could not load data. Please try again."
          iconName="alert-circle-outline"
          iconColor="#e74c3c"
          buttonText="Retry"
        />
      );
    }

    if (products.length === 0) {
      return (
        <EmptyState
          title={
            selectedTab === 'SERVICE'
              ? 'No Services Found'
              : 'No Products Found'
          }
          iconName="package-variant"
          iconColor="#bbb"
        />
      );
    }

    return (
      <View style={styles.section}>
        <FlatList
          numColumns={2}
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CardItem item={item} onPress={() => handleCardPress(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Firko</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('GetLocationScreen')}
          style={styles.location}>
          <Icon name="place" size={18} color="#333" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.locationText}>
            {currentLocation}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.searchInputLocation}>
            <TextInput
              placeholder="What are you looking for"
              placeholderTextColor={theme.colors.fontColor2}
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(NotificationScreen)}>
              <Icon name="notifications" size={32} />
            </TouchableOpacity>
          </View>
          <TabComponent onTabChange={setSelectedTab} />
          <CategoryList categories={categories} selectedTab={selectedTab} />
        </View>
        <View style={styles.renderContent}>{renderContent()}</View>
      </ScrollView>
      <LocationBottomSheet
        isVisible={isVisibleLocation}
        hideBottomSheet={() => setIsVisibleLocation(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  renderContent: {flex: 1, minHeight: Dimensions.get('window').height},
  searchInputLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
  },
  logo: {fontSize: 22, fontWeight: 'bold', color: '#003c57'},
  locationText: {marginLeft: 4, fontSize: 14, color: '#333', width: 150},
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    color: theme.colors.black,
    borderWidth: 1,
    borderColor: theme.colors.fontColor2,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
