// ----------------------LISTEN FOR AUTH STATUS CHANGES------------------------
auth.onAuthStateChanged((user) => {
  // User is null if not logged n, else it is an object
  setupUI(user);

  let unsubscribe = () => {};
  if (user) {
    // User logged in
    console.log("user logged in");
    //------------------------GET DATA FROM FIRESTORE------------------------------------------

    // realtime update
    // replace .get().then() by .onSnapshot(), it always checks and compares the DOM with previous Snapshot
    // and if any change then it fires the method or anything inside it
    db.collection("guides").onSnapshot((snapshot) => {
      // console.log(snapshot.docs);
      // Calling setupGuides function in index.js
      // console.log("Snapshot docs "+snapshot.docs);
      // Snapshot.docs is an array of objects(documents) inside that collection
      setupGuides(snapshot.docs, user);
    },function(error){
      // console.log(error);
      // Catch the error, do nothing here, we dont want to display anything.
    });
  } else {
    console.log("User logged out..");
    setupGuides([], user);
  }
});

//   ---------------------SIGN UP USER------------------------------------

const signupform = document.getElementById("signup-form");
signupform.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevents the default action, that is refresing the page on submit..

  //   GEt user info

  const email = signupform["signup-email"].value; //look in the signupform and find element with ID signup-email
  const password = signupform["signup-password"].value; //look in the signupform and find element with ID signup-pass
  // console.log(email,password);
  //   auth.createUserWithEmailAndPassword returns a promise, so we have to enclose the code that is going to execute
  //   next in a .then block, which takes a callback function, in response it gives us user credential
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred);
    // We want to close the modal once we sign up
    const modal = document.getElementById("modal-signup");
    M.Modal.getInstance(modal).close();
    // Reset the sign up form
    signupform.reset();
  });
});

// -----------------------SIGN OUT USER-----------------------------------

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    // console.log("User logged out");
  });
});

// -----------------------SIGN IN-------------------------------
const loginform = document.getElementById("login-form");
loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginform["login-email"].value;
  const password = loginform["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      //   console.log(cred.user);
      // Close Login Modal and reset the form
      const modal = document.getElementById("modal-login");
      M.Modal.getInstance(modal).close();
      loginform.reset();
    })
    .catch((err) => {
      console.log("User Not signed up ", err.message);
    });
});

//---------------------CREATE NEW GUIDE------------------------------------
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevent Refreshing

  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    })
    .then(() => {
      // CLose the Modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
