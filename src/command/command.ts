import type { CommandType } from "./command-type";
import type { Commands } from "./commands";

export interface Command<T extends CommandType = CommandType> {
  readonly type: T;
  readonly payload: Commands[T];
}
