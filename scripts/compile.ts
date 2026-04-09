import { compileAllPages } from '../src/compiler/compile';

async function main() {
  const result = await compileAllPages();
  console.log(`Compiled ${result.pages.length} page(s) to ${result.manifestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
