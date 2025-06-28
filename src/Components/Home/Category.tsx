import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import useAppNavigation from '../Common/useAppNavigation';
import {AllCetegoryListScreen} from '../../Screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryList = ({categories, selectedTab}: any) => {
  const navigation = useAppNavigation();

  const filterCategories = categories?.filter(
    (el: any) => el.type === selectedTab,
  );
  console.log('🚀 ~ CategoryList ~ filterCategories:', filterCategories);

  const bgColors = ['#8e5af7', '#fdb13f', '#f6655e', '#64b5f6'];

  return (
    <View style={styles.container}>
      {/* <View style={styles.sectionHeader}> */}
      {/* <Text style={styles.sectionTitle}>For You</Text> */}
      {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate(AllCetegoryListScreen, {
              allCetegory: categories,
            })
          }
          style={styles.seeAllContainer}>
          <Text style={styles.viewMoreText}>See All</Text>
        </TouchableOpacity> */}
      {/* </View> */}
      {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FlatList
          data={filterCategories.slice(0, 4)}
          // numColumns={4}
          horizontal
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View
                style={[
                  styles.iconWrapper,
                  {backgroundColor: bgColors[index % bgColors.length]},
                ]}>
                <Image source={{uri: item?.icon}} style={styles.icon} />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AllCetegoryListScreen, {
              allCetegory: categories,
              selectedTab: selectedTab,
            })
          }
          style={{alignItems: 'center', height: 100}}>
          <View style={[styles.iconWrapper, styles.iconMain]}>
            <Icon name="arrow-right" size={30} />
          </View>
          <Text style={styles.categoryText}> See all</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={[...filterCategories.slice(0, 4), {isSeeAll: true}]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item.isSeeAll ? 'see-all' : `${item.name}-${index}`
        }
        contentContainerStyle={styles.categoryContainer}
        renderItem={({item, index}) => {
          if (item.isSeeAll) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(AllCetegoryListScreen, {
                    allCetegory: categories,
                    selectedTab: selectedTab,
                  })
                }
                style={styles.categoryItem}>
                <View style={[styles.iconWrapper, styles.iconMain]}>
                  <Icon name="arrow-right" size={22} color="#000" />
                </View>
                <Text style={styles.categoryText}>See all</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              onPress={() => console.log({item})}
              style={styles.categoryItem}>
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor:
                      bgColors[index % bgColors.length] || '#eee',
                  },
                ]}>
                <Image
                  source={{uri: item?.icon}}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={[styles.categoryText]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    // paddingHorizontal: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    color: '#1e90ff',
  },
  categoryContainer: {},
  categoryItem: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  iconMain: {
    width: horizontalScale(40),
    height: verticalScale(40),
  },
  iconWrapper: {
    width: horizontalScale(40),
    height: verticalScale(40),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: horizontalScale(28),
    height: verticalScale(28),
    tintColor: '#fff',
  },
  categoryText: {
    width: horizontalScale(50),
    fontSize: 12,
    color: '#6c6c6c',
    textAlign: 'center',
  },
});
