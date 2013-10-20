/******************************
****	DOM on ready load.
*******************************/

$(document).ready(function() {
	//Initialize Tooltips
	$(".header-links").tooltip({
		"placement":"bottom"
	});
	$("nav a.btn-header").tooltip({
		"placement":"bottom"
	});
	
	//Initialize Popover
	$('.btn-notifications').popover({
		html: true,
		placement: "bottom",
		title: '<div class="text-center">Notifications</div>',
		content: "<p>You current have no new notifications.</p>"
	})
	
	//Stop Issue with other popovers and tooltips
	$('.btn-notifications').click(function (e) {
		e.stopPropagation();
	});
	//Remove Popover on outside click, ie on outside of the element if the popover is open
	$(document).click(function (e) {
		if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
			$('.btn-notifications').popover('hide');
		}
	});
	
	//Initialize Porlets - Movable widgets
	$( ".col-md-6" ).sortable({
      connectWith: ".col-md-6",
      placeholder: "ui-sortable-placeholder",
	  cancel: ".panel-body",
	  cursor: "move"
    });
		
	$( ".panel" )
		.find( ".panel-title" )
        .append( "<span class='dropdown pull-right'><a href='#' data-toggle='dropdown' title='Widget-Settings'><i class='panel-icon icon-gears close'></i></a><ul class='dropdown-menu dropdown-custom-menu dropdown-widget-settings'><li><a href='#'>Settings</a></li><li class='remove-widget'><a href='#'>Remove Widget</a></li></ul></span>" )
		.append( "<i class='panel-icon toggle-panel icon-chevron-up close'></i>" )
        .end()
		.find( ".panel-body" );
		$( ".panel-title .toggle-panel" ).click(function() {
			$( this ).toggleClass( "icon-chevron-up" ).toggleClass( "icon-chevron-down" );
			$( this ).closest('.panel').find( ".panel-body" ).toggle();
		});
	
	$( ".panel-heading" ).dblclick(function() {
			$( this ).find( ".panel-title .toggle-panel" ).toggleClass( "icon-chevron-down" ).toggleClass( "icon-chevron-up" );
			$( this ).parent().find( ".panel-body" ).toggle();
    });
    $( ".panel .remove-widget" ).click(function() {
    	var widgetname = $(this).closest('.panel-title').find('.panel-title-text').text();
    	if( !confirm('Remove Widget: "' + widgetname +'"?') ) { //show confirm dialog
            return false; //do nothing if cancel is clicked (prevent the browser from following clicked link)
		}
		else {
			$( this ).closest('.panel').fadeOut( 1500, function() {
				$( this ).remove();
			});
		}
	});
	
	//Custom Contextual menu
	var text = "";
	var strText = ""
	$(document).bind("contextmenu", function (event) {
		event.preventDefault();
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		if (!text) {
			$(".dropdown-contextual-menu").hide();
			$("<ul class='dropdown-menu dropdown-contextual-menu' role='menu' aria-labelledby='dLabel'><li><a href='#'>Undo</a></li><li><a href='#'>Redo</a></li><li class='divider'></li><li><a href='#'>Cut</a></li><li><a href='#'>Copy</a></li><li><a href='#'>Paste</a></li><li><a href='#'>Paste as plain text</a></li><li><a href='#'>Delete</a></li><li class='divider'></li><li><a href='#'>Spell-checker options</a></li><li class='divider'></li><li><a href='#'>Select all</a></li><li class='divider'></li><li><a href='#'>Inspect element</a></li></ul>")
				.appendTo("body")
				.css({
				top: event.pageY + "px",
				left: event.pageX + "px"
			}).show();
		} else {
			$(".dropdown-contextual-menu").hide();
			strText = text.substr(0,25) + "..."; 
			$("<ul class='dropdown-menu dropdown-contextual-menu' role='menu' aria-labelledby='dLabel'><li><a href='#'>Undo</a></li><li><a href='#'>Redo</a></li><li class='divider'></li><li><a href='#'>Cut</a></li><li><a href='#'>Copy</a></li><li><a href='#'>Paste</a></li><li><a href='#'>Paste as plain text</a></li><li><a href='#'>Delete</a></li><li class='divider'></li><li><a href='#'>Spell-checker options</a></li><li class='divider'></li><li><a href='#'>Select all</a></li><li><a href='#' class='search-string'>Search Google for '" + strText + "'</a></li><li><a href='#'>Print</a></li><li class='divider'></li><li><a href='#'>Inspect element</a></li></ul>")
				.appendTo("body")
				.css({
				top: event.pageY + "px",
				left: event.pageX + "px"
			}).show();
		}
	}).bind("click", function (event) {
		$(".dropdown-contextual-menu").hide();
	});
	$( document ).on('click', '.search-string', function() {
		window.open('https://www.google.com/search?q=' + text)
	});
	
	//Initialize datepickers
	$('#cmdate').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true
	});
	$('#viewcmdate').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true
	});	
	
	
	var d = new Date();
	var Year = d.getFullYear();
	var Month = d.getMonth() + 1;
	var Day =  d.getDate();
	var Full_Date = Month + "/" + Day + "/" + Year;
	$("#cmentry").val(Full_Date);
	$("#cmmodified").val(Full_Date);	
	
	//Add in fancy select boxes
	/*
	var selectboxes = new Array("cmanalyst","cmplatform","cmstatus","cmsource","viewcmanalyst","viewcmplatform","viewcmsource","viewcmstatus")
	$.each(selectboxes, function(value){
		$("#" + this).selectpicker();
	});
	*/
	/*
	$("#log").html($.ajax({	type:"GET",
				url:"dashboard-custom/log.js",
				dataType:"script"}));	
*/

	//Load CM Datatables when the CMtracker Menu is clicked. *This will only load the data when required. 
	$("#cmtrackerlinktop").on("click", loadCMDataTables());
	
	//Load Jquery Vector Maps
	$('#vmap').vectorMap({
		map: 'world_en',
		backgroundColor: '#fff',
		color: '#ffffff',
		hoverOpacity: 0.7,
		enableZoom: true,
		showTooltip: true,
		values: sample_data,
		scaleColors: ['#f5f5f5', '#ff0000'],
		normalizeFunction: 'polynomial'
	});
});

