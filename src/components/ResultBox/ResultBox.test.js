import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  const testCasesPLNtoUSD = [
    { amount: '100.00', result: '28.57' },
    { amount: '20.00', result: '5.71' },
    { amount: '200.00', result: '57.14' },
    { amount: '345.00', result: '98.57' }
  ];

  for (const testObjPLNtoUSD of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(
        <ResultBox
          from='PLN'
          to='USD'
          amount={parseInt(testObjPLNtoUSD.amount)}
        />
      );

      // find div
      const output = screen.getByTestId('output');

      // check render value
      expect(output).toHaveTextContent(
        `PLN ${testObjPLNtoUSD.amount} = $${testObjPLNtoUSD.result}`
      );
    });

    // unmount component
    cleanup();
  }

  const testCasesUSDtoPLN = [
    { amount: '100.00', result: '350.00' },
    { amount: '20.00', result: '70.00' },
    { amount: '200.00', result: '700.00' },
    { amount: '345.00', result: '1,207.50' }
  ];

  for (const testObjUSDtoPLN of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(
        <ResultBox
          from='USD'
          to='PLN'
          amount={parseInt(testObjUSDtoPLN.amount)}
        />
      );

      // find div
      const output = screen.getByTestId('output');

      // check render value
      expect(output).toHaveTextContent(
        `$${testObjUSDtoPLN.amount} = PLN ${testObjUSDtoPLN.result}`
      );
    });
  }
  // unmount component
  cleanup();
});
