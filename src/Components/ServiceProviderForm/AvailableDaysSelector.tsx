import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const AvailableDaysSelector = ({values, setFieldValue}: any) => {
  const toggleDay = (day: string) => {
    const selected = values.availableDays.includes(day);
    const updated = selected
      ? values.availableDays.filter((d: string) => d !== day)
      : [...values.availableDays, day];
    setFieldValue('availableDays', updated);
  };

  return (
    <>
      <Text style={{marginBottom: 6, fontWeight: 'bold'}}>Available Days</Text>
      <View style={styles.dayContainer}>
        {weekDays.map(day => {
          const selected = values.availableDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, selected && styles.dayButtonSelected]}
              onPress={() => toggleDay(day)}>
              <Text
                style={[styles.dayText, selected && styles.dayTextSelected]}>
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginRight: 8,
    marginBottom: 8,
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

export default AvailableDaysSelector;
