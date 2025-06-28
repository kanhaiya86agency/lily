import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface DynamicListProps {
  label: string;
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}
interface Step3SkillsAvailabilityProps {
  formikProps: {
    values: {
      languages: string[];
      skills: string[];
      availableDays: string[];
      availableHours: string[];
    };
    setFieldValue: (field: string, value: any) => void;
    errors: {
      languages?: string;
      skills?: string;
      availableDays?: string;
      availableHours?: string;
    };
    touched: {
      languages?: boolean;
      skills?: boolean;
      availableDays?: boolean;
      availableHours?: boolean;
    };
  };
}

const DynamicList = ({label, data, setData}: DynamicListProps) => {
  const [value, setValue] = useState('');

  const addItem = () => {
    if (value.trim()) {
      setData([...data, value.trim()]);
      setValue('');
    }
  };

  return (
    <View style={styles.groupBox}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          value={value}
          onChangeText={setValue}
          placeholder={`Add ${label}`}
        />
        <TouchableOpacity onPress={addItem}>
          <Icon name="add-circle-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${label}-${index}`}
        renderItem={({item}) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Step3SkillsAvailability = ({
  formikProps,
}: Step3SkillsAvailabilityProps) => {
  const {values, setFieldValue, errors, touched} = formikProps;

  return (
    <View style={styles.container}>
      <DynamicList
        label="Languages"
        data={values.languages}
        setData={list => setFieldValue('languages', list)}
      />
      {touched.languages && errors.languages && (
        <Text style={styles.error}>{errors.languages}</Text>
      )}

      <DynamicList
        label="Skills"
        data={values.skills}
        setData={list => setFieldValue('skills', list)}
      />
      {touched.skills && errors.skills && (
        <Text style={styles.error}>{errors.skills}</Text>
      )}

      <DynamicList
        label="Available Days"
        data={values.availableDays}
        setData={list => setFieldValue('availableDays', list)}
      />
      {touched.availableDays && errors.availableDays && (
        <Text style={styles.error}>{errors.availableDays}</Text>
      )}

      <DynamicList
        label="Available Hours"
        data={values.availableHours}
        setData={list => setFieldValue('availableHours', list)}
      />
      {touched.availableHours && errors.availableHours && (
        <Text style={styles.error}>{errors.availableHours}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {padding: 10},
  groupBox: {marginBottom: 20},
  label: {marginBottom: 6, fontWeight: '600', fontSize: 16},
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginLeft: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#007AFF20',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
    marginTop: 10,
  },
  tagText: {
    color: '#007AFF',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default Step3SkillsAvailability;
