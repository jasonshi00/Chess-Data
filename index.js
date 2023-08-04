const inputForm = document.getElementById("input-form");
const userInput= document.getElementById("user-input");
const userInfo = document.getElementById("user-info");
const userDiv = document.getElementById("username");

const dailyRating = document.getElementById("daily-rating");
const rapidRating = document.getElementById("rapid-rating");
const bulletRating = document.getElementById("bullet-rating");
const blitzRating = document.getElementById("blitz-rating");

const dailyPie = document.getElementById("daily-pie-chart");
const rapidPie = document.getElementById("rapid-pie-chart");
const bulletPie = document.getElementById("bullet-pie-chart");
const blitzPie= document.getElementById("blitz-pie-chart");

const userImg = document.getElementById("player-img");
inputForm.onsubmit = (event) => {
    event.preventDefault();
    userInfo.style.display = "flex";
    const username = userInput.value;
    userDiv.textContent = username;
    getData(username).then(data => {
        console.log(data);
        dailyRating.textContent = data.chess_daily.last.rating;
        rapidRating.textContent = data.chess_rapid.last.rating;
        bulletRating.textContent = data.chess_bullet.last.rating;
        blitzRating.textContent = data.chess_blitz.last.rating;

        var dailyWinRate = calculateWinRate(data.chess_daily.record.win, data.chess_daily.record.loss);
        var rapidWinRate = calculateWinRate(data.chess_rapid.record.win, data.chess_rapid.record.loss);
        var bulletWinRate = calculateWinRate(data.chess_bullet.record.win, data.chess_bullet.record.loss);
        var blitzWinRate = calculateWinRate(data.chess_blitz.record.win, data.chess_blitz.record.loss);

        dailyPie.textContent = dailyWinRate + "%";
        rapidPie.textContent = rapidWinRate + "%";
        bulletPie.textContent = bulletWinRate + "%";
        blitzPie.textContent = blitzWinRate + "%";
        console.log(dailyWinRate);
        dailyPie.style = `--deg: ${dailyWinRate * 3.6}deg`;
        rapidPie.style = `--deg: ${rapidWinRate * 3.6}deg`;
        bulletPie.style = `--deg: ${bulletWinRate * 3.6}deg`;
        blitzPie.style = `--deg: ${blitzWinRate * 3.6}deg`;

        userImg.src = data.avatar;
    });
}
async function getData(username) {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const json = await response.json();
    const playerResponse = await fetch(`https://api.chess.com/pub/player/${username}`); 
    const playerJson = await playerResponse.json();
    const {chess_daily, chess_rapid, chess_bullet, chess_blitz} = json;
    try {
        const {avatar = "https://images.chesscomfiles.com/uploads/images/noavatar_l.gif "} = playerJson;
        return {chess_daily, chess_rapid, chess_bullet, chess_blitz, avatar};
    } catch (error) {}

    return {chess_daily, chess_rapid, chess_bullet, chess_blitz, avatar};
}

function calculateWinRate(win, loss) {
    var percentage = Math.round((win / (win + loss)) * 100);
    return percentage;
}