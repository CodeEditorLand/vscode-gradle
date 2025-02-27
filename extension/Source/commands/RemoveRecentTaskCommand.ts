import { RecentTasksStore } from "../stores";
import { GradleTaskDefinition } from "../tasks";
import { GradleTaskTreeItem } from "../views";
import { Command } from "./Command";

export const COMMAND_REMOVE_RECENT_TASK = "gradle.removeRecentTask";

export class RemoveRecentTaskCommand extends Command {
	constructor(private recentTasksStore: RecentTasksStore) {
		super();
	}

	async run(treeItem: GradleTaskTreeItem): Promise<void> {
		if (treeItem && treeItem.task) {
			const definition = treeItem.task.definition as GradleTaskDefinition;

			this.recentTasksStore.removeEntry(definition.id, definition.args);
		}
	}
}
