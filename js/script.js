{

    let tasks = [];
    let hideDoneTasks = false;

    const renderTasks = () => {
        let listItem = "";

        for (const task of tasks) {
            listItem += `<li class='list__item'>
            <button class="finishButton js-finishButtons"></button>
            <span class="list__itemText ${task.finished === true ? "taskFinished" : ""}">
            ${task.content}
            </span>
            <button class="deleteButton js-deleteButtons">&#x1F5D1</button>
            </li>`;
        };

        document.querySelector(".js-tasksList").innerHTML = listItem;
    };

    const renderButtons = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;
        const sectionHeader = document.querySelector(".list__header")

        buttonsCheck !== "" ? sectionHeader.innerHTML = `Lista zadań<button class="doneHideButton js-doneHideButton">Ukryj ukończone</button><button class="finishAllButton js-finishAllButton">Ukończ wszystkie</button>` : sectionHeader.innerHTML = "Lista zadań";
    };

    const bindButtonsEvents = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;
        if (buttonsCheck !== "") {
            const finishAllTasks = document.querySelector(".js-finishAllButton");
            const hideFinishedTasks = document.querySelector(".js-doneHideButton");
        }
        return;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleEvents();
        bindButtonsEvents();
    };

    const bindRemoveEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-deleteButtons");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const bindToggleEvents = () => {
        const finishButtons = document.querySelectorAll(".js-finishButtons");

        finishButtons.forEach((finishButton, index) => {
            finishButton.addEventListener("click", () => {
                finishTask(index);
            });
            tasks[index].finished === true ? finishButton.innerHTML = "&#x2714" : "";
        });
    };

    const autofocus = () => {
        const newTaskFocus = document.querySelector(".form__input")

        newTaskFocus.value = "";
        newTaskFocus.focus();
    };

    const deleteTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const finishTask = (index) => {
         tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                finished: !tasks[index].finished,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        autofocus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}