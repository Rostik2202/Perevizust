jQuery(document).ready(function ($) {

	$(".tablesorter").each(function () {
		$(this).tablesorter({

		});

	})

	$('.autocomplete').each(function () {
		var el = $(this);
		var options = {
			url: el.attr('data-autocomplete') + ".json",
			getValue: "name",

			list: {
				onShowListEvent: function () {
					el.parents('.easy-autocomplete').addClass('activated');
				},
				onHideListEvent: function () {
					el.parents('.easy-autocomplete').removeClass('activated');
				},
				match: {
					enabled: true
				}
			},

			theme: "square"
		};

		$(this).easyAutocomplete(options);
	})


	$('.table tbody td').each(function () {
		$(this).wrapInner('<div class="td">');
		$(this).prepend('<div class="th">' + $(this).parents('table').find('th').eq($(this).parents('tr').find('td').index($(this))).text() + '</div>');
	})

	$('body').on('click', '.tablesorter .th', function () {
		var index = $(this).parents('tr').find('td').index($(this).parents('td'));
		var th = $(this).parents('.tablesorter').find('thead th').eq(index);
		var el = $(this);
		th.click();
		setTimeout(function () {
			el.parents('.tablesorter').find('.th').attr('class', 'th');
			if (th.hasClass('tablesorter-headerAsc')) {
				el.parents('tbody').find('tr').each(function () {
					$(this).find('td').eq(index).find('.th').attr('class', 'th tablesorter-headerAsc');
				})
			}
			if (th.hasClass('tablesorter-headerDesc')) {
				el.parents('tbody').find('tr').each(function () {
					$(this).find('td').eq(index).find('.th').attr('class', 'th tablesorter-headerDesc');
				})
			}
		}, 100)
	})

	$('body').append('<div class="menu-btn"><span></span><span></span><span></span></div>');

	$('body').on('click', '.menu-btn', function () {
		$(this).toggleClass('btnActive');
		if ($(this).hasClass('btnActive')) {
			$('.header-menu-wrapper').addClass('menuActive')
			$('body').addClass('mobileOpen');
			$('.mobileOpen').append('<div class="site-overlay">');
		} else {
			$('.header-menu-wrapper').removeClass('menuActive')
			$('body').removeClass('mobileOpen');
			$('.site-overlay').remove();
		}
	})

	$('body').on('click touchstart', '.site-overlay', function () {
		$('.header-menu-wrapper').removeClass('menuActive')
		$('.site-overlay').remove();
		$('.menu-btn').removeClass('btnActive');
	})

	$('.scrolling').each(function () {
		$(this).mCustomScrollbar();
	})

	$('body').append('<div class="header-menu-wrapper">	<div class="order-5"></div>	<div class="order-4"></div>	<div class="order-1"></div>	<div class="order-2"></div>	<div class="order-7"></div>	<div class="order-8"></div>	<div class="order-9"></div>	<div class="order-10"></div>	<div class="order-6"></div></div>');

	adaptive();

	function adaptive() {
		if ($(window).width() < 1401) {
			$('.header .btn-client').appendTo('.header-menu-wrapper .order-1');
			$('.header .btn-track').appendTo('.header-menu-wrapper .order-6');
			$('.header .btn-outline').appendTo('.header-menu-wrapper .order-10');
		} else {
			$('.header-menu-wrapper .btn-client').appendTo('.header .order-1');
			$('.header-menu-wrapper .btn-track').appendTo('.header .order-6');
			$('.header-menu-wrapper .btn-outline').appendTo('.header .order-10');
		}
		if ($(window).width() < 1150) {
			$('.header .ballance').appendTo('.header-menu-wrapper .order-9');
		} else {
			$('.header-menu-wrapper .ballance').appendTo('.header .order-9');
		}
		if ($(window).width() < 1030) {
			$('.header .btn-driver').appendTo('.header-menu-wrapper .order-2');
		} else {
			$('.header-menu-wrapper .btn-driver').appendTo('.header .order-2');
		}
		if ($(window).width() < 769) {
			$('.header .btn-order').appendTo('.header-menu-wrapper .order-4');

		} else {
			$('.header-menu-wrapper .btn-order').appendTo('.header .order-4');
		}
		if ($(window).width() < 640) {
			$('.header .dropdown2').appendTo('.header-menu-wrapper .order-7');
			//$('.header .btn-reg span').hide();
			$('.header .notification').appendTo('.header-menu-wrapper .order-8');
		} else {
			$('.header-menu-wrapper .dropdown2').appendTo('.header .order-7');
			//$('.header .btn-reg span').css("display", 'inline');
			$('.header-menu-wrapper .notification').appendTo('.header .order-8');
		}
		if ($(window).width() < 769) {
			$('.header .btn-reg').appendTo('.header-menu-wrapper .order-5');
		} else {
			$('.header-menu-wrapper .btn-reg').appendTo('.header .order-5');
		}
		if ($(window).width() < 480) {
			$('.header .city-link').prependTo('.header-menu-wrapper');
		} else {
			$('.header-menu-wrapper .city-link').insertAfter('.header .logo');
		}
	}
	$(window).resize(function () {
		adaptive();
	})

	$('.touchevents .notification-in').on('touchstart', function () {
		$(this).parents('.notification').toggleClass('open');
	})
	$('.touchevents .notification .notification-close').on('touchstart', function () {
		$('.notification').removeClass('open');
	})

	$('.raty').each(function () {
		var score = $(this).attr('data-score'),
			readonly = $(this).attr('data-readonly')
		$(this).append("<span class='score'>" + score + "</span>");

		if ($(this).parents('.addraty').hasClass("addraty")) {
			el = $(this).parents('.addraty').find('.raty-score');
			$(this).raty({
				numberMax: 100,
				hints: ['(Очень плохо ) <span class="span">1\\5</span>', '(Плохо) <span class="span">2\\5</span>', '(Нормально) <span class="span">3\\5</span>', '(Хорошо) <span class="span">4\\5</span>', '(Отлично) <span class="span">5\\5</span>'],
				/*starHalf    : 'img/star-half.png',*/
				starOff: 'img/raty-off.svg',
				starOn: 'img/raty-on.svg',
				target: '.raty-score',
				targetKeep: true
			})
			$('.addraty').find('input').addClass('form-control').attr('required', '').attr('type', 'text');
		} else {
			$(this).raty({
				numberMax: 100,
				score: score,
				/*starHalf    : 'img/star-half.png',*/
				starOff: 'img/raty-off.svg',
				starOn: 'img/raty-on.svg',
				readOnly: readonly
			})
		}

	})


	$('.lk-left .profile-avatar input[type=file]').each(function () {
		$(this).fileinput({
			//uploadUrl: "/ajax/uploadDetailPic.php?salon_id=" + salon_id,
			allowedFileExtensions: ["jpg", "png", "gif"],
			minImageWidth: 245,
			minImageHeight: 245,
			language: "ru",
			browseLabel: 'Изменить фото',
			buttonLabelClass: 'caption'
		});
	})

	$('.images-thumbs .thumb').on('click', function (e) {
		$(this).parents('.images-thumbs').find('.thumb').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	})

	/*tabs*/
	$('.tabs-wrapper').each(function () {
		$(this).find('.tabs-box').css({
			left: -9999,
			position: 'absolute'
		})
	})


	setTimeout(function () {
		$('.tabs-box').each(function () {
			$(this).width($(this).parents('.tabs-wrapper').width());
		})
	}, 600)


	$(window).resize(function () {
		$('.tabs-box').each(function () {
			$(this).width($(this).parents('.tabs-wrapper').width());
		})
	})
	$('.modal .tabs-box').each(function () {
		$(this).css({
			'width': 'auto'
		});
	})

	$('.tabs li.active a').each(function () {
		var tabId = $(this).attr('href') + '_';
		$(tabId).css({
			left: 0,
			position: 'relative'
		})
	})

	$('.tabs li').click(function (e) {
		var menuActive = $(this).find('a').attr('href') + '_';
		menuActive = menuActive.substr(menuActive.indexOf('#'));
		$(this).parents('.tabs-wrapper').find('.tabs-box').css({
			left: -9999,
			position: 'absolute'

		});
		$(this).parents('.tabs-wrapper').find('.tabs li').removeClass('active');
		$(this).addClass('active');
		$(menuActive).css({
			left: 0,
			position: 'relative'
		})
		if (!$(this).parents('.tabs').hasClass('tabs-links')) {
			e.preventDefault();
		}
	})

	$('.linkPassword').on('click', function () {
		$('#modalEnter').modal('hide');
		setTimeout(function () {
			$('#modalPassword').modal('show');
		}, 100)
	})

	$('#modalPassword .black-link').on('click', function () {
		$('#modalPassword').modal('hide');
		setTimeout(function () {
			$('#modalEnter').modal('show');
		}, 100)
	})

	$('.datepicker input').datepicker({
		'dateFormat': 'dd.mm.yy',
		changeMonth: true,
		changeYear: true
	});


	$('body').on('click', '.toRegModal', function () {
		$('.modal').modal('hide');
		$('.modal .step-wrapper').each(function () {
			$(this).find('.step').removeClass('active');
			$(this).find('.step').eq(0).addClass('active');
		})
		setTimeout(function () {
			$('#modalReg').modal('show');
		}, 100)
	})

	$('.add-phone').on('click', function () {
		$('<div class="form-group"><input type="text" class="form-control phonemask" placeholder="+7 (___)-___-__-__" required="" pattern="^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$"></div>').insertAfter($(this).prev());
		$('.phonemask').inputmask('+7 (999)-999-99-99');
	})

	//$('#modalPhotoDogovor').modal('show');


	$('body').on('click', '.payments li', function () {
		$(this).parents('.payments').find('li').removeClass('active');
		$(this).addClass('active');
	})

	$('#modalCity').on('show.bs.modal', function () {
		$('body').addClass("backdropStyle1");
		if ($(window).width() < 767) {
			$('#modalCity .city-input .form-control.autocomplete').attr('placeholder', 'Введите город');
		} else {
			$('#modalCity .city-input .form-control.autocomplete').attr('placeholder', 'Введите название своего города');
		}
	});

	$('#modalCity').on('hidden.bs.modal', function () {
		$('body').removeClass("backdropStyle1");
	});

	$('#modalCity .city-list li').on('click', function () {
		$('.city-link .span span').text($(this).text());
		$('#modalCity .city-list li').removeClass('active');
		$(this).addClass('active');
	})
	$('.phonemask').inputmask('+7 (999)-999-99-99');

	$('[data-toggle="tooltip"]').tooltip({
		delay: { "show": 100 },
		boundary: 'window'
	});

	$('.modal').on('shown.bs.modal', function () {
		$('.tabs-box').each(function () {
			$(this).width($(this).parents('.tabs-wrapper').width());
		})
	})

	$(window).resize(function () {
		$('.photos-error-popup').removeClass('show');
	})

	$('.photos-error-link').on('click', function () {
		popoverClick($(this));
	})
	function popoverClick(el) {
		var popup = el.parents('.modal').find('.photos-error-popup');

		popup.toggleClass('show');

		$('.photos-error-popup').css({
			left: el.offset().left - el.parents('.photos-left').offset().left + el.width() / 2 + parseInt(el.css('padding-left')),
			top: el.offset().top - el.parents('.modal-content').offset().top,
			'margin-top': -popup.height() - 70
		})
	};

	$('body').on('click', function (e) {
		if (!$(e.target).hasClass("photos-error-link")) {
			if (!$(e.target).closest('.photos-error-popup').hasClass('photos-error-popup')) {
				$('.photos-error-popup').removeClass('show');
			}
		}
	})


	//при нажатии на кнопку с id="save"
	$('.modal .submit, .form .submit').click(function () {
		//переменная formValid
		var formValid = true;
		//перебрать все элементы управления input
		$(this).parents('.form').find('.form-control').each(function () {
			//найти предков, которые имеют класс .form-group, для установления success/error
			var formGroup = $(this).parents('.form-group');
			//для валидации данных используем HTML5 функцию checkValidity
			if (this.checkValidity()) {
				//добавить к formGroup класс .has-success, удалить has-error
				formGroup.addClass('has-success').removeClass('has-error');
				//добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
			} else {
				//добавить к formGroup класс .has-error, удалить .has-success
				formGroup.addClass('has-error').removeClass('has-success');
				//отметить форму как невалидную
				formValid = false;
			}
		});
		$(this).parents('.form').find('.dropdown').each(function () {
			//найти предков, которые имеют класс .form-group, для установления success/error
			var formGroup = $(this).parents('.form-group');
			if ($(this).attr('required') == 'required') {
				if ($(this).find('.dropdown-item.active').hasClass('active')) {
					//добавить к formGroup класс .has-success, удалить has-error
					formGroup.addClass('has-success').removeClass('has-error');
					//добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
				} else {
					//добавить к formGroup класс .has-error, удалить .has-success
					formGroup.addClass('has-error').removeClass('has-success');
					//отметить форму как невалидную
					formValid = false;
				}
			}
		});
		if ($(this).parents('.step-wrapper').hasClass('step-wrapper')) {
			var steps = $(this).parents('.step-wrapper');
			if (formValid) {
				$(this).parents('.step').removeClass('active');
				$(this).parents('.step').next().addClass('active');
				if ($(this).parents('.step').hasClass('step-last')) {

					$('.modal').modal('hide');
					setTimeout(function () {
						if (steps.parents('.modal').attr('id') == 'modalRegYur') {
							$('#modalRegLast').modal('show');
							$('#modalRegLast').find('.tabs li').eq(1).click();
						}
						if (steps.parents('.modal').attr('id') == 'modalRegVoditelStep2') {
							$('#modalRegLast3').modal('show');
						}
					}, 100)
				}
			}
		} else if (formValid) {
			if ($(this).parents('.tabs-box').attr('id') == 'reg2_' || $(this).parents('.tabs-box').attr('id') == 'reg4_') {
				$('.modal').modal('hide');
				setTimeout(function () {
					$('#modalRegYur').modal('show');
				}, 100)
			}
			if ($(this).parents('.tabs-box').attr('id') == 'reg3_') {
				$('.modal').modal('hide');
				setTimeout(function () {
					$('#modalRegVoditelStep2').modal('show');
				}, 100)
			}
			if ($(this).parents('.tabs-box').attr('id') == 'reg1_') {
				$('.modal').modal('hide');
				setTimeout(function () {
					$('#modalRegLast2').modal('show');
				}, 100)
			}
			//скрыть модальное окно
			$('.modal').modal('hide');
		}
		if (formValid) {

			if ($(this).parents('.lk-edit-btns').hasClass('lk-edit-btns')) {

				$('.lk-detailed').removeClass('lk-edit');
				$('.lk-detailed .form-control').attr('readonly', 'true');
				$('.lk-columns .form-control').each(function () {
					$(this).parents('.lk-edit-wrapper').find('.lk-element').text($(this).val());
				});
			}
			if ($(this).parents('#modalOtziv').hasClass('modal')) {
				$('#modalOtziv').modal('hide');
				setTimeout(function () {
					$('#modalThanksOtziv').modal('show');
					$('#modalThanksOtziv .addraty-wrap .addraty').html($('#modalOtziv .addraty').html());
				}, 100)
			}
		}

	});


	$(document).on('change', '.btn-file :file', function () {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});

	$(document).ready(function () {
		$('.btn-file :file').on('fileselect', function (event, numFiles, label) {
			console.log("teste");
			var input_label = $(this).closest('.input-group').find('.file-input-label'),
				log = numFiles > 1 ? numFiles + ' files selected' : label;

			if (input_label.length) {
				input_label.text(log);
			} else {
				//if( log ) alert(log);
			}
		});
	});

	$('.multiple').each(function () {
		var el = $(this);
		$(this).multiselect({
			onChange: function (option, checked, select) {
				//alert('Changed option ' + $(option).val() + '.');
				//select.find('.multiselect-selected-text');
				var list = '';
				el.parents('.multiselect-native-select').find('.dropdown-menu .active').each(function () {
					list = list + '<span class="span"><span>' + $(this).text() + '</span></span>';
				})

				setTimeout(function () {
					el.parents('.multiselect-native-select').find('.multiselect-selected-text').html(list);
					el.parents('.multiselect-native-select').find('.multiselect-selected-text').css({
						opacity: 1
					})
				}, 5)
			},
			onInitialized: function (select, container) {
				var list = '';
				el.parents('.multiselect-native-select').find('.dropdown-menu .active').each(function () {
					list = list + '<span class="span"><span>' + $(this).text() + '</span></span>';
				})
				el.parents('.multiselect-native-select').find('.multiselect-selected-text').css({
					opacity: 0
				})
				setTimeout(function () {
					el.parents('.multiselect-native-select').find('.multiselect-selected-text').html(list);
					el.parents('.multiselect-native-select').find('.multiselect-selected-text').css({
						opacity: 1
					})
					el.parents('.multiselect-native-select').find('.dropdown-menu').mCustomScrollbar();
				}, 1000)
			}
		});
	})


	/*$(window).scroll(function(){
		$('.lk-top').each(function(){
			if ($(document).scrollTop() > ($('.lk-top').offset().top)){
				$('body').addClass('lkTopFixed');
			}else{
				$('body').removeClass('lkTopFixed');
			}
		})
	})*/

	$(window).scroll(function () {
		$('.order-block-total').each(function () {
			if (($(document).scrollTop() + $(window).height()) > $('.footer2').offset().top) {
				$('.order-block-bottom').addClass('bottom');
			} else {
				$('.order-block-bottom').removeClass('bottom');
			}
		})
	})

	$('.dropdown-link-wrapper .btn-add').on('click', function (e) {
		$('<div class="lk-path second"><div class="geo-step"><div class="flex"><div class="num">' + parseInt($('.lk-path').length + 1) + '</div><div class="h4">Куда</div></div><div class="flex"><div class="label">Расстояние</div><div class="rounded distance">20км.</div><div class="remove"></div></div></div><div class="row"><div class="col col1 form-group"><label class="label">Город</label><input type="text" placeholder="Санкт-Петербург" required="" class="form-control"></div><div class="col  form-group"><label class="label">Улица, дом</label><input type="text"  required="" placeholder="" class="form-control"></div></div></div>').insertBefore($('.lk-path-add'));
		$('.order-block > .col').eq(1).find('.geo-step .num').text(parseInt($('.lk-path').length + 1));

		$('.lk-path').removeClass('last');
		$('.lk-path').eq($('.lk-path').length - 1).addClass('last');
		e.preventDefault();
	})

	$('body').on('click', '.lk-path .remove', function () {
		$(this).parents('.lk-path').remove();
		$('.lk-path').removeClass('last');
		$('.lk-path').eq($('.lk-path').length - 1).addClass('last');
		$('.order-block > .col').eq(1).find('.geo-step .num').text(parseInt($('.lk-path').length + 1));
	})

	$('body').on('click', '.item-sub > a', function (e) {
		e.preventDefault();
	})

	$('body').on('click', '.dropdown-item', function (e) {
		if (!$(this).parents('.dropdown').hasClass('nav')) {
			$(this).parents('.dropdown').find('.dropdown-toggle .caption').html($(this).html());
			$(this).parents('.dropdown').find('.dropdown-item').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		}
	})
	$('.dropdown-menu').each(function () {
		if ($(this).height() > 250) {
			$(this).height(250);
			$(this).mCustomScrollbar();
		}
	})

	$('body').on('click', '.btn-edit', function (e) {
		$('.lk-columns').addClass('lk-edit');
		$('.lk-edit .form-control').attr('readonly', false);
		e.preventDefault();
		$('.lk-edit .lk-element').each(function () {
			$(this).parents('.lk-edit-wrapper').find('.form-control').val($(this).text());
		})
	})



	$('.lk-columns .lk-element').each(function () {
		$(this).text($(this).parents('.lk-edit-wrapper').find('.form-control').val());
	})

	$('.textarea-resize').on('keyup', function (event) {
		var text = $(this).parents('.textarea-wrap').find('.textarea-text');
		var str = '';
		/*if (event.keyCode == 13){
			str = text.html().substr(0, $(this).get(0).selectionStart) + '<br>' + text.html().substr($(this).get(0).selectionStart, text.html().length);

			text.html(str);
		}else{
			text.html($(this).val());
		}*/
		text.html($(this).val());
		$(this).height(text.height());
	})

	$('.lk-edit-btns .btn-grey').on('click', function (e) {
		$('.lk-detailed').removeClass('lk-edit');
		$('.lk-detailed .form-control').attr('readonly', 'true');
		$('.lk-columns .form-control').each(function () {
			$(this).val($(this).parents('.lk-edit-wrapper').find('.lk-element').text());
		});
		e.preventDefault();
	})


	textareaInit();

	function textareaInit() {
		setTimeout(function () {
			$('.textarea-wrap .textarea-resize').each(function () {
				var text = $(this).parents('.textarea-wrap').find('.textarea-text');
				text.text($(this).val())
				text.width($(this).width());
				$(this).height(text.height());
			})
		}, 100)
	}

	$(window).resize(function () {
		textareaInit();
	})


	$('.countdown').each(function () {
		$(this).timeTo(new Date($(this).attr('data-date')));
	})

	$('.tablesorter + .pagination-wrap .link-all').click(function (e) {
		var checkAll = $(this).find('input');
		$(this).parents('.pagination-wrap').parent().find('.tablesorter').find('.checkbox3 input').each(function () {
			$(this).prop('checked', checkAll.prop('checked'));
		})
	})

	$('.promocod-wrapper .promocod').on('click', function (e) {
		$(this).parents('.promocod-wrapper').addClass('active');
		e.preventDefault();
	})

	if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
		$('html').addClass('safari');
	}


});


