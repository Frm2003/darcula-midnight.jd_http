import { BeanDefinition } from "@darcula-midnight.jd/core";

import { RouteDefinition, RouteOptions } from "../types/index.js";
import path from "path";

export default class Discovery {
    public static routes(definitions: Iterable<BeanDefinition>): RouteDefinition[] {
        const routes: RouteDefinition[] = [];

        for (const { target } of definitions) {
            const basepath = Reflect.getOwnMetadata("BASE_PATH", target);

            const methodScheme: Record<string | symbol, RouteOptions> =
                Reflect.getOwnMetadata("METHOD_SCHEME", target.prototype);

            Object.entries(methodScheme).forEach(([method, options]) => {
                routes.push({
                    httpMethod: options.httpMethod,
                    path: path.posix.join(basepath, options.path ?? ""),
                    target: {
                        method,
                        clazz: target,
                    },
                });
            });
        }

        return routes;
    }
}
