import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../Constants/theme';

const SkillInputField = ({values, setFieldValue}: any) => {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      setFieldValue('skills', [...values.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    const updated = [...values.skills];
    updated.splice(index, 1);
    setFieldValue('skills', updated);
  };

  return (
    <>
      <View style={styles.tagRow}>
        <TextInput
          // mode="flat"
          placeholder="Add Skill"
          // label="Add Skill"
          placeholderTextColor={theme.colors.fontColor2}
          value={skillInput}
          onChangeText={setSkillInput}
          onSubmitEditing={addSkill}
          style={[styles.input, {flex: 1}]}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
          <Icon name="add-circle" size={28} color="orange" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={values.skills}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({item, index}) => (
          <View style={styles.tag}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeSkill(index)}>
              <Icon name="close" size={18} />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: theme.colors.fontColor2,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  addBtn: {
    marginLeft: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.Container,
    padding: 8,
    marginRight: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default SkillInputField;
