package com.saathratri.developer.blog.service.mapper;

import static com.saathratri.developer.blog.domain.PostAsserts.*;
import static com.saathratri.developer.blog.domain.PostTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PostMapperTest {

    private PostMapper postMapper;

    @BeforeEach
    void setUp() {
        postMapper = new PostMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getPostSample1();
        var actual = postMapper.toEntity(postMapper.toDto(expected));
        assertPostAllPropertiesEquals(expected, actual);
    }
}
