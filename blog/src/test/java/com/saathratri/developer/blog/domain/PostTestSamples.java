package com.saathratri.developer.blog.domain;

import java.util.UUID;

public class PostTestSamples {

    public static Post getPostSample1() {
        return new Post().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")).title("title1");
    }

    public static Post getPostSample2() {
        return new Post().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")).title("title2");
    }

    public static Post getPostRandomSampleGenerator() {
        return new Post().id(UUID.randomUUID()).title(UUID.randomUUID().toString());
    }
}
