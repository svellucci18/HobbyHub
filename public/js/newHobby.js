const newFormHandler = async (event) => {

  event.preventDefault();

  const name = document.querySelector("#hobby-name").value.trim();
  const description = document.querySelector("#hobby-desc").value.trim();
  const category_id = document.querySelector("#hobby_cat").value.trim();

  if (name && description && category_id) {

    console.log(JSON.stringify({ name, description }));


    const response = await fetch(`/api/hobbies`, {
      method: "POST",
      body: JSON.stringify({ name, description, category_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

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

// const newHobbyButtonHandler = async (event) => {
//   event.preventDefault();
//   var el = document.getElementById("newHobbyCard");
//   el.style.display = "block";
//   var el1 = document.getElementById("newHobbyButton");
//   el1.style.display = "none";
// };


// const cancelButtonHandler = async (event) => {
//   event.preventDefault();
//   var el = document.getElementById("newHobbyCard");
//   el.style.display = "none";
//   var el1 = document.getElementById("newHobbyButton");
//   el1.style.display = "block";
// };

$("#newHobbyButton").on("click", function (event) {
  document.location.replace("/newhobby");
  // newHobbyButtonHandler(event);
});

// $("#cancel-button").on("click", function (event) {
//   document.location.replace("/profile");
// });

$(".submit-hobby").on("click", function (event) {
  newFormHandler(event);
});

$(".delete-button").on("click", function (event) {
  delButtonHandler(event);
});
