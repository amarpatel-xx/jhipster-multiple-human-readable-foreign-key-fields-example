/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Tag e2e test', () => {
  const tagPageUrl = '/psqlblog/tag';
  const tagPageUrlPattern = new RegExp('/psqlblog/tag(\\?.*)?$');
  let username: string;
  let password: string;
  const tagSample = { name: 'for agile' };

  let tag;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', /^\/services\/psqlblog\/api\/tags\b/).as('entitiesRequest');
    cy.intercept('POST', '/services/psqlblog/api/tags').as('postEntityRequest');
    cy.intercept('DELETE', '/services/psqlblog/api/tags/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tag) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/psqlblog/api/tags/${tag.id}`,
      }).then(() => {
        tag = undefined;
      });
    }
  });

  it('Tags menu should load Tags page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('psqlblog/tag');
    cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Tag').should('exist');
    cy.url().should('match', tagPageUrlPattern);
  });

  describe('Tag page', () => {
    it('should have translated page title', () => {
      cy.visit(tagPageUrl);
      cy.getEntityHeading('Tag').should('not.contain', 'psqlblogApp.psqlblogTag.home.title');
    });

    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tagPageUrl);
        cy.wait('@entitiesRequest', { timeout: 30000 });
      });

      it('should load create Tag page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/psqlblog/tag/new$'));
        cy.getEntityCreateUpdateHeading('Tag');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tagPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/psqlblog/api/tags',
          body: tagSample,
        }).then(({ body }) => {
          tag = body;

          cy.intercept(
            {
              method: 'GET',
              url: /^\/services\/psqlblog\/api\/tags\b/,
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/services/psqlblog/api/tags?page=0&size=20>; rel="last",<http://localhost/services/psqlblog/api/tags?page=0&size=20>; rel="first"',
              },
              body: [tag],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(tagPageUrl);

        cy.wait('@entitiesRequestInternal', { timeout: 30000 });
      });

      it('detail button click should load details Tag page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tag');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tagPageUrlPattern);
      });

      it('edit button click should load edit Tag page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Tag');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tagPageUrlPattern);
      });

      it('edit button click should load edit Tag page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Tag');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tagPageUrlPattern);
      });

      it('last delete button click should delete instance of Tag', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('tag').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tagPageUrlPattern);

        tag = undefined;
      });
    });
  });

  describe('new Tag page', () => {
    beforeEach(() => {
      cy.visit(tagPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Tag');
    });

    it('should create an instance of Tag', () => {
      cy.get(`[data-cy="name"]`).type('while');
      cy.get(`[data-cy="name"]`).should('have.value', 'while');

      cy.get(`[data-cy="description"]`).type('represent');
      cy.get(`[data-cy="description"]`).should('have.value', 'represent');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        tag = response.body;
      });
      cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', tagPageUrlPattern);
    });
  });

  it('should run an AI semantic search', () => {
    cy.intercept('GET', /\/api\/tags\/ai-search/).as('aiSearchRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('psqlblog/tag');
    cy.wait('@entitiesRequest', { timeout: 30000 });
    cy.get('[data-cy="aiSearchInput"]').type('semantic query');
    cy.get('[data-cy="aiSearchButton"]').click();
    cy.wait('@aiSearchRequest', { timeout: 30000 }).its('response.statusCode').should('eq', 200);
  });

  it('should generate embeddings on create and regenerate on update (fake embedding model)', function () {
    cy.env(['fakeEmbeddings']).then(({ fakeEmbeddings }) => {
      if (!fakeEmbeddings) this.skip();
    });
    const createdText = `cypress embed ${Date.now()}`;
    const updatedText = `cypress reembed ${Date.now()}`;
    cy.authenticatedRequest({ method: 'POST', url: '/services/psqlblog/api/tags', body: { ...tagSample, name: createdText } }).then(
      ({ body }) => {
        tag = body;
        cy.visit('/');
        cy.clickOnEntityMenuItem('psqlblog/tag');
        cy.wait('@entitiesRequest', { timeout: 30000 });
        // Embedding created on insert: AI search finds the new row by its exact text.
        cy.intercept('GET', /\/api\/tags\/ai-search/).as('aiSearchCreated');
        cy.get('[data-cy="aiSearchInput"]').clear().type(createdText);
        cy.get('[data-cy="aiSearchButton"]').click();
        cy.wait('@aiSearchCreated', { timeout: 30000 }).then(({ response }) => {
          expect(response.statusCode).to.eq(200);
          expect(response.body.map(row => row.id)).to.include(tag.id);
        });
        // Update the source text through the API; the stored vector must be regenerated.
        cy.authenticatedRequest({ method: 'PUT', url: `/services/psqlblog/api/tags/${tag.id}`, body: { ...tag, name: updatedText } });
        cy.intercept('GET', /\/api\/tags\/ai-search/).as('aiSearchUpdated');
        cy.get('[data-cy="aiSearchInput"]').clear().type(updatedText);
        cy.get('[data-cy="aiSearchButton"]').click();
        cy.wait('@aiSearchUpdated', { timeout: 30000 }).then(({ response }) => {
          expect(response.statusCode).to.eq(200);
          expect(response.body.map(row => row.id)).to.include(tag.id);
        });
        // The OLD text must no longer match: proves the vector was replaced, not kept.
        cy.intercept('GET', /\/api\/tags\/ai-search/).as('aiSearchStale');
        cy.get('[data-cy="aiSearchInput"]').clear().type(createdText);
        cy.get('[data-cy="aiSearchButton"]').click();
        cy.wait('@aiSearchStale', { timeout: 30000 }).then(({ response }) => {
          expect(response.statusCode).to.eq(200);
          expect(response.body.map(row => row.id)).to.not.include(tag.id);
        });
      },
    );
  });
});
