describe('TinyFlix Smoke Test', () => {
  it('Loads homepage and checks TinyFlix title', () => {
    cy.visit('http://localhost:5173');
    cy.contains('TinyFlix');
  });

it('Searches for a video title', () => {
  cy.visit('http://localhost:5173');
  cy.get('input[placeholder="Search..."]').type('Intro to Testing{enter}');
  cy.contains('Intro to Testing');
});
});
