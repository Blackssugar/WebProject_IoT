app.controller('exploreCtrl', function($scope, $http,$compile,$window) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.notFound = false;
    var pagination = "";
    var projectsPerPage = 8;
    var url = $window.location.search;
    var currentPage = 1;
    var pullFromDatabase = true;
    $scope.sortTrigger = false;
    $scope.categoryTrigger = false;
    $scope.categorizedBy = "Any";
    $scope.sortedBy = "Any"
    if(url.indexOf("?")>-1) {
        pullFromDatabase = false;       
        if(url.indexOf("category=")>-1) {
            $scope.categoryTrigger = true;
            $scope.categorizedBy = url.substr(url.indexOf("category=")+9);
        }
        if(url.indexOf("sort=")>-1) {
            $scope.sortTrigger = true;
            if(url.includes("Recent")) {
                $scope.sortedBy = "Most Recent";
            }
            else if(url.includes("Views")) {
                $scope.sortedBy = "Most Views";
            } else {
                $scope.sortedBy = "Most Likes";
            }
        }
        currentPage = url.split("=")[1].charAt(0);
    }
    $scope.categoryList = [];
    $scope.loading = true;
    console.log(currentPage);
    var wholeList = [];
    $scope.onLoad = function() {
        if($scope.categoryTrigger && $scope.sortTrigger) {
            wholeList = JSON.parse($window.localStorage.getItem("sortedAndCategoriedList"));
            $scope.setupView();
            $scope.readCategory();
        }
        else if($scope.categoryTrigger && !$scope.sortTrigger) {
            wholeList = JSON.parse($window.localStorage.getItem("categorizedList"));
            $scope.setupView();
            $scope.readCategory();
        }
        else if($scope.sortTrigger && !$scope.categoryTrigger) {
            wholeList = JSON.parse($window.localStorage.getItem("sortedList"));
            $scope.setupView();
            $scope.readCategory();
        }
        else if(pullFromDatabase || $window.localStorage.getItem("projectList") == null) {
            console.log($window.localStorage.getItem("projectList")==null);
            $http({
                url: "../php/selectSort.php",
                method: "POST",
                data:  $.param({
                    sortOrder: "DESC",
                    sortType: "uploadTime"
                }),
            }).then(function (response) {// on success
                console.log("success");
                wholeList = response.data;
                $window.localStorage.setItem("projectList",JSON.stringify(response.data));
                $scope.setupView();
                $scope.readCategory();
            }, function (response) {
               console.log("fail");
               console.log(response.data,response.status);
               //alert(response);
            });  
        } else {
            wholeList = JSON.parse($window.localStorage.getItem("projectList"));
            $scope.setupView();
            $scope.readCategory();
        } 
    }
    
    $scope.sortByCategory = function($event) {
        angular.element( document.querySelector( '#pageJump' )).empty();
        $scope.notFound = false;
        $scope.loading = true;
        $scope.projectList = [];
        if(angular.element("#navbarDropdown").text()!="Any") {
            var sorted = JSON.parse($window.localStorage.getItem("sortedList"));
            var sortedAndCategorized = [];
            for(project of sorted) {
                if(project.category==$($event.currentTarget).text()) {
                    sortedAndCategorized.push(project);
                }
            }
            $window.localStorage.setItem("sortedAndCategoriedList",JSON.stringify(sortedAndCategorized));
            $window.location.href = "explore.html?p=1&sort="+angular.element("#navbarDropdown").text()+"&category="+$($event.currentTarget).text();
        //    console.log(JSON.parse($window.localStorage.getItem("sortedAndCategoriedList")));
        } else {
            $http({
                    url: "../php/selectFilter.php",
                    method: "POST",
                    data:  $.param({
                        category: $($event.currentTarget).text(),
                    }),
                }).then(function (response) {// on success
                  //  $window.localStorage.setItem("sortResult",JSON.stringify(response.data[1]));
                  //  console.log(JSON.parse($window.localStorage.getItem("sortResult")));
                    angular.element("#categoryDropdown").text($($event.currentTarget).text());
                    //angular.element("#navbarDropdown").text("Any");
                    //console.log(angular.element("#categoryDropdown").text());
                    $window.localStorage.setItem("categorizedList",JSON.stringify(response.data[1]));
                    $window.location.href = "explore.html?p=1&category="+$($event.currentTarget).text();
                }, function (response) {
                    console.log("fail");
                    console.log(response.data,response.status);
                    //alert(response);
                });
        }
    }
    
    $scope.sortByFeature = function($event) {
        angular.element( document.querySelector( '#pageJump' )).empty();
        $scope.notFound = false;
        $scope.loading = true;
        $scope.projectList = [];
        var feature = $($event.currentTarget).text();
        if(feature == "Most Recent") {
            feature = "uploadTime";
        }
        else if(feature == "Most Views") {
            feature = "views";
        } else {
            feature = "likes";
        }
        $http({
                url: "../php/selectSort.php",
                method: "POST",
                data:  $.param({
                    sortOrder: "DESC",
                    sortType: feature,
                }),
            }).then(function (response) {// on success
                console.log("success");
               // $window.localStorage.setItem("pageNumber", Math.ceil(response.data.length/projectsPerPage));
                //$window.localStorage.setItem("projectList",JSON.stringify(response.data));
            //    console.log(response.data);
                angular.element("#navbarDropdown").text($($event.currentTarget).text()); if(angular.element("#categoryDropdown").text()!="Any") {
                    var sortedAndCategorized = [];
                    for (project of response.data) {
                        if(project.category == angular.element("#categoryDropdown").text()) {
                            sortedAndCategorized.push(project);
                        }
                    }
                    $window.localStorage.setItem("sortedAndCategoriedList",
                                                 JSON.stringify(sortedAndCategorized));
                    $window.location.href = "explore.html?p=1&sort="+$($event.currentTarget).text()+
                        "&category="+angular.element("#categoryDropdown").text();
                } else {
                    $window.localStorage.setItem("sortedList",JSON.stringify(response.data));
                    $window.location.href = "explore.html?p=1&sort="+$($event.currentTarget).text();
                }
            }, function (response) {
               console.log("fail");
               console.log(response.data,response.status);
               //alert(response);
            }); 
    }
    
    $scope.clearFilter = function() {
        $window.location.href = "explore.html";
    }
    
    $scope.readCategory = function() {
        if((currentPage==1 && !$scope.categoryTrigger && !$scope.sortTrigger) ||
          $window.localStorage.getItem("categoryList")==null) {
            $http({
                url: "../php/getCategory.php",
                method: "POST",
            }).then(function (response) {// on success
                //$scope.categoryList = response.data[1];
                $window.localStorage.setItem("categoryList",JSON.stringify(response.data));
                $scope.categoryList = JSON.parse($window.localStorage.getItem("categoryList"))[1];
                
            }, function (response) {
                console.log("fail");
                console.log(response.data,response.status);
                   //alert(response);
            });
        } else {
            $scope.categoryList = JSON.parse($window.localStorage.getItem("categoryList"))[1];
            console.log($scope.categoryList);
        }
    }
    
    $scope.setupView = function() {
        if(wholeList==null) {
            $window.location.href = "404.html";
        }
        pagination = "";
        var pageNumber = Math.ceil(wholeList.length/projectsPerPage);
        console.log(wholeList);
        var startIndex = projectsPerPage * (currentPage - 1);
        var endIndex = projectsPerPage * currentPage;
        $scope.projectList = wholeList.slice(startIndex,endIndex);
        if(currentPage==1){
            pagination += "<li class='page-item disabled'><a class='page-link' href='' tabindex='-1'>" + "Previous" + "</a></li>";
        } else {
            pagination += "<li class='page-item'><a class='page-link' href='' ng-click='previousPage($event)'>" + "Previous" + "</a></li>";
        }
        if(currentPage<7) {
            for(var i=1;i<10;i++) {    
                if(i>pageNumber) {
                    break;
                }
                if(i==currentPage) {
                   pagination += "<li class='page-item active'><a class='page-link' href=''>" + i + "</a></li>"; 
                } else {
                    pagination += "<li class='page-item'><a class='page-link' href='' ng-click='jumpPage($event)'>" + i + "</a></li>"; 
                }
            }
        } else {
            var startingIndex = currentPage - 6;
            for(var i=startingIndex;i<startingIndex+9;i++) {    
                 if(i>pageNumber) {
                    break;
                }
               if(i==currentPage) {
                   pagination += "<li class='page-item active'><a class='page-link' href=''>" + i + "</a></li>"; 
               } else {
                  pagination += "<li class='page-item'><a class='page-link' href='' ng-click='jumpPage($event)'>" + i + "</a></li>"; 
               }
          }
      }
        if(currentPage==pageNumber || pageNumber==0){
            pagination += "<li class='page-item disabled'><a class='page-link' href='' tabindex='-1'>" + "Next" +   "</a></li>";
        } else {
            pagination += "<li class='page-item'><a class='page-link' href='' ng-click='nextPage($event)'>" +  "Next" + "</a></li>";
        }
        console.log(pagination);
        $scope.loading = false;
        if($scope.projectList.length==0) {
            $scope.notFound = true;
        }
        angular.element( document.querySelector( '#pageJump' )).empty().append($compile(pagination)($scope));
    }
    
    $scope.nextPage = function ($event) {
       // console.log(angular.element( document.querySelector( '#pageJump' )).empty());
        currentPage = +currentPage + 1;
       // $scope.setupView();
        if($scope.sortTrigger || $scope.categoryTrigger) {
            $window.location.href = "explore.html?p="+currentPage+url.substr(url.indexOf("&"));
        } else {
            $window.location.href = "explore.html?p="+currentPage;
        }
    }
    
    $scope.jumpPage = function ($event) {
        var destinatePage = parseInt($($event.currentTarget).text(),10);
        currentPage = destinatePage;
       // $scope.setupView();
        if($scope.sortTrigger || $scope.categoryTrigger) {
            $window.location.href = "explore.html?p="+currentPage+url.substr(url.indexOf("&"));
        } else {
            $window.location.href = "explore.html?p="+currentPage;
        }
    }
    
    $scope.previousPage = function ($event) {
        currentPage -= 1;
     //   $scope.setupView();
        if($scope.sortTrigger || $scope.categoryTrigger) {
            $window.location.href = "explore.html?p="+currentPage+url.substr(url.indexOf("&"));
        } else {
            $window.location.href = "explore.html?p="+currentPage;
        }
      //  $window.location.href = "explore.html";
    }
    
    // get project data and redirect to the project detail page
    $scope.getProjectDetail = function (projectId) {
        $window.location.href = "project-detail.html?id="+projectId;
    }
});	// app.controller
