import fastify from "fastify";
import plugin from "../../index";

import type { FastifyInstance } from "fastify";

describe("memory-command-bus", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = fastify();
    await server.register(plugin);
  });

  test("execute", async () => {
    server.commandBus.register(
      "test",
      async (cmd): Promise<string> => String(cmd.payload + 1)
    );
    const result = await server.commandBus.execute({
      type: "test",
      payload: 1
    });
    expect(result).toBe("2");
  });

  test("unregister", async () => {
    server.commandBus.register(
      "test",
      async (cmd): Promise<string> => String(cmd.payload + 1)
    );
    server.commandBus.unregister("test");
    expect(() =>
      server.commandBus.execute({
        type: "test",
        payload: 1
      })
    ).toThrow();
  });

  test("error", async () => {
    expect(() =>
      server.commandBus.register(1 as any, async (): Promise<string> => "")
    ).toThrow();
    expect(() => server.commandBus.register("test", 1 as any)).toThrow();
    expect(() => server.commandBus.unregister(1 as any)).toThrow();
    expect(() => server.commandBus.execute(1 as any)).toThrow();
    expect(() =>
      server.commandBus.execute({
        type: 1,
        payload: 1
      } as any)
    ).toThrow();
  });
});

declare module "../../index" {
  interface Commands {
    test: number;
  }
  interface CommandResults {
    test: string;
  }
}
