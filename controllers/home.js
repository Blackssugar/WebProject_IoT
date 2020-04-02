app.controller('homeCtrl', function($scope, $window, $http) {

    $scope.loading = true;
    var loaded = 0;
    
    $scope.loadMostRecent = function () {
         $http({
                url: "../php/getMostRecentProjects.php",
                method: "POST",
            }).then(function (response) {// on success
                console.log("success");
                $scope.mostRecentProjects = response.data[1];
                console.log(response.data[1]);
                $scope.currentProject1 = $scope.mostRecentProjects;
                loaded += 1;
                if(loaded > 2) {
                    $scope.loading = false;
                }
            }, function (response) {
               console.log("fail");
               console.log(response.data,response.status);
               //alert(response);
            }); 
    }
    
    $scope.loadMostPopular = function () {
         $http({
                url: "../php/getMostPopularProjects.php",
                method: "POST",
            }).then(function (response) {// on success
                console.log("success");
                $scope.mostPopularProjects = response.data[1];            
                console.log(response.data[1]);
                $scope.currentProject2=$scope.mostPopularProjects;
                loaded += 1;
                if(loaded > 2) {
                    $scope.loading = false;
                }
            }, function (response) {
               console.log("fail");
               console.log(response.data,response.status);
               //alert(response);
            }); 
    }
    
    $scope.loadUserMayLike = function () {
          $http({
                url: "../php/getYouMayLike.php",
                method: "POST",
            }).then(function (response) {// on success
                console.log("success");
                $scope.youMayLike = response.data[1];
                $scope.currentProject = $scope.youMayLike;
                console.log(response.data[1]);
                loaded += 1;
                if(loaded > 2) {
                    $scope.loading = false;
                }
            }, function (response) {
               console.log("fail");
               console.log(response.data,response.status);
               //alert(response);
            });  
    }
    

    // get project data and redirect to the project detail page
    $scope.getProjectDetail = function (projectID) {
        $window.location.href = "project-detail.html?id="+projectID;
    }    
    
    $scope.limit=3;
    $scope.loadMore = function(){
        $scope.limit = $scope.response.project_list.length
    }
    
    // YouMayLike part: click"<",">" to load more content
    var currentIndex=0;
    var currentIndex1=0;
    var currentIndex2=0;
 //   var currentIndex3=0;
    
    $scope.visibleNext1=false;//> hide
    $scope.visiblePrev1=false;//< show
    $scope.visibleTemp1=false;//temp hide
        
    $scope.changeYouMayLike=function(des){
        if(des === "next"){
            $scope.visiblePrev1=true;//< show
            $scope.visibleTemp1=true;//temp hide
            currentIndex=currentIndex+1;
            currentIndex<$scope.youMayLike.length? $scope.currentProject=$scope.youMayLike.slice(currentIndex):$scope.visibleNext1=!$scope.visibleNext1;           
/*            if(currentIndex<1){
                $scope.visible1=!$scope.visible1;
            }*/
  
            if(currentIndex===$scope.youMayLike.length-3){
                    $scope.visibleNext1=!$scope.visibleNext1;//> hide
            }     
           
        }else{
            $scope.visibleNext1=false;//> show
        
            currentIndex=currentIndex-1;
            
            currentIndex>0? $scope.currentProject=$scope.youMayLike.slice(currentIndex-1):$scope.visiblePrev1=!$scope.visiblePrev1;
            
            if(currentIndex===0){
                $scope.visibleTemp1=false;// temp show
                $scope.currentProject=$scope.youMayLike;
            }
            
            
           if(currentIndex===1){
                    $scope.visibleTemp1=false;// temp show
                    $scope.visiblePrev1=!$scope.visiblePrev1;
                    
               
            }

        }
    }
    
    

    
   // Most Recent part: click"<",">" to load more content 
    $scope.visibleNext2=false;//> hide
    $scope.visiblePrev2=false;//< show
    $scope.visibleTemp2=false;//temp hide
    
        $scope.changeMostRecent=function(des1){
        if(des1 === "next"){
    
            $scope.visiblePrev2=true;//< show
            $scope.visibleTemp2=true;//temp hide
            
            currentIndex1=currentIndex1+1;
            currentIndex1<$scope.mostRecentProjects.length? $scope.currentProject1=$scope.mostRecentProjects.slice(currentIndex1):$scope.visibleNext2=!$scope.visibleNext2; 

            if(currentIndex1===$scope.mostRecentProjects.length-3){
                    $scope.visibleNext2=!$scope.visibleNext2;//> hide
            }
           
        }else{
             $scope.visibleNext2=false;//> show
            currentIndex1=currentIndex1-1;
            currentIndex1>0? $scope.currentProject1=$scope.mostRecentProjects.slice(currentIndex1-1):$scope.visiblePrev2=!$scope.visiblePrev2;
            
            if(currentIndex1===0){
                $scope.visibleTemp2=false;// temp show
                $scope.currentProject1=$scope.mostRecentProjects;
            }
            
                       
           if(currentIndex1===1){
                    $scope.visiblePrev2=!$scope.visiblePrev2;
                    $scope.visibleTemp2=false;
            }

        }
    }
         
        
        
  // Most Popular part: click"<",">" to load more content   
        
    $scope.visibleNext3=false;//> hide
    $scope.visiblePrev3=false;//< show
    $scope.visibleTemp3=false;//temp hide
    
        $scope.changeMostPopular=function(des2){
        if(des2 === "next"){
            
            $scope.visiblePrev3=true;//< show
            $scope.visibleTemp3=true;//temp hide
            
            currentIndex2=currentIndex2+1;
            currentIndex2<$scope.mostPopularProjects.length? $scope.currentProject2=$scope.mostPopularProjects.slice(currentIndex2):$scope.visibleNext3=!$scope.visibleNext3; 
            
            if(currentIndex2===$scope.mostPopularProjects.length-3){
                    $scope.visibleNext3=!$scope.visibleNext3;//> hide
            }
           
        }else{
            $scope.visibleNext3=false;//> show
            
            currentIndex2=currentIndex2-1;
            currentIndex2>0? $scope.currentProject2=$scope.mostPopularProjects.slice(currentIndex2-1):$scope.visiblePrev3=!$scope.visiblePrev3;
            
             if(currentIndex2===0){
                $scope.visibleTemp3=false;// temp show
                $scope.currentProject2=$scope.mostPopularProjects;
            }
            
            if(currentIndex2===1){
                    $scope.visiblePrev3=!$scope.visiblePrev3;
                    $scope.visibleTemp3=false;
            }
        }
    }
    
});	// app.controller