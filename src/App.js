import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [firstCurrency, setFirstCurrency] = React.useState('USD');
  const [secondCurrency, setSecondCurrency] = React.useState('RUB');
  const [firstValue, setFirstValue] = React.useState();
  const [secondValue, setSecondValue] = React.useState();

  const rates = React.useRef({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        rates.current = json.rates;
        onChangeFirstValue(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error!');
      });
  }, []);

  const onChangeFirstValue = (value) => {
    setFirstValue(value);

    const result = (value / rates.current[firstCurrency]) * rates.current[secondCurrency];
    setSecondValue(result.toFixed(3));
  };

  const onChangeSecondValue = (value) => {
    setSecondValue(value);

    const result = (value / rates.current[secondCurrency]) * rates.current[firstCurrency];
    setFirstValue(result.toFixed(3));
  };

  React.useEffect(() => {
    onChangeSecondValue(secondValue);
  }, [firstCurrency]);

  React.useEffect(() => {
    onChangeFirstValue(firstValue);
  }, [secondCurrency]);

  return (
    <div className="App">
      <Block
        value={firstValue}
        currency={firstCurrency}
        onChangeValue={onChangeFirstValue}
        onChangeCurrency={setFirstCurrency}
      />
      <Block
        value={secondValue}
        currency={secondCurrency}
        onChangeValue={onChangeSecondValue}
        onChangeCurrency={setSecondCurrency}
      />
    </div>
  );
}

export default App;
