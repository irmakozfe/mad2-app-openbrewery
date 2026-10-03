import React from 'react';
import { ScrollView, View, StyleSheet, Platform, Linking } from 'react-native';
import { Appbar, Card, Text, Button, Avatar, List, Divider } from 'react-native-paper';

import { typeColor, typeLabel, initials } from '../utils/breweryType';
import { palette, serif } from '../utils/theme';

export default function BreweryDetailsScreen({ route, navigation }) {
  const { brewery } = route.params;
  const color = typeColor(brewery.brewery_type);

  const address = [
    brewery.address_1,
    brewery.address_2,
    [brewery.postal_code, brewery.city].filter(Boolean).join(' '),
    brewery.state_province,
    brewery.country,
  ]
    .filter(Boolean)
    .join(', ');

  const hasLocation = brewery.latitude != null && brewery.longitude != null;

  const openMaps = () => {
    const { latitude: lat, longitude: lng } = brewery;
    const label = encodeURIComponent(brewery.name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    });
    Linking.openURL(url).catch(() => {});
  };

  const open = (url) => Linking.openURL(url).catch(() => {});

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction color={palette.amber} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Brewery label" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {/* The card is designed like a beer bottle label */}
        <Card mode="contained" style={[styles.card, styles.shadow]}>
          <View style={styles.label}>
            <View style={[styles.coaster, { borderColor: color }]}>
              <Avatar.Text
                size={96}
                label={initials(brewery.name)}
                color={palette.stout}
                style={{ backgroundColor: color }}
                labelStyle={styles.coasterLabel}
              />
            </View>

            <Text style={styles.name}>{brewery.name.toUpperCase()}</Text>

            <View style={[styles.ribbon, { backgroundColor: color }]}>
              <Text style={styles.ribbonText}>{typeLabel(brewery.brewery_type)} brewery</Text>
            </View>

            <Text style={styles.origin}>
              {[brewery.city, brewery.country].filter(Boolean).join(' · ') || 'Unknown location'}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <List.Item
            title="Address"
            description={address || '—'}
            descriptionNumberOfLines={3}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemValue}
            left={(props) => <List.Icon {...props} icon="map-marker" color={palette.amber} />}
          />
          <List.Item
            title="Phone"
            description={brewery.phone || '—'}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemValue}
            left={(props) => <List.Icon {...props} icon="phone" color={palette.amber} />}
          />
          <List.Item
            title="Website"
            description={brewery.website_url || '—'}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemValue}
            left={(props) => <List.Icon {...props} icon="web" color={palette.amber} />}
          />
          <List.Item
            title="Coordinates"
            description={hasLocation ? `${brewery.latitude}, ${brewery.longitude}` : '—'}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemValue}
            left={(props) => <List.Icon {...props} icon="crosshairs-gps" color={palette.amber} />}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.stout },
  appbarTitle: { fontFamily: serif, color: palette.amber },
  content: { padding: 16 },
  card: { backgroundColor: palette.barrel, borderRadius: 20 },
  label: {
    alignItems: 'center',
    margin: 12,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: palette.amber,
    borderRadius: 16,
  },
  coaster: { borderWidth: 3, borderRadius: 60, padding: 5 },
  coasterLabel: { fontWeight: 'bold', fontSize: 36 },
  name: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    color: palette.foam,
    marginTop: 16,
  },
  ribbon: { marginTop: 12, paddingHorizontal: 18, paddingVertical: 4, borderRadius: 4 },
  ribbonText: {
    color: palette.stout,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  origin: { marginTop: 10, color: palette.foamMuted, fontStyle: 'italic' },
  divider: { backgroundColor: palette.oak, marginHorizontal: 12 },
  itemTitle: { color: palette.foamMuted, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  itemValue: { color: palette.foam, fontSize: 15 },

  shadow: Platform.select({
    ios: {
      shadowColor: palette.amber,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
    },
    android: { elevation: 6 },
    default: {},
  }),
});