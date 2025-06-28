import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const defaultForm = {
  location: '',
  price: '',
  title: '',
  description: '',
  images: [''],
  category: '',
  type: 'SERVICE',
  skills: [''],
  availableDays: [''],
  workingHours: '',
  serviceAreaKM: '',
  longitude: 0,
  latitude: 0,
  status: 'DEACTIVATED',
};

const availableDayOptions = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const ServiceFormStepper = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);

  const handleChange = (key: string, value: any) => {
    setForm({...form, [key]: value});
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    const updatedArray = [...form[key]];
    updatedArray[index] = value;
    setForm({...form, [key]: updatedArray});
  };

  const addToArray = (key: string) => {
    setForm({...form, [key]: [...form[key], '']});
  };

  const handleSubmit = async () => {
    const url = step === 2 ? '/api/update-service' : '/api/create-service'; // Replace with actual endpoints
    const method = step === 2 ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <TextInput
              label="Title"
              mode="flat"
              style={styles.input}
              value={form.title}
              onChangeText={text => handleChange('title', text)}
            />
            <TextInput
              label="Location"
              mode="flat"
              style={styles.input}
              value={form.location}
              onChangeText={text => handleChange('location', text)}
            />
            <TextInput
              label="Price"
              mode="flat"
              style={styles.input}
              keyboardType="numeric"
              value={form.price.toString()}
              onChangeText={text => handleChange('price', Number(text))}
            />
            <TextInput
              label="Category"
              mode="flat"
              style={styles.input}
              value={form.category}
              onChangeText={text => handleChange('category', text)}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              label="Description"
              mode="flat"
              multiline
              numberOfLines={4}
              style={styles.input}
              value={form.description}
              onChangeText={text => handleChange('description', text)}
            />
            <TextInput
              label="Working Hours"
              mode="flat"
              style={styles.input}
              value={form.workingHours}
              onChangeText={text => handleChange('workingHours', text)}
            />
            <TextInput
              label="Service Area (KM)"
              mode="flat"
              keyboardType="numeric"
              style={styles.input}
              value={form.serviceAreaKM.toString()}
              onChangeText={text => handleChange('serviceAreaKM', Number(text))}
            />

            <Text style={styles.label}>Skills</Text>
            {form.skills.map((skill, index) => (
              <TextInput
                key={index}
                style={styles.input}
                mode="flat"
                value={skill}
                onChangeText={text => handleArrayChange('skills', index, text)}
              />
            ))}
            <TouchableOpacity
              onPress={() => addToArray('skills')}
              style={styles.addButton}>
              <Icon name="plus" size={20} color="#000" />
              <Text>Add Skill</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Images</Text>
            {form.images.map((img, index) => (
              <TextInput
                key={index}
                style={styles.input}
                mode="flat"
                value={img}
                onChangeText={text => handleArrayChange('images', index, text)}
              />
            ))}
            <TouchableOpacity
              onPress={() => addToArray('images')}
              style={styles.addButton}>
              <Icon name="plus" size={20} color="#000" />
              <Text>Add Image URL</Text>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.label}>Available Days</Text>
            {form.availableDays.map((day, index) => (
              <TextInput
                key={index}
                style={styles.input}
                mode="flat"
                value={day}
                onChangeText={text =>
                  handleArrayChange('availableDays', index, text)
                }
              />
            ))}
            <TouchableOpacity
              onPress={() => addToArray('availableDays')}
              style={styles.addButton}>
              <Icon name="plus" size={20} color="#000" />
              <Text>Add Day</Text>
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.stepTitle}>Step {step + 1} of 3</Text>
      {renderStep()}
      <View style={styles.navigation}>
        {step > 0 && (
          <Button mode="text" onPress={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 2 ? (
          <Button mode="contained" onPress={() => setStep(step + 1)}>
            Next
          </Button>
        ) : (
          <Button mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default ServiceFormStepper;
