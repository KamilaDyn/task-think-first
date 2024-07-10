import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/en'

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekStart: 1
})

export default dayjs
