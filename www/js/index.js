//WorkWide-App-Phase3
var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.onBackKeyDown, false);
	},
	onBackKeyDown: function() {
		e.preventDefault();
	},
	onDeviceReady: function() {
		var pushNotification = window.plugins.pushNotification;
		PushNotificationRegistration();
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
	}
};
app.initialize();
$(document).ready(function() {
	$(".nav-Drawer").on("panelbeforeopen", function(event, ui) {
		$(".pagemargin").addClass("addOpacity");
	});
	$(".nav-Drawer").on("panelbeforeclose", function(event, ui) {
		$(".pagemargin").removeClass("addOpacity");
	});
});
$(document).bind("mobileinit", function() {
	$.mobile.page.prototype.options.keepNative = "select, input, textarea";
});
//Static Array
var weekday = new Array(7);
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
weekday[7] = "Sunday";
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//-------------------------------------------------
/* create table and database*/
//----------------------------------------------
var inAccepted = 0;
var f = -1;
var inProgressflag = 0;
var inProgressset = 0;
var geokm = "";
var rating = 0;
var attachment_count = 0;
var inAcceptedmultiple = 0;
var validationFlag1 = false;
var validationconfirmtask = false;
var validationconfirmtask1 = false;
var validationFlag2 = false;
var validationFlag3 = false;
var validationFlag4 = false;
var AssetCategory = 0;
var onholdComment = 0;
var rejectComment = 0;
var assets = [];
var used = [];
var await = [];
var assetdescription = [];
var profileserverUrl = "";
var entityurl = "";
var catArray = [];
var catArray1 = [];
var endtime;
var starttime;
var locationcode_dependValue;
var locationcode_dependValue1;
var starttasktime;
var endtasktime;
var repairtime;
var traveltime;
var apiFlag = 0;
var offlineApiFlag = 0;
var startclick = 0;
var no_of_offlinetasks = 0;
var taskAssets = "";
var signaturePad;
var tempArray = [];
var tempArrayid = [];
var cincrement = -1;
var formUpdatedArray = [];
var acceptPageFromLandingPage = false;
//============================================
//code for push notification
//============================================
function PushNotificationRegistration() {
	var push = PushNotification.init({
		android: {
			senderID: "535739481079"
		},
		browser: {
			pushServiceURL: 'http://push.api.phonegap.com/v1/push'
		},
		ios: {
			alert: "true",
			badge: "true",
			sound: "true",
			"ecb": "onNotificationAPN"
		},
		windows: {}
	});
	push.on('registration', function(data) {
		localStorage.setItem("DevieToken", "");
		localStorage.setItem("DevieToken", data.registrationId);
		console.log('notification id : ' + data.registrationId);
	});
	push.on('notification', function(data) {
		if(data.additionalData.foreground) {
			console.log("foreground" + data);
			notification_counts_list();
			var x = document.getElementById("snackbar").text == ""
			x.className = "show";
			setTimeout(function() {
				x.className = x.className.replace("show", "");
			}, 4000);
		} else {
			console.log("background" + data.message);
			$.mobile.changePage("#notificationpage", {
				transition: "slide",
				reverse: "true"
			});
		}
	});
	push.on('error', function(e) {});
}

function notification_counts_list() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "pushNotificationUnreadCount", parameters, function(response) {
		if(response.code == "1") {
			if(response.count == 0) {
				$("#notification_list_count").css("display", "none");
			} else {
				$("#notification_list_count").css("display", "block");
				document.getElementById("notification_list_count").innerHTML = "";
				document.getElementById("notification_list_count").innerHTML = response.count;
				var countss = response.count;
				listcounts();
			}
		} else {
			hideLoadingIcon();
		}
	});
}
//
////-------------------------------------------------------------------------------
///* Code For digital Signature */
////-------------------------------------------------------------------------------
var dataUrl_images_sign;
//var canvas;
//(function() {
//
//// Get a regular interval for drawing to the screen
//window.requestAnimFrame = (function(callback) {
//return window.requestAnimationFrame ||
//window.webkitRequestAnimationFrame ||
//window.mozRequestAnimationFrame ||
//window.oRequestAnimationFrame ||
//window.msRequestAnimaitonFrame ||
//function(callback) {
//window.setTimeout(callback, 1000 / 100);
//};
//})();
//
//// Set up the canvas
//canvas = document.getElementById("sig-canvas");
//var ctx = canvas.getContext("2d");
//ctx.strokeStyle = "#222222";
//ctx.lineWith = 2;
//
//// Set up the UI
////
//var sigText = document.getElementById("sig-dataUrl");
//var sigImage = document.getElementById("sig-image");
//var clearBtn = document.getElementById("sig-clearBtn");
//var submitBtn = document.getElementById("sig-submitBtn");
//clearBtn.addEventListener("click", function(e) {
//clearCanvas();
//
//}, false);
//submitBtn.addEventListener("click", function(e) {
//dataUrl_images_sign = canvas.toDataURL();
//if (navigator.network.connection.type == Connection.NONE) {
//navigator.notification.confirm("Confirm to Close the task?", _closethe_task_as_completed_offline, "WorkWide", ["Yes", "No"]);
//} else {
//close_task_list();
//}
//}, {passive:false});
//
//// Set up mouse events for drawing
//var drawing = false;
//var mousePos = {
//x: 0,
//y: 0
//};
//var lastPos = mousePos;
//canvas.addEventListener("mousedown", function(e) {
//drawing = true;
//lastPos = getMousePos(canvas, e);
//}, {passive:false});
//canvas.addEventListener("mouseup", function(e) {
//drawing = false;
//}, {passive:false});
//canvas.addEventListener("mousemove", function(e) {
//mousePos = getMousePos(canvas, e);
//}, {passive:false});
//
//// Set up touch events for mobile, etc
//canvas.addEventListener("touchstart", function(e) {
//mousePos = getTouchPos(canvas, e);
//var touch = e.touches[0];
//var mouseEvent = new MouseEvent("mousedown", {
//clientX: touch.clientX,
//clientY: touch.clientY
//});
//canvas.dispatchEvent(mouseEvent);
//}, {passive:false});
//canvas.addEventListener("touchend", function(e) {
//var mouseEvent = new MouseEvent("mouseup", {});
//canvas.dispatchEvent(mouseEvent);
//}, {passive:false});
//canvas.addEventListener("touchmove", function(e) {
//var touch = e.touches[0];
//var mouseEvent = new MouseEvent("mousemove", {
//clientX: touch.clientX,
//clientY: touch.clientY
//});
//canvas.dispatchEvent(mouseEvent);
//}, {passive:false});
//
//// Prevent scrolling when touching the canvas
//document.body.addEventListener("touchstart", function(e) {
//if (e.target == canvas) {
//e.preventDefault();
//}
//}, {passive:false});
//document.body.addEventListener("touchend", function(e) {
//if (e.target == canvas) {
//e.preventDefault();
//}
//}, {passive:false});
//document.body.addEventListener("touchmove", function(e) {
//if (e.target == canvas) {
//e.preventDefault();
//}
//}, {passive:false});
//
//// Get the position of the mouse relative to the canvas
//function getMousePos(canvasDom, mouseEvent) {
//var rect = canvasDom.getBoundingClientRect();
//return {
//x: mouseEvent.clientX - rect.left,
//y: mouseEvent.clientY - rect.top
//};
//}
//
//// Get the position of a touch relative to the canvas
//function getTouchPos(canvasDom, touchEvent) {
//var rect = canvasDom.getBoundingClientRect();
//return {
//x: touchEvent.touches[0].clientX - rect.left,
//y: touchEvent.touches[0].clientY - rect.top
//};
//}
//
//// Draw to the canvas
//function renderCanvas() {
//if (drawing) {
//ctx.moveTo(lastPos.x, lastPos.y);
//ctx.lineTo(mousePos.x, mousePos.y);
//ctx.stroke();
//lastPos = mousePos;
//}
//}
//
//function clearCanvas() {
//canvas.width = canvas.width;
//}
//
//// Allow for animation
//(function drawLoop() {
//requestAnimFrame(drawLoop);
//renderCanvas();
//})();
//
//})();
//=============================================================================
function clearCanvas() {
	signaturePad.clear();
}

function saveSignature() {
	ApploadingIcon();
	var data = signaturePad.toDataURL('image/png');
	console.log(data);
	dataUrl_images_sign = data;
	if(navigator.network.connection.type == Connection.NONE) {
		navigator.notification.confirm("Confirm to Close the task?", _closethe_task_as_completed_offline, "WorkWide", ["Yes", "No"]);
	} else {
		close_task_list();
	}
	// hideLoadingIcon()
}
//-------------------------------------------------
/*start of Logout  Functionality*/
//-------------------------------------------------
function logout() {
	navigator.notification.confirm("Are you sure you want to logout?", logoutsss, "Logout!", ["Yes", "No"]);
}

function logoutsss(buttonIndex) {
	if(buttonIndex == 1) {
		localStorage.setItem("TOKEN", "");
		localStorage.setItem("email", "");
		localStorage.setItem("mobile", "");
		localStorage.setItem("name", "");
		localStorage.setItem("address", "");
		localStorage.setItem("Accepted_Task_id", "");
		changePage("#loginPg", "slide");
	}
}
//-------------------------------------------------
/*End of Logout  Functionality*/
//-------------------------------------------------
//============================================
// drop icon change function code
//===========================================================================================
//-------------------------------------------------
/* current time and day*/
//----------------------------------------------
var Current_date_day;
$(document).ready(function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd < 10) {
		dd = '0' + dd
	}
	if(mm < 10) {
		mm = '0' + mm
	}
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var n = weekday[today.getDay()];
	Current_date_day = yyyy + '-' + mm + '-' + dd;
	//getDateTime();
});
var dateTime;

function getDateTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	if(month.toString().length == 1) {
		var month = '0' + month;
	}
	if(day.toString().length == 1) {
		var day = '0' + day;
	}
	if(hour.toString().length == 1) {
		var hour = '0' + hour;
	}
	if(minute.toString().length == 1) {
		var minute = '0' + minute;
	}
	if(second.toString().length == 1) {
		var second = '0' + second;
	}
	dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}
//$(document).on("pageshow", function(event, data) {
//              
//               
//               });
//-------------------------------------------------
/* Page show function*/
//-------------------------------------------------
$(document).on("pageshow", function(event, data) {
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	$(".pagemargin").removeClass("addOpacity");
	$(".versioncode").html("");
	$(".versioncode").html("Version 1.0.8");
	localStorage.setItem("previous_page_id", "");
	localStorage.setItem("previous_page_id", data.prevPage.attr('id'));
	//var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	localStorage.setItem("active_page_id", "");
	var colorCode = localStorage.getItem("colorcode");
	var s_colorcode = localStorage.getItem("s_colorcode");
	localStorage.setItem("active_page_id", activePage.attr('id'));
	$(".profile-color").css('background-color', colorCode);
	$(".profileimagecontainer").css('background-color', colorCode);
	switch(activePage.attr('id')) {
		case 'Landingpage':
			clear_db();
			startclick = 0;
			acceptPageFromLandingPage = false;
			ClearFields();
			/*for clearing db on main page load */
			$("#imageprofile_one").css("display", "block");
			$(".fsename").html(localStorage.getItem("name"));
			$(".profile_fsename").html(localStorage.getItem("name"));
			var img = document.getElementById("imageprofile_one");
			img.src = "";
			img.src = webServiceUrl + "entityLogo/entityid/" + localStorage.getItem("entityid");
			entityurl = webServiceUrl + "entityLogo/entityid/" + localStorage.getItem("entityid");
			profilePicture(entityurl, 1);
			inProgress();
			listcounts();
			current_position();
			localStorage.setItem("Pending_option", "");
			notification_counts_list();
			localStorage.setItem("Notification_value_to_View_page", "");
			break;
		case 'Assigned_tasklist_page':
			ApploadingIcon();
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode") + " !important");
			ClearFields();
			request_json = "";
			datass = [];
			assets = [];
			used = [];
			await = [];
			datass.length = 0;
			Assigned_task_list();
			break;
		case 'Assigned_view_tasklist_page':
			ClearFields();
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			Assigned_view_page();
			break;
		case 'Accepted_tasks_page':
			ApploadingIcon();
			ClearFields();
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			Accepted_Tasks_Page();
			break;
		case 'Accepted_view_tasklist_page':
			$("#starttripwork").css("display", "block");
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			Accepted_view_page();
			break;
		case 'Accepted_End_trip_view_tasklist_page':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			Accepted_End_trip_view_page();
			break;
		case 'Accepted_Start_work_view_tasklist_page':
			ApploadingIcon();
			filterReasons();
			Accepted_Direct_work_view_page();
			break;
		case 'Accepted_Signature_and_feeback_view_tasklist_page':
			ApploadingIcon();
			document.getElementById("pending_textarea_reason").value = "";
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			var canvas = document.getElementById('signature-pad');
			signaturePad = new SignaturePad(canvas, {
				backgroundColor: 'rgb(255, 255, 255)'
			});
			if(navigator.network.connection.type == Connection.NONE) {
				offline_signature_pages();
				$("#Accepted_Signature_and_feeback_view_task").css("display", "none");
				$("#offline_Accepted_Signature_and_feeback_view_task").css("display", "block");
				$("#offline_signature_footer").css("display", "block");
			} else {
				$("#offline_Accepted_Signature_and_feeback_view_task").css("display", "none");
				$("#Accepted_Signature_and_feeback_view_task").css("display", "block");
				$("#offline_signature_footer").css("display", "none");
				Accepted_Signture_and_feedback_view_page();
			}
			$('#star').raty({
				click: function(score, evt) {
					rating = score;
				}
			});
			break;
		case 'Completed_Maintasklist':
			ApploadingIcon();
			Completed_task_list();
			break;
		case 'Pending_list':
			ApploadingIcon();
			pending_task_list();
			break;
		case 'pending_view_tasklist_page':
			Pending_view_taslist_pages();
			break;
		case 'notificationpage':
			Notification_view_bindind_list();
			localStorage.setItem("Notification_value_to_View_page", "");
			break;
		case 'taskpage_offline_completed':
			offline_completed_task_list();
			break;
		case 'attachmentPage':
			attachDefaultImage();
			retaining_images_from_backend();
			break;
		case 'Accepted_to_pending_task':
			ONHoldreasons();
			break;
		case 'complete_view_page':
			taskDetailspage();
			break;
		case 'Reject_task_backend':
			rejectReasons();
			break;
		case 'category_view_page':
			categoryFieldsList(1);
			break;
		case 'Update_assets':
			retain_Assets();
			break;
		case 'offline_Landingpage':
			startclick = 0;
			$("#offline_imageprofile_one").css("display", "block");
			$(".fsename").html(localStorage.getItem("name"));
			$(".profile_fsename").html(localStorage.getItem("name"));
			var img = document.getElementById("offline_imageprofile_one");
			img.src = "";
			img.src = cordova.file.applicationStorageDirectory + "Documents/" + "entity.png";
			$(".imageprofile_offline").css("background-image", "none");
			$(".imageprofile_offline").css("background-image", "url(" + cordova.file.applicationStorageDirectory + "Documents/" + "profile.png)");
			Total_offline_dashboard_counts();
			break;
			/**code for offline mode */
		case 'Offline_Assigned_tasklist_page':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Assigned_page();
			break;
		case 'View_page_for_offline_Assigned_task':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Assigned_View_pages();
			break;
		case 'Oflfine_Completed_Maintasklist':
			offline_Resolved_page();
			break;
		case 'Offline_complete_view_page':
			offline_taskDetailspage();
			break;
		case 'offline_Accepted_tasks_page':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Accepted_page();
			// $(".btnFontSizesecondary").css('color', localStorage.getItem("s_colorcode")+" !important");
			break;
		case 'offline_Pending_list':
			offline_on_hold_page();
			break;
		case 'offline_Accepted_view_page':
			startclick = 1;
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Accepted_View_pages();
			break;
		case 'offline_direct_work_start':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Accepted_Direct_work_pages();
			break;
		case 'Offline_on_hold_reason_page':
			on_hold_offline_reason();
			break;
		case 'Offline_on_Reject_reason_page':
			on_reject_offline_reason();
			break;
		case 'offline_category_view_page':
			_category_offline_mode(1);
			break;
		case 'attachmentPage_offline':
			attachDefaultImage_offline();
			retaining_images_from_backend_offline();
			break;
		case 'offline_Accepted_entrip_view_page':
			$(".btnFontSize").css('color', localStorage.getItem("s_colorcode"));
			offline_Accepted_endtrip_View_pages();
			break;
		case 'Update_assets_offline':
			_Offline_Assets_taking_value_from_Array();
			retain_Assets_offline();
			break;
		default:
			break;
	}
});

function attachDefaultImage() {
	$(".attachementcontainer_class").attr("src", "img/camera.png");
}

function attachDefaultImage_offline() {
	$(".attachementcontainer_class").attr("src", "img/camera.png");
}
//-------------------------------------------------
/*Current coordinates Function*/
//-------------------------------------------------
function current_position() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	var x = position.coords.latitude + "," + position.coords.longitude;
	localStorage.setItem("current_position", "");
	localStorage.setItem("current_position", x);
}
//-------------------------------------------------
/*Current coordinates Function*/
//-------------------------------------------------
//-------------------------------------------------
/*Show App Loading Image From Respective Function*/
//-------------------------------------------------
function ApploadingIcon() {
	$("body").append("<div class='modalWindow' />");
	$("body").bind("touchmove", function(e) {});
	$.mobile.loading("show", {
		text: "Loading...",
		textVisible: false,
		theme: "a",
		html: ""
	});
	//    $("body").addClass("ui-loading");
}

function Apploadingdownicon(message) {
	$("body").append("<div class='modalWindow1' />");
	$("body").bind("touchmove", function(e) {});
	$.mobile.loading("show", {
		text: message,
		textVisible: true,
		theme: "a",
		html: ""
	});
}

function Apploadingupicon(message) {
	$("body").append("<div class='modalWindow2' />");
	$("body").bind("touchmove", function(e) {});
	$.mobile.loading("show", {
		text: message,
		textVisible: true,
		theme: "a",
		html: ""
	});
}
//-------------------------------------------------
/*Hide App Loading Image From Respective Function*/
//-------------------------------------------------
function hideLoadingIcon() {
	setTimeout(function() {
		$("body").unbind("touchmove");
		$(".modalWindow").remove();
		$.mobile.loading("hide");
		console.log("hiding")
	}, 3000);
}

function hideLoadingIcon1() {
	$("body").unbind("touchmove");
	$(".modalWindow1").remove();
	$.mobile.loading("hide");
}

function hideLoadingIcon2() {
	$("body").unbind("touchmove");
	$(".modalWindow2").remove();
	$.mobile.loading("hide");
}
//-------------------------------------------------
/*  start of page re directing function*/
//-------------------------------------------------
function changePage(pagename, pageTransition, isReverse) {
	$.mobile.changePage(pagename, {
		transition: pageTransition,
		changeHash: false,
		reverse: isReverse
	});
}
//-------------------------------------------------
/* end of Page re directing function*/
//-------------------------------------------------
//-------------------------------------------------
/*Check NetConnection Before calling Web Service*/
//-------------------------------------------------
function checkConnection() {
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';
	if(states[networkState] == 'No network connection') {
		return false;
	} else {
		return true;
	}
}
//-------------------------------------------------
/*Show alert Box Using From Respective Function*/
//-------------------------------------------------
function showAlert(alertmessage, title, callBack_func) {
	if(callBack_func) {
		navigator.notification.alert(alertmessage, callBack_func, title, "OK");
	} else {
		navigator.notification.alert(alertmessage, false, title, "OK");
	}
}
//-------------------------------------------------
/* webService Function */
//-------------------------------------------------
//Live
//var webServiceUrl = "http://qwork.quintica.com/Api/";
//Dev
//var webServiceUrl = "http://202.129.196.133/Qmobility3/Api/";
//dev2
var webServiceUrl = "http://qwork-dev2.quintica.com/Api/";
//local
//var webServiceUrl= "http://172.16.5.151/Qmobility3/Api/";
//var webServiceUrl="https://qwork-dev.quintica.com/Api/";
function QuinticaWebService(requestType, methodName, param, callBack) {
	errorHandling(function() {
		if(methodName == "casorOfflineSave" || methodName == "casorOffline" || methodName == "OfflineAssset" || methodName == "task_list") {
			console.log(methodName);
		} else {
			ApploadingIcon();
		}
		if(checkConnection()) {
			$.ajax({
				type: "" + requestType + "",
				url: webServiceUrl + methodName,
				data: param,
				async: false,
				success: function(message) {
					console.log(webServiceUrl + methodName);
					console.log(param);
					console.log(JSON.stringify(message));
					callBack(message);
				},
				error: function(xhr) {
					console.log(xhr.statusText);
					if(xhr.statusText == "Error: TimeoutError: DOM Exception 23") {
						showAlert("Please try again.", "Timeout Error!");
					}
					console.log("message" + JSON.stringify(xhr));
					hideLoadingIcon();
				}
			});
		} else {
			showAlert("No internet connection.", "WorkWide");
			hideLoadingIcon();
		}
	});
	// hideLoadingIcon();
}
//-------------------------------------------------
/*Exception Handling Block*/
//-------------------------------------------------
function errorHandling(originalCode) {
	try {
		originalCode();
	} catch(err) {
		console.log(err.message);
	}
}
//-------------------------------------------------
/*End of Exception Handling Block*/
//-------------------------------------------------
function read_all_notification() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "pushNotificationRead", parameters, function(response) {
		if(response.code == "1") {
			//cordova.plugins.notification.badge.configure({ autoClear: true });
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
		}
	});
}

