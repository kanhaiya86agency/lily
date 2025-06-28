import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import {useAppSelector} from '../Hooks/hooks';

const ViewProfile = () => {
  const {user} = useAppSelector(state => state.user);
  console.log('🚀 ~ ViewProfile ~ user:', user);
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{uri: user?.profileImage}} style={styles.profileImage} />
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.experience}>
          {user?.experience}+ Years of Experience
        </Text>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.row}>
          <Icon name="call-outline" size={20} color="#555" />
          <Text style={styles.info}>{user?.phone}</Text>
          <MaterialIcon
            name={user?.isPhoneVerified ? 'verified' : 'error-outline'}
            color={user?.isPhoneVerified ? 'green' : 'red'}
            size={20}
          />
        </View>
        <View style={styles.row}>
          <Icon name="mail-outline" size={20} color="#555" />
          <Text style={styles.info}>{user?.email}</Text>
          <MaterialIcon
            name={user?.isEmailVerified ? 'verified' : 'error-outline'}
            color={user?.isEmailVerified ? 'green' : 'red'}
            size={20}
          />
        </View>
      </View>

      {/* Location Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.row}>
          <Icon name="location-outline" size={20} color="#555" />
          <Text style={styles.info}>{user?.location}</Text>
        </View>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.languageWrapper}>
          {user?.languages.map((lang, index) => (
            <View key={index} style={styles.languageBadge}>
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: horizontalScale(16),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  profileImage: {
    width: horizontalScale(110),
    height: verticalScale(110),
    borderRadius: horizontalScale(100),
    borderWidth: horizontalScale(2),
    borderColor: '#007bff',
    marginBottom: verticalScale(12),
  },
  name: {
    fontSize: horizontalScale(22),
    fontWeight: 'bold',
    color: '#333',
  },
  experience: {
    fontSize: horizontalScale(14),
    color: '#666',
    marginTop: verticalScale(4),
  },
  section: {
    backgroundColor: '#fff',
    padding: horizontalScale(16),
    borderRadius: horizontalScale(12),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowRadius: horizontalScale(4),
    elevation: 2,
  },
  sectionTitle: {
    fontSize: horizontalScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    gap: horizontalScale(8), // or use marginRight if gap unsupported
  },
  info: {
    flex: 1,
    fontSize: horizontalScale(14),
    color: '#444',
  },
  languageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(8),
  },
  languageBadge: {
    backgroundColor: '#DBEAFE',
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(14),
    borderRadius: horizontalScale(20),
  },
  languageText: {
    fontSize: horizontalScale(13),
    color: '#1D4ED8',
    fontWeight: '500',
  },
});
