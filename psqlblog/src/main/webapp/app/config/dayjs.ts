/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

import dayjs from 'dayjs/esm';
import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import duration from 'dayjs/esm/plugin/duration';
import relativeTime from 'dayjs/esm/plugin/relativeTime';

import 'dayjs/esm/locale/en';
// jhipster-needle-i18n-language-dayjs-imports - JHipster will import languages from dayjs here

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
