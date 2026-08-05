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

describe('Blog e2e test', () => {
  const blogPageUrl = '/psqlblog/blog';
  const blogPageUrlPattern = new RegExp('/psqlblog/blog(\\?.*)?$');
  let username: string;
  let password: string;
  const blogSample = { name: 'than', handle: 'pantyhose' };

  let blog;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', /^\/services\/psqlblog\/api\/blogs\b/).as('entitiesRequest');
    cy.intercept('POST', '/services/psqlblog/api/blogs').as('postEntityRequest');
    cy.intercept('DELETE', '/services/psqlblog/api/blogs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (blog) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/psqlblog/api/blogs/${blog.id}`,
      }).then(() => {
        blog = undefined;
      });
    }
  });

  it('Blogs menu should load Blogs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('psqlblog/blog');
    cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Blog').should('exist');
    cy.url().should('match', blogPageUrlPattern);
  });

  describe('Blog page', () => {
    it('should have translated page title', () => {
      cy.visit(blogPageUrl);
      cy.getEntityHeading('Blog').should('not.contain', 'psqlblogApp.psqlblogBlog.home.title');
    });

    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(blogPageUrl);
        cy.wait('@entitiesRequest', { timeout: 30000 });
      });

      it('should load create Blog page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/psqlblog/blog/new$'));
        cy.getEntityCreateUpdateHeading('Blog');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', blogPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/psqlblog/api/blogs',
          body: blogSample,
        }).then(({ body }) => {
          blog = body;

          cy.intercept(
            {
              method: 'GET',
              url: /^\/services\/psqlblog\/api\/blogs\b/,
              times: 1,
            },
            {
              statusCode: 200,
              body: [blog],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(blogPageUrl);

        cy.wait('@entitiesRequestInternal', { timeout: 30000 });
      });

      it('detail button click should load details Blog page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('blog');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', blogPageUrlPattern);
      });

      it('edit button click should load edit Blog page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Blog');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', blogPageUrlPattern);
      });

      it('edit button click should load edit Blog page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Blog');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', blogPageUrlPattern);
      });

      it('last delete button click should delete instance of Blog', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('blog').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', blogPageUrlPattern);

        blog = undefined;
      });
    });
  });

  describe('new Blog page', () => {
    beforeEach(() => {
      cy.visit(blogPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Blog');
    });

    it('should create an instance of Blog', () => {
      cy.get(`[data-cy="name"]`).type('rejoin preside');
      cy.get(`[data-cy="name"]`).should('have.value', 'rejoin preside');

      cy.get(`[data-cy="handle"]`).type('tired drain winged');
      cy.get(`[data-cy="handle"]`).should('have.value', 'tired drain winged');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        blog = response.body;
      });
      cy.wait('@entitiesRequest', { timeout: 30000 }).then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', blogPageUrlPattern);
    });
  });
});
