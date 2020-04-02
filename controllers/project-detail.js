app.controller('projectDetailCtrl', function($scope, $http, $window, $location, $anchorScroll) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var scroll = true;
    $(window).scroll(function () {
        if(angular.element("#fade") != null) {
           scroll = angular.element("#fade").is(":hidden");
        }
      if ($(window).scrollTop()>= $("#recommend").position().top + $("#recommend").outerHeight(true) && scroll) {
        $("#top").attr("style", "#898989; width: 300px; z-index: 100006; position: fixed; top:40%;transform: translateY(-80%)");
      } else {
         $("#top").attr("style", "");
      }
    }).trigger("scroll");
    

    
    //$scope.projectId = 5701;
   // $scope.projectId = $window.localStorage.getItem("projectId");
    var url = $window.location.search;
    if(url.indexOf("=")>-1) {
        $scope.projectId = url.substr(url.indexOf("=")+1);
    } else {
        $window.location.href="404.html";
    }
    $scope.userId = "guest";
    $scope.isLoad = false;
    $scope.isSameUser = false;
    $scope.isLoadingName = true;
    $scope.isGuest = true;
    $scope.isLike = false;
    $scope.isBookmark = false;
    
    // parse project content from json format
    $scope.onLoad = function() {
      
      // check log-in session
      $http({
          url: "../php/checkSession.php",
          method: "GET"
      }).then(function (response) {
          console.log(response);          
          if (response == "guest"){
              $scope.isGuest = true;
              console.log("guest");
          }
          else{
              $scope.isGuest = false;
              $scope.userId = response.data;
              console.log("user id:" + $scope.userId);
          }
      }, function (response) {
          console.log(response);
      }); 
        
      $http({
            url: "../php/getProjectInfo.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
//          console.log("get project info. success");
          console.log(response.data);
          
          var isValidData = false;
          for (var i = 0; i < response.data.length; ++i)
          {
              var dataArray = response.data[i];
              var dataHeader = dataArray[0];
//              console.log(dataHeader);
              
              if (dataHeader == "Project_Information")
              {
                  isValidData = true;
                  $scope.parseProjectInfo(dataArray[1]);
              }
              
              if (dataHeader == "Project_Descriptions")
              {
                  $scope.parseDescription(dataArray[1]);
              }
              
              if (dataHeader == "Project_Tags")
              {
                  $scope.parseTag(dataArray[1]);
              }
          }
          if (!isValidData)
          {
              console.log("no valid data");
              $scope.showErrorPage();
          }  else {
              $scope.getSimilarProjects();
          }  
      }, function (response) {
            console.log("fail");
            console.log(response.data,response.status);
            $scope.showErrorPage();
      }); //$http
        
//        if ($scope.userId != "guest")
//        {
//            console.log("check status");
//            $scope.checkFollow();
//            $scope.checkLike();
//            $scope.checkBookmark();  
//            $scope.updateViewCount();
//        }

        $scope.getComment();
    }

    $scope.parseProjectInfo = function(infoArray)
    {
        console.log(infoArray);
        if (infoArray.length == 0)
        {
           console.log("no project info");
           scope.showErrorPage();
        }
        else
        {
           var stringifyObj = JSON.stringify(infoArray[0]);
           var projectInfo = JSON.parse(stringifyObj);
           console.log(projectInfo.owner_id);
           $scope.ownerID = projectInfo.owner_id;
           $scope.projectTitle = projectInfo.projectName;
           $scope.category = projectInfo.category;
           $scope.authorName = projectInfo.username;
           var uploadTime = projectInfo.uploadTime;
           uploadTime = uploadTime.slice(0, -7);
           $scope.uploadTime = uploadTime;
           $scope.imgSrc = projectInfo.pictureURL;
           $scope.fileSrc = projectInfo.fileURL;
           $scope.fileName = $scope.fileSrc.replace(/^.*[\\\/]/, '');
           $scope.viewCount = projectInfo.views;
           $scope.likeCount = projectInfo.likes;
            
           if ($scope.ownerID == $scope.userId)
           {
               console.log("ownerID: " + $scope.ownerID);
               console.log("same user");
               $scope.isSameUser = true;
           }
            
           if ($scope.userId != "guest")
           {
                $scope.checkStatus();
           }
           
           $scope.isLoad = true;
        }         
    }
    
    $scope.parseDescription = function(desArray)
    {
//        console.log(desArray);
        $scope.descriptionList = [];
        for (var i = 0; i < desArray.length; ++i)
        {
            var desInfo = desArray[i];
            $scope.descriptionList.push({
                "title": desInfo.description_titles,
                "content": desInfo.descriptions
            });
        }
    }
    
    $scope.parseTag = function(tagArray)
    {
        if (tagArray.length > 0)
        {
            $scope.tagList = [];
            var tagString = tagArray[0].tag;
            $scope.tagList = tagString.split(',');        
        }
    }

    $scope.checkStatus = function()
    {
        $scope.checkFollow();
        $scope.checkLike();
        $scope.checkBookmark();  
        $scope.updateViewCount();       
    }
    
    $scope.updateViewCount = function()
    {
         console.log("update view count");
         $http({
            url: "../php/increaseViewCount.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
//            console.log(response);
             $scope.viewCount = Number($scope.viewCount) + 1;
//            $scope.isLike = true;
        }, function (response) {
            console.log(response);
        });          
    }
    
    $scope.getComment = function()
    {
        console.log("get comment");
        
        $http({
            url: "../php/getComment.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
            //console.log(response.data);
            $scope.parseComment(response.data[1]);
        }, function (response) {
            console.log("get comment fail");
            console.log(response.data,response.status);
        }); //$http
    }
    
    $scope.parseComment = function(commentArray)
    {
        $scope.commentList = [];
        for(var i = 0; i < commentArray.length; ++i)
        {
            var commentInfo = commentArray[i];
            $scope.commentList.push({ 
                "content" : commentInfo.comment,
                "user": "",
                "time" : commentInfo.comment_date.slice(0, -7)
            });
            $scope.getNicknameList(i, commentInfo.user_id);
        }
    }
    
    $scope.getNicknameList = function(i, userId)
    {
        $http({
            url: "../php/getProfile.php",
            method: "POST",
            data:  $.param({
                user_id: userId
            }),
        }).then(function (response) {
            var userProfile = response.data[0];
            $scope.commentList[i].user = userProfile.nickname;
            $scope.isLoadingName = false;
        }, function (response) {
            console.log(response);
            console.log("get user profile fail");
        });                  
    }
    
    $scope.submitComment = function()
    {   
        $http({
            url: "../php/Addcomment.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId,
                addcomment: $scope.commentContent
            }),
        }).then(function (response) {
            console.log("add comment success");
            $scope.commentContent = "";
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.getComment();
            $("#comments").load(location.href + " #comments");
        }, function (response) {
            console.log(response);
            console.log("add comment fail");
        });       
        
        console.log("submit comment");    
    }    
    
    $scope.checkLike = function()
    {
         // check like
        $http({
            url: "../php/checkLike.php",
            method: "POST",
            data:  $.param({
                project_id: $scope.projectId
            }),
        }).then(function (response) {
            var likeCount = response.data;
            if (likeCount > 0)
            {
                console.log('like count exist');
                $scope.isLike = true;
                $scope.like_text = "Liked"
            }
            else
            {
                $scope.isLike = false;
                $scope.like_text = "Like"
            }                
        }, function (response) {
            console.log(response);
            console.log("check like fail");
        });       
    }
    
    $scope.pressLike = function()
    {
        if ($scope.userId == "guest")
        {
            $scope.signinPopup();
        }
        else
        {
            if ($scope.isLike)
            {
                $scope.decreaseLikeCount();
            }
            else
            {
                $scope.increaseLikeCount();
            }        
        }
    }
    
    $scope.increaseLikeCount = function()
    {
        $http({
            url: "../php/increaseLikeCount.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
            console.log("increase like success");
            $scope.likeCount = Number($scope.likeCount) + 1;
            $scope.isLike = true;
            $scope.like_text = "Liked"
        }, function (response) {
            console.log(response);
            console.log("decrease like fail");
        });       
    }
    
    $scope.decreaseLikeCount = function()
    {
         $http({
            url: "../php/decreaseLikeCount.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
             console.log(response);
            console.log("decrease like success");   
            $scope.likeCount = Number($scope.likeCount) - 1;
            $scope.isLike = false;
            $scope.like_text = "Like"
        }, function (response) {
            console.log(response);
            console.log("decrease like fail");
        });          
    }       

    $scope.checkBookmark = function()
    {
         $http({
            url: "../php/checkBookmark.php",
            method: "POST",
            data:  $.param({
                project_id: $scope.projectId
            }),
        }).then(function (response) {
            var bookmarkCount = response.data;
            //console.log(response);
            if (bookmarkCount > 0)
            {
                console.log("bookmark exist");
                $scope.isBookmark = true;
                $scope.bookmark_text = "Bookmarked"
            }
            else
            {
                console.log("bookmark not exist");
                $scope.isBookmark = false;
                $scope.bookmark_text = "Bookmark"
            }                
        }, function (response) {
            console.log(response);
            console.log("bookmark check fail");
        });         
    }
    
    $scope.pressBookmark = function()
    {
        if ($scope.userId == "guest")
        {
            $scope.signinPopup();
        }
        else
        {
            if ($scope.isBookmark)
            {
                $scope.deleteBookmark();
            }
            else
            {
                $scope.addBookmark();
            }
        }
    }

    $scope.addBookmark = function()
    {
        $http({
            url: "../php/addBookmark.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
            console.log("add bookmark success");
            $scope.isBookmark = true;
            $scope.bookmark_text = "Bookmarked"
        }, function (response) {
            console.log(response);
            console.log("add bookmark fail");
        });            
    }
    
    $scope.deleteBookmark = function()
    {
        $http({
            url: "../php/deleteBookmark.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
            console.log("delete bookmark success");
            $scope.isBookmark = false;
            $scope.bookmark_text = "Bookmark"
        }, function (response) {
            console.log(response);
            console.log("add bookmark fail");
        });            
    }
    
    $scope.checkFollow = function()
    {
        // check follow
        var isFollow = 0;
        $http({
            url: "../php/checkFollow.php",
            method: "POST",
            data:  $.param({
                viewed_id: $scope.ownerID
            }),
        }).then(function (response) {
            console.log(response);
            console.log("ownerID: " + $scope.ownerID);
            isFollow = response.data;
            if (isFollow > 0)
            {
                console.log("follow record exist");
                $scope.follow_text = "Unfollow"
                $scope.isFollow = true;
            }
            else
            {
                console.log("follow record not exist");
                $scope.follow_text = "Follow"
                $scope.isFollow = false;
            }                
        }, function (response) {
            console.log(response);
            console.log("follow check fail");
        });          
    }
    
    $scope.pressFollow = function()
    {
        if ($scope.userId == "guest")
        {
            $scope.signinPopup();
        }
        else
        {
            if ($scope.isFollow)
            {
                $scope.unfollow();
            }
            else
            {
                $scope.follow();
            }
        }
    }
    
    $scope.follow = function()
    {
         $http({
            url: "../php/followOthers.php",
            method: "POST",
            data:  $.param({
                viewed_id: $scope.ownerID
            }),
        }).then(function (response) {// on success
            //console.log(response);
            console.log("follow success");
            $scope.follow_text = "Unfollow";
            $scope.isFollow = true;
        }, function (response) {
            console.log(response);
            console.log("follow fail");
        });        
    }
    
    $scope.unfollow = function()
    {
        $http({
            url: "../php/unfollowFollowing.php",
            method: "POST",
            data:  $.param({
                following_id: $scope.ownerID
            }),
        }).then(function (response) {// on success
            //console.log(response);
            console.log("unfollow success");
            $scope.follow_text = "Follow";
            $scope.isFollow = false;
        }, function (response) {
            console.log(response);
            console.log("unfollow fail");
        });            
    }
    
    $scope.downloadFile = function()
    {
        console.log($scope.filePath);
        //window.location.assign("../project_file/why.jpg");
        window.location.assign($scope.filePath);
    }
    
    $scope.showErrorPage = function()
    {
//        alert("jump to 404 page");
        $window.location.href = "404.html";
    }

    $scope.viewAuthor = function () {
        window.location.href = "account.html?id="+$scope.ownerID;
    }
    
    $scope.signinPopup = function()
    {
        $("#top").attr("style", "");
        var pop_up = document.getElementById('light');
     document.getElementById('fade').style.display='block';
        pop_up.style.display = "block";
    }

    $scope.gotoAnchor = function (target) {
        //set the anchor point using an id
        $location.hash(target);
        $anchorScroll.yOffset = 100;
        //scroll to the new anchor point
        $anchorScroll();
    };    
    
    $scope.getSimilarProjects = function() {
        $http({
            url: "../php/getSimilarProjects.php",
            method: "POST",
            data:  $.param({
                category: $scope.category,
                projectId: $scope.projectId
            }),
            }).then(function (response) {// on success
                $scope.similarProjects = response.data[1];
                if($scope.similarProjects.length == 0) {
                    $scope.notFound = true;
                }
                console.log($scope.similarProjects);
                console.log("loaded");
            }, function (response) {
                $scope.notFound = true;
                console.log("fail");
                console.log(response.data,response.status);
                    //alert(response);
            });
    }
    
    $scope.getProjectDetail = function (projectId) {
        $window.localStorage.setItem("projectId",projectId);
        $window.location.href = "project-detail.html?id="+projectId;
    }
    
});	// app.controller