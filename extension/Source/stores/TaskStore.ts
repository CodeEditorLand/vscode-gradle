import { StoreMapSet } from ".";
import { TaskArgs, TaskId } from "./types";

export class TaskStore extends StoreMapSet<TaskId, TaskArgs> {}
