import type { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  element: ReactElement;
  layout?: "blank" | "default" | "protected";
}
