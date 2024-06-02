new Vue({
    data: function() {
        return {
            currentPage: 0,
            setQuantity: 3,
            currentSet: 1,
            firstTeamPoints: 0,
            secondTeamPoints: 0,
            maxSetPoints: 25,
            matchEnded: false,
            setMessage: '',
            scoreboards: [
                { name: 'Time 1', points: 0, setPoints: 0 },
                { name: 'Time 2', points: 0, setPoints: 0 }
            ],
            MPAudio: new Audio("assets/audio/match_point.wav"),
            TBAudio: new Audio("assets/audio/tie_break.wav")
        }
    },
    methods: {
        changeSetQuantity(quantity) {
            this.setQuantity = quantity;
        },
        nextPage() {
            this.currentPage++;
        },
        handleEnterKeyPress(event) {
            if (event.code === "Enter") {
                event.target.blur();
            }
        },
        increasePoints(index) {
            if (this.matchEnded) return;

            this.scoreboards[index].points++;
            if (this.scoreboards[index].points === 24 || (this.setQuantity === 5 && this.currentSet === 5 && this.scoreboards[index].points === 14)) {
                this.MPAudio.play();
            }

            if (this.scoreboards[index].points >= this.maxSetPoints) {
                this.endSet(index);
            }
        },
        decreasePoints(index) {
            if (this.scoreboards[index].points > 0) {
                this.scoreboards[index].points--;
            }
        },
        endSet(winningIndex) {
            this.currentSet++;
            this.scoreboards[winningIndex].setPoints++;

            if (this.scoreboards[0].setPoints >= 3 || this.scoreboards[1].setPoints >= 3 || this.currentSet > this.setQuantity) {
                this.matchEnded = true;
                this.setMessage = `${this.scoreboards[winningIndex].name} venceu!`;
            } else {
                this.setMessage = `${this.currentSet}° de ${this.setQuantity} sets`;

                if (this.setQuantity === 5 && this.currentSet === 5) {
                    this.TBAudio.play();
                    this.maxSetPoints = 15;
                    this.setMessage = "Tie Break!";
                }
            }

            this.resetPoints();
        },
        resetPoints() {
            this.scoreboards.forEach(scoreboard => {
                scoreboard.points = 0;
            });
        },
        resetScoreboards() {
            this.currentPage = 0;
            this.currentSet = 1;
            this.firstTeamPoints = 0;
            this.secondTeamPoints = 0;
            this.maxSetPoints = 25;
            this.matchEnded = false;
            this.setMessage = '';
            this.scoreboards.forEach(scoreboard => {
                scoreboard.points = 0;
                scoreboard.setPoints = 0;
            });
        }
    }
}).$mount("#app");