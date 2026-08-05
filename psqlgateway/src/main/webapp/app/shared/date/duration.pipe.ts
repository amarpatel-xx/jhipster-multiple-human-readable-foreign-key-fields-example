/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs/esm';

@Pipe({
  name: 'duration',
})
export default class DurationPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      return dayjs.duration(value).humanize();
    }
    return '';
  }
}
