import React from 'react';
import {StyleSheet, Dimensions, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import {verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';

const {width} = Dimensions.get('window');

const ImageSlider = ({images}: {images: string[]}) => {
  return (
    <Swiper
      key={images.length}
      style={styles.wrapper}
      showsButtons={false}
      loop={true}
      autoplay={true}
      autoplayTimeout={3}
      dotStyle={styles.dot}
      paginationStyle={styles.paginationStyle}
      activeDotStyle={styles.activeDot}>
      {images.map(uri => (
        <ImageBackground
          key={`key_${uri}`}
          source={{uri}}
          style={styles.slide}
        />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  paginationStyle: {
    bottom: 10,
  },
  wrapper: {
    borderRadius: 12,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: verticalScale(theme.spacing.spacing_184),
    borderRadius: 12,
  },
  dot: {
    backgroundColor: '#D9D9D9',
    width: verticalScale(6),
    height: verticalScale(6),
    borderRadius: 20,
    overflow: 'hidden',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: verticalScale(8),
    height: verticalScale(8),
    borderRadius: 6,
    transform: [{scale: 1.3}],
    opacity: 1,
  },
});

export default ImageSlider;
