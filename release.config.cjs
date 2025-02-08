module.exports = {
  branches: ["main"], // 仅在 main 分支发布
  repositoryUrl: "git@github.com:osmanthuspeace/osp-cli.git",  // 强制使用 SSH
  plugins: [
    "@semantic-release/commit-analyzer", // 分析 commit 记录，确定版本号（major（使用feat!）/minor/patch）
    "@semantic-release/release-notes-generator", // 生成 release notes
    "@semantic-release/changelog", // 更新 CHANGELOG.md
    [
      "@semantic-release/npm",
      {
        npmPublish: true, // 修改 package.json 版本，并发布 npm
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
