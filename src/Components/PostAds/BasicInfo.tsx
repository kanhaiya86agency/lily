import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {TextInput} from 'react-native-paper';

interface Step1BasicInfoProps {
  formikProps: {
    values: {
      name: string;
      location: string;
      category: string;
      description: string;
    };
    errors: {
      name?: string;
      location?: string;
      category?: string;
      description?: string;
    };
    touched: {
      name?: boolean;
      location?: boolean;
      category?: boolean;
      description?: boolean;
    };
    handleChange: (field: string) => (value: string) => void;
    handleBlur: (field: string) => () => void;
  };
}

const Step1BasicInfo = ({formikProps}: Step1BasicInfoProps) => (
  <View>
    {/* <Text>Name</Text> */}
    <TextInput
      style={styles.input}
      label="Enter full name"
      value={formikProps.values.name}
      onChangeText={formikProps.handleChange('name')}
      onBlur={formikProps.handleBlur('name')}
      mode="flat"
      underlineColor={theme.colors.primary}
      placeholder="Enter full name"
    />
    {formikProps.touched.name && formikProps.errors.name && (
      <Text style={styles.error}>{formikProps.errors.name}</Text>
    )}

    {/* <Text>Location</Text> */}
    <TextInput
      style={styles.input}
      label="Enter location"
      value={formikProps.values.location}
      onChangeText={formikProps.handleChange('location')}
      onBlur={formikProps.handleBlur('location')}
      placeholder="Enter location"
      mode="flat"
      underlineColor={theme.colors.primary}
    />
    {formikProps.touched.location && formikProps.errors.location && (
      <Text style={styles.error}>{formikProps.errors.location}</Text>
    )}

    {/* <Text>Category</Text> */}
    <TextInput
      style={styles.input}
      label="e.g., Plumber"
      value={formikProps.values.category}
      mode="flat"
      underlineColor={theme.colors.primary}
      onChangeText={formikProps.handleChange('category')}
      onBlur={formikProps.handleBlur('category')}
      placeholder="e.g., Plumber"
    />
    {formikProps.touched.category && formikProps.errors.category && (
      <Text style={styles.error}>{formikProps.errors.category}</Text>
    )}

    {/* <Text>Description</Text> */}
    <TextInput
      style={[styles.input, styles.multilineInput]}
      value={formikProps.values.description}
      label="Short description"
      onChangeText={formikProps.handleChange('description')}
      onBlur={formikProps.handleBlur('description')}
      placeholder="Short description"
      multiline
      numberOfLines={4}
      mode="flat"
      underlineColor={theme.colors.primary}
    />

    {formikProps.touched.description && formikProps.errors.description && (
      <Text style={styles.error}>{formikProps.errors.description}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    marginBottom: 12,
    fontSize: 16,
    paddingHorizontal: 0,
  },
  error: {
    color: theme.colors.SecondaryRed || 'red',
    fontSize: 12,
    marginBottom: 16,
    marginLeft: 4,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
});

export default Step1BasicInfo;
