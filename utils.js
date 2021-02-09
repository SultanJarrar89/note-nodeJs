const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  duplicateNotes = notes.find((note) => note.title === title)
  if (!duplicateNotes) {
    notes.push({
      title,
      body,
    })
    console.log(chalk.green.inverse('Note added!!'))
    saveNote(notes)
  } else {
    console.log(chalk.red.inverse('title already used'))
  }
}

const saveNote = (notes) => {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const data = dataBuffer.toString()
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const newNotes = notes.filter((note) => note.title !== title)
  if (newNotes.length > 0) {
    console.log(chalk.green.inverse('Note removed!!'))
    saveNote(newNotes)
  } else {
    console.log(chalk.red.inverse('No note found'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.italic.green.inverse('your Notes'))
  notes.forEach((note) => console.log(chalk.blue(note.title)))
}

const readNote = (title, body) => {
  const notes = loadNotes()
  const foundNote = notes.find((note) => note.title === title)
  if (foundNote) {
    console.log(chalk.italic.cyan(title), chalk.italic.cyan(body))
  } else {
    console.log(chalk.red.inverse('No note found'))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}
