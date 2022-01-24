import type { CommandType } from "./command-type";
import type { CommandResults } from "./command-results";

export type CommandResult<T extends CommandType = CommandType> =
  CommandResults[T];
