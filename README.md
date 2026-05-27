# JHipster Example for Human-Readable Foreign Keys in User Interface

### About this JHipster Example
This code was generated using the JHipster blueprint `generator-jhipster-ai-postgresql`.
The source code for the underlying JHipster generator that is used in this example is available at: https://github.com/amarpatel-xx/generator-jhipster-ai-postgresql

This code has a JDL which shows 2 foreign keys that will concatenated and shown, in the Angular user interface, in replacement of the UUID. The JDL can be modified and the `@customAnnotation("DISPLAY_IN_GUI_RELATIONSHIP_LINK")` can be used with any fields of an entity which would make it easier to identify that entity when displayed (as part of a relationship). Sometimes having a UUID makes it difficult for the human in the loop to figure out what the entity on a relationship's other side actually is. If multiple entity fields are necessary to replace the UUID, the fields can be delimmited via a specified delimiter using a `@customAnnotation`, as well (see the example JDL file included as part of this project).

Matt Raible's frequently used the blog and store examples in his capability demonstrations.
1.  Below is the example using the \@customAnnotation and specifying the
    delimiter also.
```console
    entity Blog {
      @customAnnotation("DISPLAY_IN_GUI_RELATIONSHIP_LINK") @customAnnotation("-") name String required minlength(3)
      @customAnnotation("DISPLAY_IN_GUI_RELATIONSHIP_LINK") @customAnnotation("-") handle String required minlength(2)
    }

    entity Post {
      title String required
      content TextBlob required
      date Instant required
    }

    relationship ManyToOne {
      Blog{user(login)} to User
      Post{blog} to Blog
    }
```

## Improvements Since v2.0.14

The underlying `generator-jhipster-ai-postgresql` blueprint has received significant improvements since the last open-source tagged release (v2.0.14). Regenerating this example with the latest blueprint version will include:

### pgvector / AI Semantic Search
- Added full **PostgreSQL pgvector** support for AI-powered semantic search on entity fields.
- **Automatic embedding generation** on create and update -- when an entity with vector fields is saved, embeddings are generated from source text fields (e.g., `name` -> `nameEmbedding`) using the OpenAI Embedding API.
- **AI semantic search bar** on list pages for entities with vector fields -- users can type natural language queries and find semantically similar records.
- Vector embedding fields are automatically excluded from DTOs to keep payloads clean, while remaining in JPA entities for database operations.
- **Cosine similarity search** with distance threshold filters out unrelated results -- only semantically relevant matches are returned.
- **HNSW indexes** are automatically created on vector columns for fast approximate nearest neighbor search.
- Generates `EmbeddingConfiguration` with Spring AI and OpenAI embeddings (text-embedding-3-small, 1536 dimensions).
- `PgVectorConverter` with `autoApply=true` handles `float[]` <-> PostgreSQL `vector` serialization transparently.
- **Automatic embedding migration on startup** -- similar to how Liquibase runs, embeddings are generated for any rows missing them.
- Angular UI shows vector fields as **readonly** on update forms and **truncates** long vector arrays on list and detail pages.

#### JDL Configuration for Vector Fields

The Tag entity in this example uses `@customAnnotation("VECTOR")` to enable AI semantic search:

```jdl
entity Tag {
  id UUID
  @customAnnotation("DISPLAY_IN_GUI_RELATIONSHIP_LINK") @customAnnotation("") name String maxlength(100) required
  description String maxlength(255)
  @customAnnotation("VECTOR") @customAnnotation("1536") nameEmbedding Blob
  @customAnnotation("VECTOR") @customAnnotation("1536") descriptionEmbedding Blob
}
```

**How the annotations work:**

