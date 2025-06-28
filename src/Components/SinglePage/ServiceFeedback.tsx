import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchAllFeedback} from '../../Redux/feedback/feedbackSlice';

const user = {
  id: '68432e8268c1128d717ac849',
  firstName: 'Kanhaiya',
  lastName: 'Chauhan',
  isEmailVerified: false,
  isPhoneVerified: false,
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleString();
};

const FeedbackScreen = () => {
  // const fullName = `${user.firstName} ${user.lastName}`;

  const dispatch = useAppDispatch();
  const {loading, feedbacks} = useAppSelector(state => state.feedback);
  console.log('🚀 ~ FeedbackScreen ~ feedbacks:', feedbacks);
  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={feedbacks}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.ratingRow}>
                <Icon name="star" size={20} color="#FFD700" />
                <Text style={styles.ratingText}>{item?.rating}/5</Text>
              </View>
              <Text style={styles.dateText}>{formatDate(item?.createdAt)}</Text>
            </View>
            <Text style={styles.messageText}>{item?.message}</Text>
            {/* <View style={styles.footer}> */}
            {/* <View style={styles.userInfoRow}> */}
            {/* <Icon name="person" size={16} color="#555" /> */}
            {/* <Text style={styles.userText}>feedback by: {fullName}</Text> */}
            {/* </View> */}
            {/* <Text style={styles.typeText}>Type: {item?.type}</Text> */}
            {/* </View> */}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // shadowOffset: {width: 0, height: 3},
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
  },
});
