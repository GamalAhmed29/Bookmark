var siteNameInput = document.getElementById("websiteName");
var siteUrlInput = document.getElementById("siteUrl");
var myTableBody = document.getElementById("myTableBody");

var bookmarks = [];
if (localStorage.getItem("bookmark") == null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmarks(bookmarks);
}
displayBookmarks(bookmarks);
function addbookmark() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    console.log(bookmarks);
    
    displayBookmarks(bookmarks);
    
  } else {
    Swal.fire({
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: "Site name must contain at least 3 characters and Site URL must be a valid one",
      icon: "warning",
      showCancelButton: false,
    });
  }
   clearForm();
}

function displayBookmarks(book) {
  shelf = `<table id="myTable" class="table mt-4 text-center bg-light">
        <thead>
            <tr>
                <th class="text-capitalize">Index</th>
                <th class="text-capitalize">Website Name</th>
                <th class="text-capitalize">visit</th>
                <th class="text-capitalize">Delete</th>
            </tr>
        </thead>
        <tbody id="myTableBody">
        </tbody>
      </table>`;
  for (var i = 0; i < bookmarks.length; i++) {
    shelf += `
        <tbody id=""myTableBody>
          <tr>
          <td class="col-text">${[i + 1]}</td>
          <td class="col-text">${book[i].siteName}</td>
          <td col-text><a href="${
            siteUrlInput.value
          }" class="btn btn-visit buttonIcon1" target="_blank">
    <i class="fa-solid fa-eye pe-2"></i>Visit
  </a></td>
          <td col-text>
          <button onclick="deleteBookmark()" class="btn btn-visit buttonIcon2"> <i class="fa-solid fa-trash-can "></i> Delete</button>
                 
                  
                  </td>
          </tr>
        </tbody>`;
  }
  myTableBody.innerHTML = shelf;
}

function deleteBookmark(deletedBookmark) {
  bookmarks.splice(deletedBookmark, 1);

  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
  console.log(bookmarks);
}

function validateInputs(input) {
  console.log(input);
  var regix = {
    websiteName: /^[A-Za-z]{3,8}$/,
    siteUrl:
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.(com|net)(\/[^\s]*)?$/,
  };
  if (regix[input.id].test(input.value)) {
    console.log("Mathch");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    console.log("notMatch");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}
function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}
