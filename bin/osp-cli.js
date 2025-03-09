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
  -v, --version             Show version number

Commands:
  This CLI allows you to create a new project by selecting a framework, UI library, and package manager.

Example:
  $ node osp-cli init
`;
const init = async (options) => {
  const basePrompts = [
    {
      type: "text",
      name: "projectName",
      message: "Enter your project name:",
      initial: defaultProjectName,
      validate: (input) => (input ? true : "Project name cannot be empty."),
    },
    {
      type: "select",
      name: "type",
      message: "Choose a project type:",
      choices: [
        { title: colors.yellow("后台管理系统"), value: "backstage" },
        { title: colors.blue("node后端"), value: "backend" },
        { title: colors.green("静态文档"), value: "docs" },
      ],
    },
  ];
  const commonPrompts = [
    {
      type: "select",
      name: "language",
      message: "Choose a language:",
      choices: (prev, values) => {
        if (values.type === "docs") {
          return [{ title: colors.blue("TypeScript"), value: "-ts" }];
        }
        return [
          { title: colors.yellow("JavaScript"), value: "" },
          { title: colors.blue("TypeScript"), value: "-ts" },
        ];
      },
    },
    {
      type: "select",
      name: "packageManager",
      message: "Choose a package manager:",
      choices: [
        { title: "pnpm", value: "pnpm" },
        { title: "npm", value: "npm" },
        // { title: "yarn", value: "yarn" },
      ],
    },
  ];
  const dynamicPrompts = (prev, values) => {
    switch (values.type) {
      case "backstage":
        return [
          {
            type: "select",
            name: "framework",
            message: "Choose a React framework:",
            choices: [
              { title: colors.blue("React"), value: "react" },
              { title: colors.green("Next.js"), value: "nextjs" },
            ],
          },
        ];

      case "backend":
        return [
          {
            type: "select",
            name: "framework",
            message: "Choose a Node framework:",
            choices: [
              { title: colors.yellow("Express"), value: "express" },
              { title: colors.blue("Koa"), value: "koa" },
              { title: colors.magenta("NestJS"), value: "nestjs" },
            ],
          },
        ];

      case "docs":
        return [
          {
            type: "select",
            name: "framework",
            message: "Choose documentation tool:",
            choices: [{ title: colors.magenta("Astro"), value: "astro" }],
          },
        ];

      default:
        return [];
    }
  };
  const answers = await prompts([
    ...basePrompts,
    dynamicPrompts,
    ...commonPrompts,
  ]);
  const { projectName, language, framework, packageManager } = answers;

  const targetDir = path.resolve(process.cwd(), projectName);
  // const tempDir = path.resolve(process.cwd(), "temp-repo"); // 临时克隆目录

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  try {
    // const git = simpleGit();
    // const templateDir = path.join(TEMPLATE_DIR, framework + language);
    // console.log(
    //   colors.blue(`\nCloning ${framework} template from ${templateDir}...`)
    // );
    // await git.clone(REPO_URL, tempDir, [
    //   "--depth=1",
    //   "--filter=blob:none",
    //   "--sparse",
    // ]);
    // await git.cwd(tempDir);
    // await git.raw(["sparse-checkout", "set", templateDir]); //需要相对路径

    // const innerDir = path.join(tempDir, templateDir);
    // console.log(colors.blue(`\nCloning ${framework} template completed.`));
    // fs.copySync(innerDir, targetDir);

    // git.cwd(targetDir);

    const templateDir = path.join(
      TEMPLATE_DIR,
      answers.type,
      `${framework}${language}`
    );
    console.log(
      colors.blue(`\nCloning ${framework} template from ${templateDir}...`)
    );
    try {
      fs.copySync(templateDir, targetDir);
    } catch (e) {
      console.error(colors.red(`模板路径不存在: ${path.resolve(templateDir)}`));
      console.error("请检查以下可能性：");
      console.error("1. 对应框架/语言组合的模板未创建");
      console.error("2. 项目类型目录命名不匹配");
      process.exit(1);
    }
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
    // if (fs.existsSync(tempDir)) {
    //   fs.removeSync(tempDir);
    // }
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
