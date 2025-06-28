import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchRatings} from '../../Redux/Rating/RatingSlice';
import {RootState} from '../../Redux/store';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {submitRating} from '../../Redux/Rating/RatingThunk';
import Toast from 'react-native-toast-message';
import theme from '../../Constants/theme';
import {getToken} from '../../utils/tokenStorage';

const ServiceRating = ({ratings, id}: any) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();

  const {loading} = useAppSelector((state: RootState) => state.ratings);

  const handleSubmit = async () => {
    const token = await getToken();
    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Login Required',
        text2: 'Please login first to submit your rating.',
      });
      return;
    }

    if (rating === 0 || comment.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please provide both a rating and a comment.',
      });
      return;
    }

    try {
      const payload = {
        serviceId: id,
        rating,
        comment,
      };
      const resultAction = await dispatch(submitRating(payload));
      if (submitRating.fulfilled.match(resultAction)) {
        setComment('');
        setRating(0);

        Toast.show({
          type: 'success',
          text1: 'Thank you!',
          text2: resultAction?.payload || 'Rating submitted successfully.',
        });
        dispatch(fetchRatings({id}));
      } else {
        const errorMessage =
          typeof resultAction.payload === 'string'
            ? resultAction.payload
            : 'Failed to submit rating. Please try again.';

        Toast.show({
          type: 'error',
          text1: 'Submission Failed',
          text2: errorMessage,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again later.';

      Toast.show({
        type: 'error',
        text1: 'Unexpected Error',
        text2: errorMessage,
      });
    }
  };

  const renderStars = (count: number, size = 20) => (
    <View style={{flexDirection: 'row'}}>
      {[1, 2, 3, 4, 5].map(num => (
        <Icon
          key={num}
          name={num <= count ? 'star' : 'star-border'}
          size={size}
          color="#FFD700"
        />
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Submit Form */}
      <Text style={styles.heading}>Submit Your Rating</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map(num => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <Icon
              name={num <= rating ? 'star' : 'star-border'}
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your feedback..."
        placeholderTextColor={theme.colors.fontColor2}
        value={comment}
        multiline
        onChangeText={setComment}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>

      {/* Ratings List */}
      <Text style={[styles.heading, {marginTop: 30}]}>User Ratings</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0066cc"
          style={{marginTop: 20}}
        />
      ) : ratings.length === 0 ? (
        <Text style={styles.noRatings}>No feedback yet.</Text>
      ) : (
        ratings.map((item: any) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Image source={{uri: item.profileImage}} style={styles.avatar} />
              <View>
                <Text style={styles.name}>
                  {item.firstName} {item.lastName}
                </Text>
                {renderStars(item.rating, 18)}
              </View>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ServiceRating;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.colors.SecondaryRed,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  noRatings: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    shadowColor: '#000',
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  comment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