/******************************
****	Functions
*******************************/

function generateCM(){
	//NOT WORKING
	var today = new Date();
	/*
	Date.prototype.getDOY = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
	}

	var cmID = ID;
	var cmJulianDay = cmID.substring(2,5);
	var cmJulianDayID = cmID.substring(5);
	if (cmJulianDay == today.getDOY()) {
		var cmAddID = Number(cmJulianDayID) + 1;
		var zero = 2 - cmAddID.toString().length + 1;
		cmAddID = Array(+(zero > 0 && zero)).join("0") + cmAddID;
		cmID = "CM" + cmJulianDay + cmAddID;
	}
	else {
		cmID = "CM" + today.getDOY() + "01";
	};
*/
	$('#cmnumber').val("GENERATED CM");

}

var oTable

function loadCMDataTables(){
	$.ajax({	type:"GET",
				url:"dashboard-custom/CM.js",
				dataType:"script"	
	}).success(function(){
		oTable = $('#testingtable').dataTable({
			"sDom": 'r<"H"f><"datatable-scroll"t><"F"lip>',
			"aaData": CMActions,
			"aoColumns": [
				{ "mData": "View"},
				{ "mData": "ID" ,"bVisible":false},
				{ "mData": "CM_Number"},
				{ "mData": "Date" },
				{ "mData": "CM_Analyst" },
				{ "mData": "Threat" },
				{ "mData": "Action" , "sWidth": "500px"},
				{ "mData": "Total_Sigs"},
				{ "mData": "Total_Deployed" },
				{ "mData": "Total_Succeeded" ,"bVisible":false},
				{ "mData": "Total_Failed_Testing" ,"bVisible":false},
				{ "mData": "Total_Failed_Performance" ,"bVisible":false},
				{ "mData": "Total_Failed_FP" ,"bVisible":false},
				{ "mData": "Platform" },
				{ "mData": "Source" },
				{ "mData": "Reference" },
				{ "mData": "Status" },
				{ "mData": "Notes" },
				{ "mData": "Date_Authorized" },
				{ "mData": "Date_Implemented" },				
				{ "mData": "GTMS" },				
				{ "mData": "External_Ticket_ID" ,"bVisible":false },				
				{ "mData": "Entry_Date" ,"bVisible":false},				
				{ "mData": "Modified_Date" ,"bVisible":false}				
			],
			"bSortable": true,
			"fnAdjustColumnSizing": false,
			"bScrollCollapse": true,
			"sPaginationType": "two_button",
			//Disable sorting on View column.
			"aoColumnDefs": [
				{ "bSortable": false, "aTargets": [ 0 ] }
			]
		});
		$(document).on('click', "#testingtable tbody  tr", function() {
			if ( $(this).hasClass('row_selected') ) {
				$(this).removeClass('row_selected');
			}
			else {
				oTable.$('tr').removeClass('row_selected');
				$(this).addClass('row_selected');
			}
		});
	});


};
		
