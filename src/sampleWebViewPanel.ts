import * as vscode from 'vscode';

export class SampleWebViewPanel {
    public static currentPanel: SampleWebViewPanel | undefined;

    public static createOrShow(extensionPath: string) {
        const column = vscode.ViewColumn.Beside;

        if (SampleWebViewPanel.currentPanel) {
            SampleWebViewPanel.currentPanel.panel.reveal(column);
        } else {
            SampleWebViewPanel.currentPanel = new SampleWebViewPanel(column, extensionPath);
        }
    }

    private readonly panel: vscode.WebviewPanel;
    private readonly extensionPath: string;

    private constructor(column: vscode.ViewColumn, extensionPath: string) {
        this.extensionPath = extensionPath;

        // Create and show a new webview panel
        this.panel = vscode.window.createWebviewPanel(
            'sampleWebview',
            'Sample Webview',
            column,
            {
                enableScripts: true
            }
        );

        // Set the HTML content for the panel
        this.panel.webview.html = this.getWebviewContent();

        this.panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'buttonClick':
                    // Handle button click event here
                    vscode.commands.executeCommand('extension.getGitHubUser');
                    break;
            }
        });
    }

    private getWebviewContent(): string {
        // Load your HTML content for the webview here
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sample Webview</title>
        </head>
        <body>
            <h1>Login To github!</h1>
            <button id="myButton">Login</button>
            <script>
                const vscode = acquireVsCodeApi();
                document.getElementById('myButton').addEventListener('click', () => {
                    vscode.postMessage({ command: 'buttonClick' });
                });
            </script>
        </body>
        </html>`;
    }
}
