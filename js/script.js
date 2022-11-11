{

    const tasks = [
        {
            content: "zadanie niezrobione",
            finished: false,
        },
        {
            content: "zadanie zrobione",
            finished: true,
        },
    ];

    const render = () => {
        let listItem = "";

        for (const task of tasks) {
            listItem += `<li
            class=${task.finished === true ? "taskFinished" : ""}>
            <button class="js-finishButtons">Zrobione</button>
            ${task.content}
            <button class="js-deleteButtons">Usuń zadanie</button>
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
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}