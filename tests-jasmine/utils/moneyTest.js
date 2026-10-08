import { formatCurrency } from "../../scripts/utils/money.js";

//function provided by jasmine to create a test suite
describe('test suite: formatCurrency', () => {
    //it is another jawsmine function that creates a test
    it('converts cents into dollars', () => {
        //instead of if we use expect to compare
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});