function viewCMAction(ID) {
	//Clear out any previous values

	UID = parseInt(ID) -1;

	$('#viewcmnumber').val(CMActions[UID].CM_Number);
	$('#viewcmdbid').val(UID);
	$('#viewcmanalyst').val(CMActions[UID].CM_Analyst);
	$('#viewcmthreat').val(CMActions[UID].Threat);
	$('#viewcmaction2').val(CMActions[UID].Action);
	$('#viewcmtotalsigs').val(CMActions[UID].Total_Sigs);
	$('#viewcmtotalsuccess').val(CMActions[UID].Total_Succeeded);
	$('#viewcmtotalfailedtesting').val(CMActions[UID].Total_Failed_Testing);
	$('#viewcmtotaldeployed').val(CMActions[UID].Total_Deployed);
	$('#viewcmtotalfailedperf').val(CMActions[UID].Total_Failed_Performance);
	$('#viewcmtotalfailedfp').val(CMActions[UID].Total_Failed_FP);	
	$('#viewcmplatform').val(CMActions[UID].Platform);
	$('#viewcmsource').val(CMActions[UID].Source);
	$('#viewcmreference').val(CMActions[UID].Reference);
	$('#viewcmstatus').val(CMActions[UID].Status);
	$('#viewcmnotes').val(CMActions[UID].Notes);
	$('#viewcmdateauth').val(CMActions[UID].Date_Authorized);
	$('#viewcmdateimplem').val(CMActions[UID].Date_Implemented);
	$('#viewcmgtms').val(CMActions[UID].GTMS);
	$('#viewcmexternal').val(CMActions[UID].External_Ticket_ID);
	$('#viewcmentry').val(CMActions[UID].Entry_Date);
	$('#viewcmmodified').val(CMActions[UID].Modified_Date);
	//If status is completed, we want to show the total amount of sigs successful	
	if ($('#viewcmstatus').val() == "Completed"){
		var Total_Sigs = parseInt($('#viewcmtotalsigs').val(),10);
		var Failed_Test = parseInt($('#viewcmtotalfailedtesting').val(),10);
		var Total_Deployed = parseInt($('#viewcmtotaldeployed').val(),10);
		var Failed_Perf = parseInt($('#viewcmtotalfailedperf').val(),10);
		var Failed_FP = parseInt($('#viewcmtotalfailedfp').val(),10);
		$('#viewcmtotaldeployed').val(Total_Sigs - Failed_Test);
		$('#viewcmtotalsuccess').val(Total_Deployed - Failed_Perf - Failed_FP);	
	}
	
};			
			
