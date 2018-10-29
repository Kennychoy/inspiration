window.addEventListener("resize", () => {
	if(window.innerWidth < 768){
		document.querySelector(".navbar-expand-md").classList.add("navbar-dark");
	} else {
		document.querySelector(".navbar-expand-md").classList.remove("navbar-dark");
	}
});

window.addEventListener("load", () => {
	if(window.innerWidth < 768){
		document.querySelector(".navbar-expand-md").classList.add("navbar-dark");
	} else {
		document.querySelector(".navbar-expand-md").classList.remove("navbar-dark");
	}
});

$(".home-top-slick").slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: false,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false,
	fade: true,
	cssEase: 'linear'
});

$(".home-quote-carousel").slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: false,
	autoplay: false,
	autoplaySpeed: 3000,
	arrows: false
});

$(".client-carousel-wrapper").slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: false
});

function animateEl(el, key, value){
	if(el){
		if(el.getBoundingClientRect().top < window.innerHeight * .8){
			el.style[key] = value;
		}		
	};
}

// for home page counter
var counterOnce = false;

// for home skills' percentage
var percentOnce = false;


window.addEventListener("scroll", () => {
	
	// for home page counter
	if(!counterOnce && document.querySelector(".home-num") && document.querySelector(".home-num").getBoundingClientRect().top < (window.innerHeight * .8)){	
		Array.from(document.querySelectorAll(".num-num")).forEach( num => {			
			let target = Number(num.getAttribute("data-num"));
			let i = 0;
			let counter = setInterval(() => {
				num.innerHTML = i;
				i++;
				if(i === target + 1){
					clearInterval(counter);
					counterOnce = true;
				}
			}, 1);
		})
	}

	// for home skills' percentage
	if(!percentOnce && document.querySelector(".percent-box") && document.querySelector(".percent-box").getBoundingClientRect().top < window.innerHeight * .8){
		Array.from(document.querySelectorAll(".percent-box span")).forEach( span => {
			if(span.getBoundingClientRect().top > window.innerHeight * .8 && !percentOnce){
				let target = Number(span.getAttribute("data-percent"));
				let i = 0;
				let counter = setInterval( () => {
					span.innerHTML = i;
					i++;
					if(i === target){
						clearInterval(counter);
						percentOnce = true;
					}
				}, 50);
			}
		});		
	}
	
	// nav bar effect
	if(window.innerWidth > 768){
		if(window.scrollY > window.innerHeight / 2){
			document.querySelector("header nav").style.padding = "0 16px";
			document.querySelector("header").style.background = "#222";
		} else {
			document.querySelector("header nav").style.padding = "8px 16px";
			document.querySelector("header").style.background = "rgba(38, 38, 38, .5)"
		}
	}
	
	// home stuff effect
	Array.from(document.querySelectorAll(".stuff-icon")).forEach( icon => {
		animateEl(icon.querySelector("i"), "width", "68px");		
		animateEl(icon.querySelector("i"), "height", "68px");
		animateEl(icon.nextElementSibling, "transform", "translatey(0)");
		animateEl(icon.nextElementSibling, "opacity", 1);
	});
	
	// all the titles
	Array.from(document.querySelectorAll(".page-titles")).forEach( title => {
		animateEl(title, "opacity", 1);
		animateEl(title, "transform", "translateY(0)");
	})
	
	// skill boxes
	Array.from(document.querySelectorAll(".skills-boxes")).forEach( box => {
		animateEl(box, "transform", "translateX(0)");
	});
	
	// home about effect
	Array.from(document.querySelectorAll(".about-staff")).forEach( staff => {
		animateEl(staff, "transform", "translateY(0)");
	});
	
	// team card effect
	Array.from(document.querySelectorAll(".home-team .card")).forEach( card => {
		animateEl(card, "transform", "rotateY(0)");
	});
	
	// home examples effect
	Array.from(document.querySelectorAll(".home-examples img")).forEach( img => {
		animateEl(img, "width", "100%");
		animateEl(img, "height", "auto");
	});
	
	// home blog effect
	Array.from(document.querySelectorAll(".home-blog-single")).forEach( blog => {
		animateEl(blog, "transform", "rotateX(0)");
	});
	
	// home plan effect
	Array.from(document.querySelectorAll(".plan-wrapper")).forEach( plan => {
		animateEl(plan, "transform", "rotateZ(0)");
	});
	
	// footer effect
	if(document.querySelector("body").getBoundingClientRect().height > window.innerHeight){
		if(window.scrollY > window.innerHeight * .9){
			document.querySelector("footer").style.opacity = 1;
			document.querySelector("footer").style.display = "block";
		} else {
			document.querySelector("footer").style.opacity = 0;
			document.querySelector("footer").style.display = "none";
		}		
	} else {
		document.querySelector("footer").style.position = "fixed";
		document.querySelector("footer").style.opacity = 1;
		document.querySelector("footer").style.display = "block";
	}
});

