const assert = require('assert');
const calculator = require('../api/services/calculatorService')
const AllocationRequest = require('../api/models/AllocationRequest')

describe('Calculator Service Tests', function () {
    describe('#calculateAllocation()', function () {
        let testCases = [
            {
                args: {
                    allocation: 100, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 95
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 2,
                            "average_amount": 1
                        },
                        {
                            "name": "Investor C",
                            "requested_amount": 1,
                            "average_amount": 4
                        }
                    ]
                }, expected: {
                    'Investor A': 97.96875,
                    'Investor B': 1.03125,
                    'Investor C': 1
                }
            },
            {
                args: {
                    allocation: 100, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 95
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 1,
                            "average_amount": 1
                        },
                        {
                            "name": "Investor C",
                            "requested_amount": 1,
                            "average_amount": 4
                        }
                    ]
                }, expected: {
                    "Investor A": 98,
                    "Investor B": 1,
                    "Investor C": 1
                }

            },
            {
                args: {
                    allocation: 100, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 25,
                            "average_amount": 25
                        }
                    ]
                }, expected: {
                    "Investor A": 80,
                    "Investor B": 20
                }
            },
            {
                args: {
                    allocation: 200, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 25,
                            "average_amount": 25
                        }]
                }, expected: {
                    "Investor A": 100,
                    "Investor B": 25
                }
            },
            {
                args: {
                    allocation: 100, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 100,
                            "average_amount": 100
                        }]
                }, expected: {
                    "Investor A": 50,
                    "Investor B": 50
                }
            },
            {
                args: {
                    allocation: 100, investors: [
                        {
                            "name": "Investor A",
                            "requested_amount": 100,
                            "average_amount": 100
                        },
                        {
                            "name": "Investor B",
                            "requested_amount": 100,
                            "average_amount": 100
                        },
                        {
                            "name": "Investor C",
                            "requested_amount": 100,
                            "average_amount": 100
                        }]
                }, expected: {
                    "Investor A": 33.33333,
                    "Investor B": 33.33333,
                    "Investor C": 33.33333
                }
            }
        ]

        testCases.forEach(function (test) {
            it('should calculate correctly given correct input', function () {
                let allocationRequest = new AllocationRequest(test.args.allocation, test.args.investors)
                let rawResult = calculator.calculateAllocation(allocationRequest)
                let formattedResults = calculator.formatResultsForDisplay(rawResult)
                assert.deepEqual(formattedResults, test.expected);
            })
        })
    });
});