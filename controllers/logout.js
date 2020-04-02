function Logout(){
    var con = confirm("Are you sure to Log out?");
    if(con==true){
        $.ajax({
            url:"../php/logout.php",
            success:function (result) {
                if(result=="OK"){
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }
}