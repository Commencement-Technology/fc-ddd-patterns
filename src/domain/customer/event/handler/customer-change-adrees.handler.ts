import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAdreesEvent from "../customer-change-adrees.event";

export default class CustomerChangeAdreesHandler implements EventHandlerInterface<CustomerChangeAdreesEvent> {

    handle(event: CustomerChangeAdreesEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.toString()}`);
    }
}
