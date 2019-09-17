import { Machine } from "xstate";

// This machine is completely decoupled from React
const toggleMachine = Machine({
  id: "toggle",
  initial: "unpaid",
  states: {
    unpaid: {
      on: {
        PAY: [
          {
            target: "paid",
            cond: (ctx, event) => {
              console.log("event", event);
              return event.balance >= event.value;
            }
          },
          {
            target: "error"
          }
        ]
      }
    },
    paid: {
      on: { RESET: "unpaid" }
    },
    error: {
      on: { RESET: "unpaid" }
    }
  }
});

export default toggleMachine;
