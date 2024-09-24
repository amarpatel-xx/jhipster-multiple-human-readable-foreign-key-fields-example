package com.saathratri.developer.blog.domain;

import java.util.UUID;

public class BlogTestSamples {

    public static Blog getBlogSample1() {
        return new Blog().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")).name("name1").handle("handle1");
    }

    public static Blog getBlogSample2() {
        return new Blog().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")).name("name2").handle("handle2");
    }

    public static Blog getBlogRandomSampleGenerator() {
        return new Blog().id(UUID.randomUUID()).name(UUID.randomUUID().toString()).handle(UUID.randomUUID().toString());
    }
}
