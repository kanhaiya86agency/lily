// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import PushNotification from 'react-native-push-notification';
// import io from 'socket.io-client';
// import useAppNavigation from '../Common/useAppNavigation';
// import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
// import {fetchRoomDetail, fetchRooms} from '../../Redux/Chat/chatRoomSlice';

// const socket = io('http://3.110.104.32:3000', {
//   transports: ['websocket'],
//   query: {
//     token:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTFhNmNjMzEyMjc0NzVlZmZiYmZkOCIsImVtYWlsIjoia2FuaGFpeWFAZ21haWwuY29tIiwiaWF0IjoxNzUwNDg4MTM3LCJleHAiOjE3NTEyNjU3Mzd9.y8SLT26GP12HAhBLbgTLd6ogYOr9vlhJO3SW3FB_R64',
//   },
// });

// const Chats = () => {
//   const navigation = useAppNavigation();
//   const dispatch = useAppDispatch();
//   const {room, rooms} = useAppSelector(state => state.rooms);
//   // console.log('🚀 ~ Chats ~ room:', room);
//   console.log('🚀 ~ Chats ~ rooms:', rooms);
//   console.log('🚀 ~ Chats ~ room:', room);

//   const roomId = '68565fccc8482cb15b25f0e3';
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [typingUser, setTypingUser] = useState(null);
//   const [socketid, setSocketId] = useState('');
//   console.log('🚀 ~ Chats ~ socketid:', socketid);

//   useEffect(() => {
//     dispatch(fetchRoomDetail('68565fccc8482cb15b25f0e3'));
//     // dispatch(fetchRooms());

//     socket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     socket.on('connected', data => {
//       console.log('Connected to socket server', data.socketId);
//       setSocketId(data.socketId ?? '');
//       console.log('Connected to socket server');
//     });

//     socket.on('receive_message', data => {
//       console.log('Received message:', data);
//       // if (data.sender !== 'User1') {
//       //   PushNotification.localNotification({
//       //     title: data.sender,
//       //     message: data.message,
//       //   });
//       // }
//       // setMessages(prev => [...prev, data]);
//     });
//     socket.on('error', error => {
//       console.error('Socket connection error:', error);
//     });

//     socket.on('disconnected', data => {
//       console.error('Socket connection error:', data);
//     });

//     socket.on('message_send_successfully', data => {
//       console.log('Message sent successfully:', data);
//       dispatch(fetchRoomDetail('68565fccc8482cb15b25f0e3'));
//     });

//     return () => {
//       socket.off('receive_message');
//       socket.off('user_typing');
//       socket.disconnect();
//     };
//   }, [dispatch]);

//   const handleSend = () => {
//     if (!inputMessage.trim()) {
//       return;
//     }

//     // const messageData = {
//     //   sender: 'User1',
//     //   message: inputMessage,
//     //   roomId,
//     //   timestamp: new Date().toISOString(),
//     // };

//     const messageData = {
//       productServiceId: '684ed6858fb0f667461dfe57',
//       receiverId: '684ed6858fb0f667461dfe25',
//       // roomId: '60f7b2d5c25e4a6f8b0e7d23',
//       chatContext: 'SERVICE',
//       message: inputMessage,
//       // receiverSocketId: 'u6YuQKt_FYDvgnXXAAAV',
//     };

//     socket.emit('send_message', messageData);
//     setMessages(prev => [...prev, messageData]);
//     setInputMessage('');
//   };

