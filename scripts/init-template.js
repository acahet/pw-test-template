#!/usr/bin/env node

/**
 * Template Initialization Script
 *
 * This script helps customize the Playwright template for your project by:
 * - Updating package.json with your project details
 * - Optionally removing example tests
 * - Creating a fresh git history
 *
 * Usage: npm run init-template
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors for console output
const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
	console.log(`${color}${message}${colors.reset}`);
}

function prompt(question) {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(`${colors.cyan}${question}${colors.reset}`, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

async function main() {
	log("\n🎭 Playwright Template Initialization\n", colors.bright);
	log("This script will help you customize the template for your project.\n");

	// Read current package.json
	const packageJsonPath = join(rootDir, "package.json");
	const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

	// Collect project information
	log("📝 Project Information\n", colors.blue);

	const projectName =
		(await prompt(`Project name (${packageJson.name}): `)) || packageJson.name;
	const projectDescription =
		(await prompt(`Project description (${packageJson.description}): `)) ||
		packageJson.description;
	const projectAuthor =
		(await prompt(`Author name (${packageJson.author}): `)) ||
		packageJson.author;
	const projectRepo =
		(await prompt(`Repository URL (${packageJson.repository}): `)) ||
		packageJson.repository;

	// Ask about removing example tests
	log("\n🧹 Cleanup Options\n", colors.blue);
	const removeExamples = await prompt("Remove example tests? (y/N): ");
	const shouldRemoveExamples = ["y", "yes"].includes(
		removeExamples.toLowerCase(),
	);

	// Ask about git reinitialization
	const reinitGit = await prompt(
		"Reinitialize git repository (removes history)? (y/N): ",
	);
	const shouldReinitGit = ["y", "yes"].includes(reinitGit.toLowerCase());

	// Confirm changes
	log("\n📋 Summary of Changes:\n", colors.yellow);
	log(`  • Project Name: ${projectName}`);
	log(`  • Description: ${projectDescription}`);
	log(`  • Author: ${projectAuthor}`);
	log(`  • Repository: ${projectRepo}`);
	log(`  • Remove Examples: ${shouldRemoveExamples ? "Yes" : "No"}`);
	log(`  • Reinitialize Git: ${shouldReinitGit ? "Yes" : "No"}`);

	const confirm = await prompt("\nProceed with these changes? (Y/n): ");
	if (["n", "no"].includes(confirm.toLowerCase())) {
		log("\n❌ Initialization cancelled.\n", colors.yellow);
		process.exit(0);
	}

	// Apply changes
	log("\n⚙️  Applying changes...\n", colors.green);

	// Update package.json
	packageJson.name = projectName;
	packageJson.description = projectDescription;
	packageJson.author = projectAuthor;
	packageJson.repository = projectRepo;
	packageJson.version = "1.0.0"; // Reset version for new project

	writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "\t"));
	log("✅ Updated package.json", colors.green);

	// Remove example tests if requested
	if (shouldRemoveExamples) {
		const examplePaths = [
			"tests/api-tests/articles",
			"tests/api-tests/tags",
			"tests/api-tests/user",
			"tests/ui-tests/feature/login",
			"tests/ui-tests/pages/Homepage",
			"tests/ui-tests/pages/LoginPage",
			"tests/response-schemas/articles",
			"tests/response-schemas/profiles",
			"tests/response-schemas/tags",
			"tests/response-schemas/users",
			"request-objects/articles",
			"request-objects/user",
		];

		for (const path of examplePaths) {
			const fullPath = join(rootDir, path);
			if (existsSync(fullPath)) {
				rmSync(fullPath, { recursive: true, force: true });
				log(`✅ Removed ${path}`, colors.green);
			}
		}
	}

	// Reinitialize git if requested
	if (shouldReinitGit) {
		try {
			const gitDir = join(rootDir, ".git");
			if (existsSync(gitDir)) {
				rmSync(gitDir, { recursive: true, force: true });
				log("✅ Removed .git directory", colors.green);
			}

			execSync("git init", { cwd: rootDir, stdio: "pipe" });
			log("✅ Reinitialized git repository", colors.green);

			// Create initial commit
			execSync("git add .", { cwd: rootDir, stdio: "pipe" });
			execSync('git commit -m "chore: initialize project from template"', {
				cwd: rootDir,
				stdio: "pipe",
			});
			log("✅ Created initial commit", colors.green);
		} catch (error) {
			log(`⚠️  Git reinitialization failed: ${error.message}`, colors.yellow);
		}
	}

	// Success message
	log("\n🎉 Template initialization complete!\n", colors.bright + colors.green);
	log("Next steps:", colors.blue);
	log("  1. Update .env with your configuration (cp .env.example .env)");
	log("  2. Update playwright.config.ts with your baseURL");
	log("  3. Update tests/utils/constants.ts with your API endpoints");
	log("  4. Start writing your tests!");
	log(
		"\n📖 See TEMPLATE_SETUP.md and PROJECT_CUSTOMIZATION.md for detailed guidance.\n",
	);
}

// Run the script
main().catch((error) => {
	log(`\n❌ Error: ${error.message}\n`, colors.bright);
	process.exit(1);
});
