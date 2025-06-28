import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchNotifications} from '../../Redux/Notification/notificationThunk';
import {formatDateLabel} from '../Hooks/formatDateLabel';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';

const NotificationItem = ({item}: any) => {
  const hasImage = !!item.icon;
  const isRead = item.isRead;

  return (
    <View
      style={[styles.card, {backgroundColor: isRead ? '#f9fafb' : '#ffffff'}]}>
      {/* Icon or Image */}
      <View style={styles.avatarContainer}>
        {hasImage ? (
          <Image source={{uri: item.icon}} style={styles.avatar} />
        ) : (
          <View style={[styles.initialsCircle]}>
            <Icon name="bell-outline" size={20} color="#ffffff" />
          </View>
        )}
      </View>

      {/* Title and Body */}
      <View style={styles.messageContainer}>
        <Text style={styles.title}>{item.title || 'Notification'}</Text>
        <Text style={styles.subtitle}>{item.body}</Text>
      </View>

      {/* Time */}
      <View style={styles.rightSection}>
        <Text style={styles.time}>{formatDateLabel(item.createdAt)}</Text>
      </View>
    </View>
  );
};

export default function Notifications() {
  const dispatch = useAppDispatch();
  const {data: notifications} = useAppSelector(state => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications({page: 1, limit: 10}));
  }, [dispatch]);

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => item._id ?? `${index}`}
      renderItem={({item}) => <NotificationItem item={item} />}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No notifications available.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
    backgroundColor: '#f1f5f9',
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: horizontalScale(14),
    borderRadius: horizontalScale(12),
    marginBottom: verticalScale(12),
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  avatarContainer: {
    marginRight: horizontalScale(12),
  },
  avatar: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: horizontalScale(24),
    backgroundColor: '#dbeafe',
  },
  initialsCircle: {
    width: horizontalScale(48),
    height: verticalScale(48),
    borderRadius: horizontalScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
  },
  messageContainer: {
    flex: 1,
  },
  title: {
    fontSize: horizontalScale(15),
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: horizontalScale(13),
    color: '#64748b',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: horizontalScale(8),
  },
  time: {
    fontSize: horizontalScale(12),
    color: '#94a3b8',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: verticalScale(40),
    fontSize: horizontalScale(14),
  },
});
