import type { EventBus } from "./event";
import type { CommandBus } from "./command";

export interface PluginOption {
  eventBus?: EventBus;
  commandBus?: CommandBus;
}
