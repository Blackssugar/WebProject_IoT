'use strict';

var app = angular.module("myApp", []);
app.controller("adminCtrl", function($scope) {
        function formatP ( d ) {
                // `d` is the original data object for the row
                return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td>File URL:</td>'+
                        '<td><a href='+d.fileurl+'>'+d.fileurl+'</a></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Upload Time:</td>'+
                        '<td>'+d.uploadtime+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Category:</td>'+
                        '<td>'+d.category+'</td>'+
                    '</tr>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Views:</td>'+
                        '<td>'+d.views+'</td>'+
                    '</tr>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Likes:</td>'+
                        '<td>'+d.likes+'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Projec Cover:</td>'+
                    '<td><img class="rounded-circle" width="200px" height="200px" src= '+d.imageLocation+' onerror="this.src=\'http://placehold.it/150x150\'"></td>'+
                '</tr>'+
                '</table>';
        };
        function formatU ( d ) {
                // `d` is the original data object for the row
                return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td>NickName:</td>'+
                        '<td>'+d.nickname+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Public Email:</td>'+
                        '<td>'+d.pubilcemail+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Introduction:</td>'+
                        '<td>'+d.introduction+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Profile Picture:</td>'+
                        '<td><image width="100px" height="100px" class="rounded-circle" src='+d.profile_pic+' onerror="this.src=\'http://placehold.it/150x150\'"></td>'+
                    '</tr>'+
                '</table>';
        };
        if ($("title").text()=="ProjectAdmin"){
                angular.element(document).ready(function () {
                        var table=$('#projectTable').DataTable( {
                                order:[],
                                processing:true,
                                serverSide: true,
                                ajax:{ "url":"../php/server_processing_admin_project.php",
                                },
                                rowId:"id",
                                "columnDefs": [
                                        {
                                                "targets": 0,
                                                "data":null,
                                                "orderable":false,
                                                "searchable":false,
                                                "defaultContent": '',
                                                "className": 'select-checkbox'
                                        },
                                        {
                                                "targets": 1,
                                                "data":"project_name"
                                        },
                                        {
                                                "targets": 2,
                                                "data":"description"
                                        },
                                        {
                                                "targets": 3,
                                                "data":"user_name"
                                        },
                                        {
                                                "targets":-1,
                                                "searchable":false,
                                                "data":null,
                                                "orderable":false,
                                                "render": function(data, type, row, meta) {
                                                        return '<button class="btn btn-primary" name="viewP" id="bbutton_'+row.id+'">View</button> <button class="btn btn-danger" name="deleteP" id="dbutton_'+row.id+'">Delete</button>'
                                                },

                                        }

                                ],
                                'select': {
                                        'style': 'multi',
                                        selector: 'td:first-child'
                                },
                                initComplete: function () {
                                        
                                        $.ajax({
                                                url: '../php/getAllProjects.php',
                                                type: 'post',
                                                dataType: 'json',
                                                success: function(response){
                                                        let column=new Set();
                                                        let result=response[1];
                                                        for(let i=0;i<result.length;i++){
                                                                column.add(result[i]['username']);
                                                        }
                                                        for(let i of column){
                                                                select.append( '<option value="'+i+'">'+i+'</option>' );
                                                        }
                                                },
                                                error: function (jqXHR, textStatus, err) {
                                                    alert('text status ' + textStatus + ', err ' + err);
                                                }
                                            })
                                        
                                        var select = $('#userSelect')
                                                .on( 'change', function () {
                                                    var val = $.fn.dataTable.util.escapeRegex(
                                                        $(this).val()
                                                    );
                             
                                                    table.columns(3).search(val,false,false,false).draw();
                                                } );

                                },
                        } );
                        $("#selectAll").on( "click", function(e) {
                                if ($(this).is( ":checked" )) {
                                        table.rows().select();
                                } else {
                                        table.rows().deselect();
                                }
                        });
                        $('#projectTable').on( 'page.dt', function () {
                                if($("#selectAll").is(":checked")){
                                        $("#selectAll").prop("checked",false)
                                } });
                        $scope.deleteManyP=function () {
                                var porjectid=table.rows('.selected').ids(false).toArray();
                                $.ajax({
                                        url: '../php/deleteProject.php',
                                        type: 'post',
                                        data: {project_id: porjectid},
                                        success: function (response) {
                                        if(response==="OK")
                                        {
                                                table.ajax.reload( null, false );
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

                        };
                        // $scope.showAllP=function(){
                        //         table.columns().search('').draw();
                        // }
                        $("#projectTable tbody ").on( "click","[name='viewP']",function(){
                                var tr = $(this).closest('tr');
                                var row = table.row( tr );
                         
                                if ( row.child.isShown() ) {
                                    // This row is already open - close it
                                    row.child.hide();
                                    tr.removeClass('shown');
                                }
                                else {
                                    // Open this row
                                    row.child( formatP(row.data()) ).show();
                                    tr.addClass('shown');
                                }
                        } );
                        $("#projectTable tbody ").on( "click","[name='deleteP']",function(){
                                
                                var proList = [];
                                proList.push(table.row($(this).parents('tr')).id());
                                $.ajax({
                                        url: '../php/deleteProject.php',
                                        type: 'post',
                                        data: {project_id: proList},
                                        success: function (response) {
                                        if(response==="OK")
                                        {
                                                table.ajax.reload( null, false );
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
                        });
                        // $("#projectTable tbody ").on( "click","td:nth-child(5)",function(){
                        //         table.columns(3).search($(this).text(),false,false,false).draw();
                        // });
                });
        };

        if ($("title").text()=="UserAdmin"){
                angular.element(document).ready(function () {
                        var table=$('#userTable').DataTable( {
                                order:[],
                                processing:true,
                                serverSide: true,
                                ajax:{ "url":"../php/server_processing_admin_user.php",
                                },
                                rowId:"id",
                                "columnDefs": [
                                        {
                                                "targets": 0,
                                                "data":null,
                                                "orderable":false,
                                                "searchable":false,
                                                "defaultContent": '',
                                                "className": 'select-checkbox'
                                        },
                                        {
                                                "targets": 1,
                                                "data":"username"
                                        },
                                        {
                                                "targets": 2,
                                                "data":"useremail"
                                        },
                                        {
                                                "targets": 3,
                                                "data":"job"
                                        },
                                        {
                                                "targets": 4,
                                                "data":"location"
                                        },
                                        {
                                                "targets": 5,
                                                "data":"lasttime"
                                        },
                                        {
                                                "targets":-1,
                                                "searchable":false,
                                                "data":null,
                                                "orderable":false,
                                                "render": function(data, type, row, meta) {
                                                        return '<button class="btn btn-primary" name="viewU" id="bbutton_'+row.id+'">View</button> <button class="btn btn-danger" name="deleteU" id="dbutton_'+row.id+'">Delete</button>'
                                                },

                                        }

                                ],
                                'select': {
                                        'style': 'multi',
                                        selector: 'td:first-child'
                                },

                        } );
                        $("#selectAll").on( "click", function(e) {
                                if ($(this).is( ":checked" )) {
                                        table.rows().select();
                                } else {
                                        table.rows().deselect();
                                }
                        });
                        $('#userTable').on( 'page.dt', function () {
                                if($("#selectAll").is(":checked")){
                                        $("#selectAll").prop("checked",false)
                                } });
                        $scope.deleteManyU=function () {

                                var userid=table.rows('.selected').ids(false).toArray();
                                $.ajax({
                                        url: '../php/deleteUser.php',
                                        type: 'post',
                                        data: {user_id: userid},
                                        success: function (response) {
                                                if(response==="OK")
                                                {
                                                        table.ajax.reload( null, false );
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

                        };
                        $("#userTable tbody ").on( "click","[name='viewU']",function(){
                                var tr = $(this).closest('tr');
                                var row = table.row( tr );
                         
                                if ( row.child.isShown() ) {
                                    // This row is already open - close it
                                    row.child.hide();
                                    tr.removeClass('shown');
                                }
                                else {
                                    // Open this row
                                    row.child( formatU(row.data()) ).show();
                                    tr.addClass('shown');
                                }
                        });
                        $("#userTable tbody ").on( "click","[name='deleteU']",function(){
                                var userList = [];
                                userList.push(table.row($(this).parents('tr')).id());
                                $.ajax({
                                        url: '../php/deleteUser.php',
                                        type: 'post',
                                        data: {user_id: userList},
                                        success: function (response) {
                                                if(response==="OK")
                                                {
                                                        table.ajax.reload( null, false );
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
                        })
                });
        }

});

