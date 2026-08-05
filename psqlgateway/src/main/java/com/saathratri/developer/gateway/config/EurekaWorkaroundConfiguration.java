/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

// This is a workaround for
// https://github.com/jhipster/jhipster-registry/issues/537
// https://github.com/jhipster/generator-jhipster/issues/18533
// The original issue will be fixed with spring cloud 2021.0.4
// https://github.com/spring-cloud/spring-cloud-netflix/issues/3941
package com.saathratri.developer.gateway.config;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class EurekaWorkaroundConfiguration implements HealthIndicator {

    private boolean applicationIsUp = false;

    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        this.applicationIsUp = true;
    }

    @Override
    public Health health() {
        if (!applicationIsUp) {
            return Health.down().build();
        }
        return Health.up().build();
    }
}
