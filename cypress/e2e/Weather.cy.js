describe('Test Weather app', () => {
  it('successfully loads with granted location permissions', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        // force Barcelona geolocation
        const latitude = 41.38879;
        const longitude = 2.15899;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { latitude, longitude } })
        })
      },
    })

    cy.contains('The weather today is:')
    cy.contains(/\d{1,2} °C/)
  })

  it('successfully loads with denied location permissions', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        cy.stub()
        cy.stub(win.navigator.permissions, 'query').returns({ state: 'denied' })
      },
    })

    cy.contains('Can\'t fetch any weather data')
  })
})