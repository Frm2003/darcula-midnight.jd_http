import { ClassLoader, Component } from "@darcula-midnight.jd/core";
import RouteNode from "./RouteNode.js";

import { HttpMethod, RouteDefinition, RouteMatch } from "../types/index.js";

ClassLoader.add(import.meta.url);

@Component
export default class Router {
    private root = new Map<string, RouteNode>();

    public match(method: HttpMethod, path: string): RouteMatch {
        const segments = this.normalize(path);

        let currentLevel = this.root,
            currentNode: RouteNode | undefined;

        for (const segment of segments) {
            let node = currentLevel.get(segment);

            if (!node) return { message: "Not Found." } ;

            currentNode = node;
        }

        const target = currentNode!.handlers.get(method);

        if (!target) return { message: "Method Not Allowed" };

        return {
            message: "Match",
            target,
        };
    }

    public registerAll(routes: RouteDefinition[]): void {
        for (const route of routes) {
            this.register(route);
        }
    }

    public register({ httpMethod, path, target }: RouteDefinition): void {
        const segments = this.normalize(path);

        let currentLevel = this.root,
            currentNode: RouteNode | undefined;

        for (const segment of segments) {
            let node = currentLevel.get(segment);

            if (!node) {
                node = new RouteNode(segment);
                currentLevel.set(segment, node);
            }

            currentNode = node;
            currentLevel = node.segments;
        }

        if (currentNode!.handlers.has(httpMethod))
            throw new Error(
                `Router has encountered a conflict on ${target.clazz.name}.${target.method.toString()}`,
            );

        currentNode!.handlers.set(httpMethod, target);
    }

    private normalize(path: string): string[] {
        const segments = path.split("/").filter(Boolean);

        if (segments.length <= 0) return ["/"];

        return segments;
    }
}
