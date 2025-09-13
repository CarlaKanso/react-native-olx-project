import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../utils/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage !== currentLanguage) {
      Alert.alert(
        'Language Change',
        'Changing language will require an app restart. Do you want to continue?',
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.ok'),
            onPress: () => changeLanguage(newLanguage),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language / اللغة</Text>
      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.option,
            currentLanguage === 'en' && styles.selectedOption,
          ]}
          onPress={() => handleLanguageChange('en')}
        >
          <Text
            style={[
              styles.optionText,
              currentLanguage === 'en' && styles.selectedOptionText,
            ]}
          >
            English
          </Text>
          {currentLanguage === 'en' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            currentLanguage === 'ar' && styles.selectedOption,
          ]}
          onPress={() => handleLanguageChange('ar')}
        >
          <Text
            style={[
              styles.optionText,
              currentLanguage === 'ar' && styles.selectedOptionText,
            ]}
          >
            العربية
          </Text>
          {currentLanguage === 'ar' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 12,
  },
  options: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  selectedOption: {
    borderColor: '#002f34',
    backgroundColor: '#f0f8ff',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
  },
  selectedOptionText: {
    color: '#002f34',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#002f34',
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;