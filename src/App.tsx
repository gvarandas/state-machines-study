import React from "react";
import { useMachine } from "@xstate/react";

import "./App.css";
import toggleMachine from "./stateMachine";

const valueMap: { [key: string]: string } = {
  unpaid: "PAY",
  error: "RESET",
  paid: "RESET"
};

const handleChange = (event: any, handler: (value: number) => void) => {
  handler(event.target.value);
};

function App() {
  const [balance, setBalance] = React.useState(1000);
  const [value, setValue] = React.useState(350);
  const [current, send] = useMachine(toggleMachine);

  const currentValue = current.value as string;

  return (
    <>
      <div>
        <h2>You Balance is $ {balance}</h2>
        <h2>You Want to Pay $ {value}</h2>
      </div>
      <div>
        <label htmlFor="balance-input">Your Balance</label>
        <input
          id="balance-input"
          type="number"
          value={balance}
          onChange={event => handleChange(event, setBalance)}
        />
        <label htmlFor="value-input">Your Balance</label>
        <input
          id="value-input"
          type="number"
          value={value}
          onChange={event => handleChange(event, setValue)}
        />
      </div>
      <div>
        <button
          onClick={() => send(valueMap[currentValue], { balance, value })}
        >
          {valueMap[currentValue]}
        </button>
        <span>Your current state is {current.value}</span>
      </div>
    </>
  );
}

export default App;
