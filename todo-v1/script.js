const add = document.getElementById("add");

add.addEventListener("click", function handleClick(event) {
  txtElement = document.getElementById("text");

  if(txtElement.value.trim() == ""){
    return
  }

  p = document.createElement("p");
  p.innerText = txtElement.value;
  p.setAttribute("class", "p");

  parent = document.createElement("div");
  parent.setAttribute("class", "div");
  parent.appendChild(p);

  wrapper = document.getElementById("wrapper");
  wrapper.appendChild(parent);

  removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove");
  removeBtn.innerText = "X";

  removeBtn.addEventListener('click', event => {
    event.target.parentElement.parentElement.remove();
  });

  removeBtnDiv = document.createElement("div");
  removeBtnDiv.setAttribute("class", "remove-btn-div");
  removeBtnDiv.appendChild(removeBtn);


  parent.appendChild(removeBtnDiv);
  txtElement.value = "";
});

const clear = document.getElementById("clear");

clear.addEventListener("click", function handleClick(event) {
    elem = document.querySelectorAll('.div');
    for(e of elem){
        e.remove();
    }
});

document.addEventListener('keypress', function handleKeyPress(event){
  if(event.key == "Enter"){
    add.click();
  }
});
