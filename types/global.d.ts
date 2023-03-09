import type { VNode } from "vue";
declare global {
  export const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  declare interface ChooseFile {
    files:
      | UniApp.ChooseImageSuccessCallbackResultFile
      | UniApp.ChooseImageSuccessCallbackResultFile[]
      | File
      | File[];
    filePaths: string | string[];
  }
}
