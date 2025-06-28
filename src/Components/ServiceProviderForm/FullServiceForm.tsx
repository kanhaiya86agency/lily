import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SkillInputField from './SkillInputField';
import AvailableDaysSelector from './AvailableDaysSelector';
import ImageUploader from './ImageUploader';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {
  createServiceProvider,
  updateServiceProvider,
} from '../../Redux/ServiceProvide/serviceProviderThunk';
import Toast from 'react-native-toast-message';
import {RouteProp, useRoute} from '@react-navigation/native';
import {fetchProductById} from '../../Redux/Product/ProductSlice';
// import {TextInput} from 'react-native-paper';
import theme from '../../Constants/theme';
import DebouncedSearchInput from '../Common/DebouncedSearchInput';
import {fetchCategories} from '../../Redux/Category/categoryThunk';
import {Dropdown} from 'react-native-element-dropdown';
import {
  fetchAutocomplete,
  fetchCoordinates,
} from '../../Redux/Places/placesThunk';
import TimeRangePicker from './TimeRangePicker';
import useAppNavigation from '../Common/useAppNavigation';
import {verticalScale} from '../../helper/scaleHelper';
import SelectServices from './SelectServices';

const validationSchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  price: Yup.number().required('Price is required'),
  title: Yup.string()
    .min(10, 'Minimum 10 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Type is required'),
  workingHours: Yup.string().required('Working hours required'),
  serviceAreaKM: Yup.number().required('Service area is required'),
});

type RootStackParamList = {
  ServiceAddForm: {id: string};
};

type ServiceAddFormRouteProp = RouteProp<RootStackParamList, 'ServiceAddForm'>;

