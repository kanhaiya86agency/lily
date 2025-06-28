import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import useAppNavigation from '../Common/useAppNavigation';
import {ChatsScreen} from '../../Screens';
import theme from '../../Constants/theme';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchRooms} from '../../Redux/Chat/chatRoomSlice';
import {ActivityIndicator} from 'react-native-paper';
import {verticalScale} from '../../helper/scaleHelper';
import EmptyState from '../Common/EmptyState';
import {getUserId} from '../../utils/tokenStorage';
import {useIsFocused} from '@react-navigation/native';
import TabComponent from '../Home/TabComponent';

const ChatsUsersList = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const {rooms, loading, error} = useAppSelector(state => state.rooms);
  console.log('🚀 ~ ChatsUsersList ~ rooms:', rooms);
  const [CurrentUser, setCurrentUser] = useState<string | null>(null);
  // const [selectedType, setSelectedType] = useState('services');
  const [selectedTab, setSelectedTab] = useState('SERVICE');
  console.log('🚀 ~ ChatsUsersList ~ selectedType:', selectedTab);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(fetchRooms());

    const loadToken = async () => {
      const userId = await getUserId();
      setCurrentUser(userId);
    };
    if (isFocused) {
      loadToken();
    }
  }, [dispatch, isFocused]);

  const handleRefetch = () => {
    dispatch(fetchRooms());
  };
  const filterData = rooms?.filter(el => el.chatContext === selectedTab);
  console.log('🚀 ~ ChatsUsersList ~ filterData:', filterData);

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Could not load data. Please try again."
        iconName="alert-circle-outline"
        iconColor="#e74c3c"
        buttonText="Retry"
        onPress={handleRefetch}
      />
    );
  }

  if (rooms.length <= 0) {
    return (
      <EmptyState
        title="No Chats Yet"
        description="Start a conversation by selecting a service or product."
        iconName="chat-outline"
        iconColor="#bbb"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainerServices}>
        <TabComponent onTabChange={setSelectedTab} />
      </View>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : filterData.length === 0 ? (
        <EmptyState
          title="No Chats Yet"
          description="Start a conversation by selecting a service or product."
          iconName="chat-outline"
          iconColor="#bbb"
        />
      ) : (
        <FlatList
          data={filterData}
          keyExtractor={item => item.id}
          // renderItem={({item}) => (
          //   <TouchableOpacity
          //     style={styles.card}
          //     onPress={() =>
          //       navigation.navigate(ChatsScreen, {
          //         receiverId: item.receiverId,
          //         roomId: item.id,
          //         productData: {
          //           id: item.serviceProductId?.id,
          //           images: item.serviceProductId?.images,
          //           type: item.chatContext,
          //           user: {
          //             id: '',
          //             firstName: item.receiverName.split(' ')[0],
          //             lastName: item.receiverName.split(' ')[1],
          //             profileImage: item.serviceProductId?.images?.[0] || '',
          //           },
          //         },
          //       })
          //     }>
          //     <Image
          //       source={{
          //         uri:
          //           item.serviceProductId?.images?.[0] ||
          //           'https://via.placeholder.com/50',
          //       }}
          //       style={styles.avatar}
          //     />
          //     <View style={styles.textContainer}>
          //       <View style={styles.nameRow}>
          //         <Text style={styles.userName}>{item.receiverName}</Text>
          //         <Text style={styles.userName}>{item.senderName}</Text>
          //         <Text style={styles.time}>
          //           {new Date(item.updatedAt).toLocaleTimeString([], {
          //             hour: '2-digit',
          //             minute: '2-digit',
          //           })}
          //         </Text>
          //       </View>
          //       <Text style={styles.lastMessage} numberOfLines={1}>
          //         {item.latestMessage}
          //       </Text>
          //     </View>
          //   </TouchableOpacity>
          // )}
          renderItem={({item}) => {
            const isSender = item.senderId === CurrentUser;
            console.log('🚀 ~ ChatsUsersList ~ isSender:', isSender);

            const otherUserName = isSender
              ? item.receiverName
              : item.senderName;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate(ChatsScreen, {
                    receiverId: isSender ? item.receiverId : item.senderId,
                    roomId: item.id,
                    productData: {
                      id: item.serviceProductId?.id,
                      images: item.serviceProductId?.images,
                      type: item.chatContext,
                      user: {
                        id: isSender ? item.receiverId : item.senderId,
                        firstName: otherUserName.split(' ')[0],
                        lastName: otherUserName.split(' ')[1] ?? '',
                        profileImage: item.serviceProductId?.images?.[0] || '',
                      },
                    },
                  })
                }>
                <Image
                  source={{
                    uri:
                      item.serviceProductId?.images?.[0] ??
                      'https://via.placeholder.com/50',
                  }}
                  style={styles.avatar}
                />
                <View style={styles.textContainer}>
                  <View style={styles.nameRow}>
                    <View>
                      <Text style={styles.userName}>
                        {item.serviceProductId?.title}
                      </Text>
                      <Text style={styles.lastMessage}>{otherUserName}</Text>
                    </View>

                    <Text style={styles.time}>
                      {new Date(item.updatedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.latestMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default ChatsUsersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginTop: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  loader: {
    paddingVertical: verticalScale(20),
  },
  servicesCard: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  providersCard: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  servicesText: {
    color: theme.colors.white,
  },
  categoryContainerServices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
  },
});
