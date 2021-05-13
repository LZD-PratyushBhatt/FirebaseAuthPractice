// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  // initialising modals
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals); //M is materialise library, Modal is its property and init is a method to initialise those variables(which are inside init)

  //Initialising all the collapsible elements
  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

// ------------APPENDING GUIDES FROM THE FIRESTORE------------------------
const guideList = document.getElementsByClassName("guides");

// Setup GUIDES----------------
const setupGuides = (data) => {
  let html = "";
  data.forEach((doc) => {
    const guide = doc.data();
    // console.log(guide);
    //Outputting data to DOM
    const li = `
     <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
      </li>
    `;
    html += li;
    // console.log(html);
  });
  guideList[0].innerHTML = html;
};
