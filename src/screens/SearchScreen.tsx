import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Ad, Category, Location } from '../types';
import { getAdsAsync, getCategoriesAsync, getLocationsAsync } from '../data/staticData';
import AdCard from '../components/AdCard';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: SearchScreenNavigationProp;
  route?: {
    params?: {
      query?: string;
      category?: string;
    };
  };
}

interface Filters {
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
}

const SearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(route?.params?.query || '');
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');

  const [filters, setFilters] = useState<Filters>({
    category: route?.params?.category || '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [adsData, categoriesData, locationsData] = await Promise.all([
        getAdsAsync(),
        getCategoriesAsync(),
        getLocationsAsync(),
      ]);

      setAds(adsData);
      setCategories(categoriesData);
      setLocations(locationsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [ads, searchQuery, filters, sortBy]);

  const applyFiltersAndSearch = () => {
    let filtered = [...ads];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(ad =>
        ad.title.toLowerCase().includes(query) ||
        ad.description.toLowerCase().includes(query) ||
        ad.category.name.toLowerCase().includes(query) ||
        ad.location.name.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(ad => ad.category.id === filters.category);
    }

   
    if (filters.location) {
      filtered = filtered.filter(ad => ad.location.id === filters.location);
    }

    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (!isNaN(minPrice)) {
        filtered = filtered.filter(ad => ad.price >= minPrice);
      }
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(ad => ad.price <= maxPrice);
      }
    }

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredAds(filtered);
  };

  const handleAdPress = (ad: Ad) => {
    navigation.navigate('AdDetails', { ad });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
    });
    setSortBy('newest');
    setSearchQuery('');
  };

  const renderAd = ({ item }: { item: Ad }) => (
    <View style={styles.adContainer}>
      <AdCard ad={item} onPress={handleAdPress} />
    </View>
  );

  const FiltersModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowFilters(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.modalClearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    !filters.category && styles.filterOptionSelected,
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, category: '' }))}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      !filters.category && styles.filterOptionTextSelected,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.filterOption,
                      filters.category === category.id && styles.filterOptionSelected,
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, category: category.id }))}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.category === category.id && styles.filterOptionTextSelected,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    !filters.location && styles.filterOptionSelected,
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, location: '' }))}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      !filters.location && styles.filterOptionTextSelected,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {locations.map(location => (
                  <TouchableOpacity
                    key={location.id}
                    style={[
                      styles.filterOption,
                      filters.location === location.id && styles.filterOptionSelected,
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, location: location.id }))}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filters.location === location.id && styles.filterOptionTextSelected,
                      ]}
                    >
                      {location.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Price Range (USD)</Text>
            <View style={styles.priceInputs}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min Price"
                value={filters.minPrice}
                onChangeText={(text) => setFilters(prev => ({ ...prev, minPrice: text }))}
                keyboardType="numeric"
              />
              <Text style={styles.priceSeparator}>to</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max Price"
                value={filters.maxPrice}
                onChangeText={(text) => setFilters(prev => ({ ...prev, maxPrice: text }))}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.sortOptions}>
              {[
                { key: 'newest', label: 'Newest First' },
                { key: 'price_low', label: 'Price: Low to High' },
                { key: 'price_high', label: 'Price: High to Low' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.sortOption,
                    sortBy === option.key && styles.sortOptionSelected,
                  ]}
                  onPress={() => setSortBy(option.key as any)}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sortBy === option.key && styles.sortOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>
              Apply ({filteredAds.length} results)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002f34" />
        <Text style={styles.loadingText}>Loading ads...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for ads..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
            <Text style={styles.filterButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredAds.length} results found
        </Text>
        {(Object.values(filters).some(v => v) || searchQuery) && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredAds}
        renderItem={renderAd}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No ads found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      />

      <FiltersModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#002f34',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  clearFiltersText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  listContent: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  adContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002f34',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalClearText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
  filterSection: {
    backgroundColor: '#fff',
    marginVertical: 4,
    padding: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002f34',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  filterOptionSelected: {
    backgroundColor: '#002f34',
    borderColor: '#002f34',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  priceSeparator: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#666',
  },
  sortOptions: {
    gap: 8,
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  sortOptionSelected: {
    backgroundColor: '#002f34',
    borderColor: '#002f34',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
  },
  sortOptionTextSelected: {
    color: '#fff',
  },
  modalFooter: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  applyButton: {
    backgroundColor: '#002f34',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchScreen;