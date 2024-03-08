const readlineSync = require('readline-sync');
const moment = require('moment');
const fs = require('fs');
const journalFile = 'journal.json';

// Load existing journal entries
let journalEntries = [];
if (fs.existsSync(journalFile)) {
    journalEntries = JSON.parse(fs.readFileSync(journalFile));
}

function saveJournalEntries() {
    fs.writeFileSync(journalFile, JSON.stringify(journalEntries, null, 2));
}

function addEntry() {
    const date = moment().format('YYYY-MM-DD');
    const entry = readlineSync.question('Write your journal entry for today:\n');
    journalEntries.push({ date, entry });
    saveJournalEntries();
    console.log('Journal entry saved.');
}

function viewEntries() {
    if (journalEntries.length === 0) {
        console.log('No journal entries found.');
        return;
    }

    journalEntries.forEach((entry, index) => {
        console.log(`${index + 1}. Date: ${entry.date}\nEntry: ${entry.entry}\n`);
    });
}

function mainMenu() {
    console.log('\nDaily Journal');
    const choices = ['Add new entry', 'View entries', 'Exit'];
    const index = readlineSync.keyInSelect(choices, 'Choose an option:');
    switch (index) {
        case 0:
            addEntry();
            break;
        case 1:
            viewEntries();
            break;
        case 2:
            console.log('Goodbye!');
            process.exit();
    }
}

while (true) {
    mainMenu();
}
