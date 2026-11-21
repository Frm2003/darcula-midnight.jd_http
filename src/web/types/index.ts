import { DefaultClass } from "@darcula-midnight.jd/core";

export enum HttpMethod {
    DELETE,
    GET,
    POST,
    PUT,
}

export type RouteDefinition = {
    httpMethod: HttpMethod;
    path: string;
    target: RouteTarget;
};

export type RouteMatch =
    | {
          message: "Match";
          target: RouteTarget;
      }
    | {
          message: "Not Found.";
      }
    | {
          message: "Method Not Allowed";
      };

export type RouteOptions = {
    httpMethod: HttpMethod;
    path?: string;
};

export type RouteTarget = {
    method: string | symbol;
    clazz: DefaultClass;
};
