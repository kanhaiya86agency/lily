import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../Constants/theme';

const SimilarServices = () => {
  const dummyData = {
    price: '$449',
    title: 'Brand New Samsung Galaxy Smart Watch Also In Black Color',
    user: {
      name: 'Simon Sais',
      memberSince: '2017',
    },
    description:
      'Collection of Premium Smart Watch\nDelivery: Within 6-8 business days\nReturns: Within 7 days of delivery. No questions asked',
    specification: {
      Place: 'New York',
      Condition: 'Brand New',
      Type: 'Smart Watch',
      Brand: 'Samsung',
      ProductCondition: 'New',
    },
    similarAds: [
      {
        id: 1,
        price: '$245',
        title: 'Smart Watch Series 4 Calling',
        address: '7693 Arnold Street',
      },
      {
        id: 2,
        price: '$300',
        title: 'A New Smart Watch Half Month Old',
        address: '15 Hill Street',
      },
      {
        id: 3,
        price: '$200',
        title: 'Smart Watch With Strap',
        address: '7693 Arnold Street',
      },
    ],
  };
  return (
    <View>
      <View style={styles.similarAdsHeader}>
        <Text style={styles.cardTitle}>Similar Ads</Text>
        <Text style={styles.seeAll}>See All ➤</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.similarAdsList}>
        {dummyData.similarAds.map(ad => (
          <View key={ad.id} style={styles.similarAdCard}>
            <View style={styles.similarAdImage}>
              <Text style={styles.imageText}>W-148px{'\n'}H-112px</Text>
            </View>
            <Text style={styles.adPrice}>{ad.price}</Text>
            <Text style={styles.adTitle}>{ad.title}</Text>
            <Text style={styles.adAddress}>📍 {ad.address}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SimilarServices;

const styles = StyleSheet.create({
  similarAdsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  imageText: {
    color: '#fff',
    textAlign: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
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
    color: theme.colors.SecondaryYellow,
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
});
