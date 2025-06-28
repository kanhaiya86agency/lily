import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

type RootStackParamList = {
  ProductDetailsScreen: {allCetegory: any; selectedTab: string};
};

const AllCategoryList = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'ProductDetailsScreen'>>();
  const {allCetegory, selectedTab} = route.params;

  console.log('🚀 ~ AllCategoryList ~ selectedTab:', selectedTab);

  const filterData = allCetegory?.filter(el => el.type === selectedTab);
  console.log('🚀 ~ AllCategoryList ~ filterData:', filterData);

  const bgColors = [
    '#8e5af7',
    '#fdb13f',
    '#f6655e',
    '#64b5f6',
    '#81c784',
    '#ffb74d',
    '#9575cd',
    '#4dd0e1',
  ];

  const renderItem = ({item, index}: any) => {
    const randomColor = bgColors[index % bgColors.length];
    return (
      <TouchableOpacity style={styles.card}>
        <View style={[styles.iconWrapper, {backgroundColor: randomColor}]}>
          <Image source={{uri: item.icon}} style={styles.icon} />
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={4}
      contentContainerStyle={styles.container}
    />
  );
};

export default AllCategoryList;

const size = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // paddingHorizontal: 8,
  },
  card: {
    width: size,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  name: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
});
