/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
export function isPresent<T>(t: T | undefined | null): t is T {
  return t !== undefined && t !== null;
}

export const filterNaN = (input: number): number => (Number.isNaN(input) ? 0 : input);
