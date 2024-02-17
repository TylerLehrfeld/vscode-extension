import * as vscode from 'vscode';
import { Credentials } from './credentials';
import {SampleWebViewPanel} from './sampleWebViewPanel';

export async function activate(context: vscode.ExtensionContext) {
	const credentials = new Credentials();
	await credentials.initialize(context);



	const disposable = vscode.commands.registerCommand('extension.getGitHubUser', async () => {
		/**
		 * Octokit (https://github.com/octokit/rest.js#readme) is a library for making REST API
		 * calls to GitHub. It provides convenient typings that can be helpful for using the API.
		 * 
		 * Documentation on GitHub's REST API can be found here: https://docs.github.com/en/rest
		 */
		const octokit = await credentials.getOctokit();
		const userInfo = await octokit.users.getAuthenticated();

		vscode.window.showInformationMessage(`Logged into GitHub as ${userInfo.data.login}`);

	});

	context.subscriptions.push(disposable);

	const sideBarCommand = vscode.commands.registerCommand('extension.showSidebar', () => {
		SampleWebViewPanel.createOrShow(context.extensionPath);
	});

	context.subscriptions.push(sideBarCommand);

	vscode.commands.executeCommand('extension.showSidebar');

}
