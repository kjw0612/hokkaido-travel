/**
 * Script to update blog links in the hokkaido-travel-planner.tsx file
 * 
 * Usage: 
 * 1. Save this file
 * 2. Run: node update-blog-links.js
 * 
 * This script will:
 * - Read the hokkaido-travel-planner.tsx file
 * - Replace the links based on the recommendations
 * - Create a backup of the original file
 * - Write the updated content to the original file
 */

const fs = require('fs');
const path = require('path');

// File paths
const sourceFilePath = path.join(__dirname, 'hokkaido-travel-planner.tsx');
const recommendationsPath = path.join(__dirname, 'recommended-blog-links.json');
const backupFilePath = path.join(__dirname, 'backup', 'hokkaido-travel-planner-original.tsx');

// Read files
const sourceFile = fs.readFileSync(sourceFilePath, 'utf8');
const recommendations = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));

// Create backup directory if it doesn't exist
const backupDir = path.join(__dirname, 'backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Create backup of the original file
fs.writeFileSync(backupFilePath, sourceFile);
console.log(`Backup created at ${backupFilePath}`);

// Function to replace links in the file
function updateLinks(fileContent, recommendations) {
  let updatedContent = fileContent;
  let changes = [];

  // Process links that need to be replaced
  recommendations.links
    .filter(link => link.action === 'replace')
    .forEach(link => {
      const count = (updatedContent.match(new RegExp(link.current_link, 'g')) || []).length;
      updatedContent = updatedContent.replace(
        new RegExp(link.current_link, 'g'),
        link.recommended_link
      );
      changes.push({
        label: link.label,
        from: link.current_link,
        to: link.recommended_link,
        occurrences: count
      });
    });

  return { updatedContent, changes };
}

// Update the links
const { updatedContent, changes } = updateLinks(sourceFile, recommendations);

// Write the updated content to the original file
fs.writeFileSync(sourceFilePath, updatedContent);

// Generate a summary
console.log('\nSummary of changes:');
console.log('==================\n');

changes.forEach(change => {
  console.log(`Label: ${change.label}`);
  console.log(`From: ${change.from}`);
  console.log(`To:   ${change.to}`);
  console.log(`Occurrences: ${change.occurrences}`);
  console.log('------------------');
});

console.log(`\nTotal links updated: ${changes.reduce((acc, curr) => acc + curr.occurrences, 0)}`);
console.log(`Unique links updated: ${changes.length}`);
console.log('\nUpdate completed successfully!');