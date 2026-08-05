/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

export interface ConfigProps {
  contexts: Contexts;
}

export type Contexts = Record<string, Context>;

export interface Context {
  beans: Beans;
  parentId?: any;
}

export type Beans = Record<string, Bean>;

export interface Bean {
  prefix: string;
  properties: any;
}

export interface Env {
  activeProfiles?: string[];
  propertySources: PropertySource[];
}

export interface PropertySource {
  name: string;
  properties: Properties;
}

export type Properties = Record<string, Property>;

export interface Property {
  value: string;
  origin?: string;
}
