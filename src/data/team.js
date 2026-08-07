import { TEAM_IMAGES } from './teamImages'

export const GM = {
  name: 'Clement Imhandebhor',
  title: 'General Manager',
  image: TEAM_IMAGES.gm?.[0] ?? '',
  welcome:
    'It\u2019s my pleasure to welcome you to Beechnut Hotel \u2014 a place where comfort, quality service, and genuine hospitality come together to create an exceptional guest experience.',
}

export const DEPARTMENT_LABELS = {
  'front-desk': 'Front Desk',
  dining: 'Dining',
  housekeeping: 'Housekeeping',
  security: 'Security',
}

export function departmentLabel(folder) {
  if (DEPARTMENT_LABELS[folder]) return DEPARTMENT_LABELS[folder]
  return folder
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
