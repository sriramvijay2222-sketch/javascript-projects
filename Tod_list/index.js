const input = document.getElementById("input-text")
const btn = document.getElementById("submit")
const unordered_list = document.getElementById("list-container")

function create_task(task_obj) {
    const list = document.createElement("li")
    list.dataset.task = task_obj.task

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("tickbox")

    const task_text = document.createElement("span")
    task_text.textContent = task_obj.task

    const delet = document.createElement("button")
    delet.classList.add("delete")
    delet.textContent = "X"

    list.append(checkbox)
    list.append(task_text)
    list.append(delet)

    return { list, checkbox, delet }
}

function delete_task(list) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(taskObj => taskObj.task != list.dataset.task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    list.remove()
}

function check(list) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.map(taskObj => {
        if (taskObj && taskObj.task == list.dataset.task) {
            taskObj.completed = !taskObj.completed
        }
        return taskObj
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
    list.classList.toggle("checked")
}

window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach(element => {
        const { list, checkbox, delet } = create_task(element)
        checkbox.checked = element.completed

        if (checkbox.checked) {
            list.classList.add("checked")
        }

        unordered_list.append(list)
        delet.addEventListener("click", () => { delete_task(list) })
        checkbox.addEventListener("click", () => { check(list) })
    })
})

function addtask() {
    if (input.value.trim() == "") return

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const taskobj = {
        task: input.value.trim(),
        completed: false
    }

    tasks.push(taskobj)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    const { list, checkbox, delet } = create_task(taskobj)
    unordered_list.append(list)
    delet.addEventListener("click", () => { delete_task(list) })
    checkbox.addEventListener("click", () => { check(list) })

    input.value = ""
}

btn.addEventListener("click", addtask)
