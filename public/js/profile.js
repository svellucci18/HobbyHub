const newFormHandler = async (event) => {

  event.preventDefault();

  const name = document.querySelector("#hobby-name").value.trim();
  const description = document.querySelector("#hobby-desc").value.trim();

  if (name && description) {

    console.log(JSON.stringify({ name, description }));


    const response = await fetch(`/api/hobbies`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
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


$("#newHobbyButton").on("click", function (event) {
  document.location.replace("/newhobby");
});

$(".submit-hobby").on("click", function (event) {
  newFormHandler(event);
});

$(".delete-button").on("click", function (event) {
  delButtonHandler(event);
});
