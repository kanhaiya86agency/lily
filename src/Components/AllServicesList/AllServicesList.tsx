import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAppNavigation from '../Common/useAppNavigation';
import theme from '../../Constants/theme';
import {verticalScale} from '../../helper/scaleHelper';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import Geolocation from '@react-native-community/geolocation';
import {fetchProducts} from '../../Redux/Product/ProductSlice';
import {formatDateLabel} from '../Hooks/formatDateLabel';
import {AppText} from '../Common/AppText';

const AllServicesList = () => {
  const navigation = useAppNavigation();

  const dispatch = useAppDispatch();
  const {products, loading} = useAppSelector(state => state.products);

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
  }, [dispatch]);
  const handleCardPress = (id: any) => {
    navigation.navigate('productSingle', {id});
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <AppText>Loading Services...</AppText>
      </View>
    );
  }

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handleCardPress(item.id)}
      style={styles.card}>
      <Image source={{uri: item.images[0]}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.location}>📍 {item.location}</Text>
          <Text style={styles.date}>
            {formatDateLabel('2025-06-06T07:43:25.110Z')}
          </Text>
        </View>
      </View>
      <IconButton
        onPress={() => navigation.navigate('ServiceAddForm', {id: item.id})}
        icon="heart-outline"
        size={20}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconButton icon="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          All Ads{' '}
          <Text style={styles.adsCount}>{products?.length || 0} Ads</Text>
        </Text>
        <View style={styles.headerIcons}>
          <IconButton icon="tune" size={20} />
          <IconButton icon="magnify" size={20} />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default AllServicesList;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.colors.white},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsCount: {
    fontSize: 14,
    color: '#467bff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  price: {
    color: '#f76b00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    marginVertical: verticalScale(10),
    color: theme.colors.fontColorBlue,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: '#777',
    fontSize: 13,
  },
  date: {
    color: 'green',
    fontSize: 13,
  },
});
