import type { EventType } from "./event-type";
import type { Event } from "./event";

export interface EventListener<T extends EventType = EventType> {
  (event: Event<T>): Promise<void>;
}
