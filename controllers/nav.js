app.controller('navCtrl', function($scope, $window, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.checkLogin = function() {
        $scope.userId = $window.localStorage.getItem("userId");
        console.log($scope.userId);
        console.log(document.cookie);
        if(document.cookie.indexOf("PHPSESSID")>=0){
            if($scope.userId==null ||  $scope.userId=="guest") {
                $http({
                    url: "../php/checkSession.php",
                    method: "POST",
                }).then(function (response) {// on success
                    console.log("login success");
                    console.log(response.data);
                    $window.localStorage.setItem("userId",response.data);
                    $scope.userId = response.data;
                    console.log($scope.userId);
                    $scope.login = true;
                    if($scope.userId=="guest") {
                        $scope.login = false;
                    } else {
                        $scope.readUserProfile();
                    }
                }, function (response) {
                    $scope.login = false;
                    console.log("login fail");
                    console.log(response.data,response.status);
                    //alert(response);
                });  
            } else {
                $scope.login = true;
                $scope.profileImg = $window.localStorage.getItem("profileImg");
                $scope.userName = $window.localStorage.getItem("userName");
            }
        } else {
            $scope.login = false;
        }
    }
    
    $scope.readUserProfile = function() {
        console.log($scope.login);
        if($scope.login) {
            $http({
                url: "../php/getProfile.php",
                method: "POST",
                data:  $.param({
                        user_id: $scope.userId,
                    }),
            }).then(function (response) {// on success
                console.log("read profile success");
                $scope.profileImg = response.data[0].profile_pic;
                $window.localStorage.setItem("profileImg",response.data[0].profile_pic);
                $scope.userName = response.data[0].username;
                $window.localStorage.setItem("userName",response.data[0].username);
                console.log(response.data[0]);
            }, function (response) {
                console.log("read profile fail");
                console.log(response.data,response.status);
                //alert(response);
            });
        }
    }
    
    // add project button
    $scope.addProject = function(eveparam) {
        if($scope.login) {
    $window.location.href = "upload-project.html";
}
    else{
        var r=confirm("Go to login!")
  if (r==true)
    {
     $window.location.href = "login.html";
    }
  else
    {
    }  
        
 
        
    } };    
    // sign in button
    $scope.signIn = function() {
        // alert("sign in")  
    };

    $scope.viewProfile = function(){
        window.location.href = "account.html?id="+$scope.userId;
    }

    $scope.Logout = function(){
        var con = confirm("Are you sure to Log out?");
        if(con == true){
            $.ajax({
                url:"../php/logout.php",
                type:"post",
                success:function (result) {
                    if(result=="OK"){
                        alert("Logout Successfully!");
                        $window.localStorage.removeItem("userId");
                        location.reload();
                    }
                    else{
                        alert(result);
                    }
                },
                error: function (jqXHR, textStatus, err) {
                    alert('text status ' + textStatus + ', err ' + err);
                }
            })
        }
    }
    
    $scope.search = function(keyword) {
        if(keyword) {
            console.log(keyword);
            $http({
                    url: "../php/searchByKeyword.php",
                    method: "POST",
                    data:  $.param({
                        keyword: keyword,
                        tag: keyword,
                    }),
                }).then(function (response) {// on success
                    console.log("success");
                    console.log(response.data);
                    $window.localStorage.setItem("projectList",JSON.stringify(response.data[1]));
                    $window.location.href = "explore.html?p=1";
                }, function (response) {
                    console.log("fail");
                    console.log(response.data,response.status);
                    //alert(response);
                });
        }
    }
    
});	// app.controller