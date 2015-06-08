var parser = function(input) {
	var tokenStack = [];
	var suggestions = [];
	var suggestion;
	var lookAhead;

	if (input[0] === '/')
		input = input.slice(1, input.length - 1);

	var i;
	for (i = 0; i < input.length - 1; i++) {
		lookAhead = input[i + 1];
		switch (input[i]) {
			case '(':
				tokenStack.push('(');
				break;
			case '[':
				tokenStack.push('[');
				break;
			case ')':
				if (tokenStack[tokenStack.length - 1] === '(') {
					tokenStack.pop();
					if (tokenStack.length === 0) {
						suggestion = generateSuggestion(input, i);
						if (suggestion !== null)
							suggestions.push(suggestion);
					}
				}
				else
					throw 'bracket mismatch';
				break;
			case ']':
				if (lookAhead === '{') {
					while (input[i] !== '}')
						i++;
				}
				if (tokenStack[tokenStack.length - 1] === '[') {
					tokenStack.pop();
					if (tokenStack.length === 0) {
						suggestion = generateSuggestion(input, i);
						if (suggestion !== null)
							suggestions.push(suggestion);
					}
				}
				else
					throw 'bracket mismatch';
				break;
			default:
				if (tokenStack.length === 0) {
					suggestion = generateSuggestion(input, i);
					if (suggestion !== null)
						suggestions.push(suggestion);
				}
				break;
		}
	}
	return suggestions;
}

var generateSuggestion = function(input, index) {
	if (input[index].match(/[a-zA-Z\-\ \.:]/) !== null)
		return {
			'regex': input.slice(0, index) + '$',
			'suggestion': input[index]
		};
	else
		return null;
}
