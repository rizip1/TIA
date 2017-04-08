import {enumToNamesArray} from './utils'

export const difficultyLevels = [
  {
    'name': '1',
    'label': '1',
  },
  {
    'name': '2',
    'label': '2',
  },
  {
    'name': '3',
    'label': '3',
  },
  {
    'name': '4',
    'label': '4',
  },
  {
    'name': '5',
    'label': '5',
  },
]

export const locations = [
  {
    'name': 'malaFatra',
    'label': 'Malá Fatra',
  },
  {
    'name': 'velkaFatra',
    'label': 'Veľká Fatra',
  },
  {
    'name': 'chocskeVrchy',
    'label': 'Chočské vrchy',
  },
  {
    'name': 'zapadneTatry',
    'label': 'Západné Tatry',
  },
  {
    'name': 'vysokéTatry',
    'label': 'Vysoké Tatry',
  },
  {
    'name': 'belianskeTatry',
    'label': 'Belianske Tatry',
  },
  {
    'name': 'nizkeTatry',
    'label': 'Nízke Tatry',
  },
]

export const difficultyLevelsNames = enumToNamesArray(difficultyLevels)
export const locationsNames = enumToNamesArray(locations)
