function sendMessage() {
  const form = new FormData(document.getElementById("userSubmit"));
  let formBody = [];
  for (let key of form.keys()) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(form.get(key));
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    });
}

document.getElementById("userSubmit").addEventListener("submit", (data) => {
  data.preventDefault();
  sendMessage();
});
