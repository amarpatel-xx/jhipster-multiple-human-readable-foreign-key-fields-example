package com.saathratri.developer.blog.service.mapper;

import static com.saathratri.developer.blog.domain.TajUserAsserts.*;
import static com.saathratri.developer.blog.domain.TajUserTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TajUserMapperTest {

    private TajUserMapper tajUserMapper;

    @BeforeEach
    void setUp() {
        tajUserMapper = new TajUserMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTajUserSample1();
        var actual = tajUserMapper.toEntity(tajUserMapper.toDto(expected));
        assertTajUserAllPropertiesEquals(expected, actual);
    }
}
