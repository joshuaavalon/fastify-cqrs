import type { EventType } from "./event-type";
import type { Events } from "./events";

export interface Event<T extends EventType = EventType> {
  readonly type: T;
  readonly payload: Events[T];
}
