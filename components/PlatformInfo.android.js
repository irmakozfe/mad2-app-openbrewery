import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

export default function PlatformInfo() {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        title="Android build"
        titleStyle={styles.title}
        subtitle={`Android ${Platform.Version}`}
        subtitleStyle={styles.subtitle}
        left={(props) => (
          <Avatar.Icon {...props} icon="android" color="white" style={styles.icon} />
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, backgroundColor: '#e3f2fd' },
  title: { color: '#073042', fontWeight: 'bold' },
  subtitle: { color: '#073042' },
  icon: { backgroundColor: '#073042' },
});