//   const handleTyping = (text: string) => {
//     setInputMessage(text);
//     socket.emit('typing', {roomId, sender: 'User1'});
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-left" size={30} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.userInfo}>
//             <View style={styles.profilePic} />
//             <View>
//               <Text style={styles.name}>{room?.receiverName ?? 'User'}</Text>
//               <Text style={styles.status}>Active Now</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.chatSection}>
//           <FlatList
//             data={messages}
//             keyExtractor={(_, i) => i.toString()}
//             renderItem={({item}) => (
//               <View
//                 style={
//                   item.sender !== 'User1' ? styles.rightMsg : styles.leftMsg
//                 }>
//                 <Text
//                   style={
//                     item.sender === 'User1'
//                       ? styles.msgTextRight
//                       : styles.msgText
//                   }>
//                   {item.message}
//                 </Text>
//                 <Text style={styles.timestamp}>
//                   {new Date(item.timestamp).toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </Text>
//               </View>
//             )}
//             contentContainerStyle={{paddingBottom: 80}}
//           />

//           {typingUser && (
//             <View style={styles.typingBubble}>
//               <Text style={styles.typingDots}>{typingUser} is typing...</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.inputSection}>
//           <TextInput
//             placeholder="Type a message here"
//             style={styles.input}
//             placeholderTextColor="#999"
//             value={inputMessage}
//             onChangeText={handleTyping}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//             <Icon name="send" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#316CF4',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#316CF4',
//     paddingBottom: 60,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//     flex: 1,
//   },
//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#222',
//     marginRight: 10,
//   },
//   name: {color: '#fff', fontWeight: 'bold', fontSize: 16},
//   status: {color: '#cce6ff', fontSize: 12},
//   chatSection: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     marginTop: -16,
//   },
//   leftMsg: {
//     backgroundColor: '#f0f4fa',
//     alignSelf: 'flex-start',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   msgText: {color: '#333'},
//   rightMsg: {
//     backgroundColor: '#e0ecff',
//     alignSelf: 'flex-end',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   msgTextRight: {color: '#316CF4'},
//   timestamp: {
//     fontSize: 10,
//     color: '#999',
//     marginTop: 4,
//   },
//   typingBubble: {
//     backgroundColor: '#f0f4fa',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignSelf: 'flex-start',
//     marginBottom: 8,
//   },
//   typingDots: {fontSize: 14, color: '#999'},
//   inputSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderTopColor: '#eee',
//     borderTopWidth: 1,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     fontSize: 14,
//   },
//   sendButton: {
//     backgroundColor: '#ff3366',
//     borderRadius: 20,
//     padding: 10,
//     marginLeft: 8,
//   },
// });

// export default Chats;
// skdfjkldsjflksdjfdsf

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useIsFocused, useRoute} from '@react-navigation/native';
// import io from 'socket.io-client';
// import useAppNavigation from '../Common/useAppNavigation';
// import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
// import {fetchRoomDetail, fetchRooms} from '../../Redux/Chat/chatRoomSlice';
// import {getToken, getUserId} from '../../utils/tokenStorage';
// import Toast from 'react-native-toast-message';

// const SOCKET_URL = 'http://3.110.104.32:3000';

// const Chats = () => {
//   const navigation = useAppNavigation();
//   const dispatch = useAppDispatch();
//   const route = useRoute();
//   const {productData, roomId, receiverId} = route.params as {
//     productData: any;
//   } as any;
//   console.log('🚀 ~ Chats ~ productData:', productData);

//   const [socket, setSocket] = useState<any>(null);
//   const [inputMessage, setInputMessage] = useState('');
//   const [localToken, setLocalToken] = useState<string | null>(null);
//   const [CurrentUser, setCurrentUser] = useState<string | null>(null);
//   const isFocused = useIsFocused();
//   const {room} = useAppSelector(state => state.rooms);
//   console.log('🚀 ~ Chats ~ room:', room);

//   useEffect(() => {
//     if (roomId) {
//       dispatch(fetchRoomDetail(roomId));
//     } else {
//       dispatch({type: 'rooms/clearRoomDetail'});
//     }

//     const loadToken = async () => {
//       const token = await getToken();
//       const userId = await getUserId();
//       setCurrentUser(userId);
//       setLocalToken(token);
//     };
//     if (isFocused) {
//       loadToken();
//     }
//   }, [dispatch, isFocused, roomId]);

