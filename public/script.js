const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = form.url.value;
  if (url) {
    try {
      const r = await axios.post(
        "https://sauls-shorten-my-url.herokuapp.com/",
        { url: url }
      );
      if (r.status === 200) {
        document.querySelector(".output").style.display = "flex";

        document.querySelector(
          ".output"
        ).innerHTML = `<p href="#" class="shorten__url">${r.data.shorten_url}</p>`;

        form.reset();
      }
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.error);
        const error = e.response.data.error;
        showError(error);
      }
    }
  }
});

document.querySelector(".output").addEventListener("click", function (e) {
  navigator.clipboard.writeText(e.target.textContent).then(() => {
    e.target.innerHTML = "<p>URI COPIED!</p>";
    setTimeout(function () {
      document.querySelector(".output").style.display = "none";
    }, 3000);
  });
});
const showError = (err) => {
  document.querySelector(".output").innerHTML = `<p>${err}</p>`;
};