function saveView(){
	var NumActions = JSON.stringify(numActions[0].Total);
	var totalIDs = parseInt(NumActions,10) ;	
	var UID = $('#viewcmdbid').val();
	
	CMActions[UID].CM_Analyst = $('#viewcmanalyst').val();
	CMActions[UID].Threat = $('#viewcmthreat').val();
	CMActions[UID].Action = $('#viewcmaction2').val();
	CMActions[UID].Total_Sigs = $('#viewcmtotalsigs').val();
	CMActions[UID].Total_Deployed = $('#viewcmtotaldeployed').val();
	CMActions[UID].Total_Succeeded = $('#viewcmtotalsuccess').val();
	CMActions[UID].Total_Failed_Testing = $('#viewcmtotalfailedtesting').val();
	CMActions[UID].Total_Failed_Performance = $('#viewcmtotalfailedperf').val();
	CMActions[UID].Total_Failed_FP = $('#viewcmtotalfailedfp').val();
	CMActions[UID].Platform = $('#viewcmplatform').val();
	CMActions[UID].Source = $('#viewcmsource').val();
	CMActions[UID].Reference = $('#viewcmreference').val();
	CMActions[UID].Status = $('#viewcmstatus').val();
	CMActions[UID].Notes = $('#viewcmnotes').val();
	CMActions[UID].Date_Authorized = $('#viewcmdateauth').val();
	CMActions[UID].Date_Implemented = $('#viewcmdateimplem').val();
	CMActions[UID].GTMS = $('#viewcmgtms').val();
	CMActions[UID].External_Ticket_ID = $('#viewcmexternal').val();
	CMActions[UID].Entry_Date = $('#viewcmentry').val();
	//CMActions[UID].Modified_Date = "SampleDate";
	

	saveCM(totalIDs, JSON.stringify(CMActions));
	
	
};
	
function reloadTable() {
	oTable.fnClearTable();
	oTable.fnAddData(CMActions);
	$(".successmessage").html("<div class='alert alert-success alert-dismissable'>Successfully Added</div>");
	$(".successmessage").removeClass("hide").fadeIn().delay(2000).fadeOut(1000);	


}

function addCMAction(){
	
	var NumActions = JSON.stringify(numActions[0].Total);
	var ID = parseInt(NumActions,10) + 1;	
	var View = "<a data-toggle='modal' href='#viewcmaction' class=' btn btn-xs btn-primary row-edit' onclick='viewCMAction(" + ID + ");'><i class='btn-icon-only icon-edit'></i></a>"
	
	//NEEDS CODE FOR GENERATING CM NUMBER
	var CM_Number = $("#cmnumber").val();
	var Date_Picked = $("#cmdate").val();
	
	var CM_Analyst = $("#cmanalyst").val();
	var Threat = $("#cmthreat").val();
	var Action = $("#cmaction").val();
	var Total_Sigs = $("#cmtotalsigs").val();
	var Total_Deployed = 0;
	var Total_Succeeded = 0;
	var Total_Failed_Testing = 0;
	var Total_Failed_Performance = 0;
	var Total_Failed_FP = 0;
	var Platform = $("#cmplatform").val();
	var Source = $("#cmsource").val();
	var Reference = $("#cmreference").val();
	var Status = $("#cmstatus").val();
	var Notes = $("#cmnotes").val();
	var Date_Authorized = $("#cmdateauth").val();
	var Date_Implemented = $("#cmdateimplem").val();
	var GTMS = $("#cmgtms").val();
	var External_Ticket_ID = $("#cmexternal").val();
	var d = new Date();
	var Year = d.getFullYear();
	var Month = d.getMonth() + 1;
	var Day =  d.getDate();
	var Full_Date = Month + "/" + Day + "/" + Year;
	var Entry_Date = Full_Date;
	var Modified_Date = Entry_Date
	

						
	CMActions.push({
		"View": View,
		"ID": "" + ID + "",
		"CM_Number": CM_Number,
		"Date": Date_Picked,
		"CM_Analyst": CM_Analyst,
		"Threat": Threat,
		"Action": Action,
		"Total_Sigs": Total_Sigs,
		"Total_Deployed": Total_Deployed,
		"Total_Succeeded": Total_Succeeded,
		"Total_Failed_Testing": Total_Failed_Testing,
		"Total_Failed_Performance": Total_Failed_Performance,
		"Total_Failed_FP": Total_Failed_FP,
		"Platform": Platform,
		"Source": Source,
		"Reference": Reference,
		"Status": Status,
		"Notes": Notes,
		"Date_Authorized": Date_Authorized,
		"Date_Implemented": Date_Implemented,
		"GTMS": GTMS,
		"External_Ticket_ID": External_Ticket_ID,
		"Entry_Date": Entry_Date,
		"Modified_Date": Modified_Date
	});

	var Content = JSON.stringify(CMActions);
	saveCM(ID, Content);
 };
	
