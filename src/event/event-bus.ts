import type { Event } from "./event";
import type { EventType } from "./event-type";
import type { EventListener } from "./event-listener";

export interface EventBus {
  on<T extends EventType = EventType>(type: T, handler: EventListener<T>): void;
  once<T extends EventType = EventType>(
    type: T,
    handler: EventListener<T>
  ): void;
  off<T extends EventType = EventType>(
    type: T,
    handler: EventListener<T>
  ): void;
  publish<T extends EventType = EventType>(event: Event<T>): void;
  publishAll<T extends EventType = EventType>(events: Event<T>[]): void;
}
