import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import {
  Appbar,
  Searchbar,
  Card,
  Avatar,
  Text,
  Button,
  ActivityIndicator,
  Icon,
} from 'react-native-paper';

import PlatformInfo from '../components/PlatformInfo';
import { typeColor, typeLabel, initials } from '../utils/breweryType';
import { palette, serif } from '../utils/theme';

const API_URL = 'https://api.openbrewerydb.org/v1/breweries?per_page=50';
const TEST_DELAY_MS = 0;

const cardMargin = Platform.select({ android: 8, ios: 16, default: 12 });
const appbarTitle = Platform.select({
  android: 'Brewery Finder',
  ios: 'Brewery Finder',
  default: 'Brewery Finder',
});

export default function BreweryListScreen({ navigation }) {
  const [breweries, setBreweries] = useState([]);
  // 'initial' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('initial');
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');

  const loadBreweries = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      if (TEST_DELAY_MS > 0) {
        await new Promise((resolve) => setTimeout(resolve, TEST_DELAY_MS));
      }

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server responded with HTTP ${response.status}`);
      }

      const data = await response.json();
      setBreweries(data);
      setStatus('success');
    } catch (error) {

      setErrorMessage(error.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    loadBreweries();
  }, []);

  const query = search.trim().toLowerCase();
  const filteredBreweries = breweries.filter((b) =>
    `${b.name} ${b.city ?? ''} ${b.country ?? ''}`.toLowerCase().includes(query)
  );

  const renderItem = ({ item }) => {
    const color = typeColor(item.brewery_type);
    return (
      <Card
        mode="contained"
        style={[styles.card, { marginHorizontal: cardMargin, borderLeftColor: color }]}
        onPress={() => navigation.navigate('Details', { brewery: item })}
      >
        <View style={styles.cardRow}>
          <View style={[styles.coaster, { borderColor: color }]}>
            <Avatar.Text
              size={48}
              label={initials(item.name)}
              color={palette.stout}
              style={{ backgroundColor: color }}
              labelStyle={styles.coasterLabel}
            />
          </View>

          <View style={styles.cardText}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.place} numberOfLines={1}>
              {[item.city, item.country].filter(Boolean).join(' · ')}
            </Text>
            <Text style={[styles.typeTag, { color, borderColor: color }]}>
              {typeLabel(item.brewery_type).toUpperCase()}
            </Text>
          </View>

          <Icon source="chevron-right" size={24} color={palette.foamMuted} />
        </View>
      </Card>
    );
  };

  const renderContent = () => {
    if (status === 'initial') {
      return (
        <View style={styles.center}>
          <Icon source="glass-mug-variant" size={48} color={palette.amber} />
          <Text style={styles.message}>No breweries loaded yet.</Text>
          <Button mode="contained" style={styles.button} onPress={loadBreweries}>
            Load breweries
          </Button>
        </View>
      );
    }

    if (status === 'loading') {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating size="large" color={palette.amber} />
          <Text style={styles.message}>Pouring the list...</Text>
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View style={styles.center}>
          <Icon source="beer-outline" size={48} color="#e05252" />
          <Text style={styles.errorTitle}>The tap is dry</Text>
          <Text style={styles.message}>Could not load breweries. {errorMessage}</Text>
          <Button mode="contained" icon="refresh" style={styles.button} onPress={loadBreweries}>
            Retry
          </Button>
        </View>
      );
    }
    
    return (
      <FlatList
        data={filteredBreweries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={[styles.count, { marginHorizontal: cardMargin }]}>
            {filteredBreweries.length} of {breweries.length} breweries on tap
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Icon source="magnify-close" size={40} color={palette.foamMuted} />
            <Text style={styles.message}>Nothing on tap for "{search}".</Text>
          </View>
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={appbarTitle} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <PlatformInfo />

      <Searchbar
        placeholder="Search by name, city or country"
        value={search}
        onChangeText={setSearch}
        iconColor={palette.amber}
        placeholderTextColor={palette.foamMuted}
        inputStyle={{ color: palette.foam }}
        style={[styles.searchbar, { marginHorizontal: cardMargin }]}
      />

      <Text style={styles.platformText}>Running on {Platform.OS}</Text>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.stout },
  appbarTitle: { fontFamily: serif, color: palette.amber, fontWeight: 'bold' },
  searchbar: { marginTop: 8, backgroundColor: palette.oak },
  platformText: { textAlign: 'center', marginVertical: 6, color: palette.foamMuted, fontSize: 12 },
  count: {
    color: palette.foamMuted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  listContent: { paddingBottom: 24 },
  card: {
    marginVertical: 6,
    backgroundColor: palette.barrel,
    borderLeftWidth: 5,
    borderRadius: 14,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  coaster: { borderWidth: 2, borderRadius: 30, padding: 3, marginRight: 14 },
  coasterLabel: { fontWeight: 'bold', fontSize: 18 },
  cardText: { flex: 1 },
  name: { fontFamily: serif, fontSize: 17, fontWeight: 'bold', color: palette.foam },
  place: { color: palette.foamMuted, marginTop: 2 },
  typeTag: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    overflow: 'hidden',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorTitle: { fontFamily: serif, fontSize: 20, color: palette.foam, marginTop: 12 },
  message: { marginTop: 12, textAlign: 'center', color: palette.foamMuted },
  button: { marginTop: 16 },
});