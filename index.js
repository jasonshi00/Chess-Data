const inputForm = document.getElementById("input-form");
const userInfo = document.getElementById("user-info");
inputForm.onsubmit = (event) => {
    event.preventDefault();
    userInfo.style.display = "flex";
    console.log("working");
}
async function getData(username) {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const json = await response.json();
    return json;
}