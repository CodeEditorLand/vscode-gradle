import { PinnedTasksStore } from "../stores";
import { GradleTaskDefinition } from "../tasks";
import { GradleTasksTreeDataProvider, GradleTaskTreeItem } from "../views";
import { Command } from "./Command";

export const COMMAND_PIN_TASK = "gradle.pinTask";

export class PinTaskCommand extends Command {
	constructor(
		private pinnedTasksStore: PinnedTasksStore,
		private gradleTasksTreeDataProvider: GradleTasksTreeDataProvider,
	) {
		super();
	}
	async run(treeItem: GradleTaskTreeItem): Promise<void> {
		if (treeItem && treeItem.task) {
			const definition = treeItem.task.definition as GradleTaskDefinition;
			this.pinnedTasksStore.addEntry(definition.id, definition.args);
			this.gradleTasksTreeDataProvider.refresh();
		}
	}
}
