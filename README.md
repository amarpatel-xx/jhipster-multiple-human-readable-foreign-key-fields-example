::: {#header}
# JHipster Example for Human-Readable Foreign Keys in User Interface
:::

:::::::::::::::::::::::::::::::::::: {#content}
:::::::::::: {#preamble}
::::::::::: sectionbody
::: paragraph
This code was generated using the JHipster blueprint
\"generator-jhipster-multiple-human-readable-foreign-key-fields\" (the
source code is available at:
[https://github.com/amarpatel-xx/generator-jhipster-multiple-human-readable-foreign-key-fields](https://github.com/amarpatel-xx/generator-jhipster-multiple-human-readable-foreign-key-fields){.bare}).
This code has a JDL which shows 2 foreign keys that will concatenated
and shown, in the Angular user interface, in replacement of the UUID.
The JDL can be modified and the
\@customAnnotation(\"DISPLAY_IN_GUI_RELATIONSHIP_LINK\") can be used
with any fields of an entity which would make it easier to identify that
entity when displayed (as part of a relationship). Sometimes having a
UUID makes it difficult for the human in the loop to figure out what the
entity on a relationship's other side actually is. If multiple entity
fields are necessary to replace the UUID, the fields can be delimmited
via a specified delimiter using a \@customAnnotation, as well (see the
example JDL file included as part of this project).
:::

::: {.olist .arabic}
1.  Below is the example using the \@customAnnotation and specifying the
    delimiter also.
:::

:::: listingblock
::: content
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
:::
::::

::: paragraph
**Prerequisites**:
:::

::: ulist
-   [Java](https://sdkman.io/) 21+

-   [Node.js](https://nodejs.com/) 20+

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

-   [JHipster](https://www.jhipster.tech/installation/) 8.5.0
:::

:::: {#toc .toc}
::: {#toctitle .title}
Table of Contents
:::

-   [Build Java Microservices using the Multiple Human-readable Foreign
    Key Fields
    Blueprint](#_build_java_microservices_using_the_multiple_human_readable_foreign_key_fields_blueprint)
-   [Run your Multiple Human-readable Foreign Key Fields
    Example](#_run_your_multiple_human_readable_foreign_key_fields_example)
-   [Switch Identity Providers](#_switch_identity_providers)
-   [See the Code in Action](#_see_the_code_in_action)
-   [Have Fun with Micro Frontends and
    JHipster!](#_have_fun_with_micro_frontends_and_jhipster)
::::
:::::::::::
::::::::::::

::::: sect1
## Build Java Microservices using the Multiple Human-readable Foreign Key Fields Blueprint {#_build_java_microservices_using_the_multiple_human_readable_foreign_key_fields_blueprint}

:::: sectionbody
::: {.olist .arabic}
1.  To generate a microservices architecture with human-readable foreign
    key fields support, run the following command:

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    npm install -g generator-jhipster-multiple-human-readable-foreign-key-fields
    sh generate-code.sh
    ```
    :::
    ::::

2.  You should see the message:

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    Congratulations, JHipster execution is complete!
    ```
    :::
    ::::
:::
::::
:::::

::::: sect1
## Run your Multiple Human-readable Foreign Key Fields Example {#_run_your_multiple_human_readable_foreign_key_fields_example}

:::: sectionbody
::: {.olist .arabic}
1.  When the process is complete, cd into the `gateway` directory and
    start Keycloak and Eureka using Docker Compose.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd gateway
    docker compose -f src/main/docker/keycloak.yml up -d
    docker compose -f src/main/docker/jhipster-registry.yml up -d
    ```
    :::
    ::::

2.  Start `gateway` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then
    start the `gateway` by running the Maven command.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::

3.  Start `blog` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then,
    start the `blog` microservice.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd blog
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::

4.  Start `store` database with Docker by opening a terminal and
    navigating to its directory and running the Docker command. Then,
    start the `store` microservice.

    :::: listingblock
    ::: content
    ``` {.highlightjs .highlight}
    cd store
    npm run docker:db:up
    ./mvnw spring-boot:run
    ```
    :::
    ::::
:::
::::
:::::

::::::: sect1
## Switch Identity Providers {#_switch_identity_providers}

:::::: sectionbody
::: paragraph
JHipster ships with Keycloak when you choose OAuth 2.0 / OIDC as the
authentication type.
:::

::: paragraph
If you'd like to use Okta for your identity provider, see [JHipster's
documentation](https://www.jhipster.tech/security/#okta).
:::

::: {.admonitionblock .tip}
+-----------------------------------+-----------------------------------+
| ::: title                         | ::: paragraph                     |
| Tip                               | You can configure JHipster        |
| :::                               | quickly with the [Okta            |
|                                   | CLI](https://cli.okta.com):       |
|                                   | :::                               |
|                                   |                                   |
|                                   | :::: listingblock                 |
|                                   | ::: content                       |
|                                   | ``` {.highlightjs .highlight}     |
|                                   | okta apps create jhipster         |
|                                   | ```                               |
|                                   | :::                               |
|                                   | ::::                              |
+-----------------------------------+-----------------------------------+
:::
::::::
:::::::

:::::::: sect1
## See the Code in Action {#_see_the_code_in_action}

::::::: sectionbody
::: paragraph
Now you can open your favorite browser to
[http://localhost:8080](http://localhost:8080){.bare}, and log in with
the credentials displayed on the page.
:::

::: paragraph
Then create a Blog
:::

::: {.olist .arabic}
1.  Open your favorite browser to
    [http://localhost:8080](http://localhost:8080){.bare}, and log in
    with the credentials displayed on the page.

2.  Then, add a blog by giving it a name, handle and selecting a user.

3.  Add a tag by giving it a name.

4.  Finally, create a post by giving it a title, content, selecting a
    blog and a tag.
:::

::: paragraph
Notice the Blog column shows \<blog-name\>-\<blog-handle\> and not the
UUID of the blog. That is success!
:::
:::::::
::::::::

:::::::: sect1
## Have Fun with Micro Frontends and JHipster! {#_have_fun_with_micro_frontends_and_jhipster}

::::::: sectionbody
::: paragraph
I hope you enjoyed this demo, and it helped you understand how to build
better microservice architectures with human-readable foreign key
fields.
:::

::: paragraph
☕️ Find the example code on GitHub:
[https://github.com/amarpatel-xx/jhipster-multiple-human-readable-foreign-key-fields-example](https://github.com/amarpatel-xx/jhipster-multiple-human-readable-foreign-key-fields-example){.bare}
:::

::: paragraph
☕️ Find the JHipster blueprint code on GitHub:
[https://github.com/amarpatel-xx/generator-jhipster-multiple-human-readable-foreign-key-fields](https://github.com/amarpatel-xx/generator-jhipster-multiple-human-readable-foreign-key-fields){.bare}
:::

::: paragraph
🤓 Read the following blog post, by Matt Raible, that was used as
inspiration for this project: [Micro Frontends for Java
Microservices](https://auth0.com/blog/micro-frontends-for-java-microservices/)
:::
:::::::
::::::::
::::::::::::::::::::::::::::::::::::

:::: {#footer}
::: {#footer-text}
Last updated 2024-07-09 17:15:08 -0400
:::
::::
