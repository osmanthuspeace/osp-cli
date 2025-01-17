#!/usr/bin/env node

import minimist from "minimist";
import prompts from "prompts";
import colors from "picocolors";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import simpleGit from "simple-git";
import { fileURLToPath } from "url";

const REPO_URL = "git@github.com:osmanthuspeace/osp-cli.git";
const TEMPLATE_DIR = "template";
const defaultProjectName = "new-project";
const helpMessage = `
Usage: node osp-cli [options]

Options:
  init                      Initialize a new project based on user choices
  -h, --help                Show help message
  -b, --backstage           Flag to set the backstage mode
  -v, --version             Show version number

Commands:
  This CLI allows you to create a new project by selecting a framework, UI library, and package manager.

Example:
  $ node osp-cli init
  $ node osp-cli init -b
`;
const init = async (options) => {
  const answers = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Enter your project name:",
      initial: defaultProjectName,
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
    {
      type: "select",
      name: "framework",
      message: "Choose a framework:",
      choices: [
        { title: colors.blue("React"), value: "react" },
        { title: colors.green("Vue"), value: "vue" },
      ],
    },
    {
      type: "select",
      name: "uiLibrary",
      message: "Choose a UI library:",
      choices: [
        { title: "Ant Design", value: "antd" },
        { title: "Arco Design", value: "arco" },
      ],
    },
    {
      type: "select",
      name: "packageManager",
      message: "Choose a package manager:",
      choices: [
        { title: "pnpm", value: "pnpm" },
        { title: "npm", value: "npm" },
      ],
    },
  ]);
  const { projectName, framework, uiLibrary, packageManager } = answers;

  const targetDir = path.resolve(process.cwd(), projectName);
  const tempDir = path.resolve(process.cwd(), "temp-repo"); // 临时克隆目录

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  try {
    const git = simpleGit();
    const templateDir = path.join(TEMPLATE_DIR, framework);
    console.log(
      colors.blue(`\nCloning ${framework} template from ${templateDir}...`)
    );
    await git.clone(REPO_URL, tempDir, [
      "--depth=1",
      "--filter=blob:none",
      "--sparse",
    ]);
    await git.cwd(tempDir);
    await git.raw(["sparse-checkout", "set", templateDir]); //需要相对路径

    const innerDir = path.join(tempDir, templateDir);
    console.log(colors.blue(`\nCloning ${framework} template completed.`));
    fs.copySync(innerDir, targetDir);

    git.cwd(targetDir);

    console.log(
      colors.blue(`\nInstalling dependencies using ${packageManager}...`)
    );
    await execa(packageManager, ["install"], {
      cwd: targetDir,
      stdio: "inherit",
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
    }
  }
};
const args = minimist(process.argv.slice(2));
if (args._[0] === "init") {
  const backstage = args.backstage || false; // 如果有 `-b` 或 `--backstage` 参数，设置为 true
  init({ backstage });
} else if (args.h || args.help) {
  console.log(helpMessage);
} else if (args.v || args.version) {
  const packageJson = fs.readJsonSync(
    path.resolve(fileURLToPath(import.meta.url), "../../package.json")
  );
  console.log(`osp-cli version ${packageJson.version}`);
} else {
  console.log(colors.red("Invalid command"));
}
