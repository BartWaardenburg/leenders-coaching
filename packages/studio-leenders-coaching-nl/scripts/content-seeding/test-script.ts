/**
 * Simple test script to verify that script execution works
 */

// Check if dry-run flag is present
const isDryRun = process.argv.includes('--dry-run');

console.log(`🚀 Test script running${isDryRun ? ' in dry-run mode' : ''}!`);
console.log('This script is working correctly.');
console.log('Command line arguments:', process.argv);

// Exit with success
process.exit(0);
