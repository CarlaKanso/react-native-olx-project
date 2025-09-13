import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  Share,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type AdDetailsRouteProp = RouteProp<RootStackParamList, 'AdDetails'>;
type AdDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'AdDetails'>;

interface Props {
  route: AdDetailsRouteProp;
  navigation: AdDetailsNavigationProp;
}

const AdDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { ad } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCallSeller = () => {
    const phoneNumber = ad.phone.replace(/[^\d+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to make phone call');
    });
  };

  const handleMessageSeller = () => {
    const phoneNumber = ad.phone.replace(/[^\d+]/g, '');
    const message = `Hi, I'm interested in your ad: ${ad.title}`;
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp to send messages');
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ad: ${ad.title} - ${ad.currency} ${ad.price.toLocaleString()}`,
        title: ad.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        >
          {ad.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.image}
              defaultSource={{ uri: 'https://via.placeholder.com/400x300/e0e0e0/666?text=Loading...' }}
            />
          ))}
        </ScrollView>

        {ad.images.length > 1 && (
          <View style={styles.imageIndicator}>
            <Text style={styles.imageCounter}>
              {currentImageIndex + 1} / {ad.images.length}
            </Text>
          </View>
        )}

        {ad.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>FEATURED</Text>
          </View>
        )}

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Ad Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.priceSection}>
          <Text style={styles.price}>
            {ad.currency} {ad.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>{ad.title}</Text>
        </View>

        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Location</Text>
            <Text style={styles.metaValue}>{ad.location.name}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>{ad.category.name}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Posted</Text>
            <Text style={styles.metaValue}>{formatDate(ad.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{ad.description}</Text>
        </View>

        {/* Seller Contact */}
        <View style={styles.sellerSection}>
          <Text style={styles.sellerTitle}>Contact Seller</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerAvatarText}>S</Text>
            </View>
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>Seller</Text>
              <Text style={styles.sellerPhone}>{ad.phone}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Buttons */}
      <View style={styles.contactButtons}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessageSeller}>
          <Text style={styles.messageButtonText}>💬 Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={handleCallSeller}>
          <Text style={styles.callButtonText}>📞 Call</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Tips */}
      <View style={styles.safetySection}>
        <Text style={styles.safetyTitle}>Safety Tips</Text>
        <Text style={styles.safetyText}>
          • Meet in a safe, public location{'\n'}
          • Check the item before paying{'\n'}
          • Don't share personal information{'\n'}
          • Trust your instincts
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width,
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageCounter: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff6b35',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shareButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 18,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    marginTop: -8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
  },
  priceSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002f34',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#002f34',
    lineHeight: 26,
  },
  metaSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  metaLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    color: '#002f34',
    fontWeight: '600',
  },
  descriptionSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  sellerSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sellerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 12,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#002f34',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerAvatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 2,
  },
  sellerPhone: {
    fontSize: 14,
    color: '#666',
  },
  contactButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  safetySection: {
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 20,
    marginBottom: 20,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 12,
  },
  safetyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default AdDetailsScreen;