import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Checkbox} from 'react-native-paper';

export const MultiSelectInput = ({
  label,
  items,
  selectedItems,
  setSelectedItems,
}: any) => {
  const toggleItem = (item: string) => {
    setSelectedItems((prev: string[]) =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      {items.map((item: string) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxContainer}
          onPress={() => toggleItem(item)}>
          <Checkbox
            status={selectedItems.includes(item) ? 'checked' : 'unchecked'}
          />
          <Text style={styles.checkboxLabel}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#062743',
    marginBottom: 6,
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    paddingHorizontal: 4,
    flex: 1,
  },
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
});
