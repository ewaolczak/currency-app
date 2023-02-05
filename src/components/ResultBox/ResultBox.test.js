import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

const testCasesPLNtoUSD = [
  { amount: '100.00', result: '$28.57' },
  { amount: '20.00', result: '$5.71' },
  { amount: '200.00', result: '$57.14' },
  { amount: '345.00', result: '$98.57' }
];

const testCasesUSDtoPLN = [
  { amount: '100.00', result: 'PLN 350.00' },
  { amount: '20.00', result: 'PLN 70.00' },
  { amount: '200.00', result: 'PLN 700.00' },
  { amount: '345.00', result: 'PLN 1,207.50' }
];

const testCasesSameCurrency = [
  {
    amount: '100.00',
    from: 'PLN',
    to: 'PLN',
    result: 'PLN 100.00',
    currencyId: 'PLN '
  },
  {
    amount: '20.00',
    from: 'USD',
    to: 'USD',
    result: '$20.00',
    currencyId: '$'
  },
  {
    amount: '200.00',
    from: 'PLN',
    to: 'PLN',
    result: 'PLN 200.00',
    currencyId: 'PLN '
  },
  {
    amount: '345.00',
    from: 'USD',
    to: 'USD',
    result: '$345.00',
    currencyId: '$'
  }
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  for (const testObj of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(
        <ResultBox from='PLN' to='USD' amount={parseInt(testObj.amount)} />
      );

      // find div
      const output = screen.getByTestId('output');

      // check render value
      expect(output).toHaveTextContent(
        `PLN ${testObj.amount} = ${testObj.result}`
      );
    });

    // unmount component
    cleanup();
  }

  for (const testObj of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(
        <ResultBox from='USD' to='PLN' amount={parseInt(testObj.amount)} />
      );

      // find div
      const output = screen.getByTestId('output');

      // check render v`a`lue
      expect(output).toHaveTextContent(`${testObj.amount} = ${testObj.result}`);
    });
    // unmount component
    cleanup();
  }

  for (const testObj of testCasesSameCurrency) {
    it('should render proper info about conversion when PLN -> PLN || USD -> USD', () => {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );

      // find div
      const output = screen.getByTestId('output');

      // check render value
      expect(output).toHaveTextContent(
        `${testObj.currencyId}${testObj.amount} = ${testObj.result}`
      );
    });
    // unmount component
    cleanup();
  }
});
