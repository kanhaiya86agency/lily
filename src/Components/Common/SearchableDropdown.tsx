import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-paper';

type SearchableDropdownProps<T> = {
  data: T[];
  value: string;
  label?: string;
  onChange: (val: string) => void;
  onSelect: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor?: (item: T) => string;
  placeholder?: string;
  resultContainerStyle?: ViewStyle;
  resultItemStyle?: TextStyle;
};

function SearchableDropdown<T>({
  data,
  value,
  onChange,
  onSelect,
  renderItem,
  keyExtractor = (item: any) => item?.id?.toString() ?? item?.toString(),
  placeholder = 'Search...',
  resultContainerStyle,
  resultItemStyle,
}: SearchableDropdownProps<T>) {
  const [search, setSearch] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    const filtered = data.filter(item =>
      (item as any)?.name?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [search, data]);
  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleSelect = (item: T) => {
    setSearch((item as any)?.name ?? '');
    setShowDropdown(false);
    onChange((item as any)?.name ?? '');
    onSelect(item);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowDropdown(false);
      }}>
      <View>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <TextInput
            mode="flat"
            placeholder={placeholder}
            value={search}
            onChangeText={text => {
              setSearch(text);
              setShowDropdown(true);
              onChange(text);
            }}
            style={styles.input}
          />
        </TouchableOpacity>

        {showDropdown && filteredData.length > 0 && (
          <FlatList
            data={filteredData}
            keyExtractor={keyExtractor}
            style={[styles.dropdownContainer, resultContainerStyle]}
            nestedScrollEnabled
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <Text style={[styles.dropdownItem, resultItemStyle]}>
                    {(item as any)?.name ?? JSON.stringify(item)}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    maxHeight: 180,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
});

export default SearchableDropdown;
