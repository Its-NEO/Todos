const todo_container = document.querySelector("#todo-contents");
const doing_container = document.querySelector("#doing-contents");
const done_container = document.querySelector("#done-contents");

function get_text_content()
{
  const text_content = document.createElement("div");
  text_content.setAttribute("class", "text-content");
  text_content.appendChild(get_title());
  text_content.appendChild(get_desc());

  return text_content;
}

function get_title()
{
  const text_node = document.createTextNode("Title");
  const title_paragraph = document.createElement("p");
  title_paragraph.appendChild(text_node);

  const title_div = document.createElement("div");
  title_div.setAttribute("class", "title");
  title_div.appendChild(title_paragraph);

  title_div.addEventListener("click", title_click_handler);
  set_contenteditable(title_paragraph, "true");

  return title_div;
}

function title_click_handler(ev)
{
  const paragraph = ev.currentTarget.querySelector("p");
  paragraph.textContent = "";
  ev.currentTarget.removeEventListener("click", title_click_handler);
}

function desc_click_handler(ev)
{
  const paragraph = ev.currentTarget.querySelector("p");
  paragraph.textContent = "";
  ev.currentTarget.removeEventListener("click", desc_click_handler);
}

function get_desc()
{
  const description_text = document.createTextNode("Description");
  const description_paragraph = document.createElement("p");
  description_paragraph.appendChild(description_text);
  const description_div = document.createElement("div");
  description_div.setAttribute("class", "description");
  description_div.appendChild(description_paragraph);
  
  description_div.addEventListener("click", desc_click_handler);
  set_contenteditable(description_paragraph, "true");

  return description_div;
}

function get_priority()
{
  const priority = document.createElement("div");
  priority.setAttribute("class", "priority");

  return priority;
}

function get_next_button()
{
  const next_button = document.createElement("div");
  const next_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  next_button.innerHTML = next_svg;
  next_button.setAttribute("class", "next");

  next_button.addEventListener("click", next_handler);

  return next_button;
}

function next_handler(ev)
{
  const container = ev.currentTarget.parentElement.parentElement;
  const item = ev.currentTarget.parentElement;
  if (container.id == "todo-contents")
    doing_container.appendChild(item);
  else
  {
    const delete_btn = get_delete_btn();
    item.querySelector(".next").remove();
    item.appendChild(delete_btn);

    done_container.appendChild(item);
  }
}

function check_handler(ev)
{
  const todo_item = ev.currentTarget.parentElement;
  const title_paragraph = todo_item.querySelector(".title p");
  const description_paragraph = todo_item.querySelector(".description p");

  set_contenteditable(title_paragraph, "false");
  set_contenteditable(description_paragraph, "false");

  title_paragraph.parentElement.removeEventListener("click", title_click_handler);
  description_paragraph.parentElement.removeEventListener("click", desc_click_handler);

  todo_item.querySelector(".check").remove();
  todo_item.appendChild(get_next_button());
}

function get_check_button()
{
  const check_button = document.createElement("div");
  const check_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  check_button.innerHTML = check_svg;
  check_button.setAttribute("class", "check");

  check_button.addEventListener("click", check_handler);

  return check_button;
}

function get_delete_btn()
{
  const delete_btn = document.createElement("div");
  const delete_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  delete_btn.innerHTML = delete_svg;
  delete_btn.setAttribute("class", "delete");
  
  delete_btn.addEventListener("click", (ev) => {
    setTimeout(() => {
      done_container.querySelectorAll(".removing").forEach(
        (item) => {item.remove();}
      );
    }, 300);
    ev.currentTarget.parentElement.classList.add("removing");
  });

  return delete_btn;
}

function get_todo_item()
{
  const text_content = get_text_content();
  const priority = get_priority();
  const check_button = get_check_button();
  
  const todo_item = document.createElement("div");
  todo_item.appendChild(priority);
  todo_item.appendChild(text_content);
  todo_item.appendChild(check_button);
  todo_item.setAttribute("class", "todo-item");

  return todo_item;
}

function set_contenteditable(item, value)
{
  item.setAttribute("contenteditable", value);
}

function addTodo()
{
  const todo_item = get_todo_item();
  todo_item.classList.add("adding");
  todo_container.appendChild(todo_item);
}

const add_todo_btn = document.querySelector("#add-todo");
add_todo_btn.addEventListener("click", () => {
  addTodo();
});

const save_btn = document.querySelector("#save");

save_btn.addEventListener("click", () => {
  let todo_items = [];
  for (const item of document.querySelectorAll(".todo-item"))
  {
    let obj = {
      title: item.querySelector(".title p").textContent,
      description: item.querySelector(".description p").textContent,
    }

    if (item.parentElement.id == "todo-contents")
      obj.place = "todo";
    else if (item.parentElement.id == "doing-contents")
      obj.place = "doing";
    else 
      obj.place = "done";

    todo_items.push(obj);
  }

  localStorage.setItem("todo-items", JSON.stringify(todo_items));
});

const reset_btn = document.querySelector("#reset");

reset_btn.addEventListener("click", () => {
  for (const item of document.querySelectorAll(".todo-item"))
  {
    item.remove();
  }

  localStorage.removeItem("todo-items");
})

let local_items = localStorage.getItem("todo-items");
if (local_items)
{
  let items = JSON.parse(local_items);
  for (const save_item of items)
  {
    let todo_item = get_todo_item();
    todo_item.querySelector(".title p").textContent = save_item.title;
    todo_item.querySelector(".description p").textContent = save_item.description;
    todo_item.classList.add("adding");

    console.log(save_item.place);

    if (save_item.place == "todo")
      todo_container.appendChild(todo_item);

    else if (save_item.place == "doing")
    {
      todo_container.appendChild(todo_item);
      todo_item.querySelector(".check").click();
      todo_item.querySelector(".next").click();
    }
    else if (save_item.place == "done")
    {
      todo_container.appendChild(todo_item);
      todo_item.querySelector(".check").click();
      todo_item.querySelector(".next").click();
      todo_item.querySelector(".next").click();
    }
  }
}