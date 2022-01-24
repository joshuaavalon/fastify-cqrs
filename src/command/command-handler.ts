import type { CommandType } from "./command-type";
import type { CommandResult } from "./command-result";
import type { Command } from "./command";

export interface CommandHandler<T extends CommandType = CommandType> {
  (command: Command<T>): Promise<CommandResult<T>>;
}
