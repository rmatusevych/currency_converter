const UAH = 'uah'
const EUR = 'eur'
const USD = 'usd'

export const currencyCodes = {
  [UAH]: 980,
  [USD]: 840,
  [EUR]: 978
}

export const currencyList = {
  [UAH]: [ USD, EUR ],
  [USD]: [ UAH, EUR ],
  [EUR]: [ USD, UAH ]
}
