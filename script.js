"use strict";

// DOM Variables
const textArea = document.querySelector(".main-text-area");
const btnNewTask = document.querySelector(".add-new-task");
const btnAddTask = document.querySelector(".add-task");
const textAreaInput = document.querySelector(".text-area-input");
const btnDelAll = document.querySelector(".del-all-btn");
const delAllBtnAll = document.querySelector('.del-all-btn-all ')
const checkboxFullContainer = document.querySelector(".checkBox-fullContainer");

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCancel = document.querySelector(".modal-cancel");
const modalConfirm = document.querySelector(".modal-confirm");

const checkBoxAppearance = function () {
  const html = `
    <div
      class="task-item shadow-lg w-150 mx-auto my-2 items-center justify-between rounded border-solid dark:border-gray-500 border-1 flex"
    >
      <div class="flex items-center ps-4 rounded-sm dark:border-gray-700">
        <input
          type="checkbox"
          class="w-4 h-4 cursor-pointer text-blue-800 bg-gray-100 border-gray-300 rounded-sm dark:ring-white-1 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          class="check-box-label w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ${textAreaInput.value}
        </label>
      </div>
      <button
        type="button"
        class="x-button cursor-pointer me-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-4 h-5 p-2 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white active:scale-110"
      >
        x
      </button>
    </div>
  `;
  if (textAreaInput.value !== "") {
    // Insert the new task
    checkboxFullContainer.insertAdjacentHTML("beforeend", html);
    //add the data of the tasks to array
    arrayOfTasks(textAreaInput.value);
    // Clear input
    textAreaInput.value = "";
    console.log(dataOfTasksArray);

    //btnDelAll appear
    btnDelAll.classList.remove("hidden");
  } else {
    alert("you have to fill your task");
  }
};

//empty Array to store the tasks
let dataOfTasksArray = [];

//check if there is data in local storage
if (localStorage.getItem("tasks")) {
  dataOfTasksArray = JSON.parse(localStorage.getItem("tasks"));
  textArea.classList.remove("hidden");
  btnNewTask.classList.add("hidden");
  const loopOfArray = dataOfTasksArray.forEach((element) => {
    const html = `
    <div
      class="task-item shadow-lg w-150 mx-auto my-2 items-center justify-between rounded border-solid dark:border-gray-500 border-1 flex"
    >
      <div class="flex items-center ps-4 rounded-sm dark:border-gray-700">
        <input
          type="checkbox"
          class="w-4 h-4 cursor-pointer text-blue-800 bg-gray-100 border-gray-300 rounded-sm dark:ring-white-1 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          class="check-box-label w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ${element.taskContent}
        </label>
      </div>
      <button
        type="button"
        class="x-button cursor-pointer me-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-4 h-5 p-2 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white active:scale-110"
      >
        x
      </button>
    </div>
  `;
    checkboxFullContainer.insertAdjacentHTML("beforeend", html);
    btnDelAll.classList.remove("hidden");
  });
}
//getting the stored data
const getStoredData = function () {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    console.log(tasks);
  } else return;
};
getStoredData();

//save tasks in localstorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(dataOfTasksArray));
}

const arrayOfTasks = function (taskData) {
  //Task data
  const task = {
    id: Date.now(),
    taskContent: taskData,
    completed: false,
  };

  //push the data of the tasks
  dataOfTasksArray.push(task);
  saveTasks();
};

// Show text area when "New Task" button clicked
btnNewTask.addEventListener("click", function () {
  textArea.classList.remove("hidden");
  btnNewTask.classList.add("hidden");
});

// Add new task when "Add Task" button clicked
btnAddTask.addEventListener("click", checkBoxAppearance);

// single delete functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("x-button")) {
    e.target.closest(".task-item").remove();
  }
});
// All delete functionality
delAllBtnAll.addEventListener("click", function () {
  modal.classList.add("show");
  modalOverlay.classList.add("show-overlay");
});

//  Modal cancel button
modalCancel.addEventListener("click", function () {
  modal.classList.remove("show");
  modalOverlay.classList.remove("show-overlay");
});

// Modal confirm delete button
modalConfirm.addEventListener("click", function () {
  checkboxFullContainer.innerHTML = "";
  btnDelAll.classList.add("hidden");
  modal.classList.remove("show");
  modalOverlay.classList.remove("show-overlay");
});
