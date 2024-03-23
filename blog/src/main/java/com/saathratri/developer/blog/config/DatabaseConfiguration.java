package com.saathratri.developer.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableReactiveNeo4jRepositories;

@Configuration
@EnableReactiveNeo4jRepositories("com.saathratri.developer.blog.repository")
public class DatabaseConfiguration {}
