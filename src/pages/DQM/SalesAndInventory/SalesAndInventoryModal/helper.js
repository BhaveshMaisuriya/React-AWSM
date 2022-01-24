import { isNaN } from 'lodash'

export const validateNaN = value => (!isNaN(value) ? parseFloat(Number(value)) : '')
