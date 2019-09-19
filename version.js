const chalk = require("chalk");
const git = require("simple-git");
const gitRev = require("git-rev-sync");
const replace = require("replace");

module.exports.versionBump = () => {
  // Get the type of version bump (major, minor, patch) from command argument
  const type = process.argv[1];

  // Get current git tag and status
  const version = gitRev.tag();
  const isDirty = gitRev.isDirty();

  // Check for uncommitted changes and throw error if present
  if (isDirty) {
    console.log(
      chalk.red("ERROR:"),
      "You have uncommitted changes on your branch.",
      "\nPlease commit all changes before attempting to version your plugin.\n"
    );
    return;
  }

  // Split the git version into it's component parts
  const split = version.split(".");
  let prefix = split[0].includes("v") ? "v" : "";
  let major = split[0].includes("v") ? split[0].slice(1) : split[0];
  let minor = split[1];
  let patch = split[2];

  // Update version based on the version type passed in the command
  if (type === "major") {
    major = Number(major) + 1;
    minor = 0;
    patch = 0;
  } else if (type === "minor") {
    minor = Number(minor) + 1;
    patch = 0;
  } else if (type === "patch") {
    patch = Number(patch) + 1;
  } else {
    console.log(
      chalk.red("ERROR:"),
      "Please provide a valid version type as an argument.",
      "\n(For example: `npm run version patch`)",
      '\nAccepted values are "major", "minor", and "patch"',
      "\nFor more information see https://semver.org/\n"
    );
    return;
  }
  const newVersion = `${prefix}${major}.${minor}.${patch}`;

  console.log("Updating the plugin version number in the following locations:");

  // Sets the new version in the plugin header
  replace({
    regex: `Version: ${version}`,
    replacement: `Version: ${newVersion}`,
    paths: ["./iip-map.php"]
  });

  // Sets the new version in hook registration
  replace({
    regex: `version = '${version}'`,
    replacement: `version = '${newVersion}'`,
    paths: ["./includes/class-iip-map.php"]
  });

  // Sets the new version in the main, admin, and frontend package.json files
  replace({
    regex: `"version": "${version}"`,
    replacement: `"version": "${newVersion}"`,
    paths: [
      "./package.json",
      "./admin/js/package.json",
      "./public/package.json"
    ]
  });

  // Commit version bump and tag the branch
  git()
    .add("./*")
    .commit(`${newVersion} Release`)
    .addTag(newVersion);
};
