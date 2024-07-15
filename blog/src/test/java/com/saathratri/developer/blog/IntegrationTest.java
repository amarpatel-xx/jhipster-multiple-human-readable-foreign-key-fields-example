package com.saathratri.developer.blog;

import com.saathratri.developer.blog.config.AsyncSyncConfiguration;
import com.saathratri.developer.blog.config.EmbeddedSQL;
import com.saathratri.developer.blog.config.JacksonConfiguration;
import com.saathratri.developer.blog.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { BlogApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class })
@EmbeddedSQL
public @interface IntegrationTest {
}
