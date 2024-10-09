import { TaskServerClient } from "../client";
import { logger } from "../logger";
import { RootProjectsStore } from "../stores";
import { runTaskWithArgs } from "../tasks/taskUtil";
import { GradleTaskTreeItem } from "../views";
import { Command } from "./Command";

export const COMMAND_RUN_TASK_WITH_ARGS = "gradle.runTaskWithArgs";

export class RunTaskWithArgsCommand extends Command {
	constructor(
		private rootProjectsStore: RootProjectsStore,
		private client: TaskServerClient,
	) {
		super();
	}
	async run(treeItem: GradleTaskTreeItem): Promise<void> {
		if (treeItem && treeItem.task) {
			await runTaskWithArgs(
				this.rootProjectsStore,
				treeItem.task,
				this.client,
				false,
			);
		} else {
			logger.error(
				"Unable to run task with args. TreeItem or TreeItem task not found.",
			);
		}
	}
}
