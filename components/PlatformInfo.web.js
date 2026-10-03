import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

export default function PlatformInfo() {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Title
        title="Web build"
        subtitle="Running in the browser"
        left={(props) => <Avatar.Icon {...props} icon="web" />}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 12, backgroundColor: '#0000' },
});
