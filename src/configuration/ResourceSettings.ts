import { EnvironmentVariables } from "./EnvironmentVariables";

export class ResourceSettings {
  public collectUsage?: boolean;
  public reportInterval?: number;
  public huntLongGC?: boolean;
  public huntMemoryLeaks?: boolean;
  public heapDumpDirectory?: string;
  public profileGC?: boolean;

  constructor(env: EnvironmentVariables) {
    this.collectUsage = env.COLLECT_RESOURCE_USAGE;
    this.reportInterval = env.COLLECT_RESOURCE_USAGE_INTERVAL || 5000;
    this.huntLongGC = env.HUNT_LONG_GC;
    this.huntMemoryLeaks = env.HUNT_MEMORY_LEAKS;
    this.heapDumpDirectory = env.HEAPDUMP_DIR;
    this.profileGC = env.PROFILE_GC;
  }
}
