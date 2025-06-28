import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Snackbar,
  Menu,
  HelperText,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchAllFeedback,
  resetStatus,
  submitFeedback,
} from '../../Redux/feedback/feedbackSlice';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import Toast from 'react-native-toast-message';
import FeedbackScreen from '../SinglePage/ServiceFeedback';

const feedbackTypes = ['GENERAL', 'BUG_REPORT', 'FEATURE_REQUEST', 'SUPPORT'];

const Feedback = () => {
  const dispatch = useAppDispatch();
  const {loading, success, error} = useAppSelector(state => state.feedback);
  // console.log('🚀 ~ Feedback ~ feedbacks:', feedbacks);

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('GENERAL');
  const [menuVisible, setMenuVisible] = useState(false);
  const {user} = useAppSelector(state => state.user);
  console.log('🚀 ~ Feedback ~ user:', user);

  const handleSubmit = async () => {
    try {
      const res = await dispatch(
        submitFeedback({
          // serviceId: user,
          rating,
          message,
          type,
        }),
      );
      console.log('🚀 ~ handleSubmit ~ res:', res);
      console.log('🚀 ~ handleSubmit ~ res:', res.payload.message);
      Toast.show({
        type: 'success',
        text1: res.payload.subCode,
        text2: res.payload.message,
      });
      await dispatch(fetchAllFeedback());
    } catch (error) {
      console.log('first', error);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchAllFeedback());
  // }, [dispatch]);

  const renderStars = () => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(num => (
        <Icon
          key={num}
          name={num <= rating ? 'star' : 'star-outline'}
          size={30}
          color="#FFD700"
          onPress={() => setRating(num)}
        />
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Give Your Feedback
      </Text>
      <Text style={styles.label}>Rating</Text>
      {renderStars()}
      <TextInput
        label="Your Message"
        value={message}
        onChangeText={setMessage}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <HelperText type="error" visible={!message}>
        Message cannot be empty
      </HelperText>
      {/* <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)}>
            Feedback Type: {type}
          </Button>
        }>
        {feedbackTypes.map(t => (
          <Menu.Item
            key={t}
            onPress={() => {
              setType(t);
              setMenuVisible(false);
            }}
            title={t}
          />
        ))}
      </Menu> */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={!message || rating === 0}
        style={styles.submitButton}>
        Submit Feedback
      </Button>
      <Snackbar
        visible={success || !!error}
        onDismiss={() => dispatch(resetStatus())}
        duration={3000}>
        {success ? 'Feedback submitted!' : error}
      </Snackbar>
      <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 16}}>
        App FeedBacks:
      </Text>
      <ScrollView
        contentContainerStyle={{flex: 1, paddingVertical: 16}}
        showsVerticalScrollIndicator={false}>
        <FeedbackScreen />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    marginVertical: 10,
  },
  starRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 8,
  },
});

export default Feedback;
