#!/usr/bin/env node

import minimist from "minimist";
import prompts from "prompts";
import colors from "picocolors";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import simpleGit from "simple-git";

const REPO_URL = "https://github.com/osmanthuspeace/osp-cli";
const TEMPLATE_DIR = "/template";

const init = async (options) => {
  const answers = await prompts([
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
    {
      type: "text",
      name: "projectName",
      message: "Enter your project name:",
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
  ]);
  const { framework, uiLibrary, packageManager, projectName } = answers;

  const targetDir = path.resolve(process.cwd(), projectName);
  const tempDir = path.resolve(process.cwd(), "temp-repo"); // 临时克隆目录

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  try {
    const git = simpleGit();
    const templateDir = path.resolve(TEMPLATE_DIR, framework);
    console.log(
      colors.blue(`\nCloning ${framework} template from ${templateDir}...`)
    );
    await git.clone(REPO_URL, targetDir, [
      "--depth=1",
      "--filter=blob:none",
      "--sparse",
    ]);

    // 进入目标目录
    await git.cwd(targetDir);

    console.log(`Setting sparse-checkout for ${templateDir}...`);
    await git.raw(["sparse-checkout", "set", templateDir]);

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
} else {
  console.log(colors.red("Invalid command"));
}
