import { exec } from "child_process";
import { promisify } from "util";

import * as vscode from "vscode";

const asyncExec = promisify(exec);

export async function isGemOutdated(): Promise<boolean> {
  try {
    await execInPath("bundle outdated ruby-lsp");
  } catch {
    return true;
  }

  return false;
}

export async function updateGem(): Promise<{ stdout: string; stderr: string }> {
  return execInPath("bundle update ruby-lsp");
}

async function execInPath(
  command: string
): Promise<{ stdout: string; stderr: string }> {
  return asyncExec(command, {
    cwd: vscode.workspace.workspaceFolders![0].uri.fsPath,
  });
}
