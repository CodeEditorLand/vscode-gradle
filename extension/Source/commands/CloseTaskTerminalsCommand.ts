import { TaskTerminalsStore } from "../stores";
import { GradleTaskDefinition } from "../tasks";
import { GradleTaskTreeItem } from "../views";
import { Command } from "./Command";

export const COMMAND_CLOSE_TASK_TERMINALS = "gradle.closeTaskTerminals";

export class CloseTaskTerminalsCommand extends Command {
	constructor(private taskTerminalsStore: TaskTerminalsStore) {
		super();
	}
	async run(treeItem: GradleTaskTreeItem): Promise<void> {
		if (treeItem && treeItem.task) {
			const definition = treeItem.task.definition as GradleTaskDefinition;

			const terminalsSet = this.taskTerminalsStore.getItem(
				definition.id + definition.args,
			);

			if (terminalsSet) {
				Array.from(terminalsSet).forEach((terminal) => {
					terminal.dispose();
				});
			}
		}
	}
}
