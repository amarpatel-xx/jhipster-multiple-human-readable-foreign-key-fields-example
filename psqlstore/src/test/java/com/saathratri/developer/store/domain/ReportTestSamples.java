package com.saathratri.developer.store.domain;

import java.util.UUID;

public class ReportTestSamples {

    public static Report getReportSample1() {
        return new Report()
            .id(UUID.fromString("23d8dc04-a48b-45d9-a01d-4b728f0ad4aa"))
            .fileName("fileName1")
            .fileExtension("fileExtension1");
    }

    public static Report getReportSample2() {
        return new Report()
            .id(UUID.fromString("ad79f240-3727-46c3-b89f-2cf6ebd74367"))
            .fileName("fileName2")
            .fileExtension("fileExtension2");
    }

    public static Report getReportRandomSampleGenerator() {
        return new Report().id(UUID.randomUUID()).fileName(UUID.randomUUID().toString()).fileExtension(UUID.randomUUID().toString());
    }
}
