export interface Preset {
  styles: {
    light: {
      playerBorder?: string
      playerBackground?: string
      closeBtn?: string
      primaryText?: string
      secondaryText?: string
      playListLine?: string
      hoverBtn?: string
      boxBackgroundShadow?: string
      primaryColor?: string
    }
  }
}

export const nyxPreset: Preset = {
  styles: {
    light: {
      playerBorder: '#fdfdfd',
      playerBackground: 'alpha(#fdfdfd, 0.7)',
      closeBtn: '#ccc',
      primaryText: '#666',
      secondaryText: '#999',
      playListLine: 'alpha(#000, 0.1)',
      hoverBtn: 'rgb(26, 194, 203)',
      boxBackgroundShadow: 'var(--playlist-line)',
      primaryColor: '10,116,38',
    },
  },
}

export const shokaxPreset: Preset = {
  styles: {
    light: {
      playerBorder: '#fdfdfd',
      playerBackground: 'alpha(#fdfdfd, 0.7)',
      closeBtn: '#ccc',
      primaryText: '#666',
      secondaryText: '#999',
      playListLine: 'alpha(#000, 0.1)',
      hoverBtn: '#ed6ea0',
      boxBackgroundShadow: 'var(--playlist-line)',
      primaryColor: '233,84,107',
    },
  },
}

export const presets: Record<string, Preset> = {
  nyx: nyxPreset,
  shokax: shokaxPreset,
}
