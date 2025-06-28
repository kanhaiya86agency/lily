import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../Constants/theme';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';

const Specification = ({serviceData}: any) => {
  return (
    <View>
      <View style={styles.cardSpecification}>
        <Text style={styles.cardTitle}>Specification</Text>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Location</Text>
          <Text style={styles.specValue}>{serviceData?.location}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Languages</Text>
          <Text style={styles.specValue}>{serviceData?.languages_spoken}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Skills</Text>
          <Text style={styles.specValue}>{serviceData?.skills.join(', ')}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Available Days</Text>
          <Text style={styles.specValue}>
            {serviceData?.availableDays.join(' ,')}
          </Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Working Hours</Text>
          <Text style={styles.specValue}>{serviceData?.workingHours}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Service Radius</Text>
          <Text style={styles.specValue}>{serviceData?.serviceAreaKM} km</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specKey}>Verified</Text>
          <Text style={styles.specValue}>
            {serviceData?.verified ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Specification;

const styles = StyleSheet.create({
  cardSpecification: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(10),
    marginVertical: 10,
    borderRadius: 10,
    gap: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    color: theme.colors.fontColorBlue,
  },
  cardDescription: {
    gap: 10,
    lineHeight: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: verticalScale(8),
    gap: horizontalScale(30),
  },
  specKey: {
    fontWeight: '500',
    color: theme.colors.fontColorGray,
  },

  specValue: {
    color: theme.colors.fontColorGray,
    fontWeight: '400',
    width: horizontalScale(200),
    lineHeight: 20,
    textAlign: 'right',
  },
});
