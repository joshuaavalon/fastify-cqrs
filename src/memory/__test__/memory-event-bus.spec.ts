import fastify from "fastify";
import plugin from "../../index";

import type { FastifyInstance } from "fastify";
import type { Event } from "../../event";

describe("memory-command-bus", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = fastify();
    await server.register(plugin);
  });

  test("execute", async () => {
    const promise = new Promise<Event<"test">>(resolve => {
      server.eventBus.on("test", async (cmd): Promise<void> => resolve(cmd));
    });
    server.eventBus.publish({ type: "test", payload: 1 });
    console.log(promise);
    const { type, payload } = await promise;
    expect(type).toBe("test");
    expect(payload).toBe(1);
  });

  test("unregister", async () => {
    let event: unknown = null;
    const fn = async (e: unknown): Promise<void> => {
      event = e;
    };
    server.eventBus.on("test", fn);
    server.eventBus.off("test", fn);
    server.eventBus.publish({ type: "test", payload: 1 });
    expect(event).toBe(null);
  });

  test("error", async () => {
    expect(() =>
      server.eventBus.on(1 as any, async (): Promise<void> => {
        // no-op
      })
    ).toThrow();
    expect(() => server.eventBus.on("test", 1 as any)).toThrow();
  });
});

declare module "../../index" {
  interface Events {
    test: number;
  }
}
