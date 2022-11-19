{

    const tasks = [];

    const render = () => {
        let listItem = "";

        for (const task of tasks) {
            listItem += `<li
            class='list__item'>
            <button class="finishButton js-finishButtons">&#x2714</button>
            <div class="list__itemText ${task.finished === true ? "taskFinished" : ""}">
            ${task.content}
            </div>
            <button class="deleteButton js-deleteButtons">&#x1F5D1</button>
            </li>`;
        };

        document.querySelector(".js-tasksList").innerHTML = listItem;

        bindEvents();
    };

    const bindEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-deleteButtons");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });

        const finishButtons = document.querySelectorAll(".js-finishButtons");

        finishButtons.forEach((finishButton, index) => {
            finishButton.addEventListener("click", () => {
                finishTask(index);
            });
        });
    }

    const autofocus = () => {
        const newTaskFocus = document.querySelector(".form__input")

        newTaskFocus.value = "";
        newTaskFocus.focus();
    }


    const deleteTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const finishTask = (index) => {
        tasks[index].finished = !tasks[index].finished;
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

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