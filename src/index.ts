import fastifyPlugin from "fastify-plugin";
import { MemoryCommandBus, MemoryEventBus } from "./memory";

import type { PluginOption } from "./plugin-option";
import type { EventBus } from "./event";
import type { CommandBus } from "./command";

const plugin = fastifyPlugin<PluginOption>(
  async (fastify, opts) => {
    if (fastify.commandBus || fastify.eventBus) {
      throw new Error("This plugin is already registered");
    }
    const {
      eventBus = new MemoryEventBus(),
      commandBus = new MemoryCommandBus()
    } = opts ?? {};
    fastify.decorate("eventBus", eventBus);
    fastify.decorate("commandBus", commandBus);
  },
  {
    name: "@joshuaavalon/fastify-cqrs",
    fastify: "3.x"
  }
);

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    eventBus: EventBus;
    commandBus: CommandBus;
  }
}
export * from "./event";
export * from "./command";
export * from "./memory";
