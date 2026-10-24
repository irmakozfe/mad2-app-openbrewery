import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Appbar, Card, Text, Button, Avatar, Divider } from 'react-native-paper';
import * as Linking from 'expo-linking';

import { initials } from '../utils/breweryType';
import { palette, serif } from '../utils/theme';

const DEMO_CONTACT = {
  name: 'OpenDB App Contact Information',
  phone: '+358412345670',
  email: 'brewwithme@yourbrewery.com',
  website: 'https://www.openbrewerydb.org',
};

export default function LinkingScreen({ route, navigation }) {
  const brewery = route.params?.brewery;

  const contact = {
    name: brewery?.name ?? DEMO_CONTACT.name,
    phone: brewery?.phone ?? DEMO_CONTACT.phone,
    email: DEMO_CONTACT.email,
    website: brewery?.website_url ?? DEMO_CONTACT.website,
  };

  const phoneDigits = contact.phone.replace(/[^\d+]/g, '');

  const openUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Could not open', `No app on this device can handle:\n${url}`);
    }
  };

  const callPhone = () => openUrl(`tel:${phoneDigits}`);

  const sendSms = () => openUrl(`sms:${phoneDigits}`);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Question for ${contact.name}`);
    const body = encodeURIComponent('Hi! I found you in the Brewery Finder app.');
    openUrl(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  const openWebsite = () => openUrl(contact.website);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction color={palette.amber} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Contact" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card mode="contained" style={styles.card}>
          <View style={styles.header}>
            <Avatar.Text
              size={72}
              label={initials(contact.name)}
              color={palette.stout}
              style={{ backgroundColor: palette.amber }}
            />
            <Text style={styles.name}>{contact.name}</Text>
          </View>

          <Divider style={styles.divider} />

          <Card.Content style={styles.info}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{contact.phone}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{contact.email}</Text>
            <Text style={styles.label}>Website</Text>
            <Text style={styles.value}>{contact.website}</Text>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <Button mode="contained" icon="phone" style={styles.button} onPress={callPhone}>
              Call
            </Button>
            <Button mode="contained" icon="message-text" style={styles.button} onPress={sendSms}>
              SMS
            </Button>
            <Button mode="contained" icon="email" style={styles.button} onPress={sendEmail}>
              Email
            </Button>
            <Button mode="contained" icon="web" style={styles.button} onPress={openWebsite}>
              Website
            </Button>
          </Card.Actions>
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
  header: { alignItems: 'center', paddingTop: 24, paddingBottom: 16 },
  name: {
    fontFamily: serif,
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.foam,
    marginTop: 12,
    textAlign: 'center',
  },
  divider: { backgroundColor: palette.oak, marginHorizontal: 12 },
  info: { paddingTop: 12 },
  label: {
    color: palette.foamMuted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  value: { color: palette.foam, fontSize: 15 },
  actions: { flexWrap: 'wrap', justifyContent: 'center', padding: 12 },
  button: { margin: 4 },
});