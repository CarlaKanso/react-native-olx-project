import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
  onPress: (ad: Ad) => void;
  isHorizontal?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({ ad, onPress, isHorizontal = false }) => {
  const cardStyle = isHorizontal ? styles.horizontalCard : styles.verticalCard;
  const imageStyle = isHorizontal ? styles.horizontalImage : styles.verticalImage;
  const contentStyle = isHorizontal ? styles.horizontalContent : styles.verticalContent;

  return (
    <TouchableOpacity style={[styles.card, cardStyle]} onPress={() => onPress(ad)}>
      <Image 
        source={{ uri: ad.images[0] }} 
        style={[styles.image, imageStyle]}
        defaultSource={{ uri: 'https://via.placeholder.com/300x200/e0e0e0/666?text=No+Image' }}
      />
      <View style={[styles.content, contentStyle]}>
        <Text style={styles.title} numberOfLines={2}>
          {ad.title}
        </Text>
        <Text style={styles.price}>
          {ad.currency} {ad.price.toLocaleString()}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {ad.location.name}
        </Text>
        <Text style={styles.category}>
          {ad.category.name}
        </Text>
        {ad.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12,
  },
  verticalCard: {
    width: '48%',
  },
  horizontalCard: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 8,
    minWidth: 280,
  },
  image: {
    backgroundColor: '#f0f0f0',
  },
  verticalImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  horizontalImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    padding: 12,
  },
  verticalContent: {
    flex: 1,
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002f34',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  category: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
  },
  featuredBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff6b35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AdCard;