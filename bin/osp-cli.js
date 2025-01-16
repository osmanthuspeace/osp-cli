import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import simpleGit from "simple-git";

const program = new Command();
program.name("bsm-cli").description("A CLI for BSM").version("0.0.1");

const REPO_URL = "https://github.com/osmanthuspeace/osp-cli"; // 替换为你的 GitHub 仓库
const TEMPLATE_DIR = "template"; // 仓库中模板的路径

program
  .command("init")
  .description("Initialize a new project")
  .option("-b, --backstage", " create a backstage management project")
  .action((options) => init(options));
const init = async (options) => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: [
        { name: chalk.blue("React"), value: "react" },
        { name: chalk.green("Vue"), value: "vue" },
      ],
    },
    {
      type: "list",
      name: "uiLibrary",
      message: "Choose a UI library:",
      choices: ["antd", "arco"],
    },
    {
      type: "list",
      name: "packageManager",
      message: "Choose a package manager:",
      choices: ["pnpm", "npm"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
  ]);
  const { framework, uiLibrary, packageManager, projectName } = answers;
  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }
};
