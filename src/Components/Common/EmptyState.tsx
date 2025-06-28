import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyStateProps {
  title: string;
  description?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  buttonText?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  iconName = 'inbox',
  iconSize = 80,
  iconColor = '#ccc',
  buttonText,
  onPress,
  containerStyle,
  titleStyle,
  descriptionStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
      {buttonText && onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
