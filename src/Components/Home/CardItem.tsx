import React, {ReactNode} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppText} from '../Common/AppText';

interface CardItemProps {
  item: {
    id: string;
    images: string[];
    price: string | number;
    name: string;
    location: string | number;
    title: string | ReactNode;
  };
  onPress: () => void;
}

const CardItem = ({item, onPress}: CardItemProps) => {
  return (
    <TouchableOpacity key={item.id} style={styles.card} onPress={onPress}>
      <View>
        <Image source={{uri: item.images[0]}} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <AppText style={styles.price}>${item.price}</AppText>

        <View style={styles.namePrice}>
          <AppText
            style={styles.titleName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </AppText>
        </View>

        <AppText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </AppText>

        <View style={styles.metaRow}>
          <Icon
            name="location-on"
            size={14}
            color="#aaa"
            style={styles.locationIcon}
          />
          <AppText style={styles.locationText}>{item.location}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: horizontalScale(160),
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: '#eee',
    borderWidth: 1,
  },
  image: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 10,
  },
  namePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  titleName: {
    fontSize: 13,
    color: theme.colors.fontColorBlue,
    fontWeight: '500',
    marginBottom: 6,
    flexShrink: 1,
    // maxWidth: '70%',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.SecondaryRed,
    // marginBottom: 6,
    // maxWidth: '30%',
    // textAlign: 'right',
  },
  title: {
    fontSize: 12,
    color: theme.colors.fontColor2,
    marginBottom: 6,
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#90A4AE',
  },
});

export default CardItem;
