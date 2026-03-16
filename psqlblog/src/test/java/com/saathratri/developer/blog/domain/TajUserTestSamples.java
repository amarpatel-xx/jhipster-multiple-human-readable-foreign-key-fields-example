package com.saathratri.developer.blog.domain;

import java.util.UUID;

public class TajUserTestSamples {

    public static TajUser getTajUserSample1() {
        return new TajUser().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")).login("login1");
    }

    public static TajUser getTajUserSample2() {
        return new TajUser().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")).login("login2");
    }

    public static TajUser getTajUserRandomSampleGenerator() {
        return new TajUser().id(UUID.randomUUID()).login(UUID.randomUUID().toString());
    }
}
