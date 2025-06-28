import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import theme from '../../Constants/theme';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';

const screenWidth = Dimensions.get('window').width;

const TabComponent = ({
  onTabChange,
  activeColor = '#000',
  inactiveColor = '#555',
  activeBold = true,
}: {
  onTabChange: (value: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBold?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState('SERVICE');
  const underlinePosition = useRef(new Animated.Value(0)).current;

  const tabs = ['Services', 'Products'];

  const handleTabPress = (index: number) => {
    const tabValue = tabs[index].slice(0, -1).toUpperCase();
    setActiveTab(tabValue);
    onTabChange(tabValue);

    Animated.spring(underlinePosition, {
      toValue: (screenWidth / tabs.length) * index,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab, index) => {
          const tabValue = tab.slice(0, -1).toUpperCase();
          const isActive = activeTab === tabValue;

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => handleTabPress(index)}>
              <Text
                style={{
                  fontSize: horizontalScale(14),
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive && activeBold ? 'bold' : 'normal',
                }}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.underline,
          {
            width: screenWidth / tabs.length,
            transform: [{translateX: underlinePosition}],
          },
        ]}
      />
    </View>
  );
};
export default TabComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: verticalScale(10),
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeIsColorBold: {
    // fontWeight: 'bold',
  },
  underline: {
    height: 3,
    backgroundColor: theme.colors.SecondaryRed,
  },
  content: {
    padding: 20,
  },
  contentText: {
    fontSize: 18,
  },
  activeIsColor: {
    color: theme.colors.white,
  },
});
