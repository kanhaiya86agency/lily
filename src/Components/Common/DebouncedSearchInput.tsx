import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TextInput,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';

type DebouncedSearchInputProps<T> = {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (item: T) => void;
  dispatchAction: (query: string) => any;
  selector: (state: any) => T[];
  renderItem?: (item: T) => React.ReactNode;
  debounceDelay?: number;
  inputStyle?: TextStyle;
  resultContainerStyle?: ViewStyle;
  resultItemStyle?: TextStyle;
};

function DebouncedSearchInput<T>({
  label = 'Search',
  value,
  onChange,
  onSelect,
  dispatchAction,
  selector,
  renderItem,
  debounceDelay = 500,
  inputStyle,
  resultContainerStyle,
  resultItemStyle,
}: DebouncedSearchInputProps<T>) {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selector);
  console.log('🚀 ~ results:', results);

  const [debouncedValue, setDebouncedValue] = useState(value);
  const [showResults, setShowResults] = useState(false);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value.trim());
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [value, debounceDelay]);

  // Trigger search only if not empty
  useEffect(() => {
    if (debouncedValue.length > 0) {
      dispatch(dispatchAction(debouncedValue));
    } else {
      setShowResults(false); // ✅ Ensure dropdown is hidden if input is empty
    }
  }, [debouncedValue, dispatch, dispatchAction]);

  // Handle selection
  const handleSelect = (item: T) => {
    onSelect(item);
    setShowResults(false); // ✅ hide dropdown on select
  };

  return (
    <View>
      <TextInput
        // label={label}
        value={value}
        placeholder="Search your location..."
        placeholderTextColor={theme.colors.fontColor2}
        onChangeText={text => {
          onChange(text);
          if (text.trim().length === 0) {
            setShowResults(false);
          } else {
            setShowResults(true);
          }
        }}
        // mode="flat"
        // underlineColor="#6200ee"
        style={[styles.input, inputStyle]}
      />

      {showResults && results?.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(_, index) => index.toString()}
          nestedScrollEnabled={true}
          style={[styles.resultContainer, resultContainerStyle]}
          keyboardShouldPersistTaps="handled"
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              {renderItem ? (
                renderItem(item)
              ) : (
                <View style={[styles.resultItem, resultItemStyle]}>
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {(item as any)?.structured_formatting?.main_text ??
                      (item as any)?.name ??
                      (item as any)?.label ??
                      'Unknown'}
                  </Text>
                  {(item as any)?.structured_formatting?.secondary_text && (
                    <Text style={{fontSize: 12, color: '#555'}}>
                      {(item as any).structured_formatting.secondary_text}
                    </Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  resultContainer: {
    backgroundColor: '#fff',
    maxHeight: verticalScale(200),
    borderRadius: 5,
    elevation: 3,
    zIndex: 1000,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default DebouncedSearchInput;
