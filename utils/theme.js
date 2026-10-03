import { Platform } from 'react-native';
import { MD3DarkTheme } from 'react-native-paper';

export const palette = {
  stout: '#17110d',
  barrel: '#241a14',
  oak: '#33261d',
  foam: '#f3e9d2',
  foamMuted: '#b8a88c',
  amber: '#f2a93b',
  hops: '#9cc25a',
};

export const serif = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia, serif',
});

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.amber,
    onPrimary: palette.stout,
    background: palette.stout,
    surface: palette.barrel,
    surfaceVariant: palette.oak,
    onSurface: palette.foam,
    onSurfaceVariant: palette.foamMuted,
    outline: palette.foamMuted,
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level1: palette.barrel,
      level2: palette.barrel,
      level3: palette.oak,
    },
  },
};