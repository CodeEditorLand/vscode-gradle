import { TaskServerClient } from "../client";
import { RootProjectsStore } from "../stores";
import { runTask } from "../tasks/taskUtil";
import { GradleTaskTreeItem } from "../views";
import { Command } from "./Command";

export const COMMAND_DEBUG_TASK = "gradle.debugTask";

export class DebugTaskCommand extends Command {
	constructor(
		private rootProjectsStore: RootProjectsStore,
		private client: TaskServerClient,
	) {
		super();
	}

	async run(treeItem: GradleTaskTreeItem, args = ""): Promise<void> {
		if (treeItem && treeItem.task) {
			await runTask(
				this.rootProjectsStore,
				treeItem.task,
				this.client,
				args,
				true,
			);
		}
	}
}
