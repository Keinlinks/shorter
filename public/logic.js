const button = document.getElementById("button_shorter");
const input = document.getElementById("input_shorter");
const result_p = document.getElementById("p_url_response");
const copy_button = document.getElementById("copy_button");
const icon_copy = document.getElementById("icon_copy");

const api_url = "http://localhost:3000";

var finalLink = "";

button.addEventListener("click", async () => {
  if (isURL(input.value)) {
    button.disabled = true;
    const data = {
      url: input.value,
    };
    try {
      const response = await axios.post(
        `${api_url}/postURL`,
        data
      );
      console.log(response);
      const link = `${api_url}/${response.data}`;
      result_p.textContent = link;
      result_p.setAttribute("href", link);
      finalLink = link;
      copy_button.hidden = false;
      copy_button.setAttribute(
        "class",
        "flex justify-center"
      );
    } catch (e) {
      console.log("ERROR:", e);
    }
    button.disabled = false;
  } else {
    alert("No es una URL");
  }
});

function isURL(text) {
  const regularURL = /^(ftp|http|https):\/\/[^ "]+$/;
  return regularURL.test(text);
}

function copy() {
  icon_copy.src = "./assets/copy_gif.gif";
  navigator.clipboard.writeText(finalLink).then(() => {});
  setTimeout(() => {
    icon_copy.src = "./assets/copy_icon.png";
  }, 1100);
}
