import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../utils/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import LanguageSwitcher from '../components/LanguageSwitcher';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      t('auth.logout'),
      t('auth.logoutConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('auth.logout'),
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {isAuthenticated ? (
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.username?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.username}>{user?.username}</Text>
              <Text style={styles.userStatus}>{t('profile.loggedIn')}</Text>

              <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{t('profile.myAds')}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{t('profile.favorites')}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{t('profile.settings')}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>{t('auth.logout')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.guestInfo}>
              <View style={styles.guestAvatar}>
                <Text style={styles.guestAvatarText}>?</Text>
              </View>
              <Text style={styles.guestTitle}>{t('profile.welcome')}</Text>
              <Text style={styles.guestDescription}>
                {t('profile.guestDescription')}
              </Text>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>{t('auth.login')}</Text>
              </TouchableOpacity>

              <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{t('profile.helpSupport')}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{t('profile.about')}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <LanguageSwitcher />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#002f34',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#002f34',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002f34',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 32,
  },
  guestInfo: {
    alignItems: 'center',
  },
  guestAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  guestAvatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002f34',
    marginBottom: 8,
  },
  guestDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#002f34',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#002f34',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#ccc',
  },
});

export default ProfileScreen;