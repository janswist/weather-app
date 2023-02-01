import axios from 'axios'

const httpClients = {
  fetch: {
    client: window.fetch,
    options: {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'mode': 'no-cors'
      }
    }
  },
  axios: {
    client: axios,
    options: {
      method: 'GET' // default anyway
    }
  }
}

const selectedClient = 'fetch'
const usedClient = httpClients[selectedClient]

const fetchResource = (client, options) => url => client(url, options)

export const getData = fetchResource(usedClient.client, usedClient.options)

export const extractDataFromResponse = async (response) => {
  return selectedClient === 'fetch'
    ? await response.json()
    : response.data
}
