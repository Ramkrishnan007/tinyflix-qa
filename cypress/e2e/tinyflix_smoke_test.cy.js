describe('TinyFlix Functional Test Suite', () => {

  it('Loads homepage and checks TinyFlix title', () => {
    cy.visit('/');
    cy.contains('TinyFlix');
  });

  it('Search by title works', () => {
    cy.visit('/');
    cy.get('input').first().type('Intro to Testing{enter}');
    cy.contains('Intro to Testing');
  });

  it('Filter by recent works', () => {
    cy.visit('/');
    cy.get('select').first().select('recent');
    cy.contains('Recent');
  });

  it('Clicks video card and sees error message', () => {
    cy.visit('/');
    cy.get('.video-card').first().click();
    cy.contains('Error loading video').should('exist');
  });

  it('Adds a comment on a video', () => {
    cy.visit('/');
    cy.get('.video-card').first().click();
    cy.get('textarea').first().type('Testing comment{enter}');
  });

  it('Adds a bookmark to a video', () => {
    cy.visit('/');
    cy.get('.video-card').first().click();
    cy.get('.bookmark-button').click();
  });

  it('Checks bookmark list', () => {
    cy.visit('/');
    cy.contains('Bookmarks');
  });

  it('Handles invalid comment input', () => {
    cy.visit('/');
    cy.get('.video-card').first().click();
    cy.get('textarea').first().clear().type('{enter}');
    cy.contains('Comment cannot be empty').should('exist');
  });

  it('Handles network error simulation', () => {
    cy.intercept('GET', '**/videos', { forceNetworkError: true }).as('getVideos');
    cy.visit('/');
    cy.wait('@getVideos');
    cy.contains('Error fetching videos').should('exist');
  });
  
  it('Deletes a bookmark from the list', () => {
  cy.visit('/');
  cy.get('.video-card').first().click();
  cy.get('.bookmark-button').click();
  cy.get('.bookmark-list .bookmark-item').first().find('.delete-button').click();
  cy.contains('Bookmark removed').should('exist');
})

});