function runALPs(){
	var NumActions = JSON.stringify(numActions[0].Total);
	var IDs = parseInt(NumActions,10);
	var Platforms = new Array("All Defense Centers","Regional DC Only","Global DC Only","Arcsight","AP","HBSS","WCF","ACL","Test Sensor","Other");
	//var PlatformTotals = new Array("","","","","","","","","","");
	var Total_ALLDC_Completed = 0;
	var Total_Regional_Completed = 0;
	var Total_Global_Completed = 0;
	var Total_Arcsight_Completed = 0;
	var Total_AP_Completed = 0;
	var Total_HBSS_Completed =0;
	var Total_WCF_Completed =0;
	var Total_ACL_Completed =0;
	var Total_Test_Completed =0;
	var Total_Other_Completed =0;	
	var Regional_Disabled_Perf = 0;
	var Global_Disabled_Perf = 0;
	var Regional_Disabled_FP = 0;
	var Global_Disabled_FP = 0;
	var Total_ALLDC_Failed_FP = 0;
	var Total_Regional_Failed_Perf = 0;
	var Total_Global_Failed_Perf = 0;
	var Total_ALLDC_Failed_Perf = 0;
	var Total_Other_All = 0;
	var Total_Test_All = 0;
	var Total_ACL_All = 0;
	var Total_HBSS_All = 0;
	var Total_AP_All = 0;
	var Total_Arcsight_All = 0;
	var Total_Global_All = 0;
	var Total_Regional_All = 0;
	var Total_ALLDC_All = 0;
	var Total_WCF_All = 0;
	for(var i=0; i < IDs ; i++){
		var TotalDeployed = 0;
		var TotalSuccess = 0;
		var TotalFailedPerf = 0;
		var TotalFailedFP = 0;
		var TotalSigs = 0;
		
		TotalDeployed += parseInt(CMActions[i].Total_Deployed);
		TotalSuccess += parseInt(CMActions[i].Total_Succeeded);
		TotalFailedPerf += parseInt(CMActions[i].Total_Failed_Performance);
		TotalFailedFP += parseInt(CMActions[i].Total_Failed_FP);
		TotalSigs += parseInt(CMActions[i].Total_Sigs);
		
		//Regional Completed Calculations
				
		if(CMActions[i].Platform == "All Defense Centers" && CMActions[i].Source == "ALP"){
			Total_ALLDC_All += TotalSigs;
			Total_ALLDC_Completed += TotalDeployed;
			Total_ALLDC_Failed_Perf += TotalFailedPerf;
			Total_ALLDC_Failed_FP += TotalFailedFP;
		} else if (CMActions[i].Platform == "Regional DC Only" && CMActions[i].Source == "ALP"){
			Total_Regional_All += TotalSigs;
			Total_Regional_Completed += TotalDeployed;
			Regional_Disabled_Perf += TotalFailedPerf;		
			Regional_Disabled_FP += TotalFailedFP;		
		} else if (CMActions[i].Platform == "Global DC Only" && CMActions[i].Source == "ALP"){
			Total_Global_All += TotalSigs;
			Total_Global_Completed += TotalDeployed;
			Global_Disabled_Perf += TotalFailedFP;	
			Global_Disabled_FP += TotalFailedFP;
		} else if (CMActions[i].Platform == "Arcsight" && CMActions[i].Source == "ALP"){
			Total_Arcsight_All += TotalSigs;
			Total_Arcsight_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "AP" && CMActions[i].Source == "ALP"){
			Total_AP_All += TotalSigs;
			Total_AP_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "HBSS" && CMActions[i].Source == "ALP"){
			Total_HBSS_All += TotalSigs;
			Total_HBSS_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "WCF" && CMActions[i].Source == "ALP"){
			Total_WCF_All += TotalSigs;
			Total_WCF_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "ACL" && CMActions[i].Source == "ALP"){
			Total_ACL_All += TotalSigs;
			Total_ACL_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "Test Sensor" && CMActions[i].Source == "ALP"){
			Total_Test_All += TotalSigs;
			Total_Test_Completed += TotalDeployed;
		} else if (CMActions[i].Platform == "Other" && CMActions[i].Source == "ALP"){
			Total_Other_All += TotalSigs;
			Total_Other_Completed += TotalDeployed;
		}
	}


	//Compile it all into an array to be displayed
	var CompletedTotals = new Array(Total_ALLDC_Completed,Total_Regional_Completed,Total_Global_Completed,Total_Arcsight_Completed,Total_AP_Completed,Total_HBSS_Completed,Total_WCF_Completed,Total_ACL_Completed,Total_Test_Completed,Total_Other_Completed);	
	var Totals_All = new Array(Total_ALLDC_All,Total_Regional_All,Total_Global_All,Total_Arcsight_All,Total_AP_All,Total_HBSS_All,Total_WCF_All,Total_ACL_All,Total_Test_All,Total_Other_All);
	var DisabledPerf = new Array(Total_ALLDC_Failed_Perf,Regional_Disabled_Perf,Global_Disabled_Perf,0,0,0,0,0,0,0);
	var DisabledFP = new Array(Total_ALLDC_Failed_FP,Regional_Disabled_FP,Global_Disabled_FP,0,0,0,0,0,0,0);
	
	var Total_Platforms = 0;
	var Total_Completed_All = 0;
	var Total_DisabledPerf_All = 0;
	var Total_DisabledFP_All = 0;
	for(var i=0; i < Platforms.length; i++){
		//Create table of values
		$("#cmOverallALP").append("<tr><td>" + Platforms[i] + "</td><td>" + Totals_All[i] + "</td></tr>");
		Total_Platforms += Totals_All[i]
	}
	
	for (var i=0; i < Platforms.length; i ++){
	$("#cmBreakdownALP").append("<tr><td>" + Platforms[i] + "</td><td>" + CompletedTotals[i] + "</td><td>" + DisabledPerf[i] + "</td><td>" + DisabledFP[i] + "</td></tr>");
		Total_Completed_All += CompletedTotals[i];
		Total_DisabledPerf_All += DisabledPerf[i];
		Total_DisabledFP_All += DisabledFP[i]
	}
	
	$("#cmOverallALP > tbody").append("<tr><td>Total</td><td>" + Total_Platforms + "</td></tr>")	
	$("#cmBreakdownALP").append("<tr><td>Totals</td><td>" + Total_Completed_All + "</td><td>" + Total_DisabledPerf_All + "</td><td>" + Total_DisabledFP_All + "</td></tr>");
	
	var Completed_Regional_ForPercent = CompletedTotals[0] + CompletedTotals[1];
	var Completed_Global_ForPercent = CompletedTotals[0] + CompletedTotals[2]
	var Failed_Regional_ForPercent = DisabledPerf[0] + DisabledPerf[1];
	var Failed_Global_ForPercent = DisabledPerf[0] + DisabledPerf[2];

	
	var Regional_Success =((Completed_Regional_ForPercent / (Completed_Regional_ForPercent + Failed_Regional_ForPercent)));
	var Global_Success =((Completed_Global_ForPercent / (Completed_Global_ForPercent + Failed_Global_ForPercent)));
	$("#cmpercentageview").append("<tr><td>" + Regional_Success + "</td><td>" + Global_Success + "</td></tr>");
	$('#ALProw').removeClass('hide');
	

	
};
	
	
	
		