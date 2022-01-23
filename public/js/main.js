const taskSubmission = document.querySelector("#task");

// Get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

socket.on("message", room => {
    const welcomeMsg = document.querySelector("#welcome-msg");
    welcomeMsg.innerHTML = `Welcome to the ${room} room`
});

socket.emit("joinRoom", { username, room });

// Get room users
socket.on("roomusers", (users) => {
    outputUsers(users);
});

const ctx = document.getElementById('progressChart');
let myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: []
        }]
    },
    options: {
    }
});

taskSubmission.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("taskDone", socket.id, e.target.elements.submitTask.value);
});

socket.on("updateChart", (roomUsers) => {
    const xAxes = roomUsers.map(x => x.username);
    const yAxes = roomUsers.map(y => y.days);
    const barColors = roomUsers.map(z => z.color);

    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: xAxes,
            datasets: [{
                data: yAxes,
                backgroundColor: barColors
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Current Progress"
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
});

const usersList = document.querySelector("#ul-list");
const outputUsers = (users) => {
    usersList.innerHTML = `${users.map(user => `<li class="list-group-item mb-3">${user.username}</li>`).join("")}`;
}



