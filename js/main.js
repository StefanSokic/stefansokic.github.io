
//If on mobile 
if ($(window).width() < 797) {
 	$('.preheader').remove();
 	$('.navbar').remove();
 	$('.header').css("height", "680px")
 	$('#stefan-left').remove();
 	$('.mobile-header').fadeIn(2000)
	$('#about').css("margin-top", "20px");
	$('#click').fadeIn('fast');
	$('#face').css("margin-left", "5px");
	$('.social').css("margin-bottom", "30px");
	$('.my-github').css("margin-left", "-10px");
	$('.my-blog').css("margin-left", "1px");
	$('.my-linkedin').css("margin-left", "1px");
	$('#row2').css("margin-top", "0px");
	$('.projects').css("margin-left", "15px");
	$('.contact').remove();
	$('.carl').css("padding-bottom", "0px");
	$('.footer img').fadeIn('fast');
}

$(document).ready(function() {
	$('#headertext h1').delay(7000).fadeIn(2000);
	$('#headertext h3').delay(8000).fadeIn(2000);
	$('#we').fadeIn(1000).delay(3000).fadeOut(1000);
	$('#are').delay(1000).fadeIn(1000).delay(2000).fadeOut(1000);
	$('#here').delay(2000).fadeIn(1000).delay(1000).fadeOut(1000);
	$('#arrow').delay(3000).fadeIn(1000).fadeOut(1000);
	$('#proj1').on("mouseover", MouseOver);
	$('#proj1').on("mouseleave", MouseLeave); 
	$('#proj2').on("mouseover", MouseOver2);
	$('#proj2').on("mouseleave", MouseLeave2); 
	$('#proj3').on("mouseover", MouseOver3);
	$('#proj3').on("mouseleave", MouseLeave3); 
	$('#proj4').on("mouseover", MouseOver4);
	$('#proj4').on("mouseleave", MouseLeave4);
	$('#proj5').on("mouseover", MouseOver5);
	$('#proj5').on("mouseleave", MouseLeave5);
	$('#proj6').on("mouseover", MouseOver6);
	$('#proj6').on("mouseleave", MouseLeave6);
	$('#proj7').on("mouseover", MouseOver7);
	$('#proj7').on("mouseleave", MouseLeave7);
	$('#proj8').on("mouseover", MouseOver8);
	$('#proj8').on("mouseleave", MouseLeave8);
	$('.footer p').on('mouseover', MouseOverFooter);
	});

	function MouseOver(evt) {
		$('.over1').fadeIn(1000);
	 	$('#proj1 img').css("-webkit-filter", "blur(10px)");
		}

	function MouseLeave(evt) {
		$('.over1').fadeOut(1000);
	 	$('#proj1 img').css("-webkit-filter", "none");
		}

	function MouseOver2(evt) {
 		$('.over2').fadeIn(1000);
 		$('#proj2 img').css("-webkit-filter", "blur(5px)");
		}

	function MouseLeave2(evt) {
		$('.over2').fadeOut(1000);
		$('#proj2 img').css("-webkit-filter", "none");
		}
	function MouseOver3(evt) {
 		$('.over3').fadeIn(1000);
 		$('#proj3 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave3(evt) {
		$('.over3').fadeOut(1000);
		$('#proj3 img').css("-webkit-filter", "none");
		}
	function MouseOver4(evt) {
 		$('.over4').fadeIn(1000);
 		$('#proj4 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave4(evt) {
		$('.over4').fadeOut(1000);
		$('#proj4 img').css("-webkit-filter", "none");
		}
	function MouseOver5(evt) {
 		$('.over5').fadeIn(1000);
 		$('#proj5 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave5(evt) {
		$('.over5').fadeOut(1000);
		$('#proj5 img').css("-webkit-filter", "none");
		}
	function MouseOver6(evt) {
 		$('.over6').fadeIn(1000);
 		$('#proj6 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave6(evt) {
		$('.over6').fadeOut(1000);
		$('#proj6 img').css("-webkit-filter", "none");
		}
	function MouseOver7(evt) {
 		$('.over7').fadeIn(1000);
 		$('#proj7 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave7(evt) {
		$('.over7').fadeOut(1000);
		$('#proj7 img').css("-webkit-filter", "none");
		}
	function MouseOver8(evt) {
 		$('.over8').fadeIn(1000);
 		$('#proj8 img').css("-webkit-filter", "blur(10px)");
		}
	function MouseLeave8(evt) {
		$('.over8').fadeOut(1000);
		$('#proj8 img').css("-webkit-filter", "none");
		}
	function MouseOverFooter(evt) {
		$(".footer img").fadeIn(1000);
		}
