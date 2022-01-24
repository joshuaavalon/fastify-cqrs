import EventEmitter from "events";

import { Event, EventBus, EventListener, EventType } from "../event";

export class MemoryEventBus implements EventBus {
  private emitter = new EventEmitter();

  public on<T extends EventType>(type: T, handler: EventListener<T>): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.emitter.on(type, handler);
  }

  public once<T extends EventType>(type: T, handler: EventListener<T>): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.emitter.once(type, handler);
  }

  public off<T extends EventType>(type: T, handler: EventListener<T>): void {
    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }
    if (typeof handler !== "function") {
      throw new TypeError("handler must be a function");
    }
    this.emitter.off(type, handler);
  }

  public publish<T extends EventType>(event: Event<T>): void {
    if (!event || typeof event !== "object") {
      throw new TypeError("event must be an object");
    }
    if (typeof event.type !== "string") {
      throw new TypeError("event.type must be a string");
    }
    this.emitter.emit(event.type, event.payload);
  }

  public publishAll<T extends EventType>(events: Event<T>[]): void {
    if (!events || !Array.isArray(events)) {
      throw new TypeError("events must be an array");
    }
    for (const event of events) {
      if (!event || typeof event !== "object") {
        throw new TypeError("event must be an object");
      }
      if (typeof event.type !== "string") {
        throw new TypeError("event.type must be a string");
      }
      this.emitter.emit(event.type, event.payload);
    }
  }
}
