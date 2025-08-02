import { getErrorMessage } from './errorHandler';

// Test cases to verify error handling
const testCases = [
	{
		name: 'Backend validation error response',
		input: {
			success: false,
			message: 'Validation failed',
			details: {
				errors: [
					{
						field: 'userName',
						message: 'Username must be alphanumeric',
						value: 'A B User'
					}
				]
			}
		},
		expected: 'Username must be alphanumeric'
	},
	{
		name: 'Simple error message',
		input: {
			success: false,
			message: 'Email already exists'
		},
		expected: 'Email already exists'
	},
	{
		name: 'Error object',
		input: new Error('Network error'),
		expected: 'Network error'
	},
	{
		name: 'String error',
		input: 'Something went wrong',
		expected: 'Something went wrong'
	}
];

// Run tests
testCases.forEach(testCase => {
	const result = getErrorMessage(testCase.input);
	console.log(`Test: ${testCase.name}`);
	console.log(`Expected: ${testCase.expected}`);
	console.log(`Actual: ${result}`);
	console.log(`Pass: ${result === testCase.expected ? '✅' : '❌'}`);
	console.log('---');
});

export { testCases }; 