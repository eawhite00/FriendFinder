var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var currentMatch = {
            name: "",
            image: "",
            difference: 1000
        }

        var userInfo = req.body;
        var userScores = userInfo.scores;

        var totalDifference;

        for (friendLoop = 0; friendLoop < friends.length; friendLoop++) {
            var currentFriend = friends[friendLoop];
            totalDifference = 0;

            for (scoreLoop = 0; scoreLoop < userScores.length; scoreLoop++) {
                var currentUserScore = parseInt(userScores[scoreLoop]);
                var currentFriendScore = parseInt(currentFriend.scores[scoreLoop]);
                var currentDifference = currentUserScore - currentFriendScore;

                //get the absolute value of the difference
                if (currentDifference < 0) {
                    currentDifference *= -1;
                }

                totalDifference += currentDifference;
            }

            if (totalDifference <= currentMatch.difference) {
                currentMatch.name = currentFriend.name;
                currentMatch.image = currentFriend.photo;
                currentMatch.difference = totalDifference;
            }
        }

        res.json(currentMatch);

    });

};
