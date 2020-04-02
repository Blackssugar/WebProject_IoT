var app = angular.module('myApp',[]);
app.controller ("categoryCtrl",function($scope){
    $scope.categoryList = [];
    getCategory();
    function getCategory(){
        $.ajax({
            url: '../php/getCategory.php',
            type: 'post',
            dataType: 'json',
            success: function(result){
                    console.log(result);
                    let re=result[1];
                    console.log(re);
                    let categoryList=[];
                    for(let i=0;i<re.length;i++){
                        let category = {};
                        category.category = re[i]['category'];
                        categoryList.push(category);
                    }
                    $scope.categoryList=categoryList;
                    $scope.$digest()
            },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })

    };

    $scope.addCategory=function(){
        var newCat=document.getElementById("newCategory").value;
        
        $.ajax({
            url: '../php/addCategory.php',
            type: 'post',
            data: {category: newCat},
            success: function (response) {
              if(response==="OK")
              {
                    getCategory();
                    alert("sucess!");
              }
              else
              {
                    alert('invalid category(category may already exist)');
              }
          },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }

    $scope.deleteCategory=function(){
        var options = $("#categorySelect option:selected");
        var deleteCat=options.val();
        $.ajax({
            url: '../php/removeCategory.php',
            type: 'post',
            data: {category: deleteCat},
            success: function (response) {
              if(response==="OK")
              {
                    getCategory();
                    alert("sucess");
              }
              else
              {
                    alert('category does not exist');
              }
          },
            error: function (jqXHR, textStatus, err) {
                alert('text status ' + textStatus + ', err ' + err);
            }
        })
    }
    
    $scope.nav="navforsidebar.html"
})