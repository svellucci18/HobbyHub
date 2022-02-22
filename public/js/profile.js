const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#hobby-name").value.trim();
  const description = document.querySelector("#hobby-desc").value.trim();

  if (name && description) {
    const response = await fetch(`/api/hobbies`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create hobby");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/hobbies/${id}`, {

      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete hobby");
    }
  }
};




const newHobbyButtonHandler = async (event) => {
  event.preventDefault();
  var el = document.getElementById("newHobbyCard");
  el.style.display = "block";
};



document
  .querySelector(".new-hobby-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".hobby-list")
  .addEventListener("click", delButtonHandler);

document
  .querySelector(".newHobbyButton")
  .addEventListener("click", newHobbyButtonHandler);