$(function () {
	let sliderOne = function () {
		$('.reviews__inner').slick({
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	};
	$(window).on('load resize', function () {
		var withWindow = window.innerWidth;
		if (withWindow < 769) {
			sliderOne();
		} else {
			$('.reviews__inner').slick('unslick');
		}
	});
});




$(function () {

	$('.toggle').click(function (e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.next().hasClass('show')) {
			$this.next().removeClass('show');
			$this.next().slideUp(350);
		} else {
			$this.parent().parent().find('li .questions__list-inner').removeClass('show');
			$this.parent().parent().find('li .questions__list-inner').slideUp(350);
			$this.next().toggleClass('show');
			$this.next().slideToggle(350);
		}
	});

	// $(".questions__list-wrapper .questions__list-title").on('click', function (e) {
	// 	e.preventDefault();
	// 	$(".questions__list-title").removeClass('questions__list-title--active');
	// 	$(this).addClass('questions__list-title--active');
	// })

	// $('.promocod-wrapper .promocod').on('click', function (e) {
	// 	$(this).parents('.promocod-wrapper').addClass('active');
	// 	e.preventDefault();
	// })

	// $('.questions__list').on('click', function () {
	// 	$('.questions__list-title').toggleClass('questions__list-title--active');
	// });

	var acc = document.getElementsByClassName("questions__list-title");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
			this.classList.toggle("active");

		});
	}

$(document).ready(function () {
	$('.questions__list-title').click(function () {
		$(this).next('.questions__answer').slideToggle();
	});
});


});











