// --------------TODO--------------

// The page does not contain a heading, skip link, or landmark region
// <html> element does not have a [lang] attribute
// Links do not have a discernible name
// Links do not have descriptive text
// make foter small in phone screen for project page

var firebaseConfig = {
  apiKey: ${{secret.FIREBASE_API}},
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
  let project_card = document.createElement("div");
  let projectName = document.createElement("h3");
  let date = document.createElement("small");
  let content = document.createElement("p");
  let tags = document.createElement("small");
  let btn = document.createElement("div");
  let link = document.createElement("a");
  let repo = document.createElement("a");

  project_card.setAttribute("class", "project-description");
  btn.setAttribute("class", "button");
  console.log(doc.data().link);
  repo.setAttribute("href", doc.data().repo);

  projectName.textContent = doc.data().name;
  date.textContent = doc.data().date;
  content.innerHTML = doc.data().content;
  tags.textContent = "Tech-Stack : " + doc.data().tags;
  repo.textContent = "Repo";

  if (doc.data().link != "") {
    console.log("hello");
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
      console.log(doc.data());
      loadData(doc);
    });
  });
