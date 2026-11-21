import { HttpMethod, RouteTarget } from "../types/index.js";

export default class RouteNode {
    public name: string;
    public segments: Map<string, RouteNode>;
    public handlers: Map<HttpMethod, RouteTarget>;

    constructor(name: string) {
        this.name = name;
        this.segments = new Map();
        this.handlers = new Map();
    }
}
