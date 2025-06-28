import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  AppState,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppBottomSheet from '../Common/AppBottomSheet';
import {AppText} from '../Common/AppText';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchCurrentLocation} from '../../Redux/Location/locationSlice';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from '../../utils/locationPermission';
import {
  fetchAutocomplete,
  fetchCoordinates,
} from '../../Redux/Places/placesThunk';
import {resetAutoCompleteResults} from '../../Redux/Places/placesSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  isVisible: boolean;
  hideBottomSheet: () => void;
}

const LocationBottomSheet = ({isVisible, hideBottomSheet}: Props) => {
  const {currentLocation, loading} = useAppSelector(state => state.location);
  const [appState, setAppState] = useState(AppState.currentState);
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [savedLocation, setSavedLocation] = useState<any>(null);
  console.log('🚀 ~ LocationBottomSheet ~ savedLocation:', savedLocation);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const dispatch = useAppDispatch();
  const {autocompleteResults, coordinates} = useAppSelector(
    state => state.places,
  );

  const handleClosePress = useCallback(() => {
    hideBottomSheet();
  }, [hideBottomSheet]);

  useEffect(() => {
    dispatch(fetchAutocomplete(query));
  }, [dispatch, query]);

  const getCoordinates = (placeId: string, placeInfo: any) => {
    setSelectedPlace(placeInfo);
    dispatch(fetchCoordinates(placeId));
    setQuery('');
    dispatch(resetAutoCompleteResults());
    hideBottomSheet();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          AppState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          const hasPermission = await requestLocationPermission();
          if (!hasPermission) {
            Alert.alert(
              'Permission Denied',
              'Location permission is still not granted',
              [{text: 'OK'}],
            );
          }
        }
        setAppState(nextAppState);
      },
    );

    return () => subscription.remove();
  }, [appState]);

  const handleUseCurrentLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Location permission is needed to continue. Please enable it in app settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
          {cancelable: false},
        );
        return;
      }

      // Geolocation.getCurrentPosition(info => {
      //   const lat = info.coords.latitude;
      //   const lon = info.coords.longitude;
      //   console.log('🚀 ~ handleUseCurrentLocation ~ lon:', lon, lat);
      //   dispatch(fetchCurrentLocation({latitude: lat, longitude: lon}));
      // });

      Geolocation.getCurrentPosition(async info => {
        const lat = info.coords.latitude;
        const lon = info.coords.longitude;
        console.log('🚀 ~ handleUseCurrentLocation ~ lon:', lon, lat);
        const coords = {
          latitude: lat,
          longitude: lon,
          address: 'Current Location',
        };

        await AsyncStorage.setItem('locationType', 'gps');
        await AsyncStorage.setItem('locationCoords', JSON.stringify(coords));

        setSavedLocation(coords);
        await dispatch(fetchCurrentLocation({latitude: lat, longitude: lon}));
      });
    } catch (err) {
      console.error('Permission error:', err);
      Alert.alert(
        'Error',
        'An error occurred while requesting location permission.',
        [{text: 'OK'}],
      );
    }
  };

  useEffect(() => {
    const loadSavedLocation = async () => {
      const coords = await AsyncStorage.getItem('locationCoords');
      const locationType = await AsyncStorage.getItem('locationType');

      console.log('🚀 ~ loadSavedLocation ~ man:', locationType);
      if (coords && locationType === 'manual') {
        setSavedLocation(JSON.parse(coords));
      }
    };
    loadSavedLocation();
  }, []);

  useEffect(() => {
    const saveSelectedLocation = async () => {
      if (coordinates && selectedPlace) {
        const dataToSave = {
          ...coordinates,
          address:
            selectedPlace.description ??
            selectedPlace.structured_formatting.main_text,
        };
        await AsyncStorage.setItem('locationType', 'manual');
        await AsyncStorage.setItem(
          'locationCoords',
          JSON.stringify(dataToSave),
        );
        setSavedLocation(dataToSave);
        setSelectedPlace(null);
      }
    };
    saveSelectedLocation();
  }, [coordinates, selectedPlace]);

  return (
    <AppBottomSheet
      snapPoints="95%"
      isOpen={isVisible}
      onHide={hideBottomSheet}
      isScrollable={true}
      crossIconSize={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClosePress}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
              <AppText style={styles.title}>Location</AppText>
            </View>

            <View style={styles.searchContainer}>
              <Icon name="magnify" size={20} color="#888" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search city, area or neighbourhood"
                placeholderTextColor={theme.colors.fontColor2}
                value={query}
                onChangeText={text => {
                  setQuery(text);
                  if (debounceTimer) clearTimeout(debounceTimer);
                  const timer = setTimeout(() => {
                    if (text.trim().length > 1) {
                      dispatch(fetchAutocomplete(text.trim()));
                    }
                  }, 500);
                  setDebounceTimer(timer);
                }}
              />
            </View>

            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={handleUseCurrentLocation}
                style={styles.useCurrentLocation}>
                <Icon
                  name="crosshairs-gps"
                  size={20}
                  color={theme.colors.primary}
                />
                <View>
                  <AppText style={styles.currentLocationText}>
                    Use current location
                  </AppText>
                  {loading ? (
                    <AppText style={styles.subText}>Detecting...</AppText>
                  ) : (
                    <AppText style={styles.subText}>{currentLocation}</AppText>
                  )}
                </View>
              </TouchableOpacity>

              {savedLocation && (
                <TouchableOpacity style={styles.useCurrentLocation}>
                  <Icon name="map-marker" size={20} color="#FFA726" />
                  <View>
                    <AppText style={styles.currentLocationText}>
                      Saved Location
                    </AppText>
                    <AppText style={styles.subText}>
                      {savedLocation?.address ?? 'Saved coordinates'}
                    </AppText>
                  </View>
                </TouchableOpacity>
              )}

              {autocompleteResults.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {autocompleteResults.map(item => (
                    <TouchableOpacity
                      key={item.place_id}
                      style={styles.stateItem}
                      onPress={() => getCoordinates(item.place_id, item)}>
                      <AppText style={styles.stateText}>
                        {item.structured_formatting.main_text}
                      </AppText>
                      <Icon name="chevron-right" size={24} color="#000" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppBottomSheet>
  );
};

export default LocationBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(theme.spacing.spacing_16),
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: theme.fontSize.fontSize_16,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    marginTop: verticalScale(8),
    borderRadius: 8,
    padding: horizontalScale(8),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  useCurrentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  currentLocationText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  subText: {
    color: '#555',
    fontSize: 14,
  },
  stateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  stateText: {
    fontSize: 16,
    color: '#000',
  },
});
