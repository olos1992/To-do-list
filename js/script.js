{

    let tasks = [];
    let hideDoneTasks = false;

    const renderTasks = () => {
        const listToHTML = task =>
            `<li class='list__item ${task.finished && hideDoneTasks ? "list__item--hidden" : ""} js-tasksList'>
            <button class="finishButton js-finishButtons"></button>
            <span class="list__itemText ${task.finished === true ? "taskFinished" : ""}">
            ${task.content}
            </span>
            <button class="deleteButton js-deleteButtons">&#x1F5D1</button>
            </li>`;

        const listElement = document.querySelector(".js-tasksList");
        listElement.innerHTML = tasks.map(listToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;
        const sectionHeader = document.querySelector(".list__header")

        if (buttonsCheck !== "") {
            sectionHeader.innerHTML = `Lista zadań
            <button class="doneHideButton js-doneHideButton" ${tasks.every(({ finished }) => !finished) ? "disabled" : ""}> ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
            <button class="finishAllButton ${tasks.every(({ finished }) => finished) ? "disabled" : ""} js-finishAllButton">Ukończ wszystkie</button>`
            return;
        }
        sectionHeader.innerHTML = "Lista zadań";
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleEvents();
        bindButtonsEvents();
    };

    const bindButtonsEvents = () => {
        const buttonsCheck = document.querySelector(".js-tasksList").innerHTML;
        if (buttonsCheck !== "") {
            const finishAllButton = document.querySelector(".js-finishAllButton");
            finishAllButton.addEventListener("click", () => {
                finishAllTasks();
            });

            const hideFinishedButton = document.querySelector(".js-doneHideButton");
            hideFinishedButton.addEventListener("click", () => {
                hideFinishedTasks();
            });
        };
        return;
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

    const finishAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task, finished: true
        }));
        render();
    };

    const hideFinishedTasks = () => {
        hideDoneTasks = !hideDoneTasks;
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