let myLibrary = [];
let myLibraryReadStatus = [];
let R ;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBookToLibrary = function() {
    let x = this.title + " by " + this.author + ", " + this.pages +" pages long";
    myLibrary.push(x);
    console.log(myLibrary)
};


const btn = document.querySelector("#btn");

btn.addEventListener('click', function submit() {
    let T = document.getElementById("bookTitle").value;
    let A = document.getElementById("bookAuthor").value;
    let P = document.getElementById("bookPages").value;

    if (document.getElementById("bookReadStatus").checked === true) {
        R = "true"
        myLibraryReadStatus.push("true");
    } if (document.getElementById("bookReadStatus").checked === false) {
        R = "false"
        myLibraryReadStatus.push("false");
    } if (T === "" || A === "" || P === "") {
        alert("Please fill in all forms");
    } else {
        const book1 = new Book( T, A, P, R);
        book1.addBookToLibrary();
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookPages").value = "";
        document.getElementById("bookReadStatus").checked = false;
        cardCreator();
    }
})

function cardCreator() {
    let bookInfo = myLibrary.slice(-1);
    count++;
    console.log(count)

    //create div for items below
    const div = document.createElement("div");
    div.id = "bin" + count;
    div.classList.add("cards");
    document.getElementById("libCont").appendChild(div);

    //create paragraph item for book info
    const para = document.createElement("p");
    para.innerHTML = bookInfo;
    document.getElementById("bin" + count).appendChild(para);

    //create read button label
    const label = document.createElement("label");
    label.setAttribute("for", "readStatus" + count);
    label.innerHTML = "Read";
    document.getElementById("bin" + count).appendChild(label);

    //create read button input
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "readStatus");
    input.setAttribute("id", "readStatus" + count);
    input.setAttribute("class", "switch");
    document.getElementById("bin" + count).appendChild(input);

    if (R === "true") {
        document.getElementById("readStatus" + count).checked = true;
    } if (R === "false") {
        document.getElementById("readStatus" + count).checked = false;
    }

    //Read button event listener
    const readBtn = document.querySelector("#readStatus" + count);
    readBtn.addEventListener("click", function (e) {
        var statusChange = e.target.id;
        var indexBookNo = statusChange.replace("readStatus", '');
        if (e.target.checked === true) {
            myLibraryReadStatus.splice(indexBookNo, 1, 'true');
        } else {
            myLibraryReadStatus.splice(indexBookNo, 1, 'false');
        }

    })


    //create bin/delete button
    var x = document.createElement("IMG");
    x.setAttribute("src", "images/trash-can-outline.png");
    x.setAttribute("alt", "bin");
    x.classList.add ("bin");
    x.id = "bin" + count;
    document.getElementById("bin" + count).appendChild(x);

    // delete card event
    const deletebtns = document.querySelectorAll(".bin");
    deletebtns.forEach((img) => {
        img.addEventListener('click', function test(e) {
        var itemDelete = e.target.id;
        document.getElementById(itemDelete).remove();
        var indexNo = itemDelete.replace("bin", '');
        myLibrary.splice(indexNo, 1, 'deleted');
        });
    });
};

let count = -1;