export interface FeatureConfig {
  name: string;
  description: string;
  category: 'security' | 'styling' | 'deployment' | 'quality';
  defaultEnabled?: boolean;
  dependencies: string[];
  conflicts: string[];
  files: Record<string, string>;
  packageJsonUpdates?: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    scripts?: Record<string, string>;
  };
  nextConfigUpdates?: {
    async?: boolean;
    content: string;
  };
  instructions: string[];
}
