package com.okta.developer.blog;

import com.okta.developer.blog.BlogApp;
import com.okta.developer.blog.config.AsyncSyncConfiguration;
import com.okta.developer.blog.config.EmbeddedNeo4j;
import com.okta.developer.blog.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { BlogApp.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class })
@EmbeddedNeo4j
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public @interface IntegrationTest {
}
