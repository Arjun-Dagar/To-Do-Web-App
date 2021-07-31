console.log("hello");
shownotes();

function blurify() {
    let inptxt = document.querySelector("#text-input");
    let btn1 = document.getElementById("add-notes");
    if(inptxt.value == "")
    {
        btn1.style.background = "rgb(93 159 255)";
    }
    else
    {
        btn1.style.background = "#0a58ca";
    }
}

let btn = document.querySelector("#add-notes");
btn.addEventListener("click", function () {
  let inptxt = document.querySelector("#text-input");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  if (inptxt.value != "") {
    notesObj.push(inptxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    inptxt.value = "";
    shownotes();
  } 
  else {
    alert("Please add some text first");
  }
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` <div class="card mx-3 my-3" style="width: 18rem;">
      <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-primary" onclick = "editing(${index})">Edit</button>
          <button class="btn btn-primary" onclick = "deletion(${index})">Delete</button>
      </div>
  </div>`;
  });
  let cardbar = document.querySelector("#notes");
  cardbar.innerHTML = html;
}

function deletion(index) {
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

// function searching()
// {
//     console.log("running");
//     let txt = document.getElementById("searchbox");
//     let str = txt.value;
//     str.toLowerCase();
//     let notes = localStorage.getItem("notes");
//     if(notes == null)
//     {
//         notesObj = [];
//     }
//     else
//     {
//         notesObj = JSON.parse(notes);
//     }
//     notesObj.forEach(function(element, index) {
//         let temp = document.querySelectorAll('.card')[index];
//         if(element.includes(str))
//         {
//             temp.style.display = "block";
//         }
//         else
//         {
//             temp.style.display = "none";
//         }
//     });
// }

function searching()
{
    let txt = document.getElementById("searchbox");
    let str = txt.value.toLowerCase();

    let array = document.querySelectorAll('.card');
    array.forEach(function(element) {
        let temp = element.getElementsByTagName("p")[0];
        let txt2 = temp.innerText.toLowerCase();
        if(txt2.includes(str))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    });
}

function editing(index)
{
  let temp = document.getElementsByTagName("p")[index].innerText;

  let card = document.getElementsByClassName("card")[index];
  card.innerHTML = `<div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <input type="text" value="${temp}" id="editing"><br>
      <button class="btn btn-primary" onclick = "okay(${index})">OK</button>
  </div>`
}

function okay(index)
{
  let temp = document.getElementById("editing");

  let card = document.getElementsByClassName("card")[index];
  card.innerHTML = `<div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">${temp.value}</p>
      <button class="btn btn-primary" onclick = "editing(${index})">Edit</button>
      <button class="btn btn-primary" onclick = "deletion(${index})">Delete</button>
  </div>`

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj[index] = temp.value;
  localStorage.setItem("notes", JSON.stringify(notesObj));
}