//   console.log('🚀 ~ Chats ~ token:', localToken);

//   useEffect(() => {
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket'],
//       query: {
//         token: localToken,
//       },
//     });

//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//     });

//     newSocket.on('connected', data => {
//       console.log('Connected socketId:', data.socketId);
//     });

//     newSocket.on('receive_message', data => {
//       console.log('Received message:', data);
//       dispatch(fetchRoomDetail(roomId));
//       dispatch(fetchRooms());
//     });

//     newSocket.on('message_send_successfully', data => {
//       console.log('Message sent:', data);
//       dispatch(fetchRoomDetail(roomId));
//       dispatch(fetchRooms());
//     });

//     newSocket.on('error', error => {
//       console.error('Socket error:', error);
//       Toast.show({
//         type: 'error',
//         text1: error.message,
//         text2: error?.message || 'Something went wrong.',
//       });
//     });
//     newSocket.on('disconnect', () => console.warn('Socket disconnected'));

//     return () => {
//       newSocket.disconnect();
//       newSocket.off();
//     };
//   }, [dispatch, localToken, roomId]);

//   const handleSend = () => {
//     if (!inputMessage.trim()) {
//       return;
//     }

//     const messageData = {
//       productServiceId: productData?.id,
//       receiverId: productData?.user?.id || receiverId,
//       roomId: roomId,
//       chatContext: productData?.type,
//       message: inputMessage,
//     };
//     console.log('🚀 ~ handleSend ~ messageData:', messageData);

//     socket.emit('send_message', messageData);
//     // setMessages(prev => [...prev, messageData]);
//     setInputMessage('');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-left" size={30} color="#fff" />
//           </TouchableOpacity>
//           <View style={styles.userInfo}>
//             <Image
//               source={{uri: productData.user.profileImage}}
//               style={styles.profilePic}
//             />
//             <View>
//               <Text style={styles.name}>
//                 {productData.user.firstName} {productData.user.lastName}
//               </Text>
//               <Text style={styles.status}>Active Now</Text>
//             </View>
//           </View>
//         </View>

//         {/* MESSAGES */}
//         <View style={styles.chatSection}>
//           <FlatList
//             data={room?.data}
//             keyExtractor={item => item.id}
//             renderItem={({item}) => {
//               const isSender = item.senderId === CurrentUser;

//               return (
//                 <View style={isSender ? styles.rightMsg : styles.leftMsg}>
//                   <Text style={isSender ? styles.msgTextRight : styles.msgText}>
//                     {item.message}
//                   </Text>
//                   <Text style={styles.timestamp}>
//                     {new Date(item.createdAt).toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </Text>
//                 </View>
//               );
//             }}
//             contentContainerStyle={{paddingBottom: 80}}
//           />
//         </View>

//         {/* INPUT */}
//         <View style={styles.inputSection}>
//           <TextInput
//             placeholder="Type a message"
//             style={styles.input}
//             placeholderTextColor="#999"
//             value={inputMessage}
//             onChangeText={setInputMessage}
//           />
//           <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
//             <Icon name="send" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#316CF4',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#316CF4',
//     paddingBottom: 60,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//     flex: 1,
//   },
//   profilePic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#222',
//     marginRight: 10,
//   },
//   name: {color: '#fff', fontWeight: 'bold', fontSize: 16},
//   status: {color: '#cce6ff', fontSize: 12},
//   chatSection: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     marginTop: -16,
//   },
//   leftMsg: {
//     backgroundColor: '#f0f4fa',
//     alignSelf: 'flex-start',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//     maxWidth: '80%',
//   },
//   msgText: {color: '#333'},
//   rightMsg: {
//     backgroundColor: '#e0ecff',
//     alignSelf: 'flex-end',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//     maxWidth: '80%',
//   },
//   msgTextRight: {color: '#316CF4'},
//   timestamp: {
//     fontSize: 10,
//     color: '#999',
//     marginTop: 4,
//     textAlign: 'right',
//   },
//   inputSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderTopColor: '#eee',
//     borderTopWidth: 1,
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     fontSize: 14,
//   },
//   sendButton: {
//     backgroundColor: '#ff3366',
//     borderRadius: 20,
//     padding: 10,
//     marginLeft: 8,
//   },
// });

