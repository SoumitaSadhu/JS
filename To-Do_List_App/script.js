document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const emptyImg = document.querySelector('.empty-image');
  const todosContainer = document.querySelector('.todos-container');
  const inputForm = document.querySelector('.input-area');
  const progressBar = document.getElementById('progress');
  const  progressNumbers = document.getElementById('numbers');

  // ✅ Prevent form from reloading the page
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // Function to show/hide empty image
  const toggleEmptyState = () => {
    emptyImg.style.display = taskList.children.length === 0 ? 'block' : 'none';
    todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
  };
  //progress bar

  const updateProgress = (checkCompletion = true) =>{
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

    progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks)* 100}%` : '0%';
    progressNumbers.textContent =`${completedTasks} / ${totalTasks}`;

    if(checkCompletion && totalTasks >0 && completedTasks === totalTasks){
        Confetti();
    }
  };
  //save the list

  const saveTaskToLocalStorage = () =>{
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent, completed: li.querySelector('.checkbox').checked
    }))
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
 const loadTasksFromLocalStorage = () => {
    const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    saveTasks.forEach(({text, completed})=> addTask(text, completed, false))
    toggleEmptyState();
    updateProgress();
 }
  // Function to add a task
  const addTask = (text, completed = false, checkCompletion = true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
      <span>${taskText}</span>
      <div class="task-buttons">
          <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');

    if (completed) {
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.pointerEvents = 'none';
    }

    // ✅ Toggle completed state
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      li.classList.toggle('completed', isChecked);
      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? '0.5' : '1';
      editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
      updateProgress();
      saveTaskToLocalStorage();
    });

    // ✅ Edit task
    editBtn.addEventListener('click', () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector('span').textContent;
        li.remove();
        toggleEmptyState();
         updateProgress(false);
         saveTaskToLocalStorage();
      }
    });

    // ✅ Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      toggleEmptyState();
       updateProgress();
       saveTaskToLocalStorage();
    });

    // Add to list
    taskList.appendChild(li);
    taskInput.value = '';
    toggleEmptyState();
     updateProgress(checkCompletion);
     saveTaskToLocalStorage();
  };

  // ✅ Button click event
  addTaskBtn.addEventListener('click', () => addTask());

  // ✅ Enter key adds task too
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  // Initial state
  toggleEmptyState();
  loadTasksFromLocalStorage();
});

const Confetti =() =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
