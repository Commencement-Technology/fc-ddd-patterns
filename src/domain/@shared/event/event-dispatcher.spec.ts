import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";
import CustomerChangeAdreesEvent from "../../customer/event/customer-change-adrees.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerChangeAdreesHandler from "../../customer/event/handler/customer-change-adrees.handler";
import CustomerCreatedOneHandler from "../../customer/event/handler/customer-created-one.handler";
import CustomerCreatedTwoHandler from "../../customer/event/handler/customer-created-two.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests SendEmailWhenProductIsCreatedHandler", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

describe("Domain events tests CustomerCreatedHandler", () => {
  it("should register CustomerCreatedOneHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedOneHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

  });

  it("should register CustomerCreatedTwoHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedTwoHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

  });

  it("should register two event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new CustomerCreatedOneHandler();
    const eventHandler2 = new CustomerCreatedTwoHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

  });

  it("should unregister CustomerCreatedOneHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedOneHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  });

  it("should unregister CustomerCreatedTwoHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedTwoHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new CustomerCreatedOneHandler();
    const eventHandler2 = new CustomerCreatedTwoHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new CustomerCreatedOneHandler();
    const eventHandler2 = new CustomerCreatedTwoHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const productCreatedEvent = new CustomerCreatedEvent({
      id: uuid(),
      name: "Consumer 1",
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});

describe("Domain events tests CustomerChangeAdreesHandler", () => {
  it("should register CustomerChangeAdreesHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAdreesHandler();

    eventDispatcher.register("CustomerChangeAdreesEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"][0]).toMatchObject(eventHandler);

  });

  it("should unregister CustomerChangeAdreesHandler event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAdreesHandler();

    eventDispatcher.register("CustomerChangeAdreesEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerChangeAdreesEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAdreesHandler();

    eventDispatcher.register("CustomerChangeAdreesEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerChangeAdreesHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAdreesEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerChangeAdreesEvent"][0]).toMatchObject(eventHandler);

    const address = new Address("Rua 1", 123, "12345-123", "Cidade 1");
    const customer = new Customer(uuid(), "Consumer 1");
    customer.changeAddress(address);

    const productCreatedEvent = new CustomerChangeAdreesEvent(customer);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
  });
});