import { PinnedTasksStore } from "../stores";
import { confirmModal } from "../util/input";
import { GradleTasksTreeDataProvider } from "../views";
import { Command } from "./Command";

export const COMMAND_UNPIN_ALL_TASKS = "gradle.unpinAllTasks";

export class UnpinAllTasksCommand extends Command {
	constructor(
		private pinnedTasksStore: PinnedTasksStore,
		private gradleTasksTreeDataProvider: GradleTasksTreeDataProvider,
	) {
		super();
	}
	async run(): Promise<void> {
		if (
			this.pinnedTasksStore.getData().size &&
			(await confirmModal(
				"Are you sure you want to clear the pinned tasks?",
			))
		) {
			this.pinnedTasksStore.clear();
			this.gradleTasksTreeDataProvider.refresh();
		}
	}
}
