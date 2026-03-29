declare module 'react-select-country-list' {
  type CountryOption = {
    value: string
    label: string
  }

  type CountryListApi = {
    getData: () => CountryOption[]
    getLabels: () => string[]
    getValues: () => string[]
    getValue: (label: string) => string | undefined
  }

  export default function countryList(): CountryListApi
}
