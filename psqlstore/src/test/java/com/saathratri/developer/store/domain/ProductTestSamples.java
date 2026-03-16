package com.saathratri.developer.store.domain;

import java.util.UUID;

public class ProductTestSamples {

    public static Product getProductSample1() {
        return new Product().id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa")).title("title1");
    }

    public static Product getProductSample2() {
        return new Product().id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367")).title("title2");
    }

    public static Product getProductRandomSampleGenerator() {
        return new Product().id(UUID.randomUUID()).title(UUID.randomUUID().toString());
    }
}
