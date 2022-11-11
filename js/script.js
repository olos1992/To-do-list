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
            ${task.content}
            </li>`;
        };

        document.querySelector(".js-tasksList").innerHTML = listItem;
    };

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