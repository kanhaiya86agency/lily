import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '../Hooks/hooks';
import {
  createServiceProvider,
  updateServiceProvider,
} from '../../Redux/ServiceProvide/serviceProviderThunk';
import {steps} from './stepConfig';
import theme from '../../Constants/theme';

interface FormValues {
  title: string;
  location: string;
  longitude: number;
  latitude: number;
  price: number;
  description: string;
  images: string[];
  category: string;
  type: 'SERVICE' | 'PRODUCT';
  skills: string[];
  languages: string[];
  availableDays: string[];
  availableHours: string[];
  serviceAreaKM: number;
  status: 'ACTIVE' | 'DEACTIVATED';
  profile_image_url?: string | null;
}

interface ServiceProviderStepperFormProps {
  initialValues?: Partial<FormValues>;
  isEdit?: boolean;
  onSubmitSuccess?: () => void;
}

const defaultInitialValues: FormValues = {
  title: '',
  location: '',
  longitude: 0,
  latitude: 0,
  price: 0,
  description: '',
  images: [],
  category: '',
  type: 'SERVICE',
  skills: [],
  languages: [],
  availableDays: [],
  availableHours: [],
  serviceAreaKM: 0,
  status: 'DEACTIVATED',
  profile_image_url: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  longitude: Yup.number().required('Longitude is required'),
  latitude: Yup.number().required('Latitude is required'),
  price: Yup.number().required('Price is required'),
  description: Yup.string().required('Description is required'),
  images: Yup.array().min(1, 'At least one image is required'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().oneOf(['SERVICE', 'PRODUCT']).required(),
  skills: Yup.array().min(1, 'At least one skill is required'),
  availableDays: Yup.array().min(1, 'Select available days'),
  availableHours: Yup.array().min(1, 'Select at least one hour'),
  serviceAreaKM: Yup.number().required('Service area is required'),
  status: Yup.string().oneOf(['ACTIVE', 'DEACTIVATED']).required(),
});

const ServiceProviderStepperForm = ({
  initialValues = {},
  isEdit = false,
  onSubmitSuccess,
}: ServiceProviderStepperFormProps) => {
  const [step, setStep] = useState(0);
  const [imageUri, setImageUri] = useState<string>(
    initialValues?.profile_image_url ?? '',
  );
  const dispatch = useAppDispatch();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePickImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets?.length && isMounted.current) {
      setImageUri(result.assets[0].uri ?? '');
    }
  };

  const handleSubmitForm = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const payload = {
      ...values,
      serviceAreaKM: values.serviceAreaKM,
      price: values.price,
      images: values.images,
    };
    console.log('🚀 ~ payload:', payload);

    try {
      if (isEdit) {
        await dispatch(updateServiceProvider(payload));
        console.log('🚀 ~ payload:', payload);
      } else {
        await dispatch(createServiceProvider(payload));
        console.log('🚀 ~ payload:', payload);
      }

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const StepComponent = steps[step].component;

  return (
    <Formik
      initialValues={{...defaultInitialValues, ...initialValues}}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}>
      {formikProps => {
        // Validate if all current step fields are valid & filled
        const stepFields = steps[step].fields;
        const isStepValid = stepFields.every(field => {
          const error = formikProps.errors[field];
          const value = formikProps.values[field];

          // For arrays, check length > 0
          if (Array.isArray(value)) {
            return !error && value.length > 0;
          }

          // For strings/numbers check non-empty and no error
          return (
            !error && value !== '' && value !== undefined && value !== null
          );
        });

        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>
              Step {step + 1} of {steps.length}: {steps[step].title}
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {width: `${((step + 1) / steps.length) * 100}%`},
                ]}
              />
            </View>

            <StepComponent
              key={step}
              formikProps={formikProps}
              imageUri={imageUri}
              pickImage={handlePickImage}
            />

            <View style={styles.buttonRow}>
              {step > 0 && (
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => setStep(step - 1)}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              )}
              {step < steps.length - 1 ? (
                <TouchableOpacity
                  style={[styles.navButton, isStepValid && styles.activeButton]}
                  disabled={!isStepValid}
                  onPress={async () => {
                    const errors = await formikProps.validateForm();
                    console.log('🚀 ~ onPress={ ~ errors:', errors);
                    const touchedFields = stepFields.reduce(
                      (acc, f) => ({...acc, [f]: true}),
                      {},
                    );
                    formikProps.setTouched({
                      ...formikProps.touched,
                      ...touchedFields,
                    });

                    const hasError = stepFields.some(field => errors[field]);
                    console.log('🚀 ~ onPress={ ~ hasError:', hasError);
                    if (!hasError) setStep(step + 1);
                  }}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isStepValid && styles.activeButton,
                  ]}
                  // disabled={!isStepValid || formikProps.isSubmitting}
                  onPress={() => formikProps.handleSubmit()}>
                  <Text style={styles.buttonText}>
                    {isEdit ? 'Update' : 'Submit'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  header: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  progressBarBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.SecondaryRed,
  },
  navButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: theme.colors.SecondaryRed,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    flex: 1,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  buttonRow: {flexDirection: 'row', justifyContent: 'space-between'},
  activeButton: {
    backgroundColor: theme.colors.SecondaryRed,
  },
});

export default ServiceProviderStepperForm;
