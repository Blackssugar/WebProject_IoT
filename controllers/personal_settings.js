
var app = angular.module('personalSettings',[]);

app.controller('settingsCtrl', function($scope){
  $scope.data = {
    current : "1"
  };

  var userID = "-1";
  $scope.userID = userID;

  $scope.actions = {
    setCurrent: function (param) {
        $scope.data.current = param;
        var obj1 = document.getElementById('nav1');
        var obj2 = document.getElementById('nav2');
        var obj3 = document.getElementById('nav3');
        var obj4 = document.getElementById('nav4');
        var obj5 = document.getElementById('nav5');
        var obj6 = document.getElementById('nav6');

        if(param == "1"){
          obj1.className = 'nav-item active';
          obj2.className = 'nav-item';
          obj3.className = 'nav-item';
          obj4.className = 'nav-item';
          obj5.className = 'nav-item';
          obj6.className = 'nav-item';
        }
        if(param == "2"){
          obj1.className = 'nav-item';
          obj2.className = 'nav-item active';
          obj3.className = 'nav-item';
          obj4.className = 'nav-item';
          obj5.className = 'nav-item';
          obj6.className = 'nav-item';
        }
        if(param == "3"){
          $(document).ready(function() {
            $('#projectTable').DataTable();
          });
          obj1.className = 'nav-item';
          obj2.className = 'nav-item';
          obj3.className = 'nav-item active';
          obj4.className = 'nav-item';
          obj5.className = 'nav-item';
          obj6.className = 'nav-item';
        }
        if(param == "4"){
            $(document).ready(function() {
                $('#bookmarksTable').DataTable();
            });
            obj1.className = 'nav-item';
          obj2.className = 'nav-item';
          obj3.className = 'nav-item';
          obj4.className = 'nav-item active';
          obj5.className = 'nav-item';
          obj6.className = 'nav-item';
        }
        if(param == "5"){
          $(document).ready(function() {
          $('#followerTable').DataTable();
        });
          obj1.className = 'nav-item';
          obj2.className = 'nav-item';
          obj3.className = 'nav-item';
          obj4.className = 'nav-item';
          obj5.className = 'nav-item active';
          obj6.className = 'nav-item';
        }
        if(param == "6"){
          $(document).ready(function() {
          $('#followingTable').DataTable();
        });
          obj1.className = 'nav-item';
          obj2.className = 'nav-item';
          obj3.className = 'nav-item';
          obj4.className = 'nav-item';
          obj5.className = 'nav-item';
          obj6.className = 'nav-item active';
        }
    }
  };

      // check session
      $.ajax({
          url:"../php/checkSession.php",
          type:"get",
          success: function(result){
              $scope.sessionStatus = result;
              if(result == "guest"){
                window.location.href = "login.html";
              }
              else{
                console.log(result + "llklklklklk");
                $scope.userID = result;
                $scope.$digest();
                getProfile();
                getProjects();
                getFollowers();
                getFollowings();
                getBookmarks();
              }
          },
          error: function(jqXHR, textStatus, err){
              alert('text status '+textStatus+', err '+err);
          }
      })



//   $scope.email = "1111@cc.com";
//   $scope.job = "developer";
//   $scope.publicEmail = "22222@qq.com";
//   $scope.location = "Sydney";
//   $scope.birthday = new Date("2012-10-11");
//   $scope.nickname = "JOJO";
//   $scope.introduction = "Hello World!";
  $scope.allProjects = [
//     {
//       "projectID":"1",
//       "img":"http://placehold.it/500x325",
//       "title":"project1",
//       "author":"author1",
//       "time":"2017",
//     },
//     {
//       "projectID":"2",
//       "img":"http://placehold.it/500x325",
//       "title":"project1",
//       "author":"author1",
//       "time":"2017",
//     },
//     {
//       "projectID":"3",
//       "img":"http://placehold.it/500x325",
//       "title":"project1",
//       "author":"author1",
//       "time":"2017",
//     },
//     {
//       "projectID":"4",
//       "img":"http://placehold.it/500x325",
//       "title":"project1",
//       "author":"author1",
//       "time":"2017",
//     }
];
  $scope.followersList = [];
  $scope.followingList = [];
  $scope.bookmarkList = [
  //   {
  //   "projectID":"1",
  //   "img":"https://source.unsplash.com/QAB-WJcbgJk/60x60",
  //   "title":"project1",
  //   "author":"author1",
  //   "time":"2017",
  // },
  // {
  //   "projectID":"2",
  //   "img":"https://source.unsplash.com/QAB-WJcbgJk/60x60",
  //   "title":"project1",
  //   "author":"author1",
  //   "time":"2017",
  // },
  // {
  //   "projectID":"3",
  //   "img":"https://source.unsplash.com/QAB-WJcbgJk/60x60",
  //   "title":"project1",
  //   "author":"author1",
  //   "time":"2017",
  // },
  // {
  //   "projectID":"4",
  //   "img":"https://source.unsplash.com/QAB-WJcbgJk/60x60",
  //   "title":"project1",
  //   "author":"author1",
  //   "time":"2017"}
  ];



  // get user profile
  function getProfile() {

      console.log($scope.userID);
      $.ajax({
          url: '../php/getProfile.php',
          type: 'post',
          dataType: 'json',
          data: {user_id: $scope.userID},
          success: function (result) {
              let re = result[0];
              for (key in re) {
                if (key == "profile_pic"){
                  $scope.picSrc = re[key];
                  console.log($scope.picSrc);
                }
                  if (key == "email"){
                    $scope.email = re[key];
                  }
                  if (key == "job"){
                    $scope.job = re[key];
                  }
                  if (key == "publicEmail"){
                    $scope.publicEmail = re[key];
                  }
                  if (key == "location"){
                    $scope.location = re[key];
                  }
                  if (key == "dob"){
                    $scope.birthday = new Date(re[key]);
                  }
                  if (key == "introduction"){
                    $scope.introduction = re[key];
                  }
                  if (key == "nickname"){
                      $scope.nickname = re[key];
                  }
                  if (key == "username"){
                      $scope.username = re[key];
                  }
              }
              // $scope.username = re['username'];
              $scope.$digest();
          },
          error: function (jqXHR, textStatus, err) {
              alert('text status ' + textStatus + ', err ' + err);
          }
      });
    }
  //save user profile
    $scope.saveProfile = function(){
      var birthD =$("#birthday").val();
      var birthday = birthD.toString();
      console.log(birthday);
      $.ajax({
        url:'../php/updateProfile.php',
        type:'post',
          // ,icon:$('#input_file')[0].files[0] ,icon:file
        data:{user_id: $scope.userID,nickname:$('#nick_name').val(),job:$("#job").val(),location:$("#location").val(),publicEmail:$("#public_email").val(),birthday:birthday,introduction:$("#personal_description").val()},
        success:function(result){
          if(result=="Success"){
            alert("Submit success!");

            // $scope.job = $('#job').val();
            // $scope.publicEmail = $('#public_email').val();
            // $scope.location = $('#location').val();
            // $scope.birthday = $('#nicbirthdayk_name').val();
            // $scope.nickname = $('#nick_name').val();
            // $scope.introduction = $('#personal_description').val();
            // $scope.$digest();
            window.location.href = "personalSettings.html";
          }
          else {
            alert(result);
          }
        }
      });
    }

    //change Email
    $scope.updateEmail = function()
    {
        var email=document.getElementById( "email" ).value;
        var emailInputBox = document.getElementById('email');
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(email==""){
            $( '#email_status' ).html("Email can not be empty!");
        }
        else if(!pattern.test(email)){
            $( '#email_status' ).html("Wrong Email Format! Please check!");
        }
        else {
          // $( '#email_status' ).html("");
          $.ajax({
              type: 'post',
              url: '../php/updateEmail.php',
              data: {
                user_id: $scope.userID,
                email:email
              },
              dataType: 'text',
              success: function (response) {
                  console.log(response);
                  if(response==="OK")
                  {
                      $( '#email_status' ).html("");
                      alert("Update suceessfully!");
                      $scope.email = email;
                      $scope.$digest();
                      emailInputBox.value = $scope.email;
                  }
                  else
                  {
                      $( '#email_status' ).html(response);
                      emailInputBox.value = $scope.email;
                  }
              },
              error: function (jqXHR, textStatus, err) {
                  alert('text status ' + textStatus + ', err ' + err);
              }
          });
        }
    }


    //change password
    $scope.updatePwd = function(){
        if($('#password').val()!="" && $('#newPassword').val()!="" && $('#confirmPassword').val()!="" && $('#new_pass_status').val()=="" && $('#confirm_pass_status').val()==""){
            $.ajax({
                url:'../php/updatePassword.php',
                type: 'post',
                data: {user_id: $scope.userID, oldPassword:$('#password').val(),newPassword:$('#newPassword').val()},
                success: function(result){
                    if(result == "OK"){//need to comfirm with backend
                        alert("Update suceessfully!");
                        //here need to clear input box
                        $scope.clearPwdInput();
                    }
                    if(result === "Error"){//password is not correct
                      $('#pre_pass_status').html("Previous password is not correct!");
                    }
                    console.log(result);
                },
                error: function(jqXHR, textStatus, err){
                    alert('text status '+textStatus+', err '+err);
                }
            })
        }
        else{
            alert("Please give the necessary input!");
        }
    }

    //reset email input
    $scope.clearEmailInput = function () {
      var email = document.getElementById('email');
      email.value = $scope.email;
    }
    //clear password input boxs
    $scope.clearPwdInput = function () {
      var prePwd = document.getElementById('password');
      var newPwd = document.getElementById('newPassword');
      var conPwd = document.getElementById('confirmPassword');

      prePwd.value = "";
      newPwd.value = "";
      conPwd.value = "";
    }
    //reset profile input
    $scope.resetProfile = function(){
      window.location.href = "personalSettings.html";
    }

    //get all projects
    function getProjects() {
        $.ajax({
            url: '../php/getProjects.php',
            type: 'post',
            data: {ownerId: $scope.userID},
            success: function (result) {
                console.log(result);
                re = result[1];
                for (var i = 0, len = re.length; i < len; i++){
                    var pretime = re[i]["uploadTime"];
                    re[i]["uploadTime"] = pretime.slice(0, -7);
                }
                $scope.allProjects = re;
                $scope.$digest();
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }
    //get all bookmarks
    function getBookmarks() {
        $.ajax({
            url: '../php/getBookmarks.php',
            type: 'post',
            success: function (result) {
                console.log(result);
                re = result[1];
                for (var i = 0, len = re.length; i < len; i++){
                    if(re[i]["nickname"]== null){
                        re[i]["nickname"] = re[i]["username"];
                    }
                }
                $scope.bookmarkList = re;
                $scope.$digest();
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status book ' + textStatus + ', err ' + err);
            }
        })
    }

    //get all followers
    function getFollowers() {
        $.ajax({
            url: '../php/getFollowers.php',
            type: 'post',
            data: {user_id: $scope.userID},
            success: function (result) {
                var re = result;
                let followerList = [];
                for(let i=0;i<re.length;i++){
                    let user = {};
                    user.username = re[i]['username'];
                    user.id = re[i]['id'];
                    if (re[i]['nickname'] == null){
                        user.nickname = user.username;
                    }
                    else {
                        user.nickname = re[i]['nickname'];
                    }
                    user.profile_pic = re[i]['profile_pic'];
                    followerList.push(user);
                }
                $scope.followerList = followerList;
                $scope.$digest();
                console.log(followerList);
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status follower' + textStatus + ', err ' + err);
            }
        })
    }

    // get all followings
    function getFollowings() {
        $.ajax({
            url: '../php/getFollowings.php',
            type: 'post',
            data: {user_id: $scope.userID},
            success: function (result) {
                console.log(result);
                let re = result;
                let followingList = [];
                for(let i=0;i<re.length;i++){
                    let user = {};
                    user.username = re[i]['username'];
                    user.id = re[i]['id'];
                    if (re[i]['nickname'] == null){
                        user.nickname = user.username;
                    }
                    else {
                        user.nickname = re[i]['nickname'];
                    }

                    user.profile_pic = re[i]['profile_pic'];
                    followingList.push(user);
                }
                $scope.followingList = followingList;
                $scope.$digest();
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status following' + textStatus + ', err ' + err);
            }
        })
    }

    //delete single project
    $scope.deleteProject = function(projectID) {
      //set this tr invisible
      // var tr = document.getElementById(projectID);
      // tr.style.display="none";
        console.log(projectID);
        var proList = [];
        proList.push(projectID);
      $.ajax({
          url: '../php/deleteProject.php',
          type: 'post',
          data: {project_id: proList},//in php, it is []
          success: function (response) {
            if(response==="OK")
            {
              //set this tr invisible
              // var tr = document.getElementById(projectID);
              // tr.style.display="none";
                getProjects();
            }
            else
            {
                alert(response);
            }
        },
          error: function (jqXHR, textStatus, err) {
              alert('text status 11111 ' + textStatus + ', err ' + err);
          }
      })

    }
    //delete single bookmark
    $scope.deleteBookmark = function(projectID) {
      //set this tr invisible
      // var tr = document.getElementById(projectID);
      // tr.style.display="none";

      $.ajax({
            url: '../php/deleteBookmark.php',
            type: 'post',
            data: {projectId: projectID,user_id: $scope.userID},
            success: function (response) {
                if(response==="OK")
                {
                    console.log(response);
                    //set this tr invisible
                    // var tr = document.getElementsByName(projectID)[0];
                    // tr.style.display = "none";
                    getBookmarks();
                }
                else
                {
                    alert(response);
                }
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }

    // get bookmark project data and redirect to the project detail page
    $scope.getBookmarksDetail = function (projectId) {
        window.location.href = "project-detail.html?id="+projectId;

    }

    // get follower's detail data and redirect to user account page
    $scope.viewFollower = function(uID){
        window.location.href = "account.html?id="+uID;
    }
    // get following's detail data and redirect to user account page
    $scope.viewFollowing = function(uID){
        window.location.href = "account.html?id="+uID;
    }

    $scope.editProject = function(proID) {
      window.localStorage.setItem("projectId",proID);
      window.location.href = "edit-project.html";
    }

})

function clearPwdSpan() {
    $('#pre_pass_status').html("");
}
function checkNewPwd(){
  var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  var pwd = $('#newPassword').val();
  if(pwd == ""){
      $('#new_pass_status').html("New password cannot be empty!");
  }
  else if(pwd.length<8){
      $('#new_pass_status').html("New password length cannot be less than 8!");
  }
  else if(!pattern.test(pwd)){
      $('#new_pass_status').html("New password must contain at least one Letter, one Number and one Special character!");
  }
  else{
      $('#new_pass_status').html("");
  }
}
function confirmPwd(){
    var pwd = $('#newPassword').val();
    var cpwd = $('#confirmPassword').val();
    if(pwd != cpwd){
        $('#confirm_pass_status').html("Inconsistent Password!");
    }
    else{
        $('#confirm_pass_status').html("");
    }
}
function imgPreview(fileDom) {
	//判断是否支持FileReader
	if(window.FileReader) {
		var reader = new FileReader();
	} else {
		alert("Device doesn't support image upload, please update device.");
	}
	//获取文件
	var file = fileDom.files[0];
	var imageType = /^image\//;
	//是否是图片
	if(!imageType.test(file.type)) {
		alert("请选择图片！");
		return;
	}
	//读取完成
	reader.onload = function(e) {
		//获取图片dom
		var img = document.getElementById("preview");
		//图片路径设置为读取的图片
        img.src = e.target.result;

    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    // var iconFile = $('#input_file')[0].files[0];
    formData.append('icon', $('#input_file')[0].files[0]);

    var r=confirm("Are you sure to change icon?");
    if (r==true) {

        $.ajax({
            url: '../php/saveProfile.php',
            type: 'post',
            data: formData,
            processData: false,  // 增加这一行，不处理参数
            contentType:false,
            success: function (response) {
                console.log(response);
                if(response==="OK")
                {
                    alert ("Update icon successfully!");
                    // img.src = e.target.result;
                    window.location.href = "personalSettings.html";
                }
                else
                {
                    alert(response);
                }
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        });
    }
}
