app.controller('uploadProjectCtrl', function($scope, $window, $http, $timeout, $q) {
    $scope.selectedCategory = null;
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.selectedCategory = null;
    // extract existing project info.
    
    $scope.isEdit = false;
    $scope.onLoad = function(pageType) {
        
        console.log(pageType);

        $scope.deferred = $q.defer();
        $scope.promise = $scope.deferred.promise;        
        
        if (pageType == 'edit')
        {
            $scope.loadEditProject();
            $scope.isEdit = true;
        }   
        else
        {
            $scope.loadNewProject();
            $scope.isEdit = false;
        }
        
        $scope.promise.then(function (result) {
            console.log("load content success");
//            console.log($scope.editorSet.editors.length);
            // wait for DOM is updated
            $timeout(function () {
                $scope.convertAllTextArea();
            }, 1000); 
        }, function (error) {
            console.log("load content fail");
        });
    }
    
    $scope.readCategory = function() {
        $http({
            url: "../php/getCategory.php",
            method: "POST",
        }).then(function (response) {// on success
            $scope.categoryList = response.data[1];
        }, function (response) {
            console.log("fail");
            console.log(response.data,response.status);
               //alert(response);
        });
    }

    $scope.loadNewProject = function()
    {
        $scope.tags = [];
        $scope.editorSet.push('');
        $scope.deferred.resolve("");
    }
    
    $scope.loadEditProject = function()
    {
        $scope.projectId = $window.localStorage.getItem("projectId");
        
        $http({
            url: "../php/getProjectInfo.php",
            method: "POST",
            data:  $.param({
                projectId: $scope.projectId
            }),
        }).then(function (response) {// on success
          console.log("success");
          console.log(response.data);

          var isValidData = false;
          for (var i = 0; i < response.data.length; ++i)
          {
              var dataArray = response.data[i];
              var dataHeader = dataArray[0];

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
//          if (!isValidData)
//          {
//              console.log("no valid data");
//              $scope.showErrorPage();
//          }  
            $scope.deferred.resolve("");
            
        }, function (response) {
            console.log("fail");
            console.log(response.data,response.status);
            $scope.deferred.reject("");
//            $scope.showErrorPage();
        }); //$http      
    }
    
    $scope.parseProjectInfo = function(infoArray)
    {
        console.log(infoArray);
        if (infoArray.length == 0)
        {
           console.log("no project info");
           //scope.showErrorPage();
        }
        else
        {
           var stringifyObj = JSON.stringify(infoArray[0]);
           var projectInfo = JSON.parse(stringifyObj);

           $scope.projectTitle = projectInfo.projectName;
           $scope.imageSource = projectInfo.pictureURL;
           $scope.getSelectedCategory(projectInfo.category);
        }         
    }        

    $scope.descriptionList = [];
    $scope.parseDescription = function(desArray)
    {
        //$scope.descriptionList = [];
        //console.log(desArray);
        for (var i = 0; i < desArray.length; ++i)
        {
            //var desInfo = desArray[i];
           $scope.editorSet.push(desArray[i]);
        }
        //$scope.editorSet = $scope.descriptionList;
        
        for (var i = 0; i < $scope.editorSet.length; ++i)
        {
            //var desInfo = desArray[i];
           console.log($scope.editorSet[i].descriptions);
        }
        console.log($scope.editorSet);
    }
    
    $scope.parseTag = function(tagArray)
    {
        var tagString = tagArray[0].tag;
        console.log("tag");
        console.log(tagString);
        
        $scope.tags = tagString.split(',');
    }
        
    
    // validate image upload
    $scope.imageSource = "http://placehold.it/180";
    $scope.readImage = function(element)
    {
        var reader = new FileReader();
        reader.onload = function(e)
        {
            $scope.$apply(function()
            {
                $scope.imageSource = e.target.result;
            });
        }
        if(element.files[0].name.endsWith(".jpg") || element.files[0].name.endsWith(".png") 
                   || element.files[0].name.endsWith("gif")){
            reader.readAsDataURL(element.files[0]);
        } else {
            alert("The file you uploaded is not an image");
            element.value = null;
        }
    }
    
    // get selected category
    $scope.getSelectedCategory = function(selectedCat)
    {
        var selectedIdx = 0;
        for (var i = 0; i < $scope.categoryList.length; ++i)
        {
            if (selectedCat == $scope.categoryList[i].category)
            {
                selectedIdx = i;
            }
        }
        $scope.selectedCategory = $scope.categoryList[selectedIdx];
    }
    
    
    // dynamic text editor
//    $scope.editorSet = {editors: []};
//    $scope.editorSet.editors = [];   
    $scope.editorSet = [];
    
    $scope.addNewEditor = function () {
        
        $scope.editorSet.push('');
        $timeout(function () {
                var editors = angular.element(document).find('textarea');
                console.log(editors.length);
              
                var newEditor = editors[editors.length-1];
                nicEditors.editors.push(
                    new nicEditor().panelInstance(newEditor)
                );
        }, 100);
    };    

    $scope.removeEditor = function (z) {
        var isRemove = confirm("Remove the text field?");
        if (isRemove)
        {
           $scope.editorSet.splice(z,1);         
        }
    };

    $scope.convertAllTextArea = function() {
        var editors = angular.element(document).find('textarea');
//        console.log(editors.length);      
        
        for (var i = 0; i < editors.length; ++i)
        {
            var newEditor = editors[i];
            nicEditors.editors.push(
            new nicEditor().panelInstance(newEditor)
            );                   
        }

    }    
        
    // cancel confirmation
    $scope.confirmCancel = function()
    {
        var isCancel = confirm("Cancel uploading and go back to home page?");
        if (isCancel)
        {
            $window.location.href = "home.html";
        }
    }
    
/* Validation */
    $scope.checkTitle = function(){
        var title = $('#title').val();
        if(title == ""){
            $('#title_status').html("Title cannot be empty!");
        } 
        else{
            $('#title_status').html("");
        }
     }
    
     $scope.checkSectionTitle = function(){
         
        for (var i = 0; i < $scope.editorSet.length; ++i)
        {
            var section_title_id = '#section_title_' + i;
            var status_id = '#sectionTitle_status_' + i;
            var section_title = $(section_title_id).val();
            if(section_title == ""){
                $(status_id).html(" Section title cannot be empty!");
            } 
            else{
                $(status_id).html("");
            }          
        }
     }
     
     $scope.checkCategory = function(){
         var category = $scope.selectedCategory;
        console.log(category);
         if(category==null){  
             $('#category_status').html("Please choose category!");
         }
         else{  
              $('#category_status').html("");
         }
     }
     
    $scope.checkProjectDescription = function (){
        
        var des = document.getElementsByTagName('fieldset');
            var d = des[0].getElementsByClassName('nicEdit-main');
             //console.log(projectDescription);
            //var pattern =/^[\u4E00-\u9FA5]+$/;
            if(d.length==0){
                $('#editor_status').html("Project description cannot be empty!");
            }
            else{
                var projectDescription = d[0].textContent; 
                if(projectDescription== ""){
                    $('#editor_status').html("Project description cannot be empty!");
                } else {
                    $('#editor_status').html("");
                }
            }
    }

    $scope.desTitleList = [];
    $scope.desContentList = [];

    $scope.extractDescriptions = function(){
   
        for (var i = 0; i < $scope.editorSet.length; ++i)
        {
            var secionTitleId = '#section_title_' + i;
            var sectionTitle = angular.element(secionTitleId).val();
            $scope.desTitleList.push(sectionTitle);
            
            var sectionId = 'section_' + i;
            var editorInstance = new nicEditors.findEditor(sectionId);
            var desContent = editorInstance.getContent();
            $scope.desContentList.push(desContent);
        }     
    }
    
    $scope.submitAll = function(){
     
    var titleSpan=angular.element("#title_status").text();
    var  categorySpan=angular.element("#category_status").text();
    var sectionTitleSpan=angular.element("#sectionTitle_status").text();
    var projectDescriptionSpan=angular.element("#editor_status").text();

    if(titleSpan==""&&categorySpan==""&&sectionTitleSpan==""&&projectDescriptionSpan=="")
    { 
        // extract form data
        var title = $('#title').val();
        var cat_data = $scope.selectedCategory.category;
        var pic_data = $('#pictureURL').prop('files')[0];
        var file_data = $('#fileURL').prop('files')[0];
        $scope.extractDescriptions();
        
        // create form data
        var formData = new FormData();        
        formData.append('projectName', title);
        formData.append('category', cat_data);
        formData.append('pictureURL', pic_data);
        formData.append('fileURL', file_data);  
        formData.append('tags', $scope.tags);
        
        for (var i = 0; i < $scope.desTitleList.length; ++i)
        {
            var title_key = 'section_title_' + i;
            var content_key = 'section_' + i;
            formData.append(title_key, $scope.desTitleList[i]);
            formData.append(content_key, $scope.desContentList[i]);
        }
        
        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        
        if ($scope.isEdit)
        {
            formData.append('project_id', $scope.projectId);
            $.ajax({    
                url:'../php/editProject.php',
                method:'POST',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                success:function(result){
                    if(result=="OK"){
                        alert("Submit success!");
//                        window.localStorage.setItem("projectId", $scope.projectId);
//                        window.location.href = "project-detail.html";
                            window.location.href = "project-detail.html?id="+$scope.projectId;
                    }
                    else
                    {
                        console.log(result);
                    }
                }
            })
        }
        else
        {
            $.ajax({    
                url:'../php/saveNewProject.php',
                method:'POST',
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                success:function(result){
                    if(result=="OK"){
    //                    alert(result);
                        alert("Submit success!");
    //                    console.log(result);
                        window.location.href = "home.html";
                    }
                    else
                    {
                        console.log(result);
                    }
                }
            })
        } // if ($scope.isEdit)
        
        console.log("submit project");
        }
        else
        {
            return false;
        }
    }
    
    $scope.checkAll = function(){
        $scope.checkTitle();
        $scope.checkSectionTitle ();
        $scope.checkProjectDescription(); 
        $scope.checkCategory();
        $scope.submitAll();
        //$scope.pressSubmit();
    }
});

// app.controller


    




//non-empty check & Error check
   