function Notification_view_bindind_list() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "pushNotificationList", parameters, function(response) {
		if(response.code == "1") {
			if(Object.keys(response.data).length == 0) {
				showAlert("No Notification ..!!", "WorkWide");
			}
			$("#Notification_list").empty();
			for(i = 0; i < Object.keys(response.data).length; i++) {
				if(response.data[i].status_types == "IN PROGRESS") {
					response.data[i].status_types = "Accepted";
				}
				if(response.data[i].is_viewed == 0) {
					response.data[i].is_viewed = "Unread";
					var colorss = "unread";
				}
				if(response.data[i].is_viewed == 1) {
					response.data[i].is_viewed = "Read";
					var colorss = "Read";
				}
				var d = new Date(response.data[i].created_date);
				$("#Notification_list").append("<li data-icon='false'><a href='#'   class='" + colorss + " wborderradius' onclick='Notification_to_Page(\"" + response.data[i].task_id + "\",\"" + response.data[i].status_types + "\");' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + response.data[i].status_types + "</p></div>\
<h2 class='viewHurdleDescription2'>" + response.data[i].message + "</h2>\
<p class='viewHurdleDescription2'>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\
<p class='viewHurdleDescription2'><b>Status: </b><span> " + colorss + "</span></p>\
</a>\
</li>");
			}
			$(".Read").addClass("wborderradius");
			$(".UnRead").addClass("wborderradius");
			$("#Notification_list").listview("refresh");
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Notification_to_Page(taskid, status_types) {
	localStorage.setItem("notification_task_id_no", "");
	localStorage.setItem("notification_task_id_no", taskid);
	localStorage.setItem("notification_status_type", "");
	localStorage.setItem("notification_status_type", status_types);
	localStorage.setItem("Notification_value_to_View_page", "");
	localStorage.setItem("Notification_value_to_View_page", 1);
	pushs_read_unread();
}

function pushs_read_unread() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("notification_task_id_no"),
		isviewed: 1
	};
	QuinticaWebService("GET", "pushNotificationViewed", parameters, function(response) {
		if(response.code == "1") {
			if(localStorage.getItem("notification_status_type").toUpperCase() == "NEW" || localStorage.getItem("notification_status_type").toUpperCase() == "ASSIGNED") {
				changePage("#Assigned_view_tasklist_page", "slide", false);
			}
			if(localStorage.getItem("notification_status_type").toUpperCase() == "RESOLVED") {
				changePage("#Completed_view_tasklist_page", "slide", false);
			}
			if(localStorage.getItem("notification_status_type").toUpperCase() == "ON HOLD" || localStorage.getItem("notification_status_type").toUpperCase() == "ONHOLD") {
				changePage("#pending_view_tasklist_page", "slide", false);
			}
			if(localStorage.getItem("notification_status_type").toUpperCase() == "ACCEPTED") {
				changePage("#Accepted_view_tasklist_page", "slide", false);
			}
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
		}
	});
	read_all_notification();
}
//-------------------------------------------------
/*Start of Login Functionality*/
//-------------------------------------------------
function loginIn() {
	ApploadingIcon();
	if(($("#userName").val() == '') && ($("#password").val() == '')) showAlert("Please Enter Username And Password", "WorkWide");
	else if($("#userName").val() == '') showAlert("Please Enter Username", "WorkWide");
	else if($("#password").val() == '') showAlert("Please Enter Password", "WorkWide");
	else {
		var parameters = {
			"username": "" + $("#userName").val().trim() + "",
			"password": "" + $("#password").val().trim() + "",
			device_id: localStorage.getItem("DevieToken"),
			device_OS: device.platform,
			versioncode: "1.0.8"
		};
		QuinticaWebService("POST", "login", parameters, function(response) {
			console.log(parameters);
			if(response.code == "1") {
				if(response.TOKEN.flow == "0" || response.TOKEN.flow == 0) {
					inAcceptedmultiple = 0;
				} else {
					inAcceptedmultiple = 1;
				}
				localStorage.setItem("password", "");
				localStorage.setItem("TOKEN", "");
				localStorage.setItem("user_id", "");
				localStorage.setItem("email", "");
				localStorage.setItem("mobile", "");
				localStorage.setItem("name", "");
				localStorage.setItem("address", "");
				localStorage.setItem("entityid", "");
				localStorage.setItem("colorcode", "");
				localStorage.setItem("s_colorcode", "");
				localStorage.setItem("password", $("#password").val().trim());
				localStorage.setItem("TOKEN", response.TOKEN.TOKEN);
				localStorage.setItem("user_id", response.TOKEN.user_id);
				localStorage.setItem("email", response.TOKEN.email);
				localStorage.setItem("mobile", response.TOKEN.mobile);
				localStorage.setItem("name", response.TOKEN.name);
				localStorage.setItem("address", response.TOKEN.address);
				localStorage.setItem("entityid", response.TOKEN.entityid);
				localStorage.setItem("entityname", response.TOKEN.ent_name);
				localStorage.setItem("colorcode", response.TOKEN.colorCode);
				localStorage.setItem("s_colorcode", response.TOKEN.secondary_color);
				if(checkConnection()) {
					$(".imageprofile").css("background-image", "url(" + webServiceUrl + "fseProfileImage/TOKEN/" + response.TOKEN.TOKEN + "/userid/" + response.TOKEN.user_id + "" + ")");
					profileserverUrl = webServiceUrl + "fseProfileImage/TOKEN/" + response.TOKEN.TOKEN + "/userid/" + response.TOKEN.user_id;
					profilePicture(profileserverUrl, 0);
				}
				ApploadingIcon();
				acceptPageFromLandingPage = false;
				changePage("#Landingpage", "slide", false);
				//hideLoadingIcon();
			} else {
				showAlert("Incorrect username or password", "WorkWide");
				hideLoadingIcon();
			}
		});
	}
	// hideLoadingIcon()
}
//-------------------------------------------------
/*End of Login Functionality*/
//-------------------------------------------------
var email_id

function Reset() {
	email_id = $("#email").val();
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email_id.match(mailformat) && email_id != "") {
		var parameters = {
			emailid: email_id
		};
		QuinticaWebService("GET", "resetPassword", parameters, function(response) {
			if(response.code == "1") {
				showAlert(response.message, "WorkWide");
				hideLoadingIcon();
				changePage("#loginPg", "slide", false);
			} else {
				showAlert("Email-id didn't match with record..!!", "WorkWide");
				hideLoadingIcon();
			}
		});
	} else {
		showAlert("Please Enter valid email-id", "WorkWide");
		return false;
	}
}
//-------------------------------------------------
/*Start of Reset password Functionality*/
//-------------------------------------------------
function changePassword() {
	if(($("#forgotPasswordPgOldPassword").val() == '') && ($("#forgotPasswordPgNewPassword").val() == '') && ($("#forgotPasswordPgConfirmNewPassword").val() == '')) showAlert("Please Enter All Fields", "WorkWide");
	else if($("#forgotPasswordPgOldPassword").val() == '') showAlert("Please Enter Old Password", "WorkWide");
	else if($("#forgotPasswordPgNewPassword").val() == '') showAlert("Please Enter New Password", "WorkWide");
	else if($("#forgotPasswordPgConfirmNewPassword").val() == '') showAlert("Please Enter Confirm New Password", "WorkWide");
	else if((localStorage.getItem("password")) != ($("#forgotPasswordPgOldPassword").val())) showAlert("Old Password Doesn't Match", "WorkWide");
	else if(($("#forgotPasswordPgNewPassword").val()) == ($("#forgotPasswordPgConfirmNewPassword").val())) {
		parameters = {
			userId: localStorage.getItem("user_id"),
			oldPassword: "" + $("#forgotPasswordPgOldPassword").val() + "",
			newPassword: "" + $("#forgotPasswordPgNewPassword").val() + ""
		};
		QuinticaWebService("GET", "updatePassword", parameters, function(response) {
			if(response.code == "1") {
				document.getElementById("forgotPasswordPgOldPassword").value == "";
				document.getElementById("forgotPasswordPgNewPassword").value == "";
				document.getElementById("forgotPasswordPgConfirmNewPassword").value == "";
				changePage("#Landingpage", "slide", false);
				acceptPageFromLandingPage = false;
				hideLoadingIcon();
			} else {
				showAlert("Cannot Change Password", "WorkWide");
				hideLoadingIcon();
			}
		});
	} else {
		showAlert("New Password Did Not Match With Confirm New Password", "WorkWide");
	}
}
//-------------------------------------------------
/*End of Reset password  Functionality*/
//-------------------------------------------------
//-------------------------------------------------
/*start of profile details  Functionality*/
//-------------------------------------------------
function FSE_details_list_s() {
	$(".FSE_details_list").empty();
	$(".FSE_details_list").append("<li data-icon='false'><a href='#'class='textColorPanel ui-btn' ><span class='glyphicon glyphicon-lock paddingright'></span>" + localStorage.getItem("entityname") + "</a></li>\
<li data-icon='false'><a href='#' class='textColorPanel ui-btn'><span class='glyphicon glyphicon-earphone paddingright'></span>" + localStorage.getItem("mobile") + "</a></li>\
<li data-icon='false'><a href='#' class='textColorPanel ui-btn'><span class='glyphicon glyphicon-envelope paddingright'></span>" + localStorage.getItem("email") + "</a></li>\
<li data-icon='false'><a href='#' class='textColorPanel ui-btn'><span class='glyphicon glyphicon-map-marker paddingright'></span>" + localStorage.getItem("address") + "</a></li>");
	if($(".Fsenamelist").hasClass("ui-icon-carat-d")) {
		$(".Fsenamelist").removeClass("ui-icon-carat-d");
		$(".Fsenamelist").addClass("ui-icon-carat-u");
		$(".panelUl").css("display", "none");
		$(".FSE_details_list").css("display", "block");
		$(".versioncode").css("display", "none");
	} else {
		$(".Fsenamelist").removeClass("ui-icon-carat-u");
		$(".Fsenamelist").addClass("ui-icon-carat-d");
		$(".FSE_details_list").css("display", "none");
		$(".panelUl").css("display", "block");
		$(".versioncode").css("display", "block");
	}
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	var pid = activePage.attr('id');
	$("#" + pid + ".FSE_details_list").listview("refresh");
	hideLoadingIcon();
}
//-------------------------------------------------
/*Camera Actionsheet Calling option Code*/
//-------------------------------------------------
function profileimage() {
	var options = {
		androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
		title: 'Choose Photo',
		subtitle: '', // supported on iOS only
		buttonLabels: ['Camera', 'Photo Library'],
		addCancelButtonWithLabel: 'Cancel',
		androidEnableCancelButton: true,
		winphoneEnableCancelButton: true,
	};
	window.plugins.actionsheet.show(options, callback);
}
var callback = function(buttonIndex) {
	setTimeout(function() {
		if(buttonIndex == 1) {
			cameraphoto();
		} else if(buttonIndex == 2) {
			cameraGetPicture();
		}
	});
};
//-------------------------------------------------
/*Option to capture picture from camera*/
//-------------------------------------------------
var cameraimage;

function cameraphoto() {
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 30,
		correctOrientation: true,
		destinationType: Camera.DestinationType.DATA_URL
	});

	function onSuccess(imageURI) {
		StatusBar.hide();
		StatusBar.show();
		// var image = document.getElementById('my-image');
		// image.src = "";
		// image.src = "data:image/jpeg;base64," + imageURI;
		cameraimage = imageURI;
		$(".imageprofile").css("background-image", "none");
		$(".imageprofile").css("background-image", "url(" + "data:image/jpeg;base64," + imageURI + ")");
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			userid: localStorage.getItem("user_id"),
			pictureString: cameraimage
		};
		QuinticaWebService("POST", "fseProfilePic", parameters, function(response) {
			if(response.code == "1") {
				hideLoadingIcon();
			}
		});
	}

	function onFail(message) {}
}
//-------------------------------------------------
/*Option to capture picture from Library*/
//-------------------------------------------------
var libraryphoto;

