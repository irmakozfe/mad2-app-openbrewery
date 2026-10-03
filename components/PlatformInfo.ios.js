import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

export default function PlatformInfo() {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title
        title="iOS build"
        titleStyle={styles.title}
        subtitle={`iOS version ${Platform.Version}`}
        left={(props) => (
          <Avatar.Icon {...props} icon="apple" color="white" style={styles.icon} />
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginVertical: 8, backgroundColor: '#ffffff', borderRadius: 14 },
  title: { color: '#000', fontWeight: '600' },
  icon: { backgroundColor: '#000' },
});
