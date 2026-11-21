import { Component, StereoType } from "@darcula-midnight.jd/core";

import Path from "../core/Path";

export default function RestController(path: string): ClassDecorator {
    return (target: Function): void => {
        Component()(target);
        Path(path)(target);
        StereoType("Controller")(target);
    };
}
