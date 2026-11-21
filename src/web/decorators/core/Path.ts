import { RouteOptions } from "../../types/index.js";

export default function Path(value: string): ClassDecorator;

export default function Path(value: RouteOptions): MethodDecorator;

export default function Path(
    value: string | RouteOptions,
): ClassDecorator | MethodDecorator {
    if (typeof value === "string")
        return (target: Function): void => {
            Reflect.defineMetadata("BASE_PATH", value, target);
        };

    return (target: Object, propertyKey: string | symbol): void => {
        const methodScheme: Record<string | symbol, RouteOptions> =
            Reflect.getOwnMetadata("METHOD_SCHEME", target) ?? {};

        methodScheme[propertyKey] = value;
        Reflect.defineMetadata("METHOD_SCHEME", value, target);
    };
}
