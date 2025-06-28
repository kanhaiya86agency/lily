import React, {useState, useEffect} from 'react';
import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: string;
  setFieldValue: (field: string, value: any) => void;
};

export default function TimeRangePicker({value, setFieldValue}: Props) {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    if (value && value.includes('-')) {
      const [start, end] = value.split('-');
      const parseTime = (str: string) => {
        const date = new Date();
        const match = str.match(/^(\d+)(am|pm)$/);
        if (match) {
          let hour = parseInt(match[1]);
          if (match[2] === 'pm' && hour !== 12) hour += 12;
          if (match[2] === 'am' && hour === 12) hour = 0;
          date.setHours(hour);
          date.setMinutes(0);
          return date;
        }
        return null;
      };

      const sTime = parseTime(start);
      const eTime = parseTime(end);
      if (sTime) setStartTime(sTime);
      if (eTime) setEndTime(eTime);
    }
  }, [value]);

  const showTimePicker = (mode: 'start' | 'end') => setShowPicker(mode);

  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShowPicker(null);
      return;
    }

    selectedDate.setMinutes(0);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);

    if (showPicker === 'start') {
      setStartTime(selectedDate);
    } else if (showPicker === 'end') {
      setEndTime(selectedDate);
    }

    setShowPicker(null);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const formatted = `${formatHour(startTime)}-${formatHour(endTime)}`;
      setFieldValue('workingHours', formatted);
    }
  }, [startTime, endTime, setFieldValue]);

  const formatHour = (date: Date | null) => {
    if (!date) return '';
    const hours = date.getHours();
    const suffix = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}${suffix}`;
  };

  const displayValue =
    startTime && endTime
      ? `${formatHour(startTime)}-${formatHour(endTime)}`
      : 'None';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Time Range</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showTimePicker('start')}>
          <Text>{startTime ? formatHour(startTime) : 'Start Time'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => showTimePicker('end')}>
          <Text>{endTime ? formatHour(endTime) : 'End Time'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.result}>Selected: {displayValue}</Text>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingVertical: 10},
  label: {fontSize: 14, fontWeight: '400', marginBottom: 8},
  buttonContainer: {flexDirection: 'row', gap: 12},
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  result: {marginTop: 12, fontSize: 12},
});