- `@customAnnotation("VECTOR")` -- Marks the field as a pgvector embedding field. The blueprint converts it from `Blob` to `float[]`, generates the `vector(N)` column type in Liquibase, and adds the AI search infrastructure.
- `@customAnnotation("1536")` -- Specifies the vector dimension (1536 for OpenAI's `text-embedding-3-small` model).
- The embedding field name must follow the pattern `<sourceField>Embedding` (e.g., `nameEmbedding` derives from `name`, `descriptionEmbedding` derives from `description`). The blueprint auto-generates embeddings from the source field's text value on every create and update.
- The AI search bar queries **all** embedding fields in the entity, merges results, and deduplicates by ID -- so a match on either `name` or `description` will surface the entity.

#### AI Semantic Search Screenshots

Searching for **"camry"** returns Toyota (a car brand) and Cat (less relevant, ranked lower):

![Semantic Search - Camry](screenshots/Semantic%20Search%20-%20Camry.png)

Searching for **"cheetah"** returns Cat first (both are felines), then Dog and Toyota ranked by similarity:

![Semantic Search - Cheetah](screenshots/Semantic%20Search%20-%20Cheetah.png)

Searching for **"german shepherd"** returns Dog first (a dog breed), then Cat (also an animal), then Toyota (least similar):

![Semantic Search - German Shepherd](screenshots/Semantic%20Search%20-%20German%20Shepherd.png)

### PDF Blob Support
- Added **PDF thumbnail and download** support for `blobContentTypeAny` fields in list, detail, and update page templates.
- PDF icon styling matches across list and detail views with shadow and download link.
- Added null-safe `openFile()` for blob fields.

### Performance Optimizations
- Added **Entity Graph** backend repository support for eager-loading related entities in a single query, avoiding N+1 problems.
- Added a feature to ignore massive entity relationship lists on view and update pages, keeping the UI responsive and performant.
- Fixed `toDTO` mapping performance issues by preventing MapStruct infinite recursion on bidirectional relationships.
- Added a **non-paginated criteria endpoint** for cases where full result sets are needed without pagination overhead.

### UI and Template Improvements
- Added **navbar menu grouping and alphabetical sorting** for microfrontend entity menus.
- Simplified entity graph handling and REST resource templates.
- Added `ExceptionTranslator` patching to log full stack traces at ERROR level for better debugging.

## Prerequisites:

- [Java](https://sdkman.io/) 21+
- [Node.js](https://nodejs.org/) 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [JHipster](https://www.jhipster.tech/installation/) 9.0.0

### AI Semantic Search (Optional)

To enable AI-powered semantic search, set your OpenAI API key as an environment variable:

```console
export OPENAI_API_KEY=sk-your-key-here
```

Or add it to your microservice's `application-dev.yml`:

```yaml
openai:
  api-key: sk-your-key-here
```

Without the API key, the application runs normally but embedding generation and AI search are disabled.

### Build
### Build Java Microservices using the Multiple Human-readable Foreign Key Fields Blueprint 

1.  To generate a microservices architecture with human-readable foreign key fields support, run the following commands:
```console
npm install -g generator-jhipster-ai-postgresql

git clone https://github.com/amarpatel-xx/jhipster-ai-postgresql-example.git

cd jhipster-ai-postgresql-example
```

**Mac / Linux:**
```console
sh saathratri-generate-code-dev-sql.sh
```

**Windows:**
```console
saathratri-generate-code-dev-sql.bat
```

2.  You should see the message:
```console
Congratulations, JHipster execution is complete!
```

### Run your Multiple Human-readable Foreign Key Fields Example 

1.  When the process is complete, cd into the `psqlgateway` directory and start Keycloak and Eureka using Docker Compose.
```console
cd psqlgateway
docker compose -f src/main/docker/keycloak.yml up -d
docker compose -f src/main/docker/jhipster-registry.yml up -d
```

2.  Start `psqlgateway` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then start the `gateway` by running the Maven command.
```console
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

3.  Start `pslqblog` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then, start the `blog` microservice.
```console
cd psqlblog
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

4.  Start `psqlstore` database with Docker by opening a terminal and navigating to its directory and running the Docker command. Then, start the `store` microservice.
```console
cd psqlstore
npm run docker:db:up
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Testing the Generated Code

Every application generated into this example ships with a full test suite — both
**backend** (JUnit + Testcontainers) and **frontend** (ESLint + Vitest). All three
services (`psqlgateway`, `psqlblog`, `psqlstore`) are tested the same way.

> Integration tests use **Testcontainers**, so **Docker Desktop must be running**. The
> `*IT` tests start a real **PostgreSQL (with the pgvector extension)** container
> automatically — no manual database setup is required. Note: the OpenAI API key is **not**
> needed to run the tests (it is only used at runtime for embedding generation / AI search);
> the suite passes without it.

### Backend tests (per service)

Run from each service directory (`psqlgateway`, `psqlblog`, `psqlstore`):

```console
./mvnw -ntp -DskipTests -Dskip.npm package   # compile + package only (no Docker)
./mvnw -ntp -Dskip.npm verify                 # unit + integration tests (Docker required)
```

(On Windows, use `mvnw.cmd` instead of `./mvnw`.)

`verify` runs the unit tests plus the entity REST CRUD integration tests (`*IT`):
create / get-one / get-all / update / partial update / delete and their negative cases.
The blueprint's additions — the extra human-readable foreign-key display columns and the
pgvector embedding columns — are exercised against the live PostgreSQL/pgvector container.

### Frontend tests (per service)

Each service has an Angular microfrontend. Run from each service directory:

```console
npm install
npm test
```

`npm test` runs **`eslint .` first** (the `pretest` hook) — if lint fails, the unit tests
never run — then the Angular unit tests on **Vitest** (`ng test --coverage`). The lint
gate fails only on **errors**, not warnings. To run just one half: `npx eslint .` (lint
only) or `npx ng test` (Vitest only).

### End-to-End (E2E) tests with Cypress

Each service also ships a **Cypress** E2E suite under `src/test/javascript/cypress/`
(account, administration, and per-entity CRUD specs). Unlike the unit tests, Cypress drives
a **running, fully-assembled** app in a real browser, so the whole stack must be up first. A
local **Chrome** is required for the headless run, and **Docker Desktop** must be running.

**1. Build and start the full stack** — the same flow as *Run your … Example* above.
Packaging first ensures each gateway/remote serves its compiled Angular bundle, so micro
frontend module federation resolves at runtime:

```console
sh compile-saathratri-dev.sh   # package all three apps (backend + Angular client)
sh saathratri-deploy.sh        # Keycloak + JHipster Registry, then each DB + mvnw spring-boot:run
```

(On Windows, use `compile-saathratri-dev.bat` and `saathratri-deploy.bat`.)

Wait until all three services appear in the registry at <http://localhost:8761> and the
gateway UI loads at <http://localhost:8080>. Login uses the bundled Keycloak realm
(`admin`/`admin`).

**2. Run the suite** — from each service directory (`psqlgateway`, `psqlblog`, `psqlstore`),
after a one-time `npm install` (which also fetches the Cypress binary):

```console
npm run e2e          # cypress run (headed) against the gateway at http://localhost:8080
npm run cypress      # interactive Cypress runner (cypress open)
```

> **Micro frontend note:** every app (gateway and each remote) carries its **own** entity
> specs but points `baseUrl` at the **gateway** (port 8080), so the specs run against the
> assembled shell. The gateway **and** the service whose entities you are testing must both
> be running.

To exercise just the gateway's account/admin specs without the full fleet, run
`npm run e2e:devserver` from `psqlgateway`; it starts that app's backend plus Angular dev
server (port 9000) and runs Cypress against it.

The per-entity create specs carry the blueprint's **human-readable foreign-key assertion** —
after selecting each required relationship, the test asserts the dropdown shows a
human-readable label rather than a raw UUID. See
[`generator-jhipster-ai-postgresql/TESTING.md` (§5.2)](https://github.com/amarpatel-xx/generator-jhipster-ai-postgresql/blob/main/TESTING.md).

### Debugging test failures

This example is **generated code** — do not fix a failing test by hand-editing the
generated app, because the next regeneration overwrites it. Instead, fix the **blueprint
template** that produced the code, then regenerate. The full debugging runbook (the
generate-sample tight loop, backend integration-test tips, and frontend bug patterns)
lives in the blueprint repo:
**[`generator-jhipster-ai-postgresql/TESTING.md`](https://github.com/amarpatel-xx/generator-jhipster-ai-postgresql/blob/main/TESTING.md)**
(with a deeper companion catalogue in
[`generator-jhipster-cassandra/TESTING.md`](https://github.com/amarpatel-xx/generator-jhipster-cassandra/blob/main/TESTING.md)).

### Switch Identity Providers

JHipster ships with Keycloak when you choose OAuth 2.0 / OIDC as the authentication type.

If you'd like to use Okta for your identity provider, see [JHipster's documentation](https://www.jhipster.tech/security/#okta).

#### You can configure JHipster quickly with the [Okta CLI](https://cli.okta.com):
```console
okta apps create jhipster
```

### See the Code in Action

Now you can open your favorite browser to [http://localhost:8080](http://localhost:8080), and log in with the credentials displayed on the page.

## Then create a Blog
1.  Open your favorite browser to [http://localhost:8080](http://localhost:8080), and log in with the credentials displayed on the page. Then navigate to the psqlblog menu item.
2.  Then, add a user by giving it a login name.
3.  Then, add a blog by giving it a name, handle and selecting the user.
4.  Add a tag by giving it a name and description. If the OpenAI API key is configured, embeddings are automatically generated when you save.
5.  Finally, add a post by providing a title, content, selecting the blog and the tag.

Notice the blog column of the post shows `<blog-name>-<blog-handle>` and not the UUID of the blog. That is success!

### Try AI Semantic Search
If you configured the OpenAI API key, go to the Tag list page and use the **AI Search** bar. Type a natural language query (e.g., "animals" or "vehicles") and the search will find tags with semantically similar names or descriptions using cosine similarity against pgvector embeddings.

## Then create a Store
1.  Open your favorite browser to [http://localhost:8080](http://localhost:8080), and log in with the credentials displayed on the page. Then navigate to the psqlstore menu item.
2.  Then, add a product by giving it a title, a price and an image.

## Have Fun with Micro Frontends and JHipster!


I hope you enjoyed this demo, and it helped you understand how to build better microservice architectures with human-readable foreign key fields.

☕️ Find the code for the underlying blueprint used here to  generate a JHipster application on GitHub: https://github.com/amarpatel-xx/generator-jhipster-ai-postgresql

☕️ Find the example code that uses the blueprint to generate a JHipster application  on GitHub: https://github.com/amarpatel-xx/jhipster-ai-postgresql-example


🤓 Read the following blog post, by Matt Raible, that was used as inspiration for this project: [Micro Frontends for Java Microservices](https://auth0.com/blog/micro-frontends-for-java-microservices/)

## Acknowledgements

Thank you to [Matt Raible](https://github.com/mraible) and [Gaël Marziou](https://github.com/gmarziou)  for your invaluable contributions to this example and the underlying JHipster blueprint.