window.addEventListener("load", () => {
	// for home page counter
	if(!counterOnce && document.querySelector(".home-num") && document.querySelector(".home-num").getBoundingClientRect().top < (window.innerHeight * .8)){	
		Array.from(document.querySelectorAll(".num-num")).forEach( num => {			
			let target = Number(num.getAttribute("data-num"));
			let i = 0;
			let counter = setInterval(() => {
				num.innerHTML = i;
				i++;
				if(i === target + 1){
					clearInterval(counter);
					counterOnce = true;
				}
			}, 1);
		})
	}

	// for home skills' percentage
	if(!percentOnce && document.querySelector(".percent-box") && document.querySelector(".percent-box").getBoundingClientRect().top < window.innerHeight * .8){
		Array.from(document.querySelectorAll(".percent-box span")).forEach( span => {
			if(span.getBoundingClientRect().top > window.innerHeight * .8 && !percentOnce){
				let target = Number(span.getAttribute("data-percent"));
				let i = 0;
				let counter = setInterval( () => {
					span.innerHTML = i;
					i++;
					if(i === target){
						clearInterval(counter);
						percentOnce = true;
					}
				}, 50);
			}
		});		
	}
	
	// nav bar effect
	if(window.innerWidth > 768){
		if(window.scrollY > window.innerHeight / 2){
			document.querySelector("header nav").style.padding = "0 16px";
			document.querySelector("header").style.background = "#222";
		} else {
			document.querySelector("header nav").style.padding = "8px 16px";
			document.querySelector("header").style.background = "rgba(38, 38, 38, .5)"
		}
	}
	
	// home stuff effect
	Array.from(document.querySelectorAll(".stuff-icon")).forEach( icon => {
		animateEl(icon.querySelector("i"), "width", "68px");		
		animateEl(icon.querySelector("i"), "height", "68px");
		animateEl(icon.nextElementSibling, "transform", "translatey(0)");
		animateEl(icon.nextElementSibling, "opacity", 1);
	});
	
	// all the titles
	Array.from(document.querySelectorAll(".page-titles")).forEach( title => {
		animateEl(title, "opacity", 1);
		animateEl(title, "transform", "translateY(0)");
	})
	
	// skill boxes
	Array.from(document.querySelectorAll(".skills-boxes")).forEach( box => {
		animateEl(box, "transform", "translateX(0)");
	});
	
	// home about effect
	Array.from(document.querySelectorAll(".about-staff")).forEach( staff => {
		animateEl(staff, "transform", "translateY(0)");
	});
	
	// team card effect
	Array.from(document.querySelectorAll(".home-team .card")).forEach( card => {
		animateEl(card, "transform", "rotateY(0)");
	});
	
	// home examples effect
	Array.from(document.querySelectorAll(".home-examples img")).forEach( img => {
		animateEl(img, "width", "100%");
		animateEl(img, "height", "auto");
	});
	
	// home blog effect
	Array.from(document.querySelectorAll(".home-blog-single")).forEach( blog => {
		animateEl(blog, "transform", "rotateX(0)");
	});
	
	// home plan effect
	Array.from(document.querySelectorAll(".plan-wrapper")).forEach( plan => {
		animateEl(plan, "transform", "rotateZ(0)");
	});
	
	// footer effect
	if(document.querySelector("body").getBoundingClientRect().height > window.innerHeight){
		if(window.scrollY > window.innerHeight * .9){
			document.querySelector("footer").style.opacity = 1;
			document.querySelector("footer").style.display = "block";
		} else {
			document.querySelector("footer").style.opacity = 0;
			document.querySelector("footer").style.display = "none";
		}		
	} else {
		document.querySelector("footer").style.position = "fixed";
		document.querySelector("footer").style.opacity = 1;
		document.querySelector("footer").style.display = "block";
	}
});

function myMap() {
	if(document.querySelector(".home-map")){
		var mapProp= {
			center:new google.maps.LatLng(51.508742,-0.120850),
			zoom:5,
		};
		var marker = new google.maps.Marker({position: mapProp.center, animation:google.maps.Animation.BOUNCE});
		var map=new google.maps.Map(document.querySelector(".home-map"),mapProp);
		marker.setMap(map);
	}
}

document.querySelector(".footer-gotop").addEventListener("click", () => {    
	$('html, body').animate({scrollTop:0}, 'slow');
});