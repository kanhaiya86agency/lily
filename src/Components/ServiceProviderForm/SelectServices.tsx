import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import theme from '../../Constants/theme';
import {horizontalScale} from '../../helper/scaleHelper';

const SelectService = ({onSelect}) => {
  const [selectedService, setSelectedService] = useState('SERVICE');

  const handleChange = value => {
    setSelectedService(value);
    onSelect?.(value); // invoke the callback if provided
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select a Job type:</Text> */}

      <View style={styles.radioGroup}>
        <View style={styles.radioItem}>
          <RadioButton
            value="SERVICE"
            status={selectedService === 'SERVICE' ? 'checked' : 'unchecked'}
            onPress={() => handleChange('SERVICE')}
          />
          <Text
            onPress={() => handleChange('SERVICE')}
            style={styles.radioLabel}>
            Service
          </Text>
        </View>

        <View style={styles.radioItem}>
          <RadioButton
            value="PRODUCT"
            status={selectedService === 'PRODUCT' ? 'checked' : 'unchecked'}
            onPress={() => handleChange('PRODUCT')}
          />
          <Text
            onPress={() => handleChange('PRODUCT')}
            style={styles.radioLabel}>
            Product
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: theme.colors.fontColorGray,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: horizontalScale(20),
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default SelectService;
