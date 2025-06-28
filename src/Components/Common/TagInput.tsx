import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const TagInput = ({label, tags = [], setTags}: any) => {
  const [input, setInput] = useState('');
  if (!Array.isArray(tags)) {
    console.warn(
      `Expected 'tags' to be array for label "${label}", got:`,
      tags,
    );
  }
  const addTag = () => {
    if (input.trim() && !(tags || []).includes(input.trim())) {
      setTags((prev: string[]) => [...prev, input.trim()]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev: string[]) => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagInputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={`Add ${label.toLowerCase()}`}
          style={styles.underlineInput}
        />
        <TouchableOpacity onPress={addTag} style={styles.plusButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.tagList}>
        {Array.isArray(tags) &&
          tags.map((tag: any) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(tag)}>
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
      </View>
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
  plusButton: {
    backgroundColor: '#316CF4',
    padding: 10,
    borderRadius: 20,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#316CF4',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    gap: 4,
  },
  tagText: {
    color: '#fff',
  },
});