function cameraGetPicture() {
	navigator.camera.getPicture(onSuccess1, onFail1, {
		quality: 30,
		correctOrientation: true,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY
	});

	function onSuccess1(imageURL) {
		StatusBar.hide();
		StatusBar.show();
		//var images = document.getElementById('my-image');
		//images.src = "data:image/jpeg;base64," + imageURL;
		libraryphoto = imageURL;
		$(".imageprofile").css("background-image", "none");
		$(".imageprofile").css("background-image", "url(" + "data:image/jpeg;base64," + imageURL + ")");
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			userid: localStorage.getItem("user_id"),
			pictureString: libraryphoto
		};
		QuinticaWebService("POST", "fseProfilePic", parameters, function(response) {
			if(response.code == "1") {
				hideLoadingIcon();
			}
		});
	}

	function onFail1(message) {}
}
//-------------------------------------------------
/*End of profile details   Functionality*/
//-------------------------------------------------
//-------------------------------------------------
/*Start of Total Count of List  Functionality*/
//-------------------------------------------------
function inProgress() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "inprogessTaskId", parameters, function(response) {
		if(response.code == "1") {
			if((response.TaskId !== 0 || response.TaskId !== "0") && (localStorage.getItem("resume_option") == "" || localStorage.getItem("resume_option") == null)) {
				localStorage.setItem("Accepted_Task_id", response.TaskId);
				localStorage.setItem("resume_option", 1);
			} else {
				localStorage.setItem("Accepted_Task_id", response.TaskId);
			}
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function listcounts() {
	if(navigator.network.connection.type == Connection.NONE) {
		localStorage.setItem("resume_option", "");
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id")
	};
	QuinticaWebService("POST", "taskCount", parameters, function(response) {
		if(response.code == "1") {
			document.getElementById("current").innerHTML = "0";
			localStorage.setItem("Assigned", response.data[0].statusId);
			localStorage.setItem("Accepted", response.data[2].statusId);
			localStorage.setItem("Completed", response.data[3].statusId);
			localStorage.setItem("Pending", response.data[1].statusId);
			document.getElementById("Assigned").innerHTML = "";
			document.getElementById("Assigned").innerHTML = response.data[0].total;
			document.getElementById("Accepted").innerHTML = "";
			document.getElementById("Accepted").innerHTML = response.data[2].total;
			document.getElementById("Completed").innerHTML = "";
			document.getElementById("Completed").innerHTML = response.data[3].total;
			document.getElementById("Pending").innerHTML = "";
			document.getElementById("Pending").innerHTML = response.data[1].total;
			if(response.data[4].total == "1" || response.data[4].total == 1) {
				document.getElementById("current").innerHTML = "";
				document.getElementById("current").innerHTML = response.data[4].total;
				$("#hide_show_buttonsss").css("display", "none");
				inProgressflag = 0;
				inProgressset = 1;
			} else if(response.data[2].total == "1" || response.data[2].total > 0) {
				//alert("testt");
				inAccepted = 1;
				$("#hide_show_buttonsss").css("display", "none");
			} else {
				$("#hide_show_buttonsss").css("display", "block");
				inProgressflag = 1;
			}
			document.getElementById("Pending").innerHTML = response.data[1].total;
			localStorage.setItem("Assigned_button_id", response.data[4].total);
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function backEndTaskPage() {
	console.log("DATA : " + localStorage.getItem("START_WORK"))
	if(localStorage.getItem("START_WORK") == "Y") {
		changePage("#Accepted_view_tasklist_page", "slide", false);
	} else {
		changePage("#Accepted_End_trip_view_tasklist_page", "slide", false);
	}
}

function backFromStartTripPage() {
	if(acceptPageFromLandingPage) {
		changePage("#Landingpage", "slide", false);
	} else {
		if(inAcceptedmultiple == 1) {
			changePage("#Accepted_tasks_page", "slide", false);
		} else {
			changePage("#Assigned_tasklist_page", "slide", false);
		}
	}
	acceptPageFromLandingPage = false;
}
//==================================================
function start_click() {
	acceptPageFromLandingPage = true;
	ApploadingIcon();
	startclick = 1;
	if(inProgressflag == 1) {
		changePage("#Landingpage", "slide", false);
		acceptPageFromLandingPage = false;
	} else if(localStorage.getItem("resume_option") == "" || localStorage.getItem("resume_option") == null) {
		changePage("#Accepted_tasks_page", "slide", false);
	} else if(localStorage.getItem("resume_option") == 1) {
		changePage("#Accepted_view_tasklist_page", "slide", false);
	} else if(localStorage.getItem("resume_option") == 2) {
		changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
		//  checklist_for_task();
	} else if(localStorage.getItem("resume_option") == 4) {
		changePage("#Accepted_Customer_details_view_tasklist_page", "slide", false);
	} else if(localStorage.getItem("resume_option") == 3) {
		changePage("#Accepted_Signature_and_feeback_view_tasklist_page", "slide", false);
	} else if(localStorage.getItem("resume_option") == 5) {
		changePage("#Accepted_End_trip_view_tasklist_page", "slide", false);
	}
	hideLoadingIcon();
}
//-------------------------------------------------
/*End of Total Count of List  Functionality*/
//-------------------------------------------------
//-------------------------------------------------
/*Start of Binding Assigned task list  Functionality*/
//-------------------------------------------------
function Assigned_task_list() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id"),
		statusType: localStorage.getItem("Assigned")
	};
	ApploadingIcon();
	QuinticaWebService("GET", "task_list", parameters, function(response) {
		if(response.code == "1") {
			if(Object.keys(response.data).length == 0) {
				showAlert("No Task ..!!", "WorkWide");
			}
			$("#task_view_accepted").empty();
			var critical = false;
			var heigh = false;
			var moderate = false;
			var low = false;
			var planing = false;
			for(var i = 0; i < Object.keys(response.data).length; i++) {
				if(response.data[i].start_date == null || response.data[i].start_date == "") {
					response.data[i].start_date = Current_date_day;
				}
				var d = new Date(response.data[i].created_date);
				//<li data-role='list-divider'> " + response.data[i].start_date + "</li>
				if(response.data[i].priority_type == 'Critical') {
					if(!critical) {
						$("#task_view_accepted").append("<hr  data-icon='false' style='background-color: #ff0000; height: 2px; width: 50%;'><h3 style='width: 100px; margin: auto;text-align: center; position: relative; padding-bottom: 20px;'>" + response.data[i].priority_type + "</h3>");
						critical = true;
					}
				}
				if(response.data[i].priority_type == 'High') {
					if(!heigh) {
						$("#task_view_accepted").append("<hr data-icon='false' style='background-color: #ff7e00; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[i].priority_type + "</h3>");
						heigh = true;
					}
				}
				if(response.data[i].priority_type == 'Moderate') {
					if(!moderate) {
						$("#task_view_accepted").append("<hr data-icon='false' style='background-color: #0c6410; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[i].priority_type + "</h3>");
						moderate = true;
					}
				}
				if(response.data[i].priority_type == 'Low') {
					if(!low) {
						$("#task_view_accepted").append("<hr  data-icon='false' style='background-color: #0836e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[i].priority_type + "</h3>");
						low = true;
					}
				}
				if(response.data[i].priority_type == 'Planing') {
					if(!planing) {
						$("#task_view_accepted").append("<hr data-icon='false' style='background-color: #8808e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[i].priority_type + "</h3>");
						planing = true;
					}
				}
				var count = 0;
				if(critical) {
					count = count + 1
				}
				if(heigh) {
					count = count + 1
				}
				if(moderate) {
					count = count + 1
				}
				if(low) {
					count = count + 1
				}
				if(planing) {
					count = count + 1
				}
				var num = 0;
				if(count > 1) {
					num = 1;
				}
				$("#task_view_accepted").append("<li  data-icon='false'><a href='#' class='wborderradius' onclick='Assigned_view(" + response.data[i].id + "," + num + ");' data-transition='slide'>\
                                                   <div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[i].status_type + "</p></div>\
                                                   <h2 class='viewHurdleDescription' style=''> " + response.data[i].task_name + "</h2>\
                                                   <p class='viewHurdleDescription2'> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\
                                                   <hr>\
                                                   <p class='viewHurdleDescription1'><b>Address</b></p><p class='viewHurdleDescription2'> " + response.data[i].task_address + "</p>\
                                                   </li>");
			}
			$("#task_view_accepted").listview("refresh");
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
	localStorage.setItem("Notification_value_to_View_page", "");
}
//-------------------------------------------------
/*End of Binding Assigned task list  Functionality*/
//-------------------------------------------------
function Assigned_view(taskid, num) {
	localStorage.setItem("Assigned_Task_id", "");
	localStorage.setItem("Assigned_Task_id", taskid);
	localStorage.setItem("num", num);
	//    localStorage.getItem("Assigned_button_id") == 0
	console.log("Assigned_view" + localStorage.getItem("num") + "Accepted" + inAccepted + "inset" + inProgressset + "" + inAcceptedmultiple);
	if(localStorage.getItem("num") == 0 && inAccepted == 0 && inProgressset == 0) {
		$("#hide_show_buttonsss").css("display", "block");
	} else {
		$("#hide_show_buttonsss").css("display", "none");
	}
	if(inAcceptedmultiple == 1) {
		$("#hide_show_buttonsss").css("display", "block");
	}
	changePage("#Assigned_view_tasklist_page", "slide", false);
}
//-------------------------------------------------
/*Start of View Page Assigned task list  Functionality*/
//-------------------------------------------------
function Assigned_view_page() {
	if(localStorage.getItem("Notification_value_to_View_page") == 1) {
		$("#hide_show_buttonsss").css("display", "block");
		localStorage.setItem("Assigned_Task_id", localStorage.getItem("notification_task_id_no"));
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Assigned_Task_id")
	};
	QuinticaWebService("GET", "taskDetails", parameters, function(response) {
		if(response.code == "1") {
			localStorage.setItem("Notification_value_to_View_page", "");
			if(response.data[0].task_location == null || response.data[0].task_location == "" || response.data[0].task_location == "null") {
				x = "-33.2775168,9.1259397";
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", x);
			} else {
				var str = response.data[0].task_location;
				var result = str.replace(/[\])[(]/g, '');
				var result_last = result.split(" ").join("");
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", result_last);
			}
			$("#View_page_for_Assigned_task").empty();
			if(response.data[0].start_date == null || response.data[0].start_date == "") {
				response.data[0].start_date = Current_date_day;
			}
			var d = new Date(response.data[0].created_date);
			$("#View_page_for_Assigned_task").append("<li>\
                                                                        <h2 class='viewHurdleDescription' style=''>" + response.data[0].task_name + "</h2>\
                                                                        <ul style='margin-left: -40px; list-style-type: none;'><li><p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\</li>\ <li><hr>\</li>\
                                                                        <li><p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + response.data[0].task_address + "</p></p>\ </li>\
                                                                        <li><p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Completed_View(" + response.data[0].id + ");'><b>TASK DETAIL</b></p>\</li>\
                                                                        </ul>\
                                                                        </li>");
			var watchId = '0';
			$("#View_page_for_Assigned_task").listview("refresh");
			var isExpanded = false;
			$(function() {
				var size = 100;
				var sizeAfterExpand = $('#View_page_for_Assigned_task').height() + 10;
				$('#View_page_for_Assigned_task ul').hide(0).parent();
				var sizeBeforeExpand = $('#View_page_for_Assigned_task').height() + 10;
				$('#expand').css("bottom", sizeBeforeExpand);
				$('#expand').on('click', function(e) {
					e.stopPropagation();
					if(isExpanded) {
						$('#View_page_for_Assigned_task ul').hide(400).parent();
						isExpanded = false;
						$('#fab_icon').attr("src", "img/arrow-up.png");
					} else {
						// $('#expand').css("bottom", "40%");
						isExpanded = true;
						$('#View_page_for_Assigned_task ul').show(400).parent();
						$('#fab_icon').attr("src", "img/arrow-down.png")
					}
					if(isExpanded) {
						size = sizeAfterExpand;
					} else {
						size = sizeBeforeExpand;
					}
					$('#expand').animate({
						bottom: size
					});
					$('html, body').animate({
						scrollTop: $(document).height()
					});
					return false;
				});
			});
			hideLoadingIcon();
			initMap('Assigned_page_map', 'distance', localStorage.getItem("Assigned_Task_id"));
		} else {
			//initMap('Assigned_page_map','distance');
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Collapible_Assigned() {
	if($("#Collapible_Assigned_div").hasClass("ui-icon-carat-d")) {
		$("#Collapible_Assigned_div").removeClass("ui-icon-carat-d");
		$("#Collapible_Assigned_div").addClass("ui-icon-carat-u");
		$("#Collapible_Assigned_Content").css("display", "block");
	} else if($("#Collapible_Assigned_div").hasClass("ui-icon-carat-u")) {
		$("#Collapible_Assigned_div").removeClass("ui-icon-carat-u");
		$("#Collapible_Assigned_div").addClass("ui-icon-carat-d");
		$("#Collapible_Assigned_Content").css("display", "none");
	}
}

function initMap(map_id, distance_id, taskIDs) {
	ApploadingIcon()
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var mapss = new google.maps.Map(document.getElementById(map_id), {
		zoom: 6,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		navigationControl: false,
		streetViewControl: false,
		zoomControl: false,
		fullscreenControl: false,
		center: {
			lat: 41.85,
			lng: -87.65
		}
	});
	/* directionsDisplay.setOptions({
	 polylineOptions: {
	 strokeColor: '#00bfff',
	 strokeOpacity: 0.8,
	 strokeWeight: 5
	 }
	 });*/
	directionsDisplay.setMap(mapss);
	console.log("map data loading");
	calculateAndDisplayRoute(directionsService, directionsDisplay, mapss, distance_id, taskIDs);
	//calculateAndDisplayRouteForMultipleDestination(directionsService, directionsDisplay,mapss);
	if(distance_id == 'distancess') {
		//updateMapInterval = setInterval(function(){ calculateAndDisplayRoute(directionsService, directionsDisplay,mapss,distance_id); }, 60000);
	}
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, mapss, distance_id, taskIDs) {
	var start = '0';
	// Try HTML5 geolocation.
	if(navigator.geolocation) {
		var options = {
			enableHighAccuracy: true
		};
		console.log("map data loading" + taskIDs);
		try {
			navigator.geolocation.getCurrentPosition(function(position) {
				start = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				console.log("map data loading" + distance_id);
				var x = position.coords.latitude + "," + position.coords.longitude;
				localStorage.setItem("current_position", x);
				var end = localStorage.getItem("Customer_location");
				directionsService.route({
					origin: start,
					destination: end,
					optimizeWaypoints: true,
					travelMode: 'DRIVING'
				}, function(response, status) {
					console.log('response :' + JSON.stringify(response));
					if(status === 'OK') {
						directionsDisplay.setDirections(response);
						var trafficLayer = new google.maps.TrafficLayer();
						trafficLayer.setMap(mapss);
						var data = JSON.parse(JSON.stringify(response));
						var obj = data['routes'][0]['legs'][0];
						document.getElementById(distance_id).innerHTML = "";
						//document.getElementById("distance").innerHTML = "This trip will take you " + obj['duration'].text + "(" + obj['distance'].text + ")";
						document.getElementById(distance_id).innerHTML = "ETA: " + obj['duration'].text + "(" + obj['distance'].text + ")";
						geokm = obj['distance'].text.slice(0, -2).replace(/\,/g, '');
						hideLoadingIcon();
					} else {
						document.getElementById(distance_id).innerHTML = "ETA:";
						hideLoadingIcon();
						navigator.notification.alert("Sorry, Given address not found in Google map!");
					}
				});
				hideLoadingIcon();
			}, function() {
				start = localStorage.getItem("current_position");
			}, options);
		} catch(err) {
			console.log("Error in location : " + err.message);
		}
	} else {
		console.log('Device does not support Geolocation');
		if(updateMapInterval != null) {
			clearInterval(updateMapInterval);
			updateMapInterval = null;
		}
		start = localStorage.getItem("current_position");
	}
	Get_time_distance(taskIDs);
}

function Get_time_distance(taskIDs) {
	if(localStorage.getItem("current_position") == "" || localStorage.getItem("current_position") == null) {
		localStorage.setItem("current_position", "0");
	}
	var parameters = {
		origins: localStorage.getItem("current_position"),
		destinations: localStorage.getItem("Customer_location"),
		task_id: taskIDs
	};
	QuinticaWebService("GET", "distanceCalc", parameters, function(response) {
		if(response.code == "1" && response.data.status != "NOT_FOUND") {} else {
			hideLoadingIcon();
		}
	});
	hideLoadingIcon()
}
//-------------------------------------------------
/*End of View Page Assigned task list  Functionality*/
//-------------------------------------------------
//-------------------------------------------------
/*Start of Assigned To Accepted task  Functionality*/
//-------------------------------------------------
function Confirm_To_Accept_Task() {
	//ApploadingIcon();
	navigator.notification.confirm("Are you sure you want to accept this task?", Confirm_To_Accept_Task_Button, "WorkWide", ["Yes", "No"]);
}

function Confirm_To_Accept_Task_Button(buttonIndex) {
	if(buttonIndex == 1) {
		var statusId = 3;
		if(inAcceptedmultiple == 0) {
			statusId = 5;
			localStorage.setItem("Accepted_Task_id", "");
			localStorage.setItem("Accepted_Task_id", localStorage.getItem("Assigned_Task_id"));
		}
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Assigned_Task_id"),
			statusid: statusId
		};
		ApploadingIcon();
		QuinticaWebService("GET", "updatetaskStatus", parameters, function(response) {
			if(response.code == "1") {
				if(inAcceptedmultiple == 1) {
					changePage("#Accepted_tasks_page", "slide", false);
				} else {
					inProgressset = 1;
					changePage("#Accepted_view_tasklist_page", "slide", false);
				}
			} else {
				showAlert("Please try again..!!", "WorkWide");
				hideLoadingIcon();
			}
		});
	}
}
//-------------------------------------------------
/*End of Assigned To Accepted task  Functionality*/
//-------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*Accepted Page  Functionality*/
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------
/*Start of Binding Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_Tasks_Page() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id"),
		statusType: localStorage.getItem("Accepted"),
		fromdashboard: "1"
	};
	ApploadingIcon();
	QuinticaWebService("GET", "task_list", parameters, function(response) {
		if(response.code == "1") {
			if(Object.keys(response.data).length == 0) {
				showAlert("No Task ..!!", "WorkWide");
				$("#Accepted_Tasks_list").empty();
				$("#Accepted_Tasks_list").listview("refresh");
			} else {
				$("#Accepted_Tasks_list").empty();
				var critical = false;
				var heigh = false;
				var moderate = false;
				var low = false;
				var planing = false;
				for(k = 0; k < Object.keys(response.data).length; k++) {
					if(response.data[k].updated_date == null || response.data[k].updated_date == "") {
						response.data[k].updated_date = Current_date_day;
					}
					//                           <li data-role='list-divider'>" + response.data[k].start_date + "</li>\
					var d = new Date(response.data[k].created_date);
					if(response.data[k].priority_type == 'Critical') {
						if(!critical) {
							$("#Accepted_Tasks_list").append("<hr  data-icon='false' style='background-color: #ff0000; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[k].priority_type + "</h3>");
							critical = true;
						}
					}
					if(response.data[k].priority_type == 'High') {
						if(!heigh) {
							$("#Accepted_Tasks_list").append("<hr data-icon='false' style='background-color: #ff7e00  ; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[k].priority_type + "</h3>");
							heigh = true;
						}
					}
					if(response.data[k].priority_type == 'Moderate') {
						if(!moderate) {
							$("#Accepted_Tasks_list").append("<hr data-icon='false' style='background-color: #0c6410; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[k].priority_type + "</h3>");
							moderate = true;
						}
					}
					if(response.data[k].priority_type == 'Low') {
						if(!low) {
							$("#Accepted_Tasks_list").append("<hr  data-icon='false' style='background-color: #0836e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[k].priority_type + "</h3>");
							low = true;
						}
					}
					if(response.data[k].priority_type == 'Planing') {
						if(!planing) {
							$("#Accepted_Tasks_list").append("<hr data-icon='false' style='background-color: #8808e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + response.data[k].priority_type + "</h3>");
							planing = true;
						}
					}
					$("#Accepted_Tasks_list").append("<li data-icon='false'><a href='#' class='wborderradius' onclick='Accepted_view(" + response.data[k].id + ");' data-transition='slide'>\
                                                    <div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[k].status_type + "</p></div>\
                                                    <h2 class='viewHurdleDescription' style=''> " + response.data[k].task_name + "</h2>\
                                                    <p class='viewHurdleDescription2' style=''> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
                                                    <p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + response.data[k].task_address + " </p></b></p>\
                                                    </li>");
				}
				$("#Accepted_Tasks_list").listview("refresh");
				hideLoadingIcon();
			}
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
		hideLoadingIcon();
	});
}
//-------------------------------------------------
/*End of Binding Accepted task list  Functionality*/
function Accepted_view(taskid) {
	localStorage.setItem("Accepted_Task_id", "");
	localStorage.setItem("Accepted_Task_id", taskid);
	changePage("#Accepted_view_tasklist_page", "slide", false);
	if(inProgressset == 0 || startclick == 1) {
		startclick = 0;
		$("#starttripwork").css("display", "block");
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Accepted_Task_id"),
			statusid: 5
		};
		ApploadingIcon();
		QuinticaWebService("GET", "updatetaskStatus", parameters, function(response) {
			if(response.code == "1") {
				inProgressset = 1;
				changePage("#Accepted_view_tasklist_page", "slide", false);
			} else {
				showAlert("Please try again..!!", "WorkWide");
				hideLoadingIcon()
			}
		});
	} else {
		$("#starttripwork").css("display", "none");
	}
}
//-------------------------------------------------
/*Start of View Page Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_view_page() {
	if(localStorage.getItem("Pending_option") == 1) {
		localStorage.setItem("Accepted_Task_id", localStorage.getItem("Pending_Task_id"));
	}
	if(localStorage.getItem("Notification_value_to_View_page") == 1) {
		localStorage.setItem("Accepted_Task_id", localStorage.getItem("notification_task_id_no"));
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskDetails", parameters, function(response) {
		if(response.code == "1") {
			if(response.data[0].task_location == null || response.data[0].task_location == "" || response.data[0].task_location == "null") {
				var x = "-33.2775168,9.1259397";
				localStorage.setItem("Accepted_Customer_location", "");
				localStorage.setItem("Accepted_Customer_location", x);
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", x);
			} else {
				console.log(response.data[0].task_location);
				var str = response.data[0].task_location;
				var result = str.replace(/[\])[(]/g, '');
				var result_last = result.split(" ").join("");
				localStorage.setItem("Accepted_Customer_location", "");
				console.log(result_last);
				localStorage.setItem("Accepted_Customer_location", result_last);
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", result_last);
			}
			$("#View_page_for_Accepted_task").empty();
			if(response.data[0].start_date == null || response.data[0].start_date == "") {
				response.data[0].start_date = Current_date_day;
			}
			var d = new Date(response.data[0].created_date);
			//                                               <li data-role='list-divider'> " + response.data[0].start_date + "</li>\
			$("#View_page_for_Accepted_task").append("<li>\
                                                                        <h2 class='viewHurdleDescription' style=''>" + response.data[0].task_name + "</h2>\
                                                                        <ul style='margin-left: -40px; list-style-type: none;'><li><p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\</li>\ <li><hr>\</li>\
                                                                        <li><p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + response.data[0].task_address + "</p></p>\ </li>\
                                                                        <li><p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Completed_View(" + response.data[0].id + ");'><b>TASK DETAIL</b></p>\</li>\
                                                                        </ul>\
                                                                        </li>");
			$("#View_page_for_Accepted_task").listview("refresh");
			var isExpanded = false;
			$(function() {
				var size = 100;
				var sizeAfterExpand = $('#View_page_for_Accepted_task').height() + 10;
				$('#View_page_for_Accepted_task ul').hide(0).parent();
				var sizeBeforeExpand = $('#View_page_for_Accepted_task').height() + 10;
				$('#expand_accepted').css("bottom", sizeBeforeExpand);
				$('#expand_accepted').on('click', function(e) {
					e.stopPropagation();
					if(isExpanded) {
						$('#View_page_for_Accepted_task ul').hide(400).parent();
						isExpanded = false;
						$('#fab_icon_accepted').attr("src", "img/arrow-up.png");
					} else {
						isExpanded = true;
						$('#View_page_for_Accepted_task ul').show(400).parent();
						$('#fab_icon_accepted').attr("src", "img/arrow-down.png")
					}
					if(isExpanded) {
						size = sizeAfterExpand;
					} else {
						size = sizeBeforeExpand;
					}
					$('#expand_accepted').animate({
						bottom: size
					});
					$('html, body').animate({
						scrollTop: $(document).height()
					});
					return false;
				});
			});
			hideLoadingIcon();
			initMap('Accepted_page_map', 'distances', localStorage.getItem("Accepted_Task_id"));
			localStorage.setItem("resume_option", "1");
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Accept_initMap() {
	ApploadingIcon();
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var maps = new google.maps.Map(document.getElementById('Accepted_page_map'), {
		zoom: 6,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		navigationControl: false,
		streetViewControl: false,
		zoomControl: false,
		fullscreenControl: false,
		center: {
			lat: 41.85,
			lng: -87.65
		}
	});
	directionsDisplay.setMap(maps);
	calculateAndDisplayRoutes(directionsService, directionsDisplay);
}

function calculateAndDisplayRoutes(directionsService, directionsDisplay) {
	var start = localStorage.getItem("current_position");
	var end = localStorage.getItem("Accepted_Customer_location");
	directionsService.route({
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	}, function(response, status) {
		if(status === 'OK') {
			directionsDisplay.setDirections(response);
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
			navigator.notification.alert("Sorry, Given address not found in Google map!");
		}
	});
	hideLoadingIcon();
	Accepted_Get_time_distance();
}

function Accepted_Get_time_distance() {
	if(localStorage.getItem("current_position") == "" || localStorage.getItem("current_position") == null) {
		localStorage.setItem("current_position", "0");
	}
	var parameters = {
		origins: localStorage.getItem("current_position"),
		destinations: localStorage.getItem("Accepted_Customer_location"),
		task_id: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "distanceCalc", parameters, function(response) {
		if(response.code == "1" && response.data.status != "NOT_FOUND") {
			document.getElementById("distances").innerHTML = "";
			document.getElementById("distances").innerHTML = "This trip will take you " + response.data.duration.text + "(" + response.data.distance.text + ")";
			geokm = response.data.distance.text.slice(0, -2).replace(/\,/g, '');
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
		}
	});
}
//-------------------------------------------------
/*End of View Page Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_start_trip() {
	navigator.notification.confirm("Are you sure you want to start this trip?", Accepted_start_trip_button, "WorkWide", ["Yes", "No"]);
}

function Accepted_start_trip_button(buttonIndex) {
	if(buttonIndex == 1) {
		Accepted_starttime();
		localStorage.setItem("resume_option", 5);
		changePage("#Accepted_End_trip_view_tasklist_page", "slide", false);
	}
}
//-------------------------------------------------
/*Start of View Page End-Trip Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_End_trip_view_page() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskDetails", parameters, function(response) {
		if(response.code == "1") {
			if(response.data[0].task_location == null || response.data[0].task_location == "" || response.data[0].task_location == "null") {
				var x = "-33.2775168,9.1259397";
				localStorage.setItem("Accepted_end_trip_Customer_location", "");
				localStorage.setItem("Accepted_end_trip_Customer_location", x);
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", x);
			} else {
				var str = response.data[0].task_location;
				var result = str.replace(/[\])[(]/g, '');
				var result_last = result.split(" ").join("");
				localStorage.setItem("Accepted_end_trip_Customer_location", "");
				localStorage.setItem("Accepted_end_trip_Customer_location", result_last);
				localStorage.setItem("Customer_location", "");
				localStorage.setItem("Customer_location", result_last);
			}
			$("#View_page_End_trip_for_Accepted_task").empty();
			if(response.data[0].start_date == null || response.data[0].start_date == "") {
				response.data[0].start_date = Current_date_day;
			}
			var d = new Date(response.data[0].created_date);
			$("#View_page_End_trip_for_Accepted_task").append("<li data-icon='false'>\
                                                                                 <h2 class='viewHurdleDescription' style=''>" + response.data[0].task_name + "</h2>\
                                                                                 <ul style='margin-left: -40px; list-style-type: none;'><li> <p class='viewHurdleDescription2'>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\</li>\  <li><hr>\</li>\
                                                                                 <li><p class='viewHurdleDescription1'><b>Address</b><br><p class='viewHurdleDescription2'> " + response.data[0].task_address + "</p></p>\ </li>\
                                                                                 <li><p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Completed_View(" + response.data[0].id + ");'><b>TASK DETAIL</b></p>\</li>\
                                                                                 <li><p class='ui-li-aside' style='color:#E2D401'></p>\</li>\</ul>\
                                                                                 </li>");
			$("#View_page_End_trip_for_Accepted_task").listview("refresh");
			var isExpanded = false;
			$(function() {
				var size = 100;
				var sizeAfterExpand = $('#View_page_End_trip_for_Accepted_task').height() + 10;
				$('#View_page_End_trip_for_Accepted_task ul').hide(0).parent();
				var sizeBeforeExpand = $('#View_page_End_trip_for_Accepted_task').height() + 10;
				$('#expand_accepted_end').css("bottom", sizeBeforeExpand);
				$('#expand_accepted_end').on('click', function(e) {
					e.stopPropagation();
					if(isExpanded) {
						$('#View_page_End_trip_for_Accepted_task ul').hide(400).parent();
						isExpanded = false;
						$('#fab_icon_accepted_end').attr("src", "img/arrow-up.png");
					} else {
						isExpanded = true;
						$('#View_page_End_trip_for_Accepted_task ul').show(400).parent();
						$('#fab_icon_accepted_end').attr("src", "img/arrow-down.png")
					}
					if(isExpanded) {
						size = sizeAfterExpand;
					} else {
						size = sizeBeforeExpand;
					}
					$('#expand_accepted_end').animate({
						bottom: size
					});
					$('html, body').animate({
						scrollTop: $(document).height()
					});
					//$("#expand_accepted_end").css('bottom', $("#View_page_End_trip_for_Accepted_task").height() + "px");
					return false;
				});
			});
			hideLoadingIcon();
			//Accept_initMap();
			initMap('Accepted_End_trip_page_map', 'distancess', localStorage.getItem("Accepted_Task_id"));
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Accept_End_trip_initMap() {
	ApploadingIcon();
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('Accepted_End_trip_page_map'), {
		zoom: 6,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		navigationControl: false,
		streetViewControl: false,
		zoomControl: false,
		fullscreenControl: false,
		center: {
			lat: 41.85,
			lng: -87.65
		}
	});
	directionsDisplay.setMap(map);
	calculateAndDisplayRoutess(directionsService, directionsDisplay);
}

function calculateAndDisplayRoutess(directionsService, directionsDisplay) {
	var start = localStorage.getItem("current_position");
	var end = localStorage.getItem("Accepted_Customer_location");
	directionsService.route({
		origin: start,
		destination: end,
		travelMode: 'DRIVING'
	}, function(response, status) {
		if(status === 'OK') {
			directionsDisplay.setDirections(response);
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
			navigator.notification.alert("Sorry, Given address not found in Google map!");
		}
	});
	hideLoadingIcon();
	Accepted_End_trip_Get_time_distance();
}

function Accepted_End_trip_Get_time_distance() {
	if(localStorage.getItem("current_position") == "" || localStorage.getItem("current_position") == null) {
		localStorage.setItem("current_position", "0");
	}
	var parameters = {
		origins: localStorage.getItem("current_position"),
		destinations: localStorage.getItem("Accepted_Customer_location"),
		task_id: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "distanceCalc", parameters, function(response) {
		if(response.code == "1" && response.data.status != "NOT_FOUND") {
			document.getElementById("distancess").innerHTML = "";
			document.getElementById("distancess").innerHTML = "This trip will take you " + response.data.duration.text + "(" + response.data.distance.text + ")";
			geokm = response.data.distance.text.slice(0, -2).replace(/\,/g, '');
			hideLoadingIcon();
		} else {
			hideLoadingIcon();
		}
	});
}
//-------------------------------------------------
/*End of View Page End-Trip Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_end_trip() {
	navigator.notification.confirm("Are you sure you want to end this trip?", Accepted_end_trip_button, "WorkWide", ["Yes", "No"]);
}

function Accepted_end_trip_button(buttonIndex) {
	if(buttonIndex == 1) {
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			task_id: localStorage.getItem("Accepted_Task_id"),
			geo_km: geokm,
			end_trip: "1",
			start_work: "1"
		};
		QuinticaWebService("GET", "taskTimeCalcu", parameters, function(response) {
			if(response.code == "1") {
				//  decision_for_checklist();
				localStorage.setItem("START_WORK", "N");
				changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
				hideLoadingIcon();
			}
		});
	}
}
//-------------------------------------------------
function Accepted_start_work_direct() {
	navigator.notification.confirm("Are you sure you want to start work?", start_work_direct_button, "WorkWide", ["Yes", "No"]);
}

function start_work_direct_button(buttonIndex) {
	if(buttonIndex == 1) {
		ApploadingIcon();
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			task_id: localStorage.getItem("Accepted_Task_id"),
			geo_km: geokm,
			start_work: "1"
		};
		QuinticaWebService("GET", "taskTimeCalcu", parameters, function(response) {
			if(response.code == "1") {
				localStorage.setItem("START_WORK", "Y");
				changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
				hideLoadingIcon();
			}
		});
	}
}
//-------------------------------------------------
/*Start of View Page Start Work Direct Accepted task list  Functionality*/
//-------------------------------------------------
function Accepted_Direct_work_view_page() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskDetails", parameters, function(response) {
		if(response.code == "1") {
			$("#View_page_Direcr_work_for_Accepted_task").empty();
			if(response.data[0].updated_date == null || response.data[0].updated_date == "") {
				response.data[0].updated_date = Current_date_day;
			}
			//alert(response.data[0].updated_date);
			var d = new Date(response.data[0].updated_date);
			$("#View_page_Direcr_work_for_Accepted_task").append("<li data-icon='false'><a href='#' class='wborderradius' data-transition='slide'>\
<div style='float: right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[0].status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + response.data[0].task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\
<hr>\
<p class='viewHurdleDescription1'><b>Address </b><br> <p class='viewHurdleDescription2'> " + response.data[0].task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Completed_View(" + response.data[0].id + ");'><b> TASK DETAILS </b></p>\
</a>\
</li>");
			$("#View_page_Direcr_work_for_Accepted_task").listview("refresh");
			hideLoadingIcon();
			localStorage.setItem("resume_option", "2");
			categoryList();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}
//-------------------------------------------------
/*End of View Page Start Work Direct Accepted task list  Functionality*/
//-------------------------------------------------
function Pending_reason_list() {
	navigator.notification.confirm("Confirm to save the task as On Hold?", btnLabel_Pending_reason_list, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Pending_reason_list(buttonIndex) {
	if(buttonIndex == 1) {
		if(navigator.network.connection.type == Connection.NONE) {
			showAlert("please check the network and try again..!!", "WorkWide");
		} else {
			localStorage.setItem("resume_option", "");
			changePage("#Accepted_to_pending_task", "slide", false);
		}
	}
}
//--------------
//function Accepted_to_pending_task_list_reason_confirm_box() {
//navigator.notification.confirm("Confirm to Put the task as pending?", Accepted_to_pending_task_list_reason_btn_lbl, "WorkWide", ["Yes", "No"]);
//}
//
//function Accepted_to_pending_task_list_reason_btn_lbl(buttonIndex) {
//if (buttonIndex == 1) {
//Accepted_to_pending_task_list_reason();
//}
//}
function Accepted_to_pending_task_list_reason() {
	var select_vlaue = $("#pending_select_reason").val(); // e.options[e.selectedIndex].value;
	var text_values = document.getElementById("pending_textarea_reason").value;
	if($("#pending_select_reason").val() == "" || $("#pending_select_reason").val() == "-1" || $("#pending_select_reason").val() == -1) {
		showAlert("Please select a reason!!", "WorkWide");
	} else {
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Accepted_Task_id"),
			statusid: localStorage.getItem("Pending"),
			reason: select_vlaue,
			comment: document.getElementById("pending_textarea_reason").value
		};
		QuinticaWebService("GET", "getUpdateTaskStatus", parameters, function(response) {
			if(response.code == "1") {
				hideLoadingIcon()
				localStorage.setItem("Assigned_button_id", 0);
				$("#attachment_file").css("display", "none");
				inAccepted = 0;
				inProgressset = 0;
				apiFlag = 0;
				document.getElementById("pending_select_reason").value = "";
				document.getElementById("pending_textarea_reason").value = "";
				pendTasktoApi();
			} else {
				showAlert("Unable to connect..!!", "WorkWide");
				hideLoadingIcon()
			}
		});
	}
}

function pendTasktoApi() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id"),
		onhold: "1"
	};
	QuinticaWebService("GET", "taskTimeCalcu", parameters, function(response) {
		if(response.code == "1") {
			hideLoadingIcon();
		}
	});
	changePage("#Accepted_tasks_page", "slide", false);
}

function Accepted_End_task_button(buttonIndex) {
	if(buttonIndex == 1) {
		apiFlag = 0;
		changePage("#Accepted_Signature_and_feeback_view_tasklist_page", "slide", false);
	}
}
//-------------------------------------------------
/* Start of Signature and feedback page functionality*/
//-------------------------------------------------
function Accepted_Signture_and_feedback_view_page() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskDetails", parameters, function(response) {
		if(response.code == "1") {
			$("#Accepted_Signature_and_feeback_view_task").empty();
			if(response.data[0].start_date == null || response.data[0].start_date == "") {
				response.data[0].start_date = Current_date_day;
			}
			var d = new Date(response.data[0].created_date);
			$("#Accepted_Signature_and_feeback_view_task").append("<li data-icon='false'><a href='#' class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[0].status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + response.data[0].task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + response.data[0].task_address + "</p></p><hr>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Completed_View(" + response.data[0].id + ");'><b>COMPLETED VIEW</b></p>\
</a>\
</li>");
			$("#Accepted_Signature_and_feeback_view_task").listview("refresh");
			hideLoadingIcon();
			localStorage.setItem("resume_option", "3");
			taskCompleted();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function taskCompleted() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskCompleted", parameters, function(response) {
		if(response.code == "1") {
			console.info(response.data.completed_screen_data.signature);
			if(response.data.completed_screen_data.signature == 0 || response.data.completed_screen_data.signature == "0") {
				$("#signaturebox").css("display", "none");
			} else {
				$("#signaturebox").css("display", "block");
			}
			if(response.data.completed_screen_data.ratings == 0 || response.data.completed_screen_data.ratings == "0") {
				$("#rateus").css("display", "none");
				$(".dividersrateus").css("display", "none");
			} else {
				$("#rateus").css("display", "block");
				$(".dividersrateus").css("display", "block");
			}
			if(response.data.completed_screen_data.comments == 0 || response.data.completed_screen_data.comments == "0") {
				$("#addcomment").css("display", "none");
				$(".dividerscomment").css("display", "none");
			} else {
				$("#addcomment").css("display", "block");
				$(".dividerscomment").css("display", "block");
			}
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}
//-------------------------------------------------
/* Start of customer Attachement page functionality*/
//-------------------------------------------------
function Attachement_cameraphoto() {
	var options = {
		'buttonLabels': ['Camera', 'Photo Library'],
		'addCancelButtonWithLabel': 'Cancel'
	};
	window.plugins.actionsheet.show(options, function(_btnIndex) {
		if(_btnIndex === 1) {
			navigator.camera.getPicture(onSuccess_attach, onFail_attach, {
				quality: 30,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL
			});
		} else if(_btnIndex === 2) {
			navigator.camera.getPicture(onSuccess_attach, onFail_attach, {
				quality: 30,
				correctOrientation: true,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			});
		}
	});
}
var Attach_imaged_file;

function onSuccess_attach(imageURI) {
	StatusBar.hide();
	StatusBar.show();
	attachment_count++;
	if(attachment_count > 10) {
		showAlert("You cannot upload more than 10", "WorkWide");
	} else {
		if(checkConnection()) {
			$("#attachment_file" + attachment_count).css("display", "block");
			var Attach_image = document.getElementById('attachment_file' + attachment_count);
		} else {
			$("#attachment_file_offline" + attachment_count).css("display", "block");
			var Attach_image = document.getElementById('attachment_file_offline' + attachment_count);
		}
		//Attach_image.src = "";
		Attach_image.src = "data:image/jpeg;base64," + imageURI;
		Attach_imaged_file = imageURI;
		sending_image_to_backend();
	}
}

function onFail_attach(message) {}

function clear_the_attatchmenyt() {
	$("#attachment_file").css("display", "none");
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;
	var byteCharacters = atob(b64Data);
	var byteArrays = [];
	for(var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);
		var byteNumbers = new Array(slice.length);
		for(var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}
	var blob = new Blob(byteArrays, {
		type: contentType
	});
	hideLoadingIcon()
	return blob;
}

function savebase64AsImageFile(folderpath, filename, content, contentType) {
	var DataBlob = b64toBlob(content, contentType);
	console.log("Starting to write the file :3");
	debugger;
	window.resolveLocalFileSystemURL(folderpath, function(dir) {
		console.log("Access to the directory granted succesfully");
		dir.getFile(filename, {
			create: true
		}, function(file) {
			console.log("File created succesfully.");
			file.createWriter(function(fileWriter) {
				console.log("Writing content to file");
				fileWriter.write(DataBlob);
			}, function() {
				alert('Unable to save file in path ' + folderpath);
			});
		});
	});
	hideLoadingIcon();
	//listDir(cordova.file.documentsDirectory);
}
//-------------------------------------------------
/* End of customer Attachement  page functionality*/
//-------------------------------------------------
//-------------------------------------------------
/* Start of updating the customer details  page functionality*/
//-------------------------------------------------
function signature_feedback_as_per_task() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id"),
		fsefeedback: "feedback",
		custSign: dataUrl_images_sign,
		fseRating: rating
	};
	QuinticaWebService("POST", "taskFeedback", parameters, function(response) {
		if(response.code == "1") {
			dataUrl_images_sign = "";
			clearCanvas();
			end_task_Status();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function end_task_Status() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id"),
		statusid: 4
	};
	ApploadingIcon();
	QuinticaWebService("GET", "updatetaskStatus", parameters, function(response) {
		if(response.code == "1") {
			// final_time_date_sheet();
			localStorage.setItem("Assigned_button_id", 0);
			inAccepted = 0;
			inProgressset = 0;
			localStorage.setItem("Accepted_Task_id", "");
			localStorage.setItem("Pending_option", "");
			localStorage.setItem("resume_option", "");
			changePage("#Assigned_tasklist_page", "slide", false);
		} else {
			showAlert("Please try again..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function final_time_date_sheet() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id"),
		geo_km: geokm,
		end_work: "1"
	};
	QuinticaWebService("GET", "taskTimeCalcu", parameters, function(response) {
		if(response.code == "1") {
			hideLoadingIcon();
		}
	});
}

function Accepted_starttime() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id"),
		geo_km: geokm,
		start_trip: "1"
	};
	QuinticaWebService("GET", "taskTimeCalcu", parameters, function(response) {
		if(response.code == "1") {
			hideLoadingIcon();
		}
	});
}

function Completed_task_list() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id"),
		statusType: localStorage.getItem("Completed")
	};
	ApploadingIcon();
	QuinticaWebService("GET", "task_list", parameters, function(response) {
		if(response.code == "1") {
			if(Object.keys(response.data).length == 0) {
				showAlert("No Task ..!!", "WorkWide");
			}
			$("#Completed_task_view_accepted").empty();
			for(j = 0; j < Object.keys(response.data).length; j++) {
				if(response.data[j].updated_date == null || response.data[j].updated_date == "") {
					response.data[j].updated_date = Current_date_day;
				}
				var d = new Date(response.data[j].updated_date);
				$("#Completed_task_view_accepted").append("<li data-icon='false'><a href='#'  onclick='Completed_View(" + response.data[j].id + ");' class='wborderradius' data-transition='slide'>\
<div style='float: right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[j].status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + response.data[j].task_name + "</h2>\
<p class='viewHurdleDescription2'><span> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</span></p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p> " + response.data[j].task_address + " </p></b></p>\
</li>");
			}
			$("#Completed_task_view_accepted").listview("refresh");
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
	hideLoadingIcon();
}
//-------------------------------------------------
//-------------------------------------------------
/*Start of  Pending task list  Functionality*/
//-------------------------------------------------
function pending_task_list() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id"),
		statusType: localStorage.getItem("Pending")
	};
	ApploadingIcon();
	QuinticaWebService("GET", "task_list", parameters, function(response) {
		if(response.code == "1") {
			if(Object.keys(response.data).length == 0) {
				showAlert("No Task ..!!", "WorkWide");
			}
			$("#pending_task_view_accepted").empty();
			for(k = 0; k < Object.keys(response.data).length; k++) {
				if(response.data[k].updated_date == null || response.data[k].updated_date == "") {
					response.data[k].updated_date = Current_date_day;
				}
				var d = new Date(response.data[k].updated_date);
				$("#pending_task_view_accepted").append("<li data-icon='false'><a href='#' onclick='Completed_View(" + response.data[k].id + ");' data-transition='slide' class='wborderradius'><br>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + response.data[k].status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + response.data[k].task_name + "</h2>\
<p class='viewHurdleDescription1' style=''> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address</b><br><p class='viewHurdleDescription2'> " + response.data[k].task_address + " </p></b></p>\
</li>");
			}
			$("#pending_task_view_accepted").listview("refresh");
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Rejecting_the_task_option() {
	navigator.notification.confirm("Confirm to Reject the task?", Rejecting_the_task_option_button_label, "WorkWide", ["Yes", "No"]);
}

function Rejecting_the_task_option_button_label(buttonIndex) {
	if(buttonIndex == 1) {
		changePage("#Reject_task_backend", "slide", false);
	}
}

function Accepted_to_rejection_task_list_reason_confirm_box() {
	var main_comment_reject = document.getElementById("rejection_textarea_reason").value;
	if(main_comment_reject.trim() == "" || main_comment_reject.length <= 0) {
		showAlert("Please fill the details!!", "WorkWide");
	} else {
		navigator.notification.confirm("Confirm to Reject the task?", Accepted_to_Reject_task_list_reason_btn_lbl, "WorkWide", ["Yes", "No"]);
	}
}

function Accepted_to_Reject_task_list_reason_btn_lbl(buttonIndex) {
	if(buttonIndex == 1) {
		Accepted_to_rejectionsss_task_list_reason();
	}
}

function Accepted_to_rejectionsss_task_list_reason() {
	var text_values = document.getElementById("rejection_textarea_reason").value;
	var selectvalue = $('#rejecting_select_reason').val();
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Assigned_Task_id"),
		statusid: "7",
		reason: selectvalue,
		comment: text_values
	};
	QuinticaWebService("GET", "getUpdateTaskStatus", parameters, function(response) {
		if(response.code == "1") {
			hideLoadingIcon();
			localStorage.setItem("Assigned_button_id", 0)
			localStorage.setItem("resume_option", "");
			inAccepted = 0;
			inProgressset = 0;
			document.getElementById("rejection_textarea_reason").value = "";
			changePage("#Landingpage", "slide", false);
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}
//---------------
function ClearFields() {
	$("#Assets_ul").empty();
	$("#myInputsss").val("");
	$("#myInput_number").val("");
	$("#myInput_number_Awaiting").val("");
	$("#pending_textarea_reason").val("");
	$("#rejection_textarea_reason").val("");
	datass = [];
	request_json = "";
	assets = [];
	used = [];
	await = [];
	assetdescription = [];
}
/*
Update Asset page content
*/
//=======================================
$("#myInputsss").on("input", function(e) {
	var text = $(this).val();
	if(text.length >= 3) {
		autocomplete(text)
	}
	if(text.length < 3) {
		$("#suggestions").html("");
	}
});

function autocomplete(texts) {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id"),
		keywordSearch: texts
	};
	QuinticaWebService("GET", "taskAssetsGetLike", parameters, function(response) {
		if(response.code == "1") {
			var sugList = $("#suggestions");
			if(texts.length < 1) {
				sugList.html("");
				sugList.listview("refresh");
			} else {
				var str = "";
				for(var k = 0; k < Object.keys(response.data).length; k++) {
					str += "<li style='padding:0 0 0 3%' onclick='click_for_list(\"" + response.data[k].display_name + "\",\"" + response.data[k].description + "\");'>" + response.data[k].display_name + "</li>";
				}
				if(k == Object.keys(response.data).length) {
					hideLoadingIcon();
				}
				sugList.html(str);
				sugList.listview("refresh");
			}
		} else {
			hideLoadingIcon();
		}
	});
}

function click_for_list(values, description) {
	$("#suggestions").html("");
	document.getElementById("myInputsss").value = "";
	document.getElementById("myInputsss").value = values;
	document.getElementById("description").value = description;
	//$("#suggestions").listview("refresh");
	$("#main_button_upate_asset").css("display", "block");
}
var close = document.getElementsByClassName("close");
var datass = [];
var request_json = "";
//function Update_assets() {
//if (f == -1) {
//$("#Assets_ul").empty();
//
//}
//f++;
//var li = document.createElement("li");
//var inputValue = document.getElementById("myInputsss").value;
//var Space = "Used: ";
//var Space_one = "Awaiting: ";
//var numberss = document.getElementById("myInput_number").value;
//var description = document.getElementById("description").value;
//var numberss_one = document.getElementById("myInput_number_Awaiting").value;
//var h1 = document.createElement("h4");
//var h2 = document.createElement("h6");
//var t = document.createTextNode(inputValue);
//var br2 = document.createElement("br");
//var br = document.createElement("br");
//var d = document.createTextNode(description);
//var hr = document.createElement("hr");
//var y = document.createTextNode(numberss);
//var br1 = document.createElement("br");
//var z = document.createTextNode(Space);
//var a = document.createTextNode(numberss_one);
//var b = document.createTextNode(Space_one);
//assets[f] = inputValue;
//used[f] = numberss;
//await [f] = numberss_one
//li.appendChild(h1);
//h1.appendChild(t);
//li.appendChild(h2);
//h2.appendChild(d);
//h2.appendChild(br);
//h2.appendChild(z);
//h2.appendChild(y);
//h2.appendChild(br1);
//h2.appendChild(b);
//h2.appendChild(a);
//li.appendChild(hr);
//
//if (inputValue == '') {
//showAlert("You must select something!", "WorkWide");
//} else if (numberss == 0 && numberss_one == 0) {
//showAlert("Count cannot be 0!", "WorkWide");
//} else {
//console.info(assets);
//console.info(used);
//console.info(await);
//
//document.getElementById("Assets_ul").appendChild(li);
//}
//document.getElementById("myInputsss").value = "";
//document.getElementById("myInput_number").value = "0";
//document.getElementById("myInput_number_Awaiting").value = "0";
//
//var span = document.createElement("SPAN");
//var txt = document.createTextNode("\u2296");
//span.className = "close"
//span.id = f;
//span.appendChild(txt);
//li.appendChild(span);
//
//}
function Update_assets() {
	if(f == -1) {
		$("#Assets_ul").empty();
	}
	var inputValue = document.getElementById("myInputsss").value;
	var numberss = document.getElementById("myInput_number").value;
	var description = document.getElementById("description").value;
	var numberss_one = document.getElementById("myInput_number_Awaiting").value;
	if(inputValue == '') {
		showAlert("You must select something!", "WorkWide");
	} else if(numberss == 0 && numberss_one == 0) {
		showAlert("Count cannot be 0!", "WorkWide");
	} else {
		f++;
		console.info(assets);
		console.info(used);
		console.info(await);
		assets[f] = inputValue;
		used[f] = numberss;
		await [f] = numberss_one;
		assetdescription[f] = description;
		$("#Assets_ul").append("<li class='textColor' style='border-radius:0px !important;'><a href='' style='border-bottom: 1px solid lightgray;'><h4>" + inputValue + "</h4><h6>" + description + "</h6><h6>Used: " + numberss + "</h6><h6>Awaiting: " + numberss_one + "</h6></a><a href='#' id='" + f + "' class='close' style='border-bottom: 1px solid lightgray;'></a></li>");
		document.getElementById("myInputsss").value = "";
		document.getElementById("myInput_number").value = "0";
		document.getElementById("myInput_number_Awaiting").value = "0";
		$("#Assets_ul").listview("refresh");
	}
}
$(document).on('click', '.close', function() {
	// alert("clicked"+ $(this).attr("id"));
	var div = this.parentElement;
	div.style.display = "none";
	assets.splice(parseInt($(this).attr("id")), 1);
	used.splice(parseInt($(this).attr("id")), 1);
	await.splice(parseInt($(this).attr("id")), 1);
	assetdescription.splice(parseInt($(this).attr("id")), 1);
	console.info(assets);
	console.info(used);
	console.info(await);
	console.info(assetdescription);
});

function Update_allassets() {
	navigator.notification.confirm("Confirm to Save Assets?", btnLabel_Assets_details, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Assets_details(buttonIndex) {
	if(buttonIndex == 1) {
		console.info(assets);
		console.info(used);
		console.info(await)
		var data_asset = [];
		if(assets.length > 0) {
			for(i = 0; i < assets.length; i++) {
				var data_asset = {
					"ID": assets[i],
					"used": used[i],
					"awaiting": await [i],
					"description": assetdescription[i]
				};
				var newarray = datass.push(data_asset);
			}
			request_json = JSON.stringify(datass);
		} else {
			datass = [];
		}
		var optionTexts = [];
		$("#Assets_ul li").each(function() {
			optionTexts.push($(this).text())
		});
		var quotedCSV = '"' + optionTexts.join('", "') + '"';
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Accepted_Task_id"),
			capture_assets: request_json,
			duplication: "no"
		};
		QuinticaWebService("POST", "getUpdateTaskAssetCapture", parameters, function(response) {
			console.log(parameters);
			if(response.code == "1") {
				if(response.value.duplication == true) {
					navigator.notification.confirm("Duplicate Assets are there, Confirm to add the duplicate?", assetDuplication, "WorkWide", ["Yes", "No"]);
				} else {
					request_json = "";
					f = -1;
					datass = [];
					assets = [];
					used = [];
					await = [];
					assetdescription = [];
					datass.length = 0;
					$("#Assets_ul").html("");
					changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
					hideLoadingIcon();
				}
			} else {
				showAlert("Unable to Update, Please add the asset", "WorkWide");
				hideLoadingIcon();
			}
			hideLoadingIcon();
		});
	}
}

function assetDuplication(buttonIndex) {
	if(buttonIndex == 1) {
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Accepted_Task_id"),
			capture_assets: request_json,
			duplication: "yes"
		};
		QuinticaWebService("POST", "getUpdateTaskAssetCapture", parameters, function(response) {
			console.log(parameters);
			if(response.code == "1") {
				if(response.value.duplication == true) {
					//navigator.notification.confirm("Duplicate Assets are there, Confirm to add the duplicate?", assetDuplication, "WorkWide", ["Yes", "No"]);
				} else {
					request_json = "";
					f = -1;
					datass = [];
					assets = [];
					used = [];
					await = [];
					assetdescription = [];
					datass.length = 0;
					$("#Assets_ul").html("");
					changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
					hideLoadingIcon()
				}
			} else {
				showAlert("Unable to Update, Please add the asset", "WorkWide");
				hideLoadingIcon()
			}
			hideLoadingIcon()
		});
	} else {
		request_json = "";
		datass = [];
	}
}

function retain_Assets() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "selectUpdateTaskAssetscode", parameters, function(response) {
		if(response.code == "1" && response.assets != null) {
			$("#Assets_ul_server").html("");
			if(response.assets.length < 1) {
				//                   $("#Assets_ul_server").append("<li data-icon='false' class='textColor' style='border-radius:0px !important;'>You currently have no assets loaded.</li><hr>");
			} else {
				for(i = 0; i < response.assets.length; i++) {
					if(Object.keys(response.assets[i]).length > 0) {
						$("#Assets_ul_server").append("<li data-icon='false' class='textColor' style='border-radius:0px !important;border-bottom: 1px solid lightgray'><a href='#'><h4>" + response.assets[i].ID + "</h4><h6>" + response.assets[i].description + "</h6><h6>Used: " + response.assets[i].used + "</h6><h6>Awaiting: " + response.assets[i].awaiting + "</h6></a></li>");
					}
				}
			}
		}
		hideLoadingIcon()
	});
	$("#Assets_ul_server").listview("refresh");
}

function sending_image_to_backend() {
	if(checkConnection()) {
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			task_id: localStorage.getItem("Accepted_Task_id"),
			customer_document: Attach_imaged_file
		};
		QuinticaWebService("POST", "updateTaskCustomerDocument", parameters, function(response) {
			if(response.code == "1") {
				//var myBase64 = Attach_imaged_file;
				//var contentType = "image/png";
				//var folderName = cordova.file.documentsDirectory;
				//var filename = "attachment_" + localStorage.getItem("Accepted_Task_id") + "_" + attachment_count + ".png";
				//savebase64AsImageFile(folderName, filename, myBase64, contentType);
			} else {
				showAlert("Unable to connect..!!", "WorkWide");
				hideLoadingIcon();
			}
		});
	} else {
		var myBase64 = Attach_imaged_file;
		var contentType = "image/png";
		var folderName = cordova.file.documentsDirectory;
		var filename = "attachment_" + localStorage.getItem("offline_Accepted_task_id") + "_" + attachment_count + ".png";
		savebase64AsImageFile(folderName, filename, myBase64, contentType);
	}
	hideLoadingIcon();
}

function cancelTask() {
	changePage('#Accepted_Start_work_view_tasklist_page', 'slide', true);
}

function Completed_View(taskid) {
	localStorage.setItem("taskdetailsid", taskid);
	changePage("#complete_view_page", "slide", false);
}

function taskDetailspage() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("taskdetailsid")
	};
	QuinticaWebService("GET", "taskDetailsGroupCategories", parameters, function(response) {
		if(response.code == "1") {
			$("#complete_listview").empty();
			var obj = response.data;
			console.log(Object.keys(obj).length + "llled" + response.data.length);
			var i = 1;
			var j = 0;
			var cflag = false;
			$.each(obj, function(key, value) {
				var temp = key;
				key = key.replace(/_/g, " ");
				console.log(key);
				if(key == "category" + i) {
					console.log("if" + temp);
					i++;
					cflag = true;
					$("#complete_listview").append("<p class='heading'><b>" + value + "</b></p>");
				} else if(key != "category" + i && temp != "id" && temp != "category_detail" && value != null) {
					$("#complete_listview").append("<p class='taskdetails_fields'><b>" + key + "</b></p><p class='taskvalue_fields'>" + value + "</p><span><hr></span>");
					console.log("else" + key);
				}
			});
			$("#complete_listview span").last().html(" ");
			$("#complete_listview").listview("refresh");
			// $(".ui-last-child").css("border","none !important")
			changePage("#complete_view_page", "slide", false);
			hideLoadingIcon()
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon()
		}
	});
}
$(".attachementcontainer_class").click(function() {
	Attachement_cameraphoto();
});
$("#rejection_textarea_reason").on('change', function() {
	if($("#rejection_textarea_reason").val() != "" || $("#rejection_textarea_reason").val() != " ") {
		$(".rejectsubmit").removeClass("ui-disabled");
	}
});
$("#pending_select_reason").on('change', function() {
	if($("#pending_select_reason").val() != "0" || $("#pending_select_reason").val() != "-1" || $("#pending_select_reason").val() != -1) {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});
$("#pending_textarea_reason").on('change', function() {
	if($("#pending_textarea_reason").val() != "") {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});

function backNavigation() {
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
	var pid = activePage.attr('id');
	if(pid == "category_view_page") {
		categorySumbit_back();
	} else if(pid == "offline_category_view_page") {
		categorySumbit_offline_button_back();
	}
	var pagename = "#" + localStorage.getItem("previous_page_id");
	$.mobile.changePage(pagename, {
		transition: "slide",
		changeHash: false,
		reverse: true
	});
}

function ONHoldreasons() {
	if(onholdComment == 1 || onholdComment == "1") {
		$("#pending_textarea_reason").css("display", "none");
	} else {
		$("#pending_textarea_reason").css("display", "block");
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "taskOnhold", parameters, function(response) {
		if(response.code == "1") {
			var len = Object.keys(response.data).length;
			if(len == 0) {
				var option = '';
				var option = '<option value="-1">On Hold Reasons</option>';
				$('#pending_select_reason').css("display", "none");
			} else {
				var option = '';
				var option = '<option value="-1">On Hold Reasons</option>';
				for(i = 0; i < len; i++) {
					var selecctvalue = response.data[i].replace(/ /g, "#&$");
					option += '<option value=' + selecctvalue + '>' + response.data[i] + '</option>';
				}
			}
			$('#pending_select_reason').html("");
			$('#pending_select_reason').append(option);
			$('#pending_select_reason').selectmenu("refresh", true);
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function rejectReasons() {
	if(rejectComment == 1 || rejectComment == "1") {
		$("#rejection_textarea_reason").css("display", "none");
	} else {
		$("#rejection_textarea_reason").css("display", "block");
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Assigned_Task_id")
	};
	QuinticaWebService("GET", "taskReject", parameters, function(response) {
		if(response.code == "1") {
			console.log(response.data);
			var len = Object.keys(response.data).length;
			if(len == 0) {
				var option = '';
				var option = '<option value="">Reject Reasons</option>';
				$('#rejecting_select_reason').css("display", "none");
			} else {
				var option = '';
				var option = '<option value="">Reject Reasons</option>';
				for(i = 0; i < len; i++) {
					var selecctvalue = response.data[i].replace(/ /g, "#&$");
					option += '<option value=' + selecctvalue + '>' + response.data[i] + '</option>';
				}
			}
			$('#rejecting_select_reason').html("");
			$('#rejecting_select_reason').append(option);
			$('#rejecting_select_reason').selectmenu("refresh", true);
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function categoryList() {
	catArray = [];
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "tab_categories", parameters, function(response) {
		if(response.code == "1") {
			var len = Object.keys(response.data).length;
			console.log(len);
			if(len == 0) {
				$("#categoryListview").html("");
			} else {
				var obj = response.data[0];
				var obj1 = response.data[1];
				var obj2 = response.data[2];
				$("#categoryListview").html("");
				$.each(obj, function(key, value) {
					var value1 = value.replace(/ /g, "_");
					$("#categoryListview").append("<li data-icon='myicon6'><a href='#' onclick='categoryFields1(" + key + ",\"" + value + "\");' class='wborderradius ui-nodisc-icon " + value1 + "'>" + value + "</a></li>");
					if(apiFlag == 0) {
						categoryFields(key, value1);
					}
				});
				if(AssetCategory == 1 || AssetCategory == "1") {
					$("#categoryListview").append("<li data-icon='myicon6'><a href='#' onclick=changePage('#Update_assets','slide',false); class='wborderradius ui-nodisc-icon'>Assets</a></li>");
				}
				$("#categoryListview").append("<li data-icon='myicon6'><a href='#' onclick=changePage('#attachmentPage','slide',false); class='wborderradius ui-nodisc-icon'>Attach</a></li>");
			}
			$("#categoryListview").listview("refresh");
			$.each(obj1, function(key, value) {
				var key1 = key.replace(/ /g, "_");
				if(value == "0" || value == 0) $("." + key1).css("display", "none");
			});
			$.each(obj2, function(key, value) {
				if(value == "1" || value == 1) {
					catArray.push(key);
					console.info("test" + catArray);
				}
			});
			$("#categoryListview").listview("refresh");
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
	apiFlag = 1;
}

function categoryFields(Categoryid, value) {
	ApploadingIcon();
	localStorage.setItem("cid", "");
	localStorage.setItem("cname", "");
	localStorage.setItem("cid", Categoryid);
	localStorage.setItem("cname", value);
	categoryFieldsList(0);
}

function categoryFields1(Categoryid, value) {
	localStorage.setItem("cid", "");
	localStorage.setItem("cname", "");
	localStorage.setItem("cid", Categoryid);
	localStorage.setItem("cname", value);
	changePage("#category_view_page", "slide", false);
}

function retainValues(id) {
	$("#" + id + "hidden").val($("#" + id).val());
}

function categoryFieldsList(a) {
	ApploadingIcon();
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id"),
		cat_id: localStorage.getItem("cid")
	};
	$(".categoryname").html(localStorage.getItem("cname"));
	$(".categoryname").html("");
	$(".categoryname").html(localStorage.getItem("cname"));
	var catname = localStorage.getItem("cname").replace(/ /g, "_") + "form";
	var catnamerequired = localStorage.getItem("cname").replace(/ /g, "_") + "req";
	var catnamediv = localStorage.getItem("cname").replace(/ /g, "_") + "formdiv";
	QuinticaWebService("GET", "updateTaskScreen", parameters, function(response) {
		if(response.code == "1") {
			if(response.data == null || response.data == "null" || response.data == "" || response.data.length == 0) {
				hideLoadingIcon();
			} else {
				ApploadingIcon();
				if(apiFlag == 1) {
					$(".cform").css("display", "none");
					$("#" + catnamediv).css("display", "block");
					hideLoadingIcon();
				} else {
					$("#" + catnamediv).remove();
					$("#categoryContent").append("<div class='cform' id=" + catnamediv + " ><form id=" + catname + "></form></div>");
					$(".cform").css("display", "none");
					$("#" + catnamediv).css("display", "block");
					var len = Object.keys(response.data).length;
					var r = -1;
					var r1 = -1;
					var s = -1;
					var iselect = 0;
					for(i = 0; i < len; i++) {
						response.data[i].label = response.data[i].label.charAt(0).toUpperCase() + response.data[i].label.slice(1);
						if(response.data[i].option_type == "TEXT") {
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							$("#" + catname).append("<input type='hidden' id='" + response.data[i].id + "hidden" + "' value='' />");
							if(response.data[i].post_values == "") {
								var post_values = $("#" + response.data[i].id + "hidden").val();
							} else {
								var post_values = response.data[i].post_values;
							}
							$("#" + catname).append("<label for='" + response.data[i].id + "' class='labelcolor'>" + response.data[i].label + required_status + "</label><input type='text' class='input_typec " + requiredClass + "'  maxlength='" + response.data[i].type_limit + "'  name='" + response.data[i].id + "' id='" + response.data[i].id + "' onfocusout='retainValues(" + response.data[i].id + ")'  value='" + post_values + "' />");
						} else if(response.data[i].option_type == "NUMBER") {
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							if(response.data[i].post_values == "") {
								var post_values = '';
							} else {
								var post_values = response.data[i].post_values;
							}
							$("#" + catname).append("<label for='" + response.data[i].id + "' class='labelcolor'>" + response.data[i].label + required_status + "</label><input type='number' class='input_typec " + requiredClass + "' oninput='numberLimit(" + response.data[i].type_limit + ",\"" + response.data[i].id + "\")' value='" + post_values + "' name='" + response.data[i].id + "' id='" + response.data[i].id + "' />");
						} else if(response.data[i].option_type == "TEXTAREA") {
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							if(response.data[i].post_values == "") {
								var post_values = '';
							} else {
								var post_values = response.data[i].post_values;
							}
							$("#" + catname).append("<label for='" + response.data[i].id + "' class='labelcolor'>" + response.data[i].label + required_status + "</label><textarea class='form_textarea_reason " + requiredClass + "' id='" + response.data[i].id + "'maxlength='" + response.data[i].type_limit + "' name='" + response.data[i].id + "'>" + post_values + "</textarea>");
						} else if(response.data[i].option_type == "SELECT") {
							//var dependson="onchange=dependsDropdown("+response.data[i].id+");";
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								s++;
								var required_status = "<span class='requriedfield1'>*</span>";
								var requiredClass = "selectbox requiredClassselect " + catnamerequired + "select" + s + "";
							} else {
								var required_status = "<span class='requriedfield1'></span>";
								var requiredClass = "selectbox";
							}
							if(response.data[i].depondon == "null" || response.data[i].depondon == null) {
								var dependson = "";
							} else {
								var dependson = "onchange=dropdownDependson(" + response.data[i].id + "," + response.data[i].depondon + ");";
							}
							$("#" + catname).append("<br><div class='ui-grid-a'><div class='ui-block-a' style='width:96%;'><select id='" + response.data[i].id + "' class='" + requiredClass + "' name='" + response.data[i].id + "' " + dependson + "><option value='-1'>" + response.data[i].label + "</option></select></div><div class='ui-block-b' style='width:2%;'>" + required_status + "</div></div>");
							if(response.data[i].type_values !== null || response.data[i].type_values !== "" || response.data[i].type_values !== "null" || response.data[i].type_values.length !== 0) {
								var type_values = response.data[i].type_values.length;
								for(j = 0; j < type_values; j++) {
									$("#" + response.data[i].id).append("<option value='" + response.data[i].type_values[j] + "'>" + response.data[i].type_values[j] + "</option>");
								}
							}
							if(response.data[i].post_values != "") {
								$("#" + response.data[i].id).val(response.data[i].post_values);
							}
						} else if(response.data[i].option_type == "SWITCH") {
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								r1++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClasscheck " + catnamerequired + "che" + r1 + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							//$("#" + catname).append("<label class='labelcolor' for='" + response.data[i].id + "'>" + response.data[i].label + required_status + "</label><input type='checkbox' data-role='flipswitch' name='" + response.data[i].id + "' id='" + response.data[i].id + "' class='chekboxwidget " + requiredClass + "'>");
							//if (response.data[i].post_values == "YES") {
							//$("#" + response.data[i].id).prop('checked', true);
							//}
							//if (response.data[i].post_values == "NO") {
							//$("#" + response.data[i].id).prop('checked', false);
							//}
							$("#" + catname).append("<label class='labelcolor' for='" + response.data[i].id + "'>" + response.data[i].label + required_status + "</label><select name='" + response.data[i].id + "' id='" + response.data[i].id + "' data-role='slider'>\
                                           <option value=''>No</option>\
                                           <option value='on'>YES</option>\
                                           </select>");
							if(response.data[i].post_values == "YES") {
								$("#" + response.data[i].id).val('on');
							}
							if(response.data[i].post_values == "NO") {
								$("#" + response.data[i].id).val('');
							}
						} else if(response.data[i].option_type == "RADIOLIST" || response.data[i].option_type == "RADIO") {
							if(response.data[i].required_status == "1" || response.data[i].required_status == 1) {
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClassradio " + catnamerequired + "rad";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							$("#" + catname).append("<label class='labelcolor'>" + response.data[i].label + required_status + "</label>");
							var type_values1 = response.data[i].type_values.length;
							for(k = 0; k < type_values1; k++) {
								var typevalues = response.data[i].type_values[k].replace(/ /g, "_");
								$("#" + catname).append("<label for='" + response.data[i].type_values[k] + "' class='labelcolor1'><input type='radio' name='" + response.data[i].id + "' class='" + requiredClass + k + "' value='" + typevalues + "' id='" + typevalues + "'>" + response.data[i].type_values[k] + "</label>");
							}
							$("#" + response.data[i].type_values[0].replace(/ /g, "_")).prop('checked', true);
						}
					}
					$("#" + catname).append("<br><br><a href='' class='ui-btn btngreycolor ui-corner-all' onclick='categorySumbit(" + catname + ");'>SUBMIT</a>");
					hideLoadingIcon();
				}
				// $(".selectbox").selectmenu().selectmenu('refresh', true);
				$("#" + catname).trigger('create');
			}
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
	hideLoadingIcon();
	//changePage("#category_view_page", "slide", false);
}

function dropdownDependson(id, d_id) {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		id: d_id,
		value: $("#" + id).val()
	};
	QuinticaWebService("GET", "getAutoCompleteSelectOption", parameters, function(response) {
		if(response.code == "1") {
			var len = Object.keys(response.data).length;
			if(len == 0) {
				var option = "";
				var option = "<option value='-1'>Location Code</option>";
				//$("#"+d_id).css("display", "none");
			} else {
				var option = '';
				var option = "<option value='-1'>Location Code</option>";
				for(i = 0; i < len; i++) {
					var selecctvalue = response.data[i].replace(/'/g, "");
					option += "<option value='" + selecctvalue + "'>" + response.data[i] + "</option>";
				}
			}
			$("#" + d_id).html("");
			$("#" + d_id).append(option);
			$("#" + d_id).selectmenu("refresh", true);
			hideLoadingIcon();
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function Accepted_End_task() {
	var catlist = " ";
	for(i = 0; i < catArray.length; i++) {
		var z = catArray[i].replace(/ /g, "_") + "reqtext";
		$("#categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find(".requiredClass").each(function(k, v) {;
			if($("." + z + k).val() == "" || $("." + z + k).val() == 0 || $("." + z + k).val() == "0" || $("." + z + k).val() == "null" || $("." + z + k).val() == null) {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
		var z1 = catArray[i].replace(/ /g, "_") + "reqselect";
		$("#categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find("select.requiredClassselect").each(function(k, v) {
			if($("select." + z1 + k).val() == "-1" || $("select." + z1 + k).val() == "0") {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
		var z2 = catArray[i].replace(/ /g, "_") + "reqche";
		$("#categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find(".requiredClasscheck").each(function(k, v) {
			console.log(localStorage.getItem("cname").replace(/ /g, "_") + "form");
			console.log($("." + z2 + k).prop("checked") + "." + z2 + k);
			if($("." + z2 + k).prop("checked") == false) {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
	}
	if(validationconfirmtask == false) {
		//                               formUpdatedArray = $.unique(formUpdatedArray);
		//                               var missedform="";
		//                               for (i = 0; i < formUpdatedArray.length; i++) {
		//                               if($.inArray(String(formUpdatedArray[i]),catArray)==-1){
		//                               missedform+=catArray[i];
		//                               }
		//                               }
		//                             
		//                               if(missedform==""){
		navigator.notification.confirm("Confirm to End the Task?", Accepted_End_task_button, "WorkWide", ["Yes", "No"]);
		//                               }
		//                               else{
		//                               showAlert("Please submit following forms:\n" + missedform, "WorkWide");
		//                               }
	} else {
		catArray1 = $.unique(catArray1);
		for(i = 0; i < catArray1.length; i++) {
			if(i == catArray1.length - 1) {
				catlist += catArray1[i].trim() + "\n";
			} else {
				console.log(catlist);
				catlist += catArray1[i].trim() + "\n";
				console.log(catlist);
			}
		}
		validationconfirmtask = false;
		catArray1 = [];
		showAlert("Please fill in all required fields in the following sections:\n" + catlist, "WorkWide");
	}
}

function categorySumbit(catname) {
	var z = localStorage.getItem("cname").replace(/ /g, "_") + "reqtext";
	$("#categoryContent").find("#" + localStorage.getItem("cname").replace(/ /g, "_") + "form").find(".requiredClass").each(function(k, v) {
		console.log(localStorage.getItem("cname").replace(/ /g, "_") + "form");
		console.log($("." + z + k).val() + "." + z + k);
		if($("." + z + k).val() == "" || $("." + z + k).val() == 0 || $("." + z + k).val() == "0" || $("." + z + k).val() == "null" || $("." + z + k).val() == null) {
			validationFlag1 = true;
		}
	});
	var z1 = localStorage.getItem("cname").replace(/ /g, "_") + "reqselect";
	$("#categoryContent").find("#" + localStorage.getItem("cname").replace(/ /g, "_") + "form").find("select.requiredClassselect").each(function(k, v) {
		console.log(localStorage.getItem("cname").replace(/ /g, "_") + "form");
		console.log($("select." + z1 + k).val() + "select." + z1 + k);
		if($("select." + z1 + k).val() == "-1" || $("select." + z1 + k).val() == "0") {
			validationFlag2 = true;
		}
	});
	var z2 = localStorage.getItem("cname").replace(/ /g, "_") + "reqche";
	$("#categoryContent").find("#" + localStorage.getItem("cname").replace(/ /g, "_") + "form").find(".requiredClasscheck").each(function(k, v) {
		console.log(localStorage.getItem("cname").replace(/ /g, "_") + "form");
		console.log($("." + z2 + k).prop("checked") + "." + z2 + k);
		if($("." + z2 + k).prop("checked") == false) {
			validationFlag3 = true;
		}
	});
	if(validationFlag1 == true || validationFlag2 == true || validationFlag3 == true) {
		validationFlag1 = false;
		validationFlag2 = false;
		validationFlag3 = false;
		showAlert("Please fill the " + localStorage.getItem("cname") + " form");
	} else {
		var data = $("#" + localStorage.getItem("cname").replace(/ /g, "_") + "form").serializeArray();
		data = JSON.stringify(data);
		console.log(data);
		var parameters = {
			TOKEN: localStorage.getItem("TOKEN"),
			taskid: localStorage.getItem("Accepted_Task_id"),
			postData: data,
			cat_id: localStorage.getItem("cid")
		};
		QuinticaWebService("POST", "updateTaskScreenData", parameters, function(response) {
			if(response.code == "1") {
				console.log(response.data);
				hideLoadingIcon();
				showAlert("Updated", "WorkWide");
				formUpdatedArray.push(localStorage.getItem("cname"));
				localStorage.setItem("cname", "")
				validationFlag1 = false;
				validationFlag2 = false;
				validationFlag3 = false;
				validationFlag4 = false;
				changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
			} else {
				showAlert("Unable to connect..!!", "WorkWide");
				hideLoadingIcon();
			}
		});
	}
}

function categorySumbit_back() {
	var data = $("#" + localStorage.getItem("cname").replace(/ /g, "_") + "form").serializeArray();
	data = JSON.stringify(data);
	console.log(data);
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskid: localStorage.getItem("Accepted_Task_id"),
		postData: data,
		cat_id: localStorage.getItem("cid")
	};
	QuinticaWebService("POST", "updateTaskScreenData", parameters, function(response) {
		if(response.code == "1") {
			console.log(response.data);
			hideLoadingIcon();
			//showAlert("Updated", "WorkWide");
			localStorage.setItem("cname", "")
			validationFlag1 = false;
			validationFlag2 = false;
			validationFlag3 = false;
			validationFlag4 = false;
			//changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function numberLimit(limit, selector) {
	if($("#" + selector).val().length > limit) {
		$("#" + selector).val($("#" + selector).val().slice(0, limit));
	}
}

function close_task_list() {
	navigator.notification.confirm("Confirm to Close the task?", btnLabel_close_task_list, "WorkWide", ["Yes", "No"]);
}

function btnLabel_close_task_list(buttonIndex) {
	if(buttonIndex == 1) {
		signature_feedback_as_per_task();
	}
}

function filterReasons() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		taskID: localStorage.getItem("Accepted_Task_id"),
	};
	QuinticaWebService("GET", "taskStatusAsset", parameters, function(response) {
		if(response.code == "1") {
			hideLoadingIcon();
			AssetCategory = response.data.asset_status;
			onholdComment = response.data.onhold_comment;
			rejectComment = response.data.reject_comment;
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon();
		}
	});
}

function retaining_images_from_backend() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		task_id: localStorage.getItem("Accepted_Task_id")
	};
	QuinticaWebService("GET", "updateTaskCustomerDocumentCount", parameters, function(response) {
		if(response.code == "1") {
			var len = response.count;
			if(len == 0 || len == "" || len == "0") {
				hideLoadingIcon()
				$(".attachementcontainer_class").attr("src", "img/camera.png");
				attachment_count = 0;
			} else {
				for(var i = 1; i <= len; i++) {
					$("#attachment_file" + i).css("display", "block");
					$(".attachementcontainer").css("height", 47 * i);
					var attachment_file = document.getElementById("attachment_file" + i);
					attachment_file.src = webServiceUrl + "customerDocumentImage/TOKEN/" + localStorage.getItem("TOKEN") + "/task_id/" + localStorage.getItem("Accepted_Task_id") + "/count/" + i + "";
					attachment_count = len;
				}
			}
		}
	});
	hideLoadingIcon()
}
/*==========================================================================================================*/
/* OFFLINE MODE CODES */
/*==========================================================================================================*/
/* code for downloading task to local DB in offline mode */
function offline_Workwide_DB() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		userid: localStorage.getItem("user_id")
	};
	QuinticaWebService("GET", "task_list", parameters, function(response) {
		if(response.data.length == 0) {
			showAlert("You Cannot go offline with 0 task", "WorkWide");
			$("#nav-panel_landing").panel("close");
		} else {
			inProgressset = 0;
			no_of_offlinetasks = Object.keys(response.data).length;
			var len = Object.keys(response.data).length;
			var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
			db.transaction(success_Workwide, error_Workwide);

			function success_Workwide(tx) {
				tx.executeSql("DROP TABLE IF EXISTS Main_Database_Table");
				var j = 1;
				var list = [];
				for(var i = 0; i < len; i++) {
					var obj = response.data[i];
					$.each(obj, function(key, value) {
						var key1 = key.replace(/[^\w\s]/gi, '_');
						var keyss1 = key1.replace(/\s/g, '');
						if(list.indexOf(key) == -1) {
							if($.inArray(keyss1, list) === -1) list.push(keyss1);
						}
					});
				}
				var res = "CREATE TABLE IF NOT EXISTS Main_Database_Table(";
				for(var k = 0; k < list.length; k++) {
					if(k == list.length - 1) {
						res = res.concat(list[k] + ' TEXT');
					} else {
						res = res.concat(list[k] + ' TEXT,');
					}
				}
				res = res.concat(")");
				console.log(res);
				//Code for table creation
				tx.executeSql(res);
				for(var z = 0; z < len; z++) {
					var columns = "(";
					var values = " VALUES (";
					var insertQuery = "INSERT INTO Main_Database_Table";
					var objec = response.data[z];
					var obj_len = objec.length;
					var count_value = 1;
					$.each(objec, function(key, value) {
						count_value++;
					});
					//console.log('count ::'+count + "count_value -1 : "+ count_value -1);
					var count = 1;
					$.each(objec, function(key, value) {
						// console.log('count ::'+count + "count_value -1 : "+ count_value -1);
						var keys = key.replace(/[^\w\s]/gi, '_');
						keyss = keys.replace(/\s/g, '');
						if(value == null || value == "null" || value == "0") {
							value = "";
						}
						// console.log(count +"--"+ count_value );
						if(count == count_value - 1) {
							columns = columns.concat(keyss);
							if(keyss == "category_detail" || keyss == "category_data" || keyss == "OnholdDetails" || keyss == "rejectDetails") {
								values = values.concat("'" + JSON.stringify(value) + "'")
							} else {
								if(value.indexOf('\'') >= 0) {
									value = value.replace(/[']/g, "");
									values = values.concat("'" + value + "'");
								} else {
									values = values.concat("'" + value + "'");
								}
							}
						} else {
							columns = columns.concat(keyss + ',');
							if(keyss == "category_detail" || keyss == "category_data" || keyss == "OnholdDetails" || keyss == "rejectDetails") {
								values = values.concat("'" + JSON.stringify(value) + "'" + ',')
							} else {
								if(value.indexOf('\'') >= 0) {
									_value = value.replace(/[']/g, "");
									values = values.concat("'" + _value + "'" + ',');
								} else {
									values = values.concat("'" + value + "'" + ',');
								}
							}
						}
						count++;
					});
					columns = columns.concat(")");
					values = values.concat(")");
					insertQuery = insertQuery.concat(columns);
					insertQuery = insertQuery.concat(values);
					console.log('Insert Query' + insertQuery);
					tx.executeSql(insertQuery);
				}
				changePage("#offline_Landingpage", "slide", false);
				// navigator.notification.alert('Downloading ' + len + ' items.\nPlease be patient', null, 'WorkWide', 'Cancel');
				var texloading = "Downloading " + no_of_offlinetasks + " items.\nPlease be patient";
				Apploadingdownicon(texloading);
			}
		}
		category_details_offline();
		offline_Assets_table();
		offline_Location_Code();
		hideLoadingIcon1();
		hideLoadingIcon();
	});
}

function retaining_images_from_backend_offline() {
	listDir(cordova.file.documentsDirectory);
	hideLoadingIcon()
}

function listDir(path) {
	console.log(path);
	var len1 = 0;
	window.resolveLocalFileSystemURL(path, function(fileSystem) {
		var reader = fileSystem.createReader();
		reader.readEntries(function(entries) {
			console.info(entries);
			len = entries.length;
			if(len == 0 || len == "" || len == "0") {
				$(".attachementcontainer_class").attr("src", "img/camera.png");
				attachment_count = 0;
			} else {
				for(var i = 0; i < len; i++) {
					console.log(entries[i].isFile);
					if(entries[i].isFile == "true" || entries[i].isFile == true) {
						var str = entries[i].nativeURL;
						if(str.indexOf(localStorage.getItem("offline_Accepted_task_id")) != -1) {
							var n = true;
							console.log("test" + n)
						} else {
							var n = false;
						}
						if(n == "true" || n == true) {
							len1++;
							$("#attachment_file_offline" + len1).css("display", "block");
							$(".attachementcontainer").css("height", 47 * len1);
							var attachment_file = document.getElementById("attachment_file_offline" + len1);
							attachment_file.src = "";
							attachment_file.src = entries[i].nativeURL;
							console.log(entries[i].nativeURL);
							attachment_count = len1;
						}
					}
				}
			}
		}, function(err) {
			console.log(err);
		});
	}, function(err) {
		console.log(err);
	});
}

function category_details_offline() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "casorOffline", parameters, function(response) {
		if(response.data == null || response.data == "null") {
			//showAlert("You Cannot go offline with 0 task");
		} else {
			var len = Object.keys(response.data).length;
			var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
			db.transaction(success_Workwide_category, error_Workwide);

			function success_Workwide_category(tx) {
				tx.executeSql("DROP TABLE IF EXISTS Main_Database_Table_categorys");
				tx.executeSql('CREATE TABLE IF NOT EXISTS Main_Database_Table_categorys(task_id TEXT , task_type_id TEXT , categoriesDetails TEXT , completedScreenDetails TEXT , statusMaskDetails TEXT , Integration_Status TEXT, OnholdDetails  TEXT, rejectDetails TEXT)');
				for(var z = 0; z < len - 1; z++) {
					tx.executeSql("INSERT INTO Main_Database_Table_categorys(task_id , task_type_id , categoriesDetails  , completedScreenDetails  , statusMaskDetails , Integration_Status , OnholdDetails  , rejectDetails )VALUES('" + response.data[z].task_id + "' , '" + response.data[z].task_type_id + "' , '" + JSON.stringify(response.data[z].categoriesDetails) + "' , '" + JSON.stringify(response.data[z].completedScreenDetails) + "' , '" + JSON.stringify(response.data[z].statusMaskDetails) + "' , '" + JSON.stringify(response.data[z].Integration_Status) + "' , '" + JSON.stringify(response.data[z].OnholdDetails) + "' , '" + JSON.stringify(response.data[z].rejectDetails) + "')");
				}
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_category_data");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_Total_time_offline");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_Total_repair_time_offline");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_onhold_and_comment");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_reject_and_comment");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_offline_signature");
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_offline_rating");
			}
		}
	});
}

function error_Workwide(e) {
	console.log(e.message);
}
/* end of code for downloading task to local DB in offline mode */
//==================================================================================================================
/** code for stroing Assets in offline mode */
function offline_Assets_table() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN")
	};
	QuinticaWebService("GET", "OfflineAssset", parameters, function(response) {
		if(response.data == null || response.data == "null") {
			//showAlert("You Cannot go offline with 0 task");
		} else {
			var len = Object.keys(response.data).length;
			var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
			db.transaction(success_Workwide_Assets, error_Workwide);

			function success_Workwide_Assets(tx) {
				tx.executeSql("DROP TABLE IF EXISTS Main_Database_Table_Assets");
				tx.executeSql('CREATE TABLE IF NOT EXISTS Main_Database_Table_Assets(task_type_id  TEXT , assetsDetails TEXT)');
				for(var z = 0; z < len - 1; z++) {
					tx.executeSql("INSERT INTO Main_Database_Table_Assets(task_type_id  , assetsDetails )VALUES('" + response.data[z].task_type_id + "' , '" + JSON.stringify(response.data[z].assetsDetails) + "')");
				}
				tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_Assets_data");
			}
		}
	});
}

function offline_Location_Code() {
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		id: 3
	};
	QuinticaWebService("GET", "getAutoCompleteSelectOption", parameters, function(response) {
		if(response.data == null || response.data == "null") {
			//showAlert("You Cannot go offline with 0 task");
		} else {
			var len = Object.keys(response.data).length;
			var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
			db.transaction(success_Workwide_locationCode, error_Workwide);

			function success_Workwide_locationCode(tx) {
				tx.executeSql("DROP TABLE IF EXISTS Main_Database_Table_Locations");
				tx.executeSql('CREATE TABLE IF NOT EXISTS Main_Database_Table_Locations(option_value TEXT , depond_value TEXT)');
				for(var z = 0; z < len - 1; z++) {
					console.log('INSERT INTO Main_Database_Table_Locations(option_value , depond_value )VALUES("' + response.data[z].option_value.trim() + '" , "' + response.data[z].depond_value.trim() + '")');
					tx.executeSql('INSERT INTO Main_Database_Table_Locations(option_value , depond_value )VALUES("' + response.data[z].option_value.trim() + '" , "' + response.data[z].depond_value.trim() + '")');
				}
				// tx.executeSql("ALTER TABLE Main_Database_Table ADD COLUMN z_Assets_data");
			}
		}
	});
}

function dropdownDependson_offline(id, d_id) {
	locationcode_dependValue = $("#" + id).val();
	console.log(locationcode_dependValue);
	locationcode_dependValue1 = d_id
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(_Offline_locationcode_taking_value_from_Array_suucess, error_Workwide);
}

function _Offline_locationcode_taking_value_from_Array_suucess(tx) {
	console.log('SELECT * FROM Main_Database_Table_Locations WHERE depond_value = ' + locationcode_dependValue + '');
	tx.executeSql("SELECT * FROM Main_Database_Table_Locations WHERE depond_value = '" + locationcode_dependValue + "' ", [], _Offline_Locationcode_taking_value_from_Array_suucess_one, error_Workwide);
}

function _Offline_Locationcode_taking_value_from_Array_suucess_one(tx, results) {
	var len = results.rows.length;
	if(len == 0) {
		var option = "";
		var option = "<option value='-1'>Location Code</option>";
	} else {
		var option = '';
		var option = "<option value='-1'>Location Code</option>";
		for(i = 0; i < len; i++) {
			var selecctvalue = results.rows.item(i).option_value.replace(/'/g, "");
			option += "<option value='" + selecctvalue + "'>" + results.rows.item(i).option_value + "</option>";
		}
	}
	$("#" + locationcode_dependValue1).html("");
	$("#" + locationcode_dependValue1).append(option);
	$("#" + locationcode_dependValue1).selectmenu("refresh", true);
	hideLoadingIcon();
}
/** end of code for stroing Assets in offline mode */
//==================================================================================================================
/* code for taking total count */
function Total_offline_dashboard_counts() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(count_for_accepted_task_success_Workwide, error_Workwide);
}

function count_for_accepted_task_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="4"', [], count_for_Resolved, error_Workwide);
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="2"', [], count_for_On_Hold, error_Workwide);
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="5"', [], count_for_In_Progress, error_Workwide);
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="1"', [], count_for_Assigned, error_Workwide);
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="3"', [], count_for_Accepted, error_Workwide);
	setTimeout(function() {
		hideLoadingIcon1();
	}, 2000);
}

function count_for_Resolved(tx, results) {
	var len1 = results.rows.length;
	// console.log(len1);
	document.getElementById("offline_Completed").innerHTML = "";
	document.getElementById("offline_Completed").innerHTML = len1;
}

function count_for_On_Hold(tx, results) {
	var len2 = results.rows.length;
	//console.log(len2);
	document.getElementById("offline_Pending").innerHTML = "";
	document.getElementById("offline_Pending").innerHTML = len2;
}

function count_for_In_Progress(tx, results) {
	var len3 = results.rows.length;
	//console.log(len3);
	document.getElementById("offline_current").innerHTML = "";
	document.getElementById("offline_current").innerHTML = len3;
	if(len3 == "1" || len3 == 1) {
		document.getElementById("offline_current").innerHTML = "";
		document.getElementById("offline_current").innerHTML = len3;
		$("#hide_show_buttonsss_offline").css("display", "none");
		inProgressflag = 0;
		inProgressset = 1;
	} else {
		$("#hide_show_buttonsss_offline").css("display", "block");
		inProgressflag = 1;
	}
}

function count_for_Assigned(tx, results) {
	var len4 = results.rows.length;
	//console.log(len4);
	document.getElementById("offline_Assigned").innerHTML = "";
	document.getElementById("offline_Assigned").innerHTML = len4;
}

function count_for_Accepted(tx, results) {
	var len5 = results.rows.length;
	//console.log(len5);
	document.getElementById("offline_Accepted").innerHTML = "";
	document.getElementById("offline_Accepted").innerHTML = len5;
	if(len5 == "1" || len5 > 0) {
		inAccepted = 1;
		$("#hide_show_buttonsss_offline").css("display", "none");
	}
}
/* End of code for taking total count */
//==================================================================================================================
/*Code for Offline Assigned Page */
function offline_Assigned_page() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Assigned_page_success_Workwide, error_Workwide);
}

function offline_Assigned_page_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="1"', [], Data_list_for_Assigned, error_Workwide);
}

function Data_list_for_Assigned(tx, results) {
	ApploadingIcon();
	var len = results.rows.length;
	console.log(len);
	if(len == "0") {
		navigator.notification.alert('No Task', backNavigation, 'WorkWide', 'Ok');
	}
	$("#offline_Assigned_page").empty();
	var critical = false;
	var heigh = false;
	var moderate = false;
	var low = false;
	var planing = false;
	for(var i = 0; i < len; i++) {
		if(results.rows.item(i).start_date == null || results.rows.item(i).start_date == "") {
			results.rows.item(i).start_date = Current_date_day;
		}
		var d = new Date(results.rows.item(i).created_date);
		if(results.rows.item(i).priority_type == 'Critical') {
			if(!critical) {
				$("#offline_Assigned_page").append("<hr  data-icon='false' style='background-color: #ff0000; height: 2px; width: 50%;'><h3 style='width: 100px; margin: auto;text-align: center; position: relative; padding-bottom: 20px;'>" + results.rows.item(i).priority_type + "</h3>");
				critical = true;
			}
		}
		if(results.rows.item(i).priority_type == 'High') {
			if(!heigh) {
				$("#offline_Assigned_page").append("<hr data-icon='false' style='background-color: #ff7e00; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				heigh = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Moderate') {
			if(!moderate) {
				$("#offline_Assigned_page").append("<hr data-icon='false' style='background-color: #0c6410; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				moderate = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Low') {
			if(!low) {
				$("#offline_Assigned_page").append("<hr  data-icon='false' style='background-color: #0836e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				low = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Planing') {
			if(!planing) {
				$("#offline_Assigned_page").append("<hr data-icon='false' style='background-color: #8808e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				planing = true;
			}
		}
		var count = 0;
		if(critical) {
			count = count + 1
		}
		if(heigh) {
			count = count + 1
		}
		if(moderate) {
			count = count + 1
		}
		if(low) {
			count = count + 1
		}
		if(planing) {
			count = count + 1
		}
		var num = 0;
		if(count > 1) {
			num = 1;
		}
		$("#offline_Assigned_page").append("<li data-icon='false'><a href='#' class='wborderradius' onclick='offline_Assigned_view(" + results.rows.item(i).id + "," + num + ");' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + results.rows.item(i).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + results.rows.item(i).task_name + "</h2>\
<p class='viewHurdleDescription2'> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + " </p>\
<hr>\
<p class='viewHurdleDescription1'><b>Address</b></p><p class='viewHurdleDescription2'> " + results.rows.item(i).task_address + "</p>\
</li>");
	}
	$("#offline_Assigned_page").listview("refresh");
	hideLoadingIcon();
}
/*End of Code for Offline Assigned Page */
/*==================================================================================================================*/
/* code for offline Assigned Page to view page*/
function offline_Assigned_view(taskid, num) {
	localStorage.setItem("offline_Assigned_task_id", "");
	localStorage.setItem("offline_Assigned_task_id", taskid);
	localStorage.setItem("num", num);
	//    localStorage.getItem("Assigned_button_id") == 0
	console.log("offlineAssigned_view" + localStorage.getItem("num") + "Accepted" + inAccepted + "inset" + inProgressset + "" + inAcceptedmultiple);
	if(localStorage.getItem("num") == 0 && inAccepted == 0 && inProgressset == 0) {
		$("#hide_show_buttonsss_offline").css("display", "block");
	} else {
		$("#hide_show_buttonsss_offline").css("display", "none");
	}
	if(inAcceptedmultiple == 1) {
		$("#hide_show_buttonsss_offline").css("display", "block");
	}
	changePage("#View_page_for_offline_Assigned_task", "slide", false);
}
/* End of code for offline Assigned Page view page */
/*==================================================================================================================*/
/* code for offline view page data*/
function offline_Assigned_View_pages() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_offline_Assigned_View_pages_suceess_two, error_Workwide);
}

function offline_offline_Assigned_View_pages_suceess_two(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Assigned_task_id") + '', [], offline_Assigned_View_page_Success, error_Workwide);
}

function offline_Assigned_View_page_Success(tx, results) {
	ApploadingIcon();
	$("#View_page_for_offline_Assigned_task_list").empty();
	var d = new Date(results.rows.item(0).created_date);
	//                         alert(results.rows.item(0).created_date);
	//                         alert(d.getDay());
	//                          alert(weekday[d.getDay()]);
	$("#View_page_for_offline_Assigned_task_list").append("<li data-icon='false'><a href='#'  class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + results.rows.item(0).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + results.rows.item(0).task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + results.rows.item(0).task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Offline_Completed_View(" + results.rows.item(0).id + ");'><b> TASK DETAIL </b></p>\
</a>\
</li>");
	$("#View_page_for_offline_Assigned_task_list").listview("refresh");
	$("#offline_task_assigned_items").empty();
	$("#offline_task_assigned_items").append("<li data-icon='false'><a href='#'data-transition='slide'>\
<p class='statusText'><span style='margin-top: 38px;' class='glyphicon glyphicon-map-marker'></span></p>\
<h2 style='padding-left:4%;font-weight:700;' class='viewHurdleDescription'>Trip summary</h2>\
<p class='viewHurdleDescription2' style=''>Maps Unavailable in offline mode</p><hr>\</a>\
</li>");
	$("#offline_task_assigned_items").listview("refresh");
	hideLoadingIcon();
}
/* code for offline view page data*/
/*==================================================================================================================*/
/* Code for Assigned to Accepted offline tasks code */
function offline_assign_to_accepted() {
	navigator.notification.confirm("Confirm to Accept the Task", offline_assign_to_accepted_button, "WorkWide", ["Yes", "No"]);
}

function offline_assign_to_accepted_button(buttonIndex) {
	if(buttonIndex == 1) {
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(change_status_id, error_Workwide);
		if(inAcceptedmultiple == 0) {
			changePage("#offline_Accepted_view_page", "slide", false);
		} else {
			changePage("#offline_Accepted_tasks_page", "slide", false);
		}
	}
}

function change_status_id(tx) {
	if(inAcceptedmultiple == 0) {
		localStorage.setItem("offline_Accepted_task_id", "");
		localStorage.setItem("offline_Accepted_task_id", localStorage.getItem("offline_Assigned_task_id"));
		tx.executeSql('UPDATE Main_Database_Table SET status_id = "5" WHERE id = ' + localStorage.getItem("offline_Assigned_task_id") + '');
	} else {
		tx.executeSql('UPDATE Main_Database_Table SET status_id = "3" WHERE id = ' + localStorage.getItem("offline_Assigned_task_id") + '');
	}
}
/* End of code for offline Assigned Page view */
/*==================================================================================================================*/
/*Code for Offline Resolved Tasks */
function offline_Resolved_page() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Resolved_page_success_Workwide, error_Workwide);
}

function offline_Resolved_page_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="4"', [], Data_list_for_Resolved, error_Workwide);
}

function Data_list_for_Resolved(tx, results) {
	ApploadingIcon();
	var len = results.rows.length;
	if(len == "0") {
		navigator.notification.alert('No Task', backNavigation, 'WorkWide', 'Ok');
	} else {
		$("#offline_Resolved_page").empty();
		for(var i = 0; i < len; i++) {
			if(results.rows.item(i).start_date == null || results.rows.item(i).start_date == "") {
				results.rows.item(i).start_date = Current_date_day;
			}
			var d = new Date(results.rows.item(i).created_date);
			$("#offline_Resolved_page").append("<li data-icon='false'><a href='#'  onclick='Offline_Completed_View(" + results.rows.item(i).id + ");' class='wborderradius' data-transition='slide'>\
<div style='float: right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + results.rows.item(i).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + results.rows.item(i).task_name + "</h2>\
<p class='viewHurdleDescription2'><span> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</span></p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p> " + results.rows.item(i).task_address + " </p></b></p>\
</li>");
		}
		$("#offline_Resolved_page").listview("refresh");
	}
	hideLoadingIcon();
}
/* End Of Code for Offline Resolved Tasks */
//==================================================================================================================
/*Code for Offline Accepted Tasks */
function offline_Accepted_page() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Accepted_page_success_Workwide, error_Workwide);
}

function offline_Accepted_page_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id = "3"', [], data_list_for_Accepted, error_Workwide);
}

function data_list_for_Accepted(tx, results) {
	ApploadingIcon();
	var len = results.rows.length;
	if(len == "0") {
		navigator.notification.alert('No Task', backNavigation, 'WorkWide', 'Ok');
	}
	$("#offline_Accepted_page").empty();
	var critical = false;
	var heigh = false;
	var moderate = false;
	var low = false;
	var planing = false;
	for(var i = 0; i < len; i++) {
		if(results.rows.item(i).start_date == null || results.rows.item(i).start_date == "") {
			results.rows.item(i).start_date = Current_date_day;
		}
		var d = new Date(results.rows.item(i).created_date);
		if(results.rows.item(i).priority_type == 'Critical') {
			if(!critical) {
				$("#offline_Accepted_page").append("<hr  data-icon='false' style='background-color: #ff0000; height: 2px; width: 50%;'><h3 style='width: 100px; margin: auto;text-align: center; position: relative; padding-bottom: 20px;'>" + results.rows.item(i).priority_type + "</h3>");
				critical = true;
			}
		}
		if(results.rows.item(i).priority_type == 'High') {
			if(!heigh) {
				$("#offline_Accepted_page").append("<hr data-icon='false' style='background-color: #ff7e00; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				heigh = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Moderate') {
			if(!moderate) {
				$("#offline_Accepted_page").append("<hr data-icon='false' style='background-color: #0c6410; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				moderate = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Low') {
			if(!low) {
				$("#offline_Accepted_page").append("<hr  data-icon='false' style='background-color: #0836e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				low = true;
			}
		}
		if(results.rows.item(i).priority_type == 'Planing') {
			if(!planing) {
				$("#offline_Accepted_page").append("<hr data-icon='false' style='background-color: #8808e2; height: 2px; width: 50%;'><h3 style='padding-bottom: 20px; width: 100px; margin: auto;text-align: center; position: relative;'>" + results.rows.item(i).priority_type + "</h3>");
				planing = true;
			}
		}
		$("#offline_Accepted_page").append("<li data-icon='false'><a href='#' class='wborderradius' onclick='offline_Accepted_view(" + results.rows.item(i).id + "," + i + ");' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + results.rows.item(i).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + results.rows.item(i).task_name + "</h2>\
<p class='viewHurdleDescription2'> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p>\
<hr>\
<p class='viewHurdleDescription1'><b>Address</b></p><p class='viewHurdleDescription2'> " + results.rows.item(i).task_address + "</p>\
</li>");
	}
	$("#offline_Accepted_page").listview("refresh");
	hideLoadingIcon();
}
/*  End of Code for Offline Accepted Tasks */
//==================================================================================================================
/*Code for offline in-progress view page Tasks */
function offline_Accepted_view(taskid, nums) {
	localStorage.setItem("offline_Accepted_task_id", "");
	localStorage.setItem("offline_Accepted_task_id", taskid);
	localStorage.setItem("offline_number_accepted", "");
	localStorage.setItem("offline_number_accepted", nums);
	changePage("#offline_Accepted_view_page", "slide", false);
}

function offline_Accepted_View_pages() {
	if(inProgressset == 0 || startclick == 1) {
		startclick = 0;
		$("#starttripwork_offline").css("display", "block");
	} else {
		$("#starttripwork_offline").css("display", "none");
	}
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Accepted_view_page_suceess_two, error_Workwide);
}

function offline_Accepted_view_page_suceess_two(tx) {
	if(localStorage.getItem("previous_page_id") == "offline_Landingpage") {
		tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id ="5"', [], offline_Accepted_view_page_Success, error_Workwide);
	} else {
		tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], offline_Accepted_view_page_Success, error_Workwide);
	}
}

function offline_Accepted_view_page_Success(tx, results) {
	if(localStorage.getItem("previous_page_id") == "offline_Landingpage") {
		localStorage.setItem("offline_Accepted_task_id", "");
		localStorage.setItem("offline_Accepted_task_id", results.rows.item(0).id);
	}
	ApploadingIcon();
	$("#offline_Accepted_page_list").empty();
	var d = new Date(results.rows.item(0).created_date);
	$("#offline_Accepted_page_list").append("<li data-icon='false'><a href='#'  class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + results.rows.item(0).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + results.rows.item(0).task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + results.rows.item(0).task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Offline_Completed_View(" + results.rows.item(0).id + ");'><b> TASK DETAIL </b></p>\
</a>\
</li>");
	$("#offline_Accepted_page_list").listview("refresh");
	$("#offline_Accepted_page_items").empty();
	$("#offline_Accepted_page_items").append("<li data-icon='false'><a  href='#'data-transition='slide'>\
<p class='statusText'><span style='margin-top: 38px;' class='glyphicon glyphicon-map-marker'></span></p>\
<h2 class='viewHurdleDescription'>Trip Summary</h2>\
<p class='viewHurdleDescription2' style=''>Maps Unavailable in offline mode</p><hr>\</a>\
</li>");
	$("#offline_Accepted_page_items").listview("refresh");
	hideLoadingIcon();
}
/* End of Code for offline in-progress view page Tasks */
/*==================================================================================================================*/
/**code for direct work to naviagte */
function Going_Accepted_view_to_work_direct_page_direct_to_startwork() {
	navigator.notification.confirm("Are you sure you want to start work?", btnLabel_Going_Accepted_view_to_work_direct_page_firstone, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Going_Accepted_view_to_work_direct_page_firstone(buttonIndex) {
	new Date($.now());
	var dt = new Date();
	starttasktime = "";
	starttasktime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	endtime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(change_status_type_from_accepted_to_inprogress_firstone, error_Workwide);
}

function change_status_type_from_accepted_to_inprogress_firstone(tx) {
	tx.executeSql('UPDATE Main_Database_Table SET status_id = "5" WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '');
	changePage("#offline_direct_work_start", "slide", false);
}
/*==================================================================================================================*/
/* Code for naviagation from Accepted view to work direct page in offline mode */
function Going_Accepted_view_to_work_direct_page() {
	navigator.notification.confirm("Are you sure you want to start work?", btnLabel_Going_Accepted_view_to_work_direct_page, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Going_Accepted_view_to_work_direct_page(buttonIndex) {
	if(buttonIndex == 1) {
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(change_status_type_from_accepted_to_inprogress, error_Workwide);
		new Date($.now());
		var dt = new Date();
		endtime = "";
		endtime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
		var start = starttime;
		var end = endtime;
		s = start.split(':');
		e = end.split(':');
		min = e[1] - s[1];
		hour_carry = 0;
		if(min < 0) {
			min += 60;
			hour_carry += 1;
		}
		hour = e[0] - s[0] - hour_carry;
		min = ((min / 60) * 100).toString()
		diff = hour + ":" + min.substring(0, 2);
		traveltime = diff;
		console.log(traveltime + "tests");
	}
}

function change_status_type_from_accepted_to_inprogress(tx) {
	tx.executeSql("UPDATE Main_Database_Table SET z_Total_time_offline = '" + traveltime + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	tx.executeSql('UPDATE Main_Database_Table SET status_id = "5" WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '');
	changePage("#offline_direct_work_start", "slide", false);
}
/* Code for naviagation from Accepted view to work direct page in offline mode */
/*==================================================================================================================*/
/*Code for offline mode direct work page */
function offline_Accepted_Direct_work_pages() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Accepted_Direct_work_suceess_two, error_Workwide);
}

function offline_Accepted_Direct_work_suceess_two(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], _getting_task_type_id_for_offline, error_Workwide);
}

function _getting_task_type_id_for_offline(tx1, results) {
	localStorage.setItem("task_type_id_offline", "");
	localStorage.setItem("task_type_id_offline", results.rows.item(0).task_type_id);
	tx1.executeSql('SELECT * FROM Main_Database_Table_categorys WHERE task_id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], _taking_Integration_Status, error_Workwide);
}

function _taking_Integration_Status(tx, results) {
	var _obj = results.rows.item(0).Integration_Status;
	var _obje = JSON.parse(_obj);
	var _o_bje = _obje[0].asset_status;
	localStorage.setItem("_allow_asset_offline", "");
	localStorage.setItem("_allow_asset_offline", _o_bje);
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], offline_Accepted_Direct_work_Success, error_Workwide);
}

function offline_Accepted_Direct_work_Success(tx, results) {
	ApploadingIcon();
	$("#offline_direct_work_start_list").empty();
	var d = new Date(results.rows.item(0).created_date);
	$("#offline_direct_work_start_list").append("<li data-icon='false'><a href='#'  class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + results.rows.item(0).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + results.rows.item(0).task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + results.rows.item(0).task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Offline_Completed_View(" + results.rows.item(0).id + ");'><b> TASK DETAILS </b></p>\
</a>\
</li>");
	$("#offline_direct_work_start_list").listview("refresh");
	var obj = results.rows.item(0).category_detail;
	console.log(results.rows.item(0).category_detail);
	var obje = JSON.parse(obj);
	console.info(obje);
	$("#offline_categoryListview").html("");
	var obj = obje[1];
	var obj1 = obje[2];
	var obj2 = obje[3];
	tempArray = [];
	tempArrayid = [];
	catArray = [];
	$.each(obj, function(key, value) {
		var value1 = value.replace(/ /g, "_");
		$("#offline_categoryListview").append("<li data-icon='myicon6'><a href='#' onclick='offline_categoryFields1(" + key + ",\"" + value + "\");' class='wborderradius ui-nodisc-icon " + value1 + "'>" + value + "</a></li>");
		tempArray.push(value);
		tempArrayid.push(key);
	});
	$("#offline_categoryListview").listview("refresh");
	$.each(obj1, function(key, value) {
		var key1 = key.replace(/ /g, "_");
		if(value == "0" || value == 0) $("." + key1).css("display", "none");
	});
	$.each(obj2, function(key, value) {
		if(value == "1" || value == 1) {
			catArray.push(key);
			console.info("test" + catArray);
		}
	});
	$("#offline_categoryListview").listview("refresh");
	if(localStorage.getItem("_allow_asset_offline") == "1" || localStorage.getItem("_allow_asset_offline") == 1) {
		$("#offline_categoryListview").append("<li data-icon='myicon6'><a href='#Update_assets_offline' class='wborderradius ui-nodisc-icon'>Assets</a></li>");
	}
	$("#offline_categoryListview").append("<li data-icon='myicon6'><a href='#attachmentPage_offline' class='wborderradius ui-nodisc-icon'>Attach</a></li>");
	$("#offline_categoryListview").listview("refresh");
	hideLoadingIcon();
	if(offlineApiFlag == 0) {
		$("#_offline_categoryContent").html("");
		offline_categoryFields();
	}
}
/*End of Code for offline mode direct work page */
/*==================================================================================================================*/
/**Category option in offline mode */
function offline_categoryFields() {
	cincrement++;
	console.log(cincrement + "===" + tempArray.length);
	if(parseInt(cincrement) < parseInt(tempArray.length)) {
		localStorage.setItem("offline_cid", "");
		localStorage.setItem("offline_cname", "");
		localStorage.setItem("offline_cid", tempArrayid[cincrement]);
		localStorage.setItem("offline_cname", tempArray[cincrement]);
		_category_offline_mode(0);
	} else if(parseInt(cincrement) > parseInt(tempArray.length)) {
		offlineApiFlag = 1;
	}
}

function offline_categoryFields1(Categoryid, value) {
	localStorage.setItem("offline_cid", "");
	localStorage.setItem("offline_cname", "");
	localStorage.setItem("offline_cid", Categoryid);
	localStorage.setItem("offline_cname", value);
	changePage("#offline_category_view_page", "slide", false);
}
/**Category option in offline mode */
/*==================================================================================================================*/
/**Category TAB in offline mode */
var cateDetailsFlag = false;

function _category_offline_mode(v) {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(_category_offline_mode_success, error_Workwide);
}

function _category_offline_mode_success(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table_categorys WHERE task_id =' + localStorage.getItem("offline_Accepted_task_id") + '', [], _category_offline_mode_success_func, error_Workwide_e);
}

function _category_offline_mode_success_func(tx, results) {
	$(".categoryname").html(localStorage.getItem("offline_cname"));
	$(".categoryname").html("");
	$(".categoryname").html(localStorage.getItem("offline_cname"));
	var len = results.rows.length;
	if(len == null || len == "null" || len == "" || len == 0) {
		hideLoadingIcon()
	} else {
		//        var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2*1024*1024)
		//        db.transaction(_category_offline_mode_success_one, error_Workwide);
		_category_offline_mode_success_one_func(tx, results);
	}
}

function error_Workwide_e() {
	console.info(e);
	console.log(e.message);
}

function _category_offline_mode_success_one(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table_categorys WHERE task_id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], _category_offline_mode_success_one_func, error_Workwide);
}

function _category_offline_mode_success_one_func(tx, results) {
	$(".categoryname").html("");
	$(".categoryname").html(localStorage.getItem("offline_cname"));
	$(".categoryname").html(localStorage.getItem("offline_cname"));
	var catname = localStorage.getItem("offline_cname").replace(/ /g, "_") + "form";
	var catnamerequired = localStorage.getItem("offline_cname").replace(/ /g, "_") + "req";
	var catnamediv = localStorage.getItem("offline_cname").replace(/ /g, "_") + "formdiv";
	if(offlineApiFlag == 1) {
		$(".cform").css("display", "none");
		$("#" + catnamediv).css("display", "block");
		hideLoadingIcon()
	} else {
		$("#" + catnamediv).remove();
		$("#_offline_categoryContent").append("<div class='cform' id=" + catnamediv + " ><form id=" + catname + "></form></div>");
		$(".cform").css("display", "none");
		$("#" + catnamediv).css("display", "block");
		var data_category = JSON.parse(results.rows.item(0).categoriesDetails);
		console.log(results.rows.item(0).categoriesDetails);
		var lencategory = data_category.length
		for(var j = 0; j < lencategory; j++) {
			if(data_category[j].length > 0) {
				if(data_category[j][0].category == localStorage.getItem("offline_cname") || data_category[j][0].cat_id == localStorage.getItem("Categoryid")) {
					var arr = data_category[j];
					var len = arr.length;
					var r = -1;
					var r1 = -1;
					var s = -1;
					var iselect = 0;
					console.log(JSON.stringify(data_category[j]));
					for(i = 0; i < len; i++) {
						console.log(JSON.stringify(arr[i]));
						arr[i].label = arr[i].label.charAt(0).toUpperCase() + arr[i].label.slice(1);
						if(arr[i].option_type == "TEXT") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							if(arr[i].post_values == "") {
								var post_values = '';
							} else {
								var post_values = arr[i].post_values;
							}
							$("#" + catname).append("<label for='" + arr[i].id + "' class='labelcolor'>" + arr[i].label + required_status + "</label><input type='text' class='input_typec " + requiredClass + "'  maxlength='" + arr[i].type_limit + "'  value='" + post_values + "'  name='" + arr[i].id + "' id='" + arr[i].id + "' />");
						} else if(arr[i].option_type == "NUMBER") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							if(arr[i].post_values == "") {
								var post_values = '';
							} else {
								var post_values = arr[i].post_values;
							}
							$("#" + catname).append("<label for='" + arr[i].id + "' class='labelcolor'>" + arr[i].label + required_status + "</label><input type='number' class='input_typec " + requiredClass + "' oninput='numberLimit(" + arr[i].type_limit + ",\"" + arr[i].id + "\")' value='" + post_values + "' name='" + arr[i].id + "' id='" + arr[i].id + "' />");
						} else if(arr[i].option_type == "TEXTAREA") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								r++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClass " + catnamerequired + "text" + r + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							if(arr[i].post_values == "") {
								var post_values = '';
							} else {
								var post_values = arr[i].post_values;
							}
							$("#" + catname).append("<label for='" + arr[i].id + "' class='labelcolor'>" + arr[i].label + required_status + "</label><textarea class='form_textarea_reason " + requiredClass + "' id='" + arr[i].id + "'maxlength='" + arr[i].type_limit + "' name='" + arr[i].id + "'>" + post_values + "</textarea>");
						} else if(arr[i].option_type == "SELECT") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								s++;
								var required_status = "<span class='requriedfield1'>*</span>";
								var requiredClass = "selectbox requiredClassselect " + catnamerequired + "select" + s + "";
							} else {
								var required_status = "<span class='requriedfield1'></span>";
								var requiredClass = "selectbox";
							}
							if(arr[i].depondon == "null" || arr[i].depondon == null) {
								var dependson = "";
							} else {
								var dependson = "onchange=dropdownDependson_offline(" + arr[i].id + "," + arr[i].depondon + ");";
							}
							$("#" + catname).append("<br><div class='ui-grid-a'><div class='ui-block-a' style='width:96%;'><select id='" + arr[i].id + "' class='" + requiredClass + "' name='" + arr[i].id + "' " + dependson + "><option value='-1'>" + arr[i].label + "</option></select></div><div class='ui-block-b' style='width:2%;'>" + required_status + "</div></div>");
							var type_values = arr[i].type_values.length;
							for(j = 0; j < type_values; j++) {
								var value = arr[i].type_values[j].replace(/#&&#/g, "'")
								$("#" + arr[i].id).append("<option value='" + arr[i].type_values[j] + "'>" + value + "</option>");
							}
							if(arr[i].post_values != "") {
								$("#" + arr[i].id).val(arr[i].post_values);
							}
						} else if(arr[i].option_type == "SWITCH") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								r1++;
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClasscheck " + catnamerequired + "che" + r1 + "";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							// $("#" + catname).append("<label class='labelcolor' for='" + arr[i].id + "'>" + arr[i].label + required_status + "</label><input type='checkbox' data-role='flipswitch' name='" + arr[i].id + "' id='" + arr[i].id + "' class='chekboxwidget " + requiredClass + "'>");
							// if (arr[i].post_values == "on") {
							// $("#" + arr[i].id).prop('checked', true);
							// }
							// if (arr[i].post_values == "") {
							// $("#" + arr[i].id).prop('checked', false);
							// }
							$("#" + catname).append("<label class='labelcolor' for='" + arr[i].id + "'>" + arr[i].label + required_status + "</label><select name='" + arr[i].id + "' id='" + arr[i].id + "' data-role='slider'>\
                                                 <option value=''>No</option>\
                                                 <option value='on'>YES</option>\
                                                </select>");
							if(arr[i].post_values == "YES") {
								$("#" + arr[i].id).val('on');
							}
							if(arr[i].post_values == "NO") {
								$("#" + arr[i].id).val('');
							}
						} else if(arr[i].option_type == "RADIOLIST" || arr[i].option_type == "RADIO") {
							if(arr[i].required_status == "1" || arr[i].required_status == 1) {
								var required_status = "<span class='requriedfield'>*</span>";
								var requiredClass = "requiredClassradio " + catnamerequired + "rad";
							} else {
								var required_status = "<span class='requriedfield'></span>";
								var requiredClass = "";
							}
							$("#" + catname).append("<label class='labelcolor'>" + arr[i].label + required_status + "</label>");
							var type_values1 = arr[i].type_values.length;
							for(k = 0; k < type_values1; k++) {
								var typevalues = arr[i].type_values[k].replace(/ /g, "_");
								$("#" + catname).append("<label for='" + arr[i].type_values[k] + "' class='labelcolor1'><input type='radio' class='" + requiredClass + k + "' name='" + arr[i].id + "' value='" + typevalues + "' id='" + typevalues + "'>" + arr[i].type_values[k] + "</label>");
							}
							$("#" + arr[i].type_values[0].replace(/ /g, "_")).prop('checked', true);
						}
					}
					$("#" + catname).append("<input type='hidden' name='catid' value='" + localStorage.getItem("offline_cid") + "' /> ");
					$("#" + catname).append("<br><br><a href='' class='ui-btn btngreycolor ui-corner-all' onclick='categorySumbit_offline_button(" + catname + ");'>SUBMIT</a>");
					hideLoadingIcon()
				}
			}
		}
		$("#" + catname).trigger('create');
		offline_categoryFields();
	}
}
/*==================================================================================================================*/
/**code for submitting data into table  */
var category_list_data = [];

function categorySumbit_offline_button(catname) {
	var z = localStorage.getItem("offline_cname").replace(/ /g, "_") + "reqtext";
	$("#_offline_categoryContent").find("#" + localStorage.getItem("offline_cname").replace(/ /g, "_") + "form").find(".requiredClass").each(function(k, v) {
		//console.log(localStorage.getItem("offline_cname").replace(/ /g, "_") + "form");
		if($("." + z + k).val() == "" || $("." + z + k).val() == 0 || $("." + z + k).val() == "0" || $("." + z + k).val() == "null" || $("." + z + k).val() == null) {
			validationFlag1 = true;
		} else {
			validationFlag1 = false;
		}
	});
	var z1 = localStorage.getItem("offline_cname").replace(/ /g, "_") + "reqselect";
	$("#_offline_categoryContent").find("#" + localStorage.getItem("offline_cname").replace(/ /g, "_") + "form").find("select.requiredClassselect").each(function(k, v) {
		if($("select." + z + k).val() == "-1" || $("select." + z + k).val() == "0") {
			validationFlag2 = true;
		} else {
			validationFlag2 = false;
		}
	});
	var z2 = localStorage.getItem("offline_cname").replace(/ /g, "_") + "reqche";
	$("#_offline_categoryContent").find("#" + localStorage.getItem("offline_cname").replace(/ /g, "_") + "form").find(".requiredClasscheck").each(function(k, v) {
		console.log(localStorage.getItem("offline_cname").replace(/ /g, "_") + "form");
		console.log($("." + z2 + k).prop("checked") + "." + z2 + k);
		if($("." + z2 + k).prop("checked") == false) {
			validationFlag3 = true;
		} else {
			validationFlag3 = false;
		}
	});
	if(validationFlag1 == true || validationFlag2 == true || validationFlag3 == true) {
		showAlert("Please fill the " + localStorage.getItem("offline_cname") + " form");
	} else {
		var data = $("#" + localStorage.getItem("offline_cname").replace(/ /g, "_") + "form").serializeArray();
		//        var data1 = JSON.stringify(data);
		console.log(category_list_data.length);
		category_list_data = category_list_data.concat(data);
		console.log("testst" + category_list_data);
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(storing_data_to_local_db_for_category, error_Workwide);
	}
}

function storing_data_to_local_db_for_category(tx) {
	var result = JSON.stringify(category_list_data);
	console.log(JSON.stringify(category_list_data) + "final");
	tx.executeSql("UPDATE Main_Database_Table SET z_category_data = '" + result + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	navigator.notification.alert('Updated', backNavigation, 'WorkWide', 'OK');
}

function categorySumbit_offline_button_back() {
	var data = $("#" + localStorage.getItem("offline_cname").replace(/ /g, "_") + "form").serializeArray();
	console.log(category_list_data.length);
	category_list_data = category_list_data.concat(data);
	console.log("testst" + category_list_data);
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(storing_data_to_local_db_for_category_back, error_Workwide);
}

function storing_data_to_local_db_for_category_back(tx) {
	console.log(JSON.stringify(category_list_data) + "final");
	var result = JSON.stringify(category_list_data);
	tx.executeSql("UPDATE Main_Database_Table SET z_category_data = '" + result + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	//navigator.notification.alert('Updated', backNavigation, 'WorkWide', 'OK');
}
/*==================================================================================================================*/
/* Code for navigation from work direct to signature page offline */
function signature_page_navigation() {
	var catlist = " ";
	new Date($.now());
	var dt = new Date();
	endtasktime = "";
	endtasktime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	var start = endtasktime;
	var end = endtime;
	s = start.split(':');
	e = end.split(':');
	min = s[1] - e[1];
	hour_carry = 0;
	if(min < 0) {
		min += 60;
		hour_carry += 1;
	}
	hour = s[0] - e[0] - hour_carry;
	min = ((min / 60) * 100).toString()
	diff = hour + ":" + min.substring(0, 2);
	repairtime = diff;
	console.log(repairtime);
	for(i = 0; i < catArray.length; i++) {
		var z = catArray[i].replace(/ /g, "_") + "reqtext";
		$("#_offline_categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find(".requiredClass").each(function(k, v) {;
			if($("." + z + k).val() == "" || $("." + z + k).val() == 0 || $("." + z + k).val() == "0" || $("." + z + k).val() == "null" || $("." + z + k).val() == null) {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
		var z1 = catArray[i].replace(/ /g, "_") + "reqselect";
		$("#_offline_categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find("select.requiredClassselect").each(function(k, v) {
			if($("select." + z1 + k).val() == "-1" || $("select." + z1 + k).val() == "0") {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
		var z2 = catArray[i].replace(/ /g, "_") + "reqche";
		$("#_offline_categoryContent").find("#" + catArray[i].replace(/ /g, "_") + "form").find(".requiredClasscheck").each(function(k, v) {
			console.log(localStorage.getItem("offline_cname").replace(/ /g, "_") + "form");
			console.log($("." + z2 + k).prop("checked") + "." + z2 + k);
			if($("." + z2 + k).prop("checked") == false) {
				validationconfirmtask = true;
				catArray1.push(catArray[i]);
			}
		});
	}
	if(validationconfirmtask == false) {
		navigator.notification.confirm("Confirm to End the Task?", signature_page_navigation_success, "WorkWide", ["Yes", "No"]);
	} else {
		catArray1 = $.unique(catArray1);
		for(i = 0; i < catArray1.length; i++) {
			if(i == catArray1.length - 1) {
				catlist += catArray1[i].trim() + "\n";
			} else {
				console.log(catlist);
				catlist += catArray1[i].trim() + "\n";
				console.log(catlist);
			}
		}
		validationconfirmtask = false;
		catArray1 = [];
		showAlert("Please fill in all required fields in the following sections:\n" + catlist, "WorkWide");
	}
}

function signature_page_navigation_success(buttonIndex) {
	if(buttonIndex == 1) {
		changePage("#Accepted_Signature_and_feeback_view_tasklist_page", "slide", false);
	}
}
/* Code for navigation from work direct to signature page offline*/
/*==================================================================================================================*/
/*code for signature page task offline */
function offline_signature_pages() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_offline_signature_pages, error_Workwide);
}

function offline_offline_signature_pages(tx) {
	tx.executeSql("UPDATE Main_Database_Table SET z_Total_repair_time_offline = '" + repairtime + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], offline_offline_signature_pages_success, error_Workwide);
	tx.executeSql('SELECT * FROM Main_Database_Table_categorys WHERE task_id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], offline_signature_rating_view, error_Workwide);
}

function offline_offline_signature_pages_success(tx, results) {
	ApploadingIcon();
	$("#offline_Accepted_Signature_and_feeback_view_task").empty();
	var d = new Date(results.rows.item(0).created_date);
	$("#offline_Accepted_Signature_and_feeback_view_task").append("<li data-icon='false'><a href='#'  class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + results.rows.item(0).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + results.rows.item(0).task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + results.rows.item(0).task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Offline_Completed_View(" + results.rows.item(0).id + ");'><b> TASK DETAIL </b></p>\
</a>\
</li>");
	$("#offline_Accepted_Signature_and_feeback_view_task").listview("refresh");
	hideLoadingIcon();
}
/**code for offline view of signature and rating options */
function offline_signature_rating_view(tx, results) {
	var _completedScreenDetails = results.rows.item(0).completedScreenDetails;
	var data = JSON.parse(_completedScreenDetails);
	if(data[0].signature == 1 || data[0].signature == "1") {
		$("#signaturebox").css("display", "block");
	} else {
		$("#signaturebox").css("display", "none");
	}
	if(data[0].ratings == 1 || data[0].ratings == "1") {
		$("#rateus").css("display", "block");
	} else {
		$("#rateus").css("display", "none");
	}
	if(data[0].comments == 1 || data[0].comments == "1") {
		$("#addcomment").css("display", "block");
	} else {
		$("#addcomment").css("display", "none");
	}
}
/*  end of code for signature page task offline */
/*==================================================================================================================*/
/* Code for Sending All data back to backend in offline mode */
function _sending_data_to_backend() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(_sending_data_to_backend_success, error_Workwide);
}

function _sending_data_to_backend_success(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table', [], _complete_data_for_offline_suceess, error_Workwide);
}

function _complete_data_for_offline_suceess(tx, results) {
	var OfflinTotalTasks = [];
	console.log(results.rows.length);
	for(i = 0; i < results.rows.length; i++) {
		console.log(results.rows.item(i));
		OfflinTotalTasks = OfflinTotalTasks.concat(results.rows.item(i));
		console.log(JSON.stringify(OfflinTotalTasks));
	}
	var parameters = {
		TOKEN: localStorage.getItem("TOKEN"),
		fse_id: localStorage.getItem("user_id"),
		json_data: JSON.stringify(OfflinTotalTasks),
		object_data: results.rows.item(0).z_category_data
	};
	setTimeout(function() {
		offlinetoonline(parameters);
	}, 2000);
}

function offlinetoonline(parameters) {
	QuinticaWebService("POST", "casorOfflineSave", parameters, function(response) {
		if(response.code == "1") {
			//changePage("#Landingpage", "slide", false);
		} else {
			showAlert("Unable to connect..!!", "WorkWide");
			hideLoadingIcon2();
		}
	});
	hideLoadingIcon2();
	UploadAttachmentstoserver(cordova.file.documentsDirectory);
}
/* Code for Sending All data back to backend in offline mode */
/*==================================================================================================================*/
/*==================================================================================================================*/
/*Code for Offline On REJECT Page reason Page */
function UploadAttachmentstoserver(path) {
	ApploadingIcon();
	var len = 0;
	window.resolveLocalFileSystemURL(path, function(fileSystem) {
		var reader = fileSystem.createReader();
		reader.readEntries(function(entries) {
			console.info(entries);
			len = entries.length;
			if(len == 0 || len == "" || len == "0") {} else {
				for(var i = 0; i < len; i++) {
					console.log(entries[i].isFile);
					if(entries[i].isFile == "true" || entries[i].isFile == true) {
						var str = entries[i].nativeURL;
						if(str.indexOf(localStorage.getItem("offline_Accepted_task_id")) != -1) {
							var n = true;
						} else {
							var n = false;
						}
						if(n == "true" || n == true) {
							var filepath = entries[i].nativeURL;
							getFileContentAsBase64(filepath, function(base64Image) {
								var base64 = base64Image.replace(/^data:image\/png;base64,/, "");
								if(checkConnection()) {
									var parameters = {
										TOKEN: localStorage.getItem("TOKEN"),
										task_id: localStorage.getItem("offline_Accepted_task_id"),
										customer_document: base64
									};
									QuinticaWebService("POST", "updateTaskCustomerDocument", parameters, function(response) {
										if(response.code == "1") {} else {
											showAlert("Unable to connect..!!", "WorkWide");
											hideLoadingIcon()
										}
									});
								} else {
									showAlert("Please Check Internet Connection", "WorkWide");
								}
								hideLoadingIcon()
							});
						}
					}
				}
			}
		}, function(err) {
			console.log(err);
		});
	}, function(err) {
		console.log(err);
	});
	hideLoadingIcon();
	if(checkConnection()) {
		changePage("#Landingpage", "slide", false);
	}
}

function getFileContentAsBase64(path, callback) {
	window.resolveLocalFileSystemURL(path, gotFile, fail);

	function fail(e) {
		showAlert("Cannot found requested file", "WorkWide");
	}

	function gotFile(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				var content = this.result;
				callback(content);
			};
			// The most important point, use the readAsDatURL Method from the file plugin
			reader.readAsDataURL(file);
		});
	}
}

function Reject_reason_list_offline() {
	navigator.notification.confirm("Confirm to reject the task?", btnLabel_Reject_reason_list_offline, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Reject_reason_list_offline(buttonIndex) {
	if(buttonIndex == 1) {
		changePage("#Offline_on_Reject_reason_page", "slide", false);
	}
}
/* End of Code for Offline On REJECT Page reason Page */
/*==================================================================================================================*/
/*code for enable button */
$("#offline_reject_select_box").on('change', function() {
	if($("#offline_reject_select_box").val() != "0") {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});
$("#reject_textarea_reason_offline").on('change', function() {
	if($("#reject_textarea_reason_offline").val() != "") {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});
/* End of code for enable button */
/*==================================================================================================================*/
/*Code for option on on REJECT page in offline mode */
function on_reject_offline_reason() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(on_reject_offline_reason_success_Workwide, error_Workwide);
}

function on_reject_offline_reason_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Assigned_task_id") + '', [], on_reject_offline_reason_success_Workwide_function, error_Workwide);
}

function on_reject_offline_reason_success_Workwide_function(tx, results) {
	var obj_rejectDetails = results.rows.item(0).rejectDetails;
	var objecc = JSON.parse(obj_rejectDetails);
	if(objecc.length == 0) {
		var option = '';
		var option = '<option value="-1">Reject Reasons</option>';
		$('#offline_reject_select_box').css("display", "none");
	} else {
		var option = '';
		var option = '<option value="-1">Reject Reasons</option>';
		$.each(objecc, function(key, value) {
			option += '<option value=' + value.command + '>' + value.command + '</option>';
		});
	}
	$('#offline_reject_select_box').html("");
	$('#offline_reject_select_box').append(option);
	$('#offline_reject_select_box').selectmenu("refresh", true);
	hideLoadingIcon();
}
/*End of Code for option on on REJECT page in offline mode */
/*==================================================================================================================*/
/*Code for Submitting the data for on REJECT in local DB for offline */
function offline_status_change_in_inprogress_to_on_reject() {
	navigator.notification.confirm("Confirm to Reject the Task?", offline_status_change_in_inprogress_to_on_reject_btn_lbl_success, "WorkWide", ["Yes", "No"]);
}

function offline_status_change_in_inprogress_to_on_reject_btn_lbl_success(buttonIndex) {
	if(buttonIndex == 1) {
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(_offline_status_change_in_inprogress_to_on_reject_success, error_Workwide);
	}
}
/*==================================================================================================================*/
/*Code for updating data to local DB */
function _offline_status_change_in_inprogress_to_on_reject_success(tx) {
	var _reject_select = $("#offline_reject_select_box").val();
	var _reject_textarea = $("#reject_textarea_reason_offline").val();
	var reject_both_offline = "select :" + _reject_select + " comment :" + _reject_textarea;
	tx.executeSql("UPDATE Main_Database_Table SET z_reject_and_comment = '" + reject_both_offline + "' WHERE id = " + localStorage.getItem("offline_Assigned_task_id") + "");
	tx.executeSql('UPDATE Main_Database_Table SET status_id = "7" WHERE id = ' + localStorage.getItem("offline_Assigned_task_id") + '');
	offlineApiFlag = 0;
	cincrement = -1;
	changePage("#offline_Landingpage", "slide", false);
}
/*End of Code for updating data to local DB */
/*==================================================================================================================*/
/* Code For offline Complete view */
function Offline_Completed_View(taskid) {
	localStorage.setItem("offline_taskdetailsid", taskid);
	changePage("#Offline_complete_view_page", "slide", false);
}

function offline_taskDetailspage() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Completed_View_main_success, error_Workwide);
}

function offline_Completed_View_main_success(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_taskdetailsid") + '', [], offline_Completed_View_main_success_one, error_Workwide);
}

function offline_Completed_View_main_success_one(tx, results) {
	$("#offline_complete_listview").empty();
	var obj = results.rows.item(0);
	console.log(JSON.stringify(results.rows.item(0)));
	var i = 1;
	var j = 0;
	var cflag = false;
	$.each(obj, function(key, value) {
		var temp = key;
		key = key.replace(/_/g, " ");
		if(temp == "category_data") {
			var obj1 = JSON.parse(results.rows.item(0).category_data);
			console.log(Object.keys(obj1).length);
			$.each(obj1, function(k, v) {
				console.log(k + "<=====>" + v);
				if(k == "category" + i) {
					i++
					$("#offline_complete_listview").append("<p class='heading'><b>" + v + "</b></p>");
				} else if(v != null) {
					$("#offline_complete_listview").append("<p class='taskdetails_fields'><b>" + k + "</b></p><p class='taskvalue_fields'>" + v + "</p><span><hr></span>");
				}
			});
		} else if(temp != "z_Total_time_offline" && key != "id" && temp != "z_onhold_and_comment" && temp != "z_reject_and_comment" && temp != "z_Assets_data" && temp != "z_category_data" && temp != "z_offline_signature" && temp != "z_offline_rating" && temp != "category_detail" && key != "Levelofeffort" && key != "OnholdDetails" && key != "rejectDetails" && temp != "status_id" && temp != "task_type_id" && temp != "task_type_flow" && value != null) {
			$("#offline_complete_listview").append("<p class='taskdetails_fields'><b>" + key + "</b></p><p class='taskvalue_fields'>" + value + "</p><span><hr></span>");
		}
	});
	$("#offline_complete_listview span").last().html(" ");
	$("#offline_complete_listview").listview("refresh");
}
/* Code For offline Complete view */
/*==================================================================================================================*/
/* Code for Going online from offline */
function Going_online() {
	navigator.notification.confirm("Confirm to go Online?", btnLabel_Online_from_offline, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Online_from_offline(buttonIndex) {
	if(buttonIndex == 1) {
		var textonlineloading = "You are going online\n" + no_of_offlinetasks + " Uploading items";
		Apploadingupicon(textonlineloading);
		_sending_data_to_backend();
	}
}
/* End of Code for Going online from offline */
/*==================================================================================================================*/
/* Code for Going Offline */
function Going_Offline() {
	navigator.notification.confirm("Confirm to go Offline?", btnLabel_Going_Offline_from_online, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Going_Offline_from_online(buttonIndex) {
	if(buttonIndex == 1) {
		offline_Workwide_DB();
	}
}
/* End of Code for Going Offline */
/*==================================================================================================================*/
/* Removing Records from DB*/
function clear_db() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(Delete_success_Workwide, error_Workwide);
}

function Delete_success_Workwide(tx) {
	tx.executeSql("DROP TABLE Main_Database_Table");
	tx.executeSql("DROP TABLE Main_Database_Table_categorys");
	tx.executeSql("DROP TABLE Main_Database_Table_Assets");
	tx.executeSql("DROP TABLE Main_Database_Table_Locations");
}
/* End of Removing Records from DB*/
/*==================================================================================================================*/
/*==================================================================================================================*/
/**code for closing the offline task in progess to completed */
function _closethe_task_as_completed_offline(buttonIndex) {
	if(buttonIndex == 1) {
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(_updating_in_progress_as_completed, error_Workwide);
	}
}
/*==================================================================================================================*/
function _updating_in_progress_as_completed(tx) {
	tx.executeSql("UPDATE Main_Database_Table SET z_offline_signature = '" + dataUrl_images_sign + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	tx.executeSql("UPDATE Main_Database_Table SET z_offline_rating = '" + rating + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	tx.executeSql('UPDATE Main_Database_Table SET status_id = "4" WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '');
	request_json = "";
	f = -1;
	datass = [];
	assets = [];
	used = [];
	await = [];
	datass.length = 0;
	clearCanvas();
	offlineApiFlag = 0;
	cincrement = -1;
	$("#Assets_ul_offline").empty();
	changePage("#offline_Landingpage", "slide", false);
	hideLoadingIcon();
}
/*==================================================================================================================*/
/** code for file sysytem in for storing image */
/**====================================================================================================================== */
//File System
var filesystem;

function profilePicture(serverUrl, imageflag) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 2 * 1024 * 1024, function(fs) {
		console.log('file system open: ' + fs.name);
		filesystem = fs;
		getSampleFile(fs.root, serverUrl, imageflag);
	}, onErrorLoadFs);
}

function onErrorLoadFs(err) {
	console.info("1" + err);
}

function getSampleFile(dirEntry, serverUrl, imageflag) {
	console.log(dirEntry);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', serverUrl, true);
	xhr.responseType = 'blob';
	xhr.onload = function() {
		if(this.status == 200) {
			var blob = new Blob([this.response], {
				type: 'image/png'
			});
			if(imageflag == 0) saveFile(dirEntry, blob, "profile.png", imageflag);
			else saveFile(dirEntry, blob, "entity.png", imageflag);
		}
	};
	xhr.send();
}

function saveFile(dirEntry, fileData, fileName, imageflag) {
	dirEntry.getFile(fileName, {
		create: true,
		exclusive: false
	}, function(fileEntry) {
		writeFile(fileEntry, fileData, imageflag);
	}, onErrorCreateFile);
}

function onErrorCreateFile(err) {
	console.info("2" + err);
}
/*==================================================================================================================*/
function writeFile(fileEntry, dataObj, isAppend, imageflag) {
	fileEntry.createWriter(function(fileWriter) {
		fileWriter.onwriteend = function() {
			console.log("Successful file write...");
			if(dataObj.type == "image/png") {
				readBinaryFile(fileEntry);
			}
		};
		fileWriter.onerror = function(e) {
			console.log("Failed file write: " + e.toString());
		};
		fileWriter.write(dataObj);
	});
}
/*==================================================================================================================*/
function readBinaryFile(fileEntry, imageflag) {
	fileEntry.file(function(file) {
		var reader = new FileReader();
		reader.onloadend = function() {
			console.log("Successful file write: " + this.result);
			console.log(fileEntry.fullPath + ": " + this.result);
			var blob = new Blob([new Uint8Array(this.result)], {
				type: "image/png"
			});
		};
		reader.readAsArrayBuffer(file);
	}, onErrorReadFile);
	hideLoadingIcon();
}
/*==================================================================================================================*/
function onErrorReadFile(err) {
	hideLoadingIcon();
	console.info(err);
}
/*==================================================================================================================*/
/**new code for start trip offline */
function offline_Accepted_endtrip_View_pages() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_Accepted_view_end_page_suceess_two, error_Workwide);
}

function offline_Accepted_view_end_page_suceess_two(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], offline_Accepted_view_end_page_Success, error_Workwide);
}

function offline_Accepted_view_end_page_Success(tx, results) {
	ApploadingIcon();
	$("#offline_Accepted_page_end_list").empty();
	var d = new Date(results.rows.item(0).created_date);
	$("#offline_Accepted_page_end_list").append("<li data-icon='false'><a href='#'  class='wborderradius' data-transition='slide'>\
<div style='float:right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'></span><p class='statusText'>&nbsp;" + results.rows.item(0).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''>" + results.rows.item(0).task_name + "</h2>\
<p class='viewHurdleDescription2' style=''>" + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p class='viewHurdleDescription2'> " + results.rows.item(0).task_address + "</p></p>\
<p class='btnFontSizesecondary' style='color:" + localStorage.getItem("s_colorcode") + ";' onclick='Offline_Completed_View(" + results.rows.item(0).id + ");'><b> TASK DETAIL </b></p>\
</a>\
</li>");
	$("#offline_Accepted_page_end_list").listview("refresh");
	$("#offline_Accepted_end_page_items").empty();
	$("#offline_Accepted_end_page_items").append("<li data-icon='false'><a  href='#'data-transition='slide'>\
<p class='statusText'><span style='margin-top: 38px;' class='glyphicon glyphicon-map-marker'></span></p>\
<h2 class='viewHurdleDescription'>Trip Summary</h2>\
<p class='viewHurdleDescription2' style=''>Maps Unavailable in offline mode</p><hr>\</a>\
</li>");
	$("#offline_Accepted_end_page_items").listview("refresh");
	hideLoadingIcon();
}
/** end of new code for start trip offline */
/**====================================================================================================================== */
/** code for start time */
function startTime() {
	new Date($.now());
	var dt = new Date();
	starttime = "";
	starttime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	changePage("#offline_Accepted_entrip_view_page", "slide", false);
}
/** end of code for start time */
/*==================================================================================================================*/
/*Code for Offline On HOLD Page reason Page */
function Pending_reason_list_offline() {
	navigator.notification.confirm("Confirm to save the task as On Hold?", btnLabel_Pending_reason_list_offline, "WorkWide", ["Yes", "No"]);
}

function btnLabel_Pending_reason_list_offline(buttonIndex) {
	if(buttonIndex == 1) {
		changePage("#Offline_on_hold_reason_page", "slide", false);
	}
}
/* End of Code for Offline On HOLD Page reason Page */
/*==================================================================================================================*/
/*code for enable button */
$("#pending_select_reason_offline").on('change', function() {
	if($("#pending_select_reason_offline").val() != "0") {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});
$("#pending_textarea_reason_offline").on('change', function() {
	if($("#pending_textarea_reason_offline").val() != "") {
		$(".btngreycolor").removeClass("ui-disabled");
	}
});
/* End of code for enable button */
/*==================================================================================================================*/
/*Code for option on on hold page in offline mode */
function on_hold_offline_reason() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(on_hold_offline_reason_success_Workwide, error_Workwide);
}

function on_hold_offline_reason_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], on_hold_offline_reason_success_Workwide_function, error_Workwide);
}

function on_hold_offline_reason_success_Workwide_function(tx, results) {
	if(onholdComment == 1 || onholdComment == "1") {
		$("#pending_select_reason_offline").css("display", "none");
	} else {
		$("#pending_select_reason_offline").css("display", "block");
	}
	var obj_OnholdDetails = results.rows.item(0).OnholdDetails;
	var objec = JSON.parse(obj_OnholdDetails);
	if(objec.length == 0) {
		var option = '';
		var option = '<option value="-1">On Hold Reasons</option>';
		$('#pending_select_reason_offline').css("display", "none");
	} else {
		var option = '';
		var option = '<option value="-1">On Hold Reasons</option>';
		$.each(objec, function(key, value) {
			option += '<option value=' + value.command + '>' + value.command + '</option>';
		});
	}
	$('#pending_select_reason_offline').html("");
	$('#pending_select_reason_offline').append(option);
	$('#pending_select_reason_offline').selectmenu("refresh", true);
	hideLoadingIcon();
}
/*End of Code for option on on hold page in offline mode */
/*==================================================================================================================*/
/*Code for Submitting the data for on hold in local DB for offline */
function offline_status_change_in_inprogress_to_on_hold() {
	navigator.notification.confirm("Confirm to Put the task as pending?", offline_status_change_in_inprogress_to_on_hold_btn_lbl, "WorkWide", ["Yes", "No"]);
}

function offline_status_change_in_inprogress_to_on_hold_btn_lbl(buttonIndex) {
	if(buttonIndex == 1) {
		function_offline_status_change_in_inprogress_to_on_hold();
	}
}
/*==================================================================================================================*/
/*Code for updating data to local DB */
function function_offline_status_change_in_inprogress_to_on_hold() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(function_offline_status_change_in_inprogress_to_on_hold_success, error_Workwide);
}

function function_offline_status_change_in_inprogress_to_on_hold_success(tx) {
	var _onhold_select = $("#pending_select_reason_offline").val();
	var _onhold_textarea = $("#pending_textarea_reason_offline").val();
	var _both_offline = "select :" + _onhold_select + " comment :" + _onhold_textarea;
	tx.executeSql("UPDATE Main_Database_Table SET z_onhold_and_comment = '" + _both_offline + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	tx.executeSql('UPDATE Main_Database_Table SET status_id = "2" WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '');
	offlineApiFlag = 0;
	cincrement = -1;
	changePage("#offline_Landingpage", "slide", false);
}
/*End of Code for updating data to local DB */
/*==================================================================================================================*/
/*End of Code for Submitting the data for on hold in local DB for offline */
/*==================================================================================================================*/
/*Code for Offline On HOLD Tasks */
function offline_on_hold_page() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(offline_on_hold_page_success_Workwide, error_Workwide);
}

function offline_on_hold_page_success_Workwide(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table WHERE status_id = "2"', [], Data_list_for_On_Hold, error_Workwide);
}

function Data_list_for_On_Hold(tx, results) {
	var len = results.rows.length;
	if(len == "0") {
		navigator.notification.alert('No Work', backNavigation, 'WorkWide', 'OK');
	}
	$("#offline_on_hold_page").empty();
	for(var i = 0; i < len; i++) {
		if(results.rows.item(i).start_date == null || results.rows.item(i).start_date == "") {
			results.rows.item(i).start_date = Current_date_day;
		}
		var d = new Date(results.rows.item(i).created_date);
		$("#offline_on_hold_page").append("<li data-icon='false'><a href='#'  onclick='Offline_Completed_View(" + results.rows.item(i).id + ");' class='wborderradius' data-transition='slide'>\
<div style='float: right;margin-top:10px;'><img src='img/checkcircle.png' class='' width='24' height='24'><p class='statusText'>&nbsp;" + results.rows.item(i).status_type + "</p></div>\
<h2 class='viewHurdleDescription' style=''> " + results.rows.item(i).task_name + "</h2>\
<p class='viewHurdleDescription2'><span> " + weekday[parseInt(d.getDay())] + " , " + d.getDate() + " " + monthNames[parseInt(d.getMonth())] + "</span></p><hr>\
<p class='viewHurdleDescription1'><b>Address </b><br><p> " + results.rows.item(i).task_address + " </p></b></p>\
</li>");
	}
	$("#offline_on_hold_page").listview("refresh");
}
/*Code for End Offline On HOLD Tasks */
/*==================================================================================================================*/
/**Code for Assets offline in tab categorys */
function _Offline_Assets_taking_value_from_Array() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(_Offline_Assets_taking_value_from_Array_suucess, error_Workwide);
}

function _Offline_Assets_taking_value_from_Array_suucess(tx) {
	tx.executeSql('SELECT * FROM Main_Database_Table_Assets WHERE task_type_id = ' + localStorage.getItem("task_type_id_offline") + '', [], _Offline_Assets_taking_value_from_Array_suucess_one, error_Workwide);
}
var obj_assets;

function _Offline_Assets_taking_value_from_Array_suucess_one(tx, results) {
	var _assets_offline = results.rows.item(0).assetsDetails;
	obj_assets = JSON.parse(_assets_offline);
	console.log(obj_assets);
}
/*==================================================================================================================*/
$("#myInputsss_offline").on("input", function(e) {
	var text = $(this).val();
	if(text.length >= 3) {
		_offline_autocomplete(text)
	}
	if(text.length < 3) {
		$("#suggestions_offline").html("");
	}
});
/*==================================================================================================================*/
function _offline_autocomplete(texts) {
	var sugList = $("#suggestions_offline");
	if(texts.length < 1) {
		sugList.html("");
		sugList.listview("refresh");
	} else {
		var str = "";
		console.log("asset length" + obj_assets.length);
		for(var k = 0; k < obj_assets.length; k++) {
			str += "<li style='padding:0 0 0 3%' onclick='click_for_list_offline(\"" + obj_assets[k].display_name + "\",\"" + obj_assets[k].display_name + "\");'>" + obj_assets[k].display_name + "</li>";
		}
		sugList.html(str);
		sugList.listview("refresh");
	}
}

function click_for_list_offline(values, description_offline) {
	$("#suggestions_offline").html("");
	document.getElementById("myInputsss_offline").value = "";
	document.getElementById("myInputsss_offline").value = values;
	document.getElementById("description_offline").value = description_offline;
	$("#suggestions_offline").listview("refresh");
	$("#main_button_upate_asset_offline").css("display", "block");
}
//function Update_assets_offline() {
//if (f == -1 || f == "-1") {
//$("#Assets_ul_offline").empty();
//
//}
//f++;
//var li = document.createElement("li");
//var inputValue = document.getElementById("myInputsss_offline").value;
//var Space = "Used: ";
//var Space_one = "Awaiting: ";
//var numberss = document.getElementById("myInput_number_offline").value;
//var description_offline = document.getElementById("description_offline").value;
//var numberss_one = document.getElementById("myInput_number_Awaiting_offline").value;
//var h1 = document.createElement("h4");
//var h2 = document.createElement("h6");
//var t = document.createTextNode(inputValue);
//var br2 = document.createElement("br");
//var br = document.createElement("br");
//var d = document.createTextNode(description_offline);
//var hr = document.createElement("hr");
//var y = document.createTextNode(numberss);
//var br1 = document.createElement("br");
//var z = document.createTextNode(Space);
//var a = document.createTextNode(numberss_one);
//var b = document.createTextNode(Space_one);
//assets[f] = inputValue;
//used[f] = numberss;
//await [f] = numberss_one;
//assetdescription[f]=description_offline;
//li.appendChild(h1);
//h1.appendChild(t);
//li.appendChild(h2);
//h2.appendChild(d);
//h2.appendChild(br);
//h2.appendChild(z);
//h2.appendChild(y);
//h2.appendChild(br1);
//h2.appendChild(b);
//h2.appendChild(a);
//li.appendChild(hr);
//
//if (inputValue == '') {
//showAlert("You must select something!", "WorkWide");
//} else if (numberss == 0 && numberss_one == 0) {
//showAlert("Count cannot be 0!", "WorkWide");
//} else {
//console.info(assets);
//console.info(used);
//console.info(await);
//
//document.getElementById("Assets_ul_offline").appendChild(li);
//}
//document.getElementById("myInputsss_offline").value = "";
//document.getElementById("myInput_number_offline").value = "0";
//document.getElementById("myInput_number_Awaiting_offline").value = "0";
//
//var span = document.createElement("SPAN");
//var txt = document.createTextNode("\u2296");
//span.className = "close"
//span.id = f;
//span.appendChild(txt);
//li.appendChild(span);
//
//}
function Update_assets_offline() {
	if(f == -1) {
		$("#Assets_ul_offline").empty();
	}
	var inputValue = document.getElementById("myInputsss_offline").value;
	var numberss = document.getElementById("myInput_number_offline").value;
	var description = document.getElementById("description_offline").value;
	var numberss_one = document.getElementById("myInput_number_Awaiting_offline").value;
	if(inputValue == '') {
		showAlert("You must select something!", "WorkWide");
	} else if(numberss == 0 && numberss_one == 0) {
		showAlert("Count cannot be 0!", "WorkWide");
	} else {
		console.info(assets);
		console.info(used);
		console.info(await);
		console.log(inputValue);
		if($.inArray(String(inputValue), assets) == -1) {
			f++;
			assets[f] = inputValue;
			used[f] = numberss;
			await [f] = numberss_one;
			assetdescription[f] = description;
			$("#Assets_ul_offline").append("<li class='textColor' style='border-radius:0px !important;'><a href='' style='border-bottom: 1px solid lightgray;'><h4>" + inputValue + "</h4><h6>" + description + "</h6><h6>Used: " + numberss + "</h6><h6>Awaiting: " + numberss_one + "</h6></a><a href='#' id='" + f + "' class='closeoffline' style='border-bottom: 1px solid lightgray;'></a></li>");
			document.getElementById("myInputsss_offline").value = "";
			document.getElementById("myInput_number_offline").value = "0";
			document.getElementById("myInput_number_Awaiting_offline").value = "0";
			$("#Assets_ul_offline").listview("refresh");
		} else {
			console.info(assets);
			console.info(used);
			console.info(await);
			console.log(inputValue);
			navigator.notification.confirm("This Asset Added already, confirm to add duplication", assetDuplication_offline, "WorkWide", ["Yes", "No"]);
			//showAlert("This Asset Added already, Please select another one.","WorkWide");
		}
	}
}

function assetDuplication_offline(buttonIndex) {
	if(buttonIndex == 1) {
		if(f == -1) {
			$("#Assets_ul_offline").empty();
		}
		var inputValue = document.getElementById("myInputsss_offline").value;
		var numberss = document.getElementById("myInput_number_offline").value;
		var description = document.getElementById("description_offline").value;
		var numberss_one = document.getElementById("myInput_number_Awaiting_offline").value;
		if(inputValue == '') {
			showAlert("You must select something!", "WorkWide");
		} else if(numberss == 0 && numberss_one == 0) {
			showAlert("Count cannot be 0!", "WorkWide");
		} else {
			console.info(assets);
			console.info(used);
			console.info(await);
			console.log(inputValue);
			f++;
			assets[f] = inputValue;
			used[f] = numberss;
			await [f] = numberss_one;
			assetdescription[f] = description;
			$("#Assets_ul_offline").append("<li class='textColor' style='border-radius:0px !important;'><a href='' style='border-bottom: 1px solid lightgray;'><h4>" + inputValue + "</h4><h6>" + description + "</h6><h6>Used: " + numberss + "</h6><h6>Awaiting: " + numberss_one + "</h6></a><a href='#' id='" + f + "' class='closeoffline' style='border-bottom: 1px solid lightgray;'></a></li>");
			document.getElementById("myInputsss_offline").value = "";
			document.getElementById("myInput_number_offline").value = "0";
			document.getElementById("myInput_number_Awaiting_offline").value = "0";
			$("#Assets_ul_offline").listview("refresh");
		}
	}
}
$(document).on('click', '.closeoffline', function() {
	var div = this.parentElement;
	div.style.display = "none";
	assets.splice(parseInt($(this).attr("id")), 1);
	used.splice(parseInt($(this).attr("id")), 1);
	await.splice(parseInt($(this).attr("id")), 1);
	assetdescription.splice(parseInt($(this).attr("id")), 1);
	console.info(assets);
	console.info(used);
	console.info(await);
});

function Update_allassets_offline() {
	navigator.notification.confirm("Confirm to Save Assets?", btnLabel_Assets_details_offline, "WorkWide", ["Yes", "No"]);
}
var quotedCSV_offlines;

function btnLabel_Assets_details_offline(buttonIndex) {
	if(buttonIndex == 1) {
		var data_asset = [];
		if(assets.length > 0) {
			for(i = 0; i < assets.length; i++) {
				var data_asset = {
					"ID": assets[i],
					"used": used[i],
					"awaiting": await [i],
					"description": assetdescription[i]
				};
				var newarray = datass.push(data_asset);
			}
			request_json = JSON.stringify(datass);
		} else {
			datass = [];
		}
		var optionTexts = [];
		$("#Assets_ul_offline li").each(function() {
			optionTexts.push($(this).text())
		});
		quotedCSV_offlines = '"' + optionTexts.join('", "') + '"';
		var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
		db.transaction(storing_data_to_local_db_for_Assets, error_Workwide);
	}
}
//storing_data_to_local_db_for_Assets
//function validate_Asset_selectall(){
//tx.executeSql('SELECT z_Assets_data FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], validate_asset_success, error_Workwide);
//}
//function validate_asset_success(tx,results){
//var _assets_validate_offline = results.rows.item(0).z_Assets_data;
//                         console.log("server"+results.rows.item(0).z_Assets_data);
//                         console.log("reques"+request_json)
//}
function storing_data_to_local_db_for_Assets(tx) {
	tx.executeSql("UPDATE Main_Database_Table SET z_Assets_data = '" + request_json + "' WHERE id = " + localStorage.getItem("offline_Accepted_task_id") + "");
	navigator.notification.alert('Updated', backNavigation, 'WorkWide', 'OK');
	$("#Assets_ul_offline").html("")
	datass = [];
	request_json = "";
}

function retain_Assets_offline() {
	var db = window.openDatabase("database_Workwide", "1.0", "database_Workwide_table", 2 * 1024 * 1024)
	db.transaction(retrieve_data_to_local_db_for_Assets, error_Workwide);
}

function retrieve_data_to_local_db_for_Assets(tx) {
	tx.executeSql('SELECT z_Assets_data FROM Main_Database_Table WHERE id = ' + localStorage.getItem("offline_Accepted_task_id") + '', [], _retrieve_Assets_taking_value_from_Array_suucess_one, error_Workwide);
}

function _retrieve_Assets_taking_value_from_Array_suucess_one(tx, results) {
	var _assets_offline = results.rows.item(0).z_Assets_data;
	var rassets = JSON.parse(_assets_offline);
	$("#Assets_ul_server_offline").html("");
	if(rassets == null) {} else {
		for(i = 0; i < Object.keys(rassets).length; i++) {
			if(rassets[i].ID != "undefined" || rassets[i].description != "undefined" || rassets[i].used != "undefined" || rassets[i].awaiting != "undefined") $("#Assets_ul_server_offline").append("<li data-icon='false' class='textColor' style='border-radius:0px !important;border-bottom: 1px solid lightgray;'><a href='#'><h4>" + rassets[i].ID + "</h4><h6>" + rassets[i].description + "</h6><h6>Used: " + rassets[i].used + "</h6><h6>Awaiting: " + rassets[i].awaiting + "</h6></a></li>");
		}
	}
	$("#Assets_ul_server_offline").listview("refresh");
}

function siganaturepageNavigation() {
	if(checkConnection()) {
		changePage("#Accepted_Start_work_view_tasklist_page", "slide", false);
	} else {
		changePage("#offline_direct_work_start", "slide", false);
	}
}