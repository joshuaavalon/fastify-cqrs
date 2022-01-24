import type { Commands } from "./commands";
import type { CommandResults } from "./command-results";

export type CommandType = keyof Commands & keyof CommandResults;
