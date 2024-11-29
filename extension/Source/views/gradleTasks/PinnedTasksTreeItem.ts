// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";

export class PinnedTasksTreeItem extends vscode.TreeItem {
	private children: vscode.TreeItem[] = [];

	public readonly parentTreeItem?: vscode.TreeItem;

	public readonly iconPath = new vscode.ThemeIcon("star-full");

	public readonly contextValue = "PinnedTasks";

	constructor(
		label: string,
		resourceUri?: vscode.Uri,
		collapsibleState = vscode.TreeItemCollapsibleState.Expanded,
	) {
		super(label, collapsibleState);

		this.resourceUri = resourceUri;
	}

	public setChildren(children: vscode.TreeItem[]): void {
		this.children = children;
	}

	public getChildren(): vscode.TreeItem[] {
		return this.children;
	}
}