const ServiceForm = () => {
  const defaultValues = {
    location: '',
    longitude: 0,
    latitude: 0,
    price: '',
    title: '',
    description: '',
    images: [],
    category: '',
    type: selectedType,
    skills: [],
    availableDays: [],
    workingHours: '',
    serviceAreaKM: '',
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errorText, setErrorText] = useState('');
  const [selectedType, setSelectedType] = useState('SERVICE');
  console.log('🚀 ~ ServiceForm ~ selectedType:', selectedType);

  const dispatch = useAppDispatch();
  const route = useRoute<ServiceAddFormRouteProp>();
  const id = route?.params?.id;
  const {selectedProduct} = useAppSelector(state => state.products);
  const [selected, setSelected] = useState(null);
  console.log('🚀 ~ ServiceForm ~ selected:', selected);
  const {categories} = useAppSelector(state => state.categories);
  const [locate, setLocate] = useState('');
  const navigation = useAppNavigation();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log('🚀 ~ ServiceForm ~ route:', id);
  console.log('🚀 ~ ServiceForm ~ selectedProduct:', selectedProduct);

  const handleUploadComplete = (url: string) => {
    setImageUrls(prevUrls => [...prevUrls, url]);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById({id}));
    }
  }, [dispatch, id]);

  const [initialValues, setInitialValues] = useState(defaultValues);
  console.log('🚀 ~ ServiceForm ~ initialValues:', initialValues);

  useEffect(() => {
    if (id && selectedProduct && categories.length > 0) {
      const matchedCategory = categories.find(
        item => item.name === selectedProduct.category,
      );
      console.log('🚀 ~ useEffect ~ matchedCategory:', matchedCategory);

      setInitialValues({
        ...defaultValues,
        ...selectedProduct,
        price: String(selectedProduct.price ?? ''),
        serviceAreaKM: String(selectedProduct.serviceAreaKM ?? ''),
        location: selectedProduct.location ?? '',
        title: selectedProduct.title ?? '',
        description: selectedProduct.description ?? '',
        category: matchedCategory?.name ?? '',
        type: selectedProduct.type,
        workingHours: selectedProduct.workingHours ?? '',
        skills: selectedProduct.skills || [],
        availableDays: selectedProduct.availableDays ?? [],
      });
      setImageUrls(selectedProduct.images || []);
      setSelected(matchedCategory?.name);
      if (selectedProduct.location) {
        setLocate(selectedProduct.location);
      }
    }
  }, [id, selectedProduct, categories, defaultValues]);

  const handleServiceAdd = async (values: any) => {
    const payload = {
      ...values,
      images: imageUrls,
    };
    console.log('🚀 ~ handleServiceAdd ~ payload:', payload);

    try {
      if (values.id) {
        const res = await dispatch(
          updateServiceProvider({id: values.id, data: payload}),
        );
        if (updateServiceProvider.fulfilled.match(res)) {
          const successPayload = res.payload as {message: string};
          Toast.show({
            type: 'success',
            text1: successPayload.message,
            position: 'top',
          });
          navigation.navigate('Home');
        } else {
          console.error('Update failed:', res.payload);
          const errorPayload = res.payload as {message: string};
          setErrorText(errorPayload.message);
          Toast.show({
            type: 'error',
            text1: 'Creation failed',
            text2: errorPayload.message,
            position: 'top',
          });
        }
      } else {
        const res = await dispatch(createServiceProvider(payload));
        console.log('🚀 ~ handleServiceAdd ~ payload:', payload, res);
        if (createServiceProvider.fulfilled.match(res)) {
          const successPayload = res.payload as {message: string};
          Toast.show({
            type: 'success',
            text1: successPayload.message,
            position: 'top',
          });
          navigation.navigate('MyServices');
        } else {
          console.error('Creation failed:', res.payload);
          const errorPayload = res.payload as {message: string};
          setErrorText(errorPayload.message);
          Toast.show({
            type: 'error',
            text1: 'Creation failed',
            text2: errorPayload.message,
            position: 'top',
          });
        }
      }
    } catch (error) {
      console.error('Error submitting:', error);
      Toast.show({
        type: 'success',
        text1: error.payload.message,
        position: 'top',
      });
    }
  };

  const handleSelectLocation = async (item: any, setFieldValue: Function) => {
    try {
      const result = await dispatch(fetchCoordinates(item.place_id)).unwrap();
      console.log('🚀 ~ handleSelectLocation ~ result:', result);

      setLocate(
        item?.structured_formatting?.main_text ?? item?.description ?? '',
      );

      setFieldValue('location', result.address);
      setFieldValue('longitude', result.longitude);
      setFieldValue('latitude', result.latitude);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to get coordinates',
        position: 'top',
      });
    }
  };

  const filterData = categories?.filter(el => el.type === selectedType);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, backgroundColor: '#ffff'}}>
            <View style={styles.tagRowProvider}>
              <SelectServices onSelect={setSelectedType} />
            </View>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={values => handleServiceAdd(values)}>
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <View
                  // keyboardShouldPersistTaps="handled"
                  // showsVerticalScrollIndicator={false}
                  style={styles.container}>
                  <TextInput
                    placeholder="Title (Min 10 Characters)"
                    style={styles.input}
                    placeholderTextColor={theme.colors.fontColor2}
                    value={values.title}
                    onChangeText={handleChange('title')}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.error}>{errors.title}</Text>
                  )}

                  <TextInput
                    placeholder="Price"
                    keyboardType="numeric"
                    placeholderTextColor={theme.colors.fontColor2}
                    style={styles.input}
                    value={String(values.price)}
                    onChangeText={text => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      const numberValue =
                        numericText === '' ? '' : Number(numericText);
                      setFieldValue('price', numberValue);
                    }}
                  />
                  {touched.price && errors.price && (
                    <Text style={styles.error}>{errors.price}</Text>
                  )}

                  <TextInput
                    placeholder="Description"
                    placeholderTextColor={theme.colors.fontColor2}
                    style={styles.input}
                    multiline
                    value={values.description}
                    onChangeText={handleChange('description')}
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.error}>{errors.description}</Text>
                  )}

                  {/* <TextInput
                  placeholder="Category"
                  style={styles.input}
                  value={values.category}
                  onChangeText={handleChange('category')}
                /> */}

                  {/* <Dropdown
                  style={styles.dropdown}
                  data={categories}
                  search
                  maxHeight={300}
                  labelField="name" // Displayed text
                  valueField="name" // Returned value
                  placeholder="Select category"
                  searchPlaceholder="Search..."
                  value={selected}
                  onChange={item => {
                    setSelected(item.name);
                  }}
                /> */}

                  <Dropdown
                    style={styles.dropdown}
                    data={filterData}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder="Select category"
                    searchPlaceholder="Search..."
                    value={values.category}
                    onChange={item => {
                      setSelected(item.name);
                      setFieldValue('category', item.name);
                    }}
                  />

                  {touched.category && errors.category && (
                    <Text style={styles.error}>{errors.category}</Text>
                  )}

                  <DebouncedSearchInput
                    label="Location"
                    value={locate}
                    inputStyle={[
                      styles.input,
                      {
                        marginTop: 15,
                      },
                    ]}
                    onChange={setLocate}
                    // onSelect={handleSelectLocation}
                    dispatchAction={fetchAutocomplete}
                    onSelect={item => handleSelectLocation(item, setFieldValue)}
                    selector={state => state.places.autocompleteResults}
                  />

                  {touched.location && errors.location && (
                    <Text style={styles.error}>{errors.location}</Text>
                  )}
                  {/* <TextInput
                  placeholder="Working Hours (e.g. 9AM-5PM)"
                  style={styles.input}
                  value={values.workingHours}
                  onChangeText={handleChange('workingHours')}
                /> */}
                  {selectedType !== 'PRODUCT' && (
                    <>
                      <TimeRangePicker
                        value={values.workingHours}
                        setFieldValue={setFieldValue}
                      />
                      {touched.workingHours && errors.workingHours && (
                        <Text style={styles.error}>{errors.workingHours}</Text>
                      )}{' '}
                      <TextInput
                        placeholder="Service Area in KM"
                        placeholderTextColor={theme.colors.fontColor2}
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(values.serviceAreaKM)}
                        onChangeText={text => {
                          const numericText = text.replace(/[^0-9]/g, '');
                          const numberValue =
                            numericText === '' ? '' : Number(numericText);
                          setFieldValue('serviceAreaKM', numberValue);
                        }}
                      />
                      {touched.serviceAreaKM && errors.serviceAreaKM && (
                        <Text style={styles.error}>{errors.serviceAreaKM}</Text>
                      )}
                      {/* Skills Tag Input */}
                      <SkillInputField
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                      <AvailableDaysSelector
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    </>
                  )}
                  {/* Image Picker Placeholder */}

                  <ImageUploader onUploadComplete={handleUploadComplete} />

                  <ScrollView horizontal style={styles.scrollView}>
                    {imageUrls.map((url, index) => (
                      <Image
                        key={index}
                        source={{uri: url}}
                        style={styles.image}
                      />
                    ))}
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                  <Text style={styles.error}>{errorText}</Text>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.fontColor2,
    // paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  tagRowProvider: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dropdown: {
    height: verticalScale(50),
    borderColor: theme.colors.fontColor2,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addBtn: {
    marginLeft: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 8,
    marginRight: 6,
    borderRadius: 20,
  },
  imageBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: '#F63774',
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dayButtonSelected: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  dayText: {
    fontSize: 12,
    color: '#333',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ServiceForm;
