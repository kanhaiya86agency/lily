import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  HelperText,
  useTheme,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../Hooks/hooks';
import {submitRating} from '../../Redux/Rating/RatingThunk';

type Review = {
  user: string;
  comment: string;
  rating: number;
};

const AddReviewScreen = ({service}: any) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useAppDispatch();

  const isRatingInvalid =
    isNaN(Number(rating)) || Number(rating) < 0 || Number(rating) > 5;

  const handleSubmit = () => {
    if (!user || !comment || isRatingInvalid) {
      setSubmitted(true);
      return;
    }

    const newReview: Review = {
      user,
      comment,
      rating: parseFloat(rating),
    };

    console.log('Review submitted:', newReview);
    dispatch(
      submitRating({
        serviceId: '64e3d3f7f4a6c1d9e6ab8b19', // add service id here dynamic
        rating: 4, // pass rating via input value
        comment: 'Excellent service!', // pass comment value
      }),
    );
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={styles.flex}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Card.Content>
          <Title style={styles.title}>Review {service.name}</Title>
          <TextInput
            label="Your Name"
            value={user}
            mode="outlined"
            onChangeText={setUser}
            style={styles.input}
            error={submitted && !user}
          />
          {submitted && !user && (
            <HelperText type="error">Name is required</HelperText>
          )}

          <TextInput
            label="Your Comment"
            value={comment}
            mode="outlined"
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            style={styles.input}
            error={submitted && !comment}
          />
          {submitted && !comment && (
            <HelperText type="error">Comment is required</HelperText>
          )}

          <TextInput
            label="Rating (0 - 5)"
            value={rating}
            mode="outlined"
            onChangeText={setRating}
            keyboardType="decimal-pad"
            style={styles.input}
            error={submitted && isRatingInvalid}
          />
          {submitted && isRatingInvalid && (
            <HelperText type="error">
              Rating must be a number between 0 and 5
            </HelperText>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            contentStyle={styles.buttonContent}>
            Submit Review
          </Button>
        </Card.Content>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 2,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
