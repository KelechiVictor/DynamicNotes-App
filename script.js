const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => 
addNewNote()
  );

/** Function for Creating New Note **/
function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note');
  
  /** Initialising JavaScript Date Method **/
  const date = new Date();
  const hour = date.getHours();
 
 /** Conditions to Check Your Local time **/
 if(hour < 12) {
  note.innerHTML = `
    <div class="tools">
      <span class="date-time"></span>
      <p class="notes_greeting" style="color: royalblue; font-family: Sanserif">Hello, Good Morning</p>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
}
if(hour >= 12){
  note.innerHTML = `
    <div class="tools">
    <p class="notes_greeting" style="color: #00000; font-family: Sanserif">Good Afternoon</p>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
}
if(hour >= 15){
  note.innerHTML = `
    <div class="tools">
    <p class="notes_greeting" style="color: #ff6600; font-family: Sanserif">Good Evening, How was your Day😊</p>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
}
  
  
  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target
    main.innerHTML = marked(value)
    updateLS()
  })

  document.body.appendChild(note)
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach(note => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}