// export default Chats;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import {io, Socket} from 'socket.io-client';
// import Toast from 'react-native-toast-message';

import useAppNavigation from '../Common/useAppNavigation';
import {useAppDispatch} from '../Hooks/hooks';
import {fetchRoomDetail} from '../../Redux/Chat/chatRoomSlice';
import {getToken, getUserId} from '../../utils/tokenStorage';
import theme from '../../Constants/theme';

const SOCKET_URL = 'http://3.110.104.32:3000';

type ChatScreenParams = {
  productData: any;
  roomId: string;
  receiverId: string;
};

type RouteParams = {
  ChatScreen: ChatScreenParams;
};

const Chats = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RouteParams, 'ChatScreen'>>();
  const {productData, roomId, receiverId} = route.params;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [CurrentUser, setCurrentUser] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<Record<string, string>>({});
  console.log('🚀 ~ Chats ~ sentMessages:', sentMessages);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const isFocused = useIsFocused();

  // Load token and user info
  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      const userId = await getUserId();
      setLocalToken(token);
      setCurrentUser(userId);
    };
    if (isFocused) loadToken();
  }, [isFocused]);

  // Fetch messages on first load
  useEffect(() => {
    const loadMessages = async () => {
      const res = await dispatch(fetchRoomDetail(roomId)).unwrap();
      if (res?.data) {
        setMessages(res.data);
      }
    };

    if (roomId && messages.length === 0) {
      loadMessages();
    }
  }, [dispatch, messages.length, roomId]);

  // Initialize socket
  useEffect(() => {
    if (!localToken) {
      return;
    }

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {token: localToken},
    });

    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Socket connected'));

    newSocket.on('connected', data =>
      console.log('Connected socketId:', data.socketId),
    );

    newSocket.on('receive_message', message => {
      console.log('Received message:', message);
      // setMessages(prev => [...prev, message]);
      const incomingMessage = {
        ...message,
        createdAt: message.createdAt ?? new Date().toISOString(),
      };

      setMessages(prev => [...prev, incomingMessage]);
    });

    newSocket.on('message_send_successfully', data => {
      const {clientTempId} = data;
      console.log('🚀 ~ useEffect ~ data:', data);

      if (clientTempId) {
        setSentMessages(prev => ({
          ...prev,
          [clientTempId]: 'sent',
        }));

        // setMessages(prev =>
        //   prev.map(msg =>
        //     msg.id === clientTempId ? {...data, senderId: CurrentUser} : msg,
        //   ),
        // );
        setMessages(prev =>
          prev.map(msg =>
            msg.id === clientTempId
              ? {
                  ...msg,
                  ...data,
                  senderId: CurrentUser,
                  status: 'sent', // ✅ include status here
                }
              : msg,
          ),
        );
      }
    });
    console.log('🚀 ~ newSocket.on ~ typing:', isTyping);

    newSocket.on('user_typing', ({isTyping: typing}) => {
      console.log('🚀 ~ newSocket.on ~ isTyping:', isTyping);
      setIsTyping(typing);
    });

    newSocket.on('messages_read', data => {
      console.log('Messages read:', data);
    });

    newSocket.on('error', error => {
      console.error('Socket error:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: error.message,
      //   text2: error?.message ?? 'Something went wrong.',
      // });
    });

    newSocket.on('disconnected', () => console.log('Socket disconnected'));

    return () => {
      newSocket.disconnect();
      newSocket.off();
    };
  }, [CurrentUser, localToken, roomId]);

  const handleTyping = () => {
    if (!socket || !CurrentUser || !roomId) {
      return;
    }

    // setIsTyping(true);

    socket.emit('typing', {
      roomId,
      isTyping: true,
    });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit('typing', {
        roomId,
        isTyping: false,
      });
      setIsTyping(false);
    }, 3000);
  };

  const handleSend = () => {
    if (!inputMessage.trim() || !socket || !CurrentUser) {
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const newMessage = {
      id: tempId,
      senderId: CurrentUser,
      message: inputMessage,
      createdAt,
    };

    setMessages(prev => [...prev, newMessage]);
    setSentMessages(prev => ({...prev, [tempId]: 'pending'}));

    const messageData = {
      id: tempId,
      message: inputMessage,
      roomId,
      chatContext: productData?.type,
      productServiceId: productData?.id,
      receiverId: productData?.user?.id ?? receiverId,
      senderId: CurrentUser,
      createdAt,
    };
    socket.emit('send_message', messageData);
    socket.emit('mark_as_read', {roomId});
    setInputMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Image
                source={{uri: productData.user.profileImage}}
                style={styles.profilePic}
              />
              <View>
                <Text style={styles.name}>
                  {productData.user.firstName} {productData.user.lastName}
                </Text>
                <Text style={styles.status}>
                  {isTyping ? 'Typing...' : 'Active Now'}
                </Text>
              </View>
            </View>
          </View>

          {/* Chat Messages */}
          <View style={styles.chatSection}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
              renderItem={({item}) => {
                if (!item.message || !item.senderId) {
                  return null;
                }
                const isSender = item.senderId === CurrentUser;
                // const status = sentMessages[item.id];
                const status = item.status;
                return (
                  <View style={isSender ? styles.rightMsg : styles.leftMsg}>
                    <Text
                      style={isSender ? styles.msgTextRight : styles.msgText}>
                      {item.message ?? '[No message]'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 4,
                      }}>
                      <Text style={styles.timestamp}>
                        {/* {item.createdAt
                          ? new Date(item.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''} */}
                        {item.createdAt ? (
                          <Text style={styles.timestamp}>
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </Text>
                        ) : (
                          <Text style={styles.timestamp}>--:--</Text>
                        )}
                      </Text>
                      {isSender && (
                        // <Icon
                        //   name={
                        //     status === 'pending'
                        //       ? 'clock-time-four-outline'
                        //       : 'check'
                        //   }
                        //   size={14}
                        //   color={status === 'pending' ? '#999' : '#316CF4'}
                        //   style={{marginLeft: 8}}
                        // />
                        <Icon
                          name={
                            status === 'pending'
                              ? 'clock-time-four-outline'
                              : 'check'
                          }
                          size={14}
                          color={status === 'pending' ? '#999' : '#316CF4'}
                          style={{marginLeft: 8}}
                        />
                      )}
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={{paddingBottom: 80}}
            />
          </View>

          {/* Input Section */}

          <View style={styles.inputSection}>
            <TextInput
              placeholder="Type a message"
              style={styles.input}
              placeholderTextColor="#999"
              value={inputMessage}
              onChangeText={text => {
                setInputMessage(text);
                handleTyping();
              }}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#316CF4',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    backgroundColor: '#316CF4',
    paddingBottom: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    marginRight: 10,
  },
  name: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  status: {color: '#cce6ff', fontSize: 12},
  chatSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
  },
  leftMsg: {
    backgroundColor: '#f0f4fa',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  msgText: {color: '#333'},
  rightMsg: {
    backgroundColor: '#e0ecff',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  msgTextRight: {color: '#316CF4'},
  timestamp: {fontSize: 10, color: '#999', marginTop: 4, textAlign: 'right'},
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 14,
    color: theme.colors.black,
  },
  sendButton: {
    backgroundColor: '#ff3366',
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});

export default Chats;
