import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import theme from '../../Constants/theme';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchOwnService} from '../../Redux/Product/ProductSlice';
import {verticalScale} from '../../helper/scaleHelper';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAppNavigation from '../Common/useAppNavigation';
import TabComponent from '../Home/TabComponent';

const MyServices = () => {
  const [selectedTab, setSelectedTab] = useState('SERVICE');

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const {allServices, loading} = useAppSelector(state => state.products);
  console.log('🚀 ~ MyServices ~ allServices:', allServices);

  const filterProducts = allServices?.filter(el => el?.type === selectedTab);

  useEffect(() => {
    dispatch(fetchOwnService());
  }, [dispatch]);

  const renderCard = (ad: any) => (
    <View key={ad.id} style={styles.adCard}>
      <Image source={{uri: ad.images[0]}} style={styles.adImage} />
      {ad.status && (
        <View style={styles.statusTag}>
          {/* <Text style={styles.statusText}>● {ad.status}</Text> */}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.adPrice}> ₹ {ad.price}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ServiceAddForm', {id: ad.id})}
          style={{marginTop: 20}}>
          <Icon name="edit" size={24} color={theme.colors.SecondaryRed} />
        </TouchableOpacity>
      </View>
      <Text style={styles.adTitle}>{ad.title}</Text>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Text style={styles.adTitle}>{ad.location}</Text>
        <Text style={styles.statusText}>● {ad.status}</Text>
      </View>
      {/* <View style={styles.metrics}>
        <Text style={styles.metricText}>❤️ {ad.likes} Likes</Text>
        <Text style={styles.metricText}>👁️ {ad.views} Views</Text>
      </View> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Ads</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TabComponent
          activeColor="#ffff"
          inactiveColor="#fff"
          activeBold={true}
          onTabChange={setSelectedTab}
        />
        {/* <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'SERVICE' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('SERVICE')}>
          <Text
            style={
              activeTab === 'SERVICE'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'PRODUCT' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('PRODUCT')}>
          <Text
            style={
              activeTab === 'PRODUCT'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Products
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Content */}
      <View style={styles.cardContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0066cc"
            style={{marginTop: 20}}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {filterProducts.length === 0 ? (
              <Text style={{marginVertical: verticalScale(20)}}>
                No Sevices and Products are Available
              </Text>
            ) : (
              filterProducts?.map(renderCard)
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary || '#3b82f6',
  },
  header: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff30',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#fff',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  scrollContent: {
    // paddingBottom: 50,
  },
  adCard: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  adImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  statusTag: {
    // position: 'absolute',
    // top: 10,
    // left: 10,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: 'green',
    textAlign: 'right',
  },
  adPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#f97316',
  },
  adTitle: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metricText: {
    fontSize: 12,
    color: '#666',
  },
});
