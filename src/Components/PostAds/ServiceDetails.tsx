import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

interface Step2ServiceDetailsProps {
  formikProps: {
    values: {
      experience_years: string;
      starting_price: string;
      service_area_km: string;
    };
    errors: {
      experience_years?: string;
      starting_price?: string;
      service_area_km?: string;
    };
    touched: {
      experience_years?: boolean;
      starting_price?: boolean;
      service_area_km?: boolean;
    };
    handleChange: (field: string) => (value: string) => void;
    handleBlur: (field: string) => () => void;
  };
}

const Step2ServiceDetails = ({formikProps}: Step2ServiceDetailsProps) => (
  <View>
    <Text>Experience (years)</Text>
    <TextInput
      style={styles.input}
      value={formikProps.values.experience_years}
      onChangeText={formikProps.handleChange('experience_years')}
      onBlur={formikProps.handleBlur('experience_years')}
      keyboardType="numeric"
      placeholder="e.g., 5"
    />
    {formikProps.touched.experience_years &&
      formikProps.errors.experience_years && (
        <Text style={styles.error}>{formikProps.errors.experience_years}</Text>
      )}

    <Text>Starting Price</Text>
    <TextInput
      style={styles.input}
      value={formikProps.values.starting_price}
      onChangeText={formikProps.handleChange('starting_price')}
      onBlur={formikProps.handleBlur('starting_price')}
      keyboardType="numeric"
      placeholder="e.g., 100"
    />
    {formikProps.touched.starting_price &&
      formikProps.errors.starting_price && (
        <Text style={styles.error}>{formikProps.errors.starting_price}</Text>
      )}

    <Text>Service Area (in km)</Text>
    <TextInput
      style={styles.input}
      value={formikProps.values.service_area_km}
      onChangeText={formikProps.handleChange('service_area_km')}
      onBlur={formikProps.handleBlur('service_area_km')}
      keyboardType="numeric"
      placeholder="e.g., 10"
    />
    {formikProps.touched.service_area_km &&
      formikProps.errors.service_area_km && (
        <Text style={styles.error}>{formikProps.errors.service_area_km}</Text>
      )}
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default Step2ServiceDetails;
