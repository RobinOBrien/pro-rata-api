const assert = require('assert');
const calculator = require('../api/services/calculatorService')

describe('Calculator Service Tests', function () {
    describe('#calculateAllocation()', function () {
        it('should calculate correctly given correct input', function () {
            let result = calculator.calculateAllocation(100, {}) //TODO: set correctly
            let expected_result = {
                "Investor A": 80,
                "Investor B": 20
            }

            assert.deepEqual(result, expected_result);
        });

        //TODO: Add more cases here.
    });

});