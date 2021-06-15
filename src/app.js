// --------------TODO--------------

// The page does not contain a heading, skip link, or landmark region
// Links do not have a discernible name
// Links do not have descriptive text

var firebaseConfig = {
  apiKey: "AIzaSyARD4Hp1IDOEjuqK4s9aSmbA8ov8uhI55k",
  authDomain: "portfolio-a94d1.firebaseapp.com",
  projectId: "portfolio-a94d1",
  storageBucket: "portfolio-a94d1.appspot.com",
  messagingSenderId: "1063334666997",
  appId: "1:1063334666997:web:3a4969c7f7172a563c9bbc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const projects = document.querySelector(".project-temp");

function loadData(doc) {

  const loader = document.querySelector('.loader');

  loader.style.display = "none";

  let project_card = document.createElement("div");
  let projectName = document.createElement("h2");
  let date = document.createElement("small");
  let content = document.createElement("p");
  let tags = document.createElement("small");
  let btn = document.createElement("div");
  let link = document.createElement("a");
  let repo = document.createElement("a");

  project_card.setAttribute("class", "project-description");
  btn.setAttribute("class", "button");
  repo.setAttribute("href", doc.data().repo);

  projectName.textContent = doc.data().name;
  date.textContent = doc.data().date;
  content.innerHTML = doc.data().content;
  tags.innerHTML = "<b>Tech-Stack</b> : " + doc.data().tags;
  repo.textContent = "Repo";

  if (doc.data().link != "") {
    link.setAttribute("href", doc.data().link);
    link.textContent = "Link";
    btn.appendChild(link);
  }

  btn.appendChild(repo);

  project_card.appendChild(projectName);
  project_card.appendChild(date);
  project_card.appendChild(content);
  project_card.appendChild(tags);
  project_card.appendChild(btn);

  projects.appendChild(project_card);
}

db.collection("projects")
  .orderBy("createdAt", "desc")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      loadData(doc);
    });
  });
