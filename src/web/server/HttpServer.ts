import { createServer, Server } from "http";
import { ClassLoader, Component } from "@darcula-midnight.jd/core";

import Router from "../router/Router.js";

ClassLoader.add(import.meta.url);

@Component
export default class HttpServer {
    private server: Server;

    constructor(private readonly router: Router) {
        this.server = createServer();
    }

    public async start(): Promise<void> {
        const PORT = Number(process.env.PORT) || 3000;

        this.server.listen(PORT, "0.0.0.0", () => {
            console.log(`Http Server running on: ${PORT}`);
        });
    }
}
