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
const setupGuides = (data, user) => {
  //  if the user object is null, it measn we are logged out, and we should not show the guides
  // else we show the guides
//   console.log(user);
  if (user) {
    let html = "";
    //   (OPTIONAL) putting a condition for the case when the user is logged in but there is no data in the database
    if (data.length) {
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
    } else {
      // case when no data in the database(logged in)
      guideList[0].innerHTML = `<h5 class="center-align">No content to show right now</h5>`;
    }
  } else {
    //   Showing some message for non logged in user
    guideList[0].innerHTML = `<h5 class="center-align">Login to view Guides</h5>`;
  }
};
