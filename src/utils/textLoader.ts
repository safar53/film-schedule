import textData from '../../text.json'
import {AppText} from 'types/text'

export const getText = (): AppText => {
  return textData as AppText
}
