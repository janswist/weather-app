// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'

// Cypress.Commands.add('mount', mount)
import App from '@/App.vue'
import { h } from 'vue'
// import {pugPlainLoader} from 'pug-plain-loader'
import pug from 'pug'


Cypress.Commands.add('mount', (component, ...args) => {
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push(pug)

  return mount(() => {
    return h(App, {}, component)
  }, ...args)
})


// Example use:
// cy.mount(MyComponent)