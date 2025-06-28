import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card, List, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../Constants/theme';
import {horizontalScale} from '../../helper/scaleHelper';

const Language = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const {colors} = useTheme();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Card.Content>
        <List.Item
          title="English"
          style={styles.list}
          onPress={() => handleLanguageChange('en')}
          //   left={() => <List.Icon icon="english" />}
          right={() =>
            language === 'en' ? (
              <MaterialIcons
                name="check"
                size={24}
                color={theme.colors.SecondaryRed}
              />
            ) : null
          }
        />

        <List.Item
          title="हिन्दी"
          style={styles.list}
          onPress={() => handleLanguageChange('hi')}
          //   left={() => <List.Icon icon="translate" />}
          right={() =>
            language === 'hi' ? (
              <MaterialIcons
                name="check"
                size={24}
                color={theme.colors.SecondaryRed}
              />
            ) : null
          }
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            console.log('Language selected:', language);
          }}>
          {language === 'en' ? 'Continue' : 'जारी रखें'}
        </Button>
      </Card.Content>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: horizontalScale(theme.spacing.spacing_6),
  },
  card: {
    padding: horizontalScale(theme.spacing.spacing_6),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: theme.colors.SecondaryRed,
  },
});
