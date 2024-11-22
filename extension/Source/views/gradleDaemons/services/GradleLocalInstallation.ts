import { logger } from "../../../logger";
import { getConfigJavaImportGradleJavaHome } from "../../../util/config";
import { execAsync } from "../../../util/execAsync";
import { GradleExecution } from "./GradleExecution";

export class GradleLocalInstallation implements GradleExecution {
	private gradleHomePath: string;

	constructor(gradleHomePath: string) {
		this.gradleHomePath = `"${gradleHomePath}"`;
	}

	public async exec(args: string[]): Promise<string> {
		if (args.length === 0) {
			throw new Error("No gradle args supplied");
		}

		const quotedArgs = args.map((arg) => `"${arg}"`).join(" ");

		const command = `${this.gradleHomePath} ${quotedArgs}`;

		try {
			const jdkPath = getConfigJavaImportGradleJavaHome();

			const env = jdkPath
				? { ...process.env, JAVA_HOME: jdkPath }
				: process.env;

			const { stdout, stderr } = await execAsync(command, { env });

			if (stderr) {
				logger.error(stderr);
			}
			return stdout;
		} catch (error) {
			logger.error(error.message);

			throw new Error(
				`Error running gradle local installation: ${error.message}`,
			);
		}
	}
}
