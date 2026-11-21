import {
    ApplicationContext,
    ClassLoader,
    Component,
    DarculaModule,
    StereoType,
} from "@darcula-midnight.jd/core";

import Discovery from "../router/Discovery.js";
import Router from "../router/Router.js";

ClassLoader.add(import.meta.url);

@Component
@StereoType("Module")
export default class Module implements DarculaModule {
    constructor(private readonly context: ApplicationContext) {}

    public bootstrap(): Promise<void> | void {
        const definitions = this.context.getDefinitions("Controller");

        const routes = Discovery.routes(definitions);

        const router = this.context.get<Router>(Router);
        router.registerAll(routes);
    }
}
