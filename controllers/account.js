var app = angular.module('myApp',[]);

app.controller('accountCtrl', function($scope){
    var url = location.search;
    if(url.indexOf("=")>=0){
        var userID = url.split("=")[1];
        $scope.userID = userID;

        getProfile();
        getProjects();
        getFollowers();
        getFollowings();

        //check session & follow status
        $.ajax({
            url:"../php/checkSession.php",
            type:"get",
            success: function(result){
                $scope.sessionID = result;
                if(result == "guest"){
                    $scope.status = "Follow";
                    document.getElementById("ng-status").style.display =  "inline-block";
                }
                else if(result==userID){
                    let btn_follow = document.getElementById("follow-status");
                    btn_follow.style.display = "none";
                }
                else{
                    checkFollow();
                }
                $scope.$digest();

            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }


    $scope.showFollowers = function(){
        var show = document.getElementById('allFollower');
        var page = document.getElementById("page-top");
        page.className = "modal-open";
        show.style.display = "block";
    };
    $scope.closeFollower = function(){
        var show = document.getElementById('allFollower');
        var page = document.getElementById("page-top");
        page.className = "";
        show.style.display = "none";
    };

    $scope.showFollowing = function(){
        var show = document.getElementById('allFollowing');
        var page = document.getElementById("page-top");
        page.className = "modal-open";
        show.style.display = "block";
    };
    $scope.closeFollowing = function(){
        var show = document.getElementById('allFollowing');
        var page = document.getElementById("page-top");
        page.className = "";
        show.style.display = "none";
    };

    $scope.viewAuthor = function(uID){
        window.location.href = "account.html?id="+uID;
    }

    $scope.changeFollow = function(){
        if($scope.sessionID != "guest") {
            if ($scope.status == "Following") {
                $.ajax({
                    url: '../php/unfollowFollowing.php',
                    type: 'post',
                    data: {following_id:$scope.userID},
                    success: function (result) {
                        if(result=="OK"){
                            $scope.status = "Follow";
                            getFollowers();
                            $scope.$digest();
                        }
                        else{
                            alert("error");
                        }
                    },
                    error: function (jqXHR, textStatus, err) {
                        alert('text status ' + textStatus + ', err ' + err);
                    }
                })
            }
            else {
                $.ajax({
                    url: '../php/followOthers.php',
                    type: 'post',
                    data: {viewed_id: $scope.userID,},
                    success: function (result) {
                        if(result=="OK"){
                            $scope.status = "Following";
                            getFollowers();
                            $scope.$digest();
                        }
                        else{
                            alert("error");
                        }
                    },
                    error: function (jqXHR, textStatus, err) {
                        alert('text status ' + textStatus + ', err ' + err);
                    }
                })
            }
        }
        else{
            var pop_up = document.getElementById('light');
            document.getElementById('fade').style.display='block';
            pop_up.style.display = "block";
        }
    }

    $scope.reloadPage = function(pageNum){
        $scope.displayProjects = $scope.allProjects.slice(6*(pageNum-1),6*pageNum);
        $scope.currentPage = pageNum;
    }

    $scope.loadPre = function () {
        let preNum = $scope.currentPage -1;
        $scope.displayProjects = $scope.allProjects.slice(6*(preNum-1),6*preNum);
        $scope.currentPage = preNum;
    }

    $scope.loadNext = function () {
        let nextNum = $scope.currentPage+1;
        $scope.displayProjects = $scope.allProjects.slice(6*(nextNum-1),6*nextNum);
        $scope.currentPage = nextNum;
    }

    $scope.getProjectDetail = function (projectId) {
        //window.localStorage.setItem("projectId",projectId);
        window.location.href = "project-detail.html?id="+projectId;
    }

    //get user profile
    function getProfile() {
        $.ajax({
            url: '../php/getProfile.php',
            type: 'post',
            dataType: 'json',
            data: {user_id: $scope.userID},
            success: function (result) {
                if(result.length == 0){
                    window.location.href = "404.html";
                }
                let re = result[0];
                let info = {};
                for (key in re) {
                    if (re[key] != null && key != 'username' && key != 'nickname' && key!="profile_pic" && key!="email" &&key!="disabled"&&key!="isAdmin"&& key!='id' && key != 'password') {
                        if(re[key]!=""){
                            if(key=="dob"){
                                info['Date of Birth'] = re[key];
                            }
                            else if(key=="introduction"){
                                info['description'] = re[key];
                            }
                            else{
                                info[key] = re[key];
                            }
                        }
                    }
                }
                $scope.thisProfile_pic = re['profile_pic'];
                if(re['nickname'] == null){
                    $scope.username = re['username'];
                }
                else{
                    $scope.username = re['nickname'];
                }
                $scope.userInfo = info;
                console.log(info);
                if(Object.keys(info).length  == 0){
                    document.getElementById("intro-holder").style.display = "block";
                }
                $scope.$digest();
                document.getElementById("ng-username").style.display =  "inline-block";
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        });
    }

    //get all projects
    function getProjects() {
        $.ajax({
            url: '../php/getProjects.php',
            type: 'post',
            data: {ownerId: $scope.userID},
            success: function (result) {
                $scope.allProjects = result[1];
                $scope.projects = result[1].length;
                getPages();
                $scope.$digest();
                if ($scope.projects==0){
                    document.getElementById("pro-holder").style.display = "block";
                }
                document.getElementById("ng-projects").style.display =  "inline-block";
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }

    function getPages(){
        let projectSize = $scope.allProjects.length;
        let totalPages = [1];
        if(projectSize%6 == 0){
            for(let i=2;i<=projectSize/6;i++){
                totalPages.push(i);
            }
        }
        else{
            for(let i=2;i<=1+projectSize/6;i++){
                totalPages.push(i);
            }
        }
        $scope.pages=totalPages;
        $scope.displayProjects = $scope.allProjects.slice(0,6);
        $scope.currentPage = 1;
        $scope.allPageNum = totalPages.length;
        $scope.$digest();
    }

    //get all followers
    function getFollowers() {
        $.ajax({
            url: '../php/getFollowers.php',
            type: 'post',
            data: {user_id: $scope.userID},
            success: function (result) {
                let re = result;
                let followerList = [];
                for(let i=0;i<re.length;i++){
                    let user = {};
                    user.username = re[i]['username'];
                    user.id = re[i]['id'];
                    if(re[i]['nickname'] == null){
                        user.nickname = re[i]['username'];
                    }
                    else{
                        user.nickname = re[i]['nickname'];
                    }
                    user.profile_pic = re[i]['profile_pic'];
                    followerList.push(user);
                }
                $scope.followerList = followerList;
                $scope.followers = followerList.length;
                if($scope.followers ==0 ){
                    document.getElementById("follower-holder").style.display = "block";
                }
                else{
                    document.getElementById("follower-holder").style.display = "none";
                }
                $scope.$digest();
                document.getElementById("ng-followers").style.display =  "inline-block";
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }

    // get all followering
    function getFollowings() {
        $.ajax({
            url: '../php/getFollowings.php',
            type: 'post',
            data: {user_id: $scope.userID},
            success: function (result) {
                let re = result;
                let followingList = [];
                for(let i=0;i<re.length;i++){
                    let user = {};
                    user.username = re[i]['username'];
                    if(re[i]['nickname'] == null){
                        user.nickname = re[i]['username'];
                    }
                    else{
                        user.nickname = re[i]['nickname'];
                    }
                    user.id = re[i]['id'];
                    user.profile_pic = re[i]['profile_pic'];
                    followingList.push(user);
                }
                $scope.followingList = followingList;
                $scope.followings = followingList.length;
                if($scope.followings == 0){
                    document.getElementById("following-holder").style.display = "block";
                }
                else{
                    document.getElementById("following-holder").style.display = "none";
                }
                $scope.$digest();
                document.getElementById("ng-followings").style.display =  "inline-block";
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }

    function checkFollow() {
        $.ajax({
            url:'../php/checkFollow.php',
            type: 'post',
            data: {viewed_id:$scope.userID},
            success: function(result){
                if(result>0) {
                    $scope.status = 'Following';
                }
                else{
                    $scope.status = 'Follow';
                }
                $scope.$digest();
                document.getElementById("ng-status").style.display =  "inline-block";
            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }
})