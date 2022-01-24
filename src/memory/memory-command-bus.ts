import {
  Command,
  CommandBus,
  CommandHandler,
  CommandResult,
  CommandType
} from "../command";

export class MemoryCommandBus implements CommandBus {
  private handlers = new Map<CommandType, CommandHandler>();
  public register<T extends CommandType>(
    type: T,
    handler: CommandHandler<T>
  ): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.handlers.set(type, handler);
  }

  public unregister<T extends CommandType>(
    type: T,
    handler: CommandHandler<T>
  ): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.handlers.delete(type);
  }

  public execute<T extends CommandType>(
    command: Command<T>
  ): Promise<CommandResult<T>> {
    if (!command || typeof command !== "object") {
      throw new TypeError("command must be an object");
    }
    if (typeof command.type !== "string") {
      throw new TypeError("command.type must be a string");
    }
    const handler = this.handlers.get(command.type);
    if (!handler) {
      throw new Error(`Command type of ${command.type} is not registered`);
    }
    return handler(command);
  }
}
