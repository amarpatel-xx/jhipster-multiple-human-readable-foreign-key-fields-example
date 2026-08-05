/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

package com.saathratri.developer.gateway.domain;

import java.math.BigDecimal;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Comparator;

public class AssertUtils {

    public static Comparator<ZonedDateTime> zonedDataTimeSameInstant = Comparator.nullsFirst((e1, a2) ->
        e1.withZoneSameInstant(ZoneOffset.UTC).compareTo(a2.withZoneSameInstant(ZoneOffset.UTC))
    );

    public static Comparator<BigDecimal> bigDecimalCompareTo = Comparator.nullsFirst(BigDecimal::compareTo);
}
