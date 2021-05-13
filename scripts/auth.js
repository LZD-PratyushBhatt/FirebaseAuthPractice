//------------------------GET DATA FROM FIRESTORE------------------------------------------
db.collection("guides")
  .get()
  .then((snapshot) => {
    // console.log(snapshot.docs);
    // Calling setupGuides function in index.js
    setupGuides(snapshot.docs);
  });

// ----------------------LISTEN FOR AUTH STATUS CHANGES------------------------
auth.onAuthStateChanged((user) => {
  if (user) console.log("User logged in ", user);
  else console.log("User logged out..");
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
