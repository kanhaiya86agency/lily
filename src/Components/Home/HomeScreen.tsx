import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardItem from './CardItem';
import {NotificationScreen, ProductDetailsScreen} from '../../Screens';
import useAppNavigation from '../Common/useAppNavigation';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchProducts} from '../../Redux/Product/ProductSlice';
import theme from '../../Constants/theme';
import LocationBottomSheet from '../Common/LocationBottomSheet';
import {RootState} from '../../Redux/store';
import Geolocation from '@react-native-community/geolocation';
import {useIsFocused} from '@react-navigation/native';

// const categories = [
//   {id: 1, name: 'Cars', icon: 'directions-car'},
//   {id: 2, name: 'Properties', icon: 'home'},
//   {id: 3, name: 'Mobiles', icon: 'smartphone'},
//   {id: 4, name: 'Jobs', icon: 'work'},
//   {id: 5, name: 'Bikes', icon: 'two-wheeler'},
//   {id: 6, name: 'Electronics', icon: 'tv'},
//   {id: 7, name: 'Commercial', icon: 'store'},
//   {id: 8, name: 'Furniture', icon: 'weekend'},
// ];

const HomeScreen = () => {
  // const [data, setData] = useState(recommendations);
  const [isVisibleLocation, setIsVisibleLocation] = useState(false);
  const focus = useIsFocused();

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const {products, loading} = useAppSelector(state => state.products);
  console.log('🚀 ~ HomeScreen ~ products:', products);

  const {currentLocation} = useAppSelector(
    (state: RootState) => state.location,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const lat = info.coords.latitude;
      const lon = info.coords.longitude;
      dispatch(
        fetchProducts({
          latitude: lat,
          longitude: lon,
          page: 1,
          limit: 10,
        }),
      );
    });
  }, [dispatch, focus]);

  // const toggleFavorite = (id: string) => {
  //   setData(prev =>
  //     prev.map(item =>
  //       item.id === id ? {...item, isFavorite: !item.isFavorite} : item,
  //     ),
  //   );
  // };

  const handleCardPress = (id: any) => {
    navigation.navigate(ProductDetailsScreen, {id});
  };
  // const visibleCategories = categories.slice(0, 6);
  // const categoryData = [
  //   ...visibleCategories,
  //   {id: 'see_more', name: 'See More', icon: 'chevron-right'},
  // ];

  const handleLocation = () => {
    setIsVisibleLocation(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>PUSLY</Text>
        <TouchableOpacity onPress={handleLocation} style={styles.location}>
          <Icon name="place" size={18} color="#333" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.locationText}>
            {currentLocation}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Icon name="favorite-border" size={24} />
        <Icon
          onPress={() => navigation.navigate(NotificationScreen)}
          name="notifications-none"
          size={24}
          style={{marginLeft: 12}}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoryContainerServices}>
          <TouchableOpacity style={styles.servicesCard}>
            <Text style={styles.servicesText}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.providersCard}>
            <Text style={styles.servicesText}>Products</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.categoryContainer}>
          <FlatList
            data={categoryData}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 10, paddingHorizontal: 10}}
            renderItem={({item}) => {
              if (item.id === 'see_more') {
                return (
                  <TouchableOpacity
                    onPress={() => console.log('Navigate to full list')}>
                    <View style={styles.seeMoreItem}>
                      <Icon name="chevron-right" size={28} color="#555" />
                      <Text style={styles.seeMoreText}>See More</Text>
                    </View>
                  </TouchableOpacity>
                );
              }

              return (
                <View style={styles.categoryItem}>
                  <Icon name={item.icon} size={28} color="#333" />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              );
            }}
          />
        </View> */}

        <Text style={styles.sectionTitle}>Fresh recommendations</Text>
        {loading ? (
          <Text>Loading....</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featureContainer}>
            <FlatList
              data={products}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={{gap: 10}}
              renderItem={({item}) => (
                <CardItem
                  item={item}
                  onPress={() => handleCardPress(item.id)}
                  // onToggleFavorite={() => toggleFavorite(item.id)}
                />
              )}
            />
          </ScrollView>
        )}
      </ScrollView>
      <LocationBottomSheet
        isVisible={isVisibleLocation}
        hideBottomSheet={() => setIsVisibleLocation(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  featureContainer: {
    justifyContent: 'center',
  },
  container: {flex: 1, backgroundColor: '#fff'},
  topBar: {
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {fontSize: 22, fontWeight: 'bold', color: '#003c57'},
  location: {flexDirection: 'row', alignItems: 'center'},
  locationText: {marginLeft: 4, fontSize: 14, color: '#333', width: 150},

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    gap: 10,
    backgroundColor: '#fff',
  },

  searchInput: {flex: 1, fontSize: 14, color: '#000'},
  servicesCard: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  providersCard: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  servicesText: {
    color: theme.colors.white,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 50,
  },
  categoryContainerServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  //   categoryItem: {
  //     width: '23%',
  //     alignItems: 'center',
  //     marginVertical: 12,
  //   },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    width: 180,
    backgroundColor: '#f9f9f9',
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 8,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
  cardPrice: {
    fontWeight: 'bold',
    marginTop: 6,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardLocation: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  categoryItem: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: 80,
  },
  //   categoryText: {
  //     marginTop: 5,
  //     fontSize: 12,
  //     textAlign: 'center',
  //   },
  seeMoreItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: 80,
  },
  seeMoreText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});

export default HomeScreen;
