import type { Command } from "./command";
import type { CommandHandler } from "./command-handler";
import type { CommandResult } from "./command-result";
import type { CommandType } from "./command-type";

export interface CommandBus {
  register<T extends CommandType = CommandType>(
    type: T,
    handler: CommandHandler<T>
  ): void;
  unregister<T extends CommandType = CommandType>(
    type: T,
    handler: CommandHandler<T>
  ): void;
  execute<T extends CommandType = CommandType>(
    command: Command<T>
  ): Promise<CommandResult<T>>;
}
