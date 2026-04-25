import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist", "firefox-extension");
const extensionRoot = path.join(projectRoot, "extension", "firefox");

async function writeManifest(version) {
  const manifestTemplate = await readFile(path.join(extensionRoot, "manifest.template.json"), "utf8");
  const manifest = manifestTemplate.replace(/__APP_VERSION__/g, version);
  await writeFile(path.join(distRoot, "manifest.json"), manifest);
}

async function copyExtensionAssets() {
  const extensionFiles = [
    ["popup.html", "extension/firefox/popup.html"],
    ["popup.css", "extension/firefox/popup.css"],
    ["popup.js", "extension/firefox/popup.js"],
    ["icons", "extension/firefox/icons"],
  ];

  for (const [sourceName, destinationName] of extensionFiles) {
    const from = path.join(extensionRoot, sourceName);
    const to = path.join(distRoot, destinationName);
    await cp(from, to, { recursive: true });
  }
}

async function maybeCreateArchive(version) {
  const archivePath = path.join(projectRoot, "dist", `chat2tool-firefox-extension-${version}.xpi`);
  await rm(archivePath, { force: true });

  const result = spawnSync("zip", ["-qr", archivePath, "."], {
    cwd: distRoot,
    stdio: "ignore",
  });

  return result.status === 0 ? archivePath : "";
}

async function main() {
  const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"));
  const version = packageJson.version || "0.0.0";

  await rm(distRoot, { recursive: true, force: true });
  await mkdir(distRoot, { recursive: true });
  await copyExtensionAssets();
  await writeManifest(version);

  const archivePath = await maybeCreateArchive(version);

  console.log(`Firefox extension staged at ${distRoot}`);
  if (archivePath) {
    console.log(`Firefox extension archive created at ${archivePath}`);
  } else {
    console.log("Firefox extension archive was not created because the 'zip' command is unavailable.");
  }
}

await main();
