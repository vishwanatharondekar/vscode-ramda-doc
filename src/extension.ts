// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	//TODO : Make the scope of typescript configurable
	vscode.languages.registerHoverProvider(
		{ scheme: 'file', language: 'typescript' }, 
		{

			provideHover(document, position, token) {
				const range = document.getWordRangeAtPosition(position);
				if(range){
					const newStartPosition = range.start.with(range.start.line, range.start.character - 2)
					const newEndPosition = range.start.with(range.start.line, range.start.character)
					const newRange = range.with(newStartPosition, newEndPosition);
					//TODO : Make this token configurable
					const tokenToCheck = 'R.';
					const isRamdaCall = document.getText(newRange) === tokenToCheck;
					if(isRamdaCall){
						const functionName = document.getText(range);
						//TODO : Can we get documentation here itself
						return {
							contents : ['https://ramdajs.com/docs/#' + functionName]
						};
					}
				}
			}
		}
	);
}

export function deactivate() {
	//TODO : Cleanup after yourself
}
