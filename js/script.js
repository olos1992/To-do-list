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

        for(const task of tasks) {
            listItem +=`<li>${task.content}</li>`;
        };

      document.querySelector(".js-tasksList").innerHTML = listItem;  
    };

    const init = () => {
        render();
    };

    init();

}