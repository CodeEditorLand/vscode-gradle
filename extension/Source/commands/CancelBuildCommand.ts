import * as vscode from "vscode";

import { TaskServerClient } from "../client";
import { logger } from "../logger";
import { cancelBuild } from "../tasks/taskUtil";
import { Command } from "./Command";

export const COMMAND_CANCEL_BUILD = "gradle.cancelBuild";

export class CancelBuildCommand extends Command {
	constructor(private client: TaskServerClient) {
		super();
	}

	async run(cancellationKey: string, task?: vscode.Task): Promise<void> {
		try {
			await cancelBuild(this.client, cancellationKey, task);
		} catch (e) {
			logger.error("Error cancelling task:", e.message);
		}
	}
}
