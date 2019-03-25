/* ↓↓↓ BEM-blocks ↓↓↓ */
/* ↓↓↓ BEM-block: simple-switcher ↓↓↓ */
var simpleSwitcherToggle = 'demo';
$('.simple-switcher__thumb').click(function () {
    if (simpleSwitcherToggle == 'demo') {
        $('.simple-switcher__thumb').css({ 'transition': '.2s', 'left': '35px' });
        simpleSwitcherToggle = 'real'

        $('.central-part__account-type span').text('Real');

        return
    }
    if (simpleSwitcherToggle == 'real') {
        $('.simple-switcher__thumb').css({ 'transition': '.2s', 'left': '0px' });
        simpleSwitcherToggle = 'demo'

        $('.central-part__account-type span').text('Demo');

        return
    }
});
/* ↑↑↑ /BEM-block: simple-switcher ↑↑↑ */

/* ↓↓↓ BEM-block: menu-btn ↓↓↓ */
var isMenuOpen;
var isClickAble = true;
$('.menu-btn').click(function () {
    toggleBtn();
});

$(document).click(function (e) {
    if (e.target.className != 'menu-btn' && isMenuOpen == true) {
        toggleBtn();
    }
});

function toggleBtn() {
    if (isClickAble) {        //блокування натискання кнопки частіше, ніж 0,5с
        isClickAble = false;
        setTimeout(function () {
            isClickAble = true;
        }, 500);

        $('.menu-btn').click = null;

        if (!isMenuOpen) {
            $('.menu-btn__1-line').css({ 'transition': '.5s', 'top': '9px' });
            $('.menu-btn__3-line').css({ 'transition': '.5s', 'top': '9px' });
            $('.menu-btn__2-line').css({ 'transition': '.5s', 'opacity': '0' });
            setTimeout(function () {
                $('.menu-btn__1-line').css({ 'transition': '.5s', 'transform': 'rotate(45deg)' });
                $('.menu-btn__3-line').css({ 'transition': '.5s', 'transform': 'rotate(-45deg)' });
            }, 500);
            isMenuOpen = true;

            toggleMenu(true);
            return
        }
        if (isMenuOpen) {
            $('.menu-btn__1-line').css({ 'transition': '.5s', 'transform': 'rotate(0deg)' });
            $('.menu-btn__3-line').css({ 'transition': '.5s', 'transform': 'rotate(0deg)' });
            $('.menu-btn__2-line').css({ 'transition-delay': '.5s', 'transition-duration': '.5s', 'opacity': '1' });
            setTimeout(function () {
                $('.menu-btn__1-line').css({ 'transition-duration': '.5s', 'top': '0px' });
                $('.menu-btn__3-line').css({ 'transition-duration': '.5s', 'top': '18px' });
            }, 500);
            isMenuOpen = false;

            toggleMenu(false);
            return
        }
    }
}

function toggleMenu(arg) {
    var arrOfLinks = $('.menu-list-a');

    if (arg == true) {
        $('.menu').css({ 'border-width': '1px' })
            .css({ 'transition': '.5s', 'height': '182px' });

        setTimeout(function () {
            var temp1 = 0;
            var temp2 = '0s';
            for (var i = 0; i < arrOfLinks.length; i++) {
                $(arrOfLinks[i]).css({ 'transition': '.2s', 'transition-delay': temp2, 'left': '0%' });
                temp1 += 0.1;
                temp2 = temp1 + 's';
            }
        }, 500);
    }
    if (arg == false) {
        var temp1 = 0;
        var temp2 = '0s';
        for (var i = 0; i < arrOfLinks.length; i++) {
            $(arrOfLinks[i]).css({ 'transition': '.2s', 'transition-delay': temp2, 'left': '100%' });
            temp1 += 0.1;
            temp2 = temp1 + 's';
        }
        setTimeout(function () {
            $('.menu').css({ 'border-width': '0px' })
                .css({ 'transition': '.5s', 'height': '0px' });
        }, 600);
    }
};
/* ↑↑↑ /BEM-block: menu-btn ↑↑↑ */

/* ↓↓↓ BEM-block: language-switcher ↓↓↓ */
var isLanguageSwitcherOpen = false;
var isLanguageSwitcherOpen2 = false;
var selectedLanguage;
$('.language-switcher__btn').click(function () {
    if (isLanguageSwitcherOpen == false) {
        $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '300%', 'z-index': '8888' });
        isLanguageSwitcherOpen = true;
        return
    }

    $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '100%', 'z-index': '8888' });
    isLanguageSwitcherOpen = false;
    return
});

$('.language-switcher__flag-en').click(function () {
    if (selectedLanguage == 'en' && isLanguageSwitcherOpen2 == false) {
        $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '200%', 'z-index': '8888' });
        $('.language-switcher__flag-ru').css({ 'display': 'block', 'z-index': '8888' });
        isLanguageSwitcherOpen2 = true;
        return
    }
    if (isLanguageSwitcherOpen2 == true) {
        $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '100%', 'z-index': '8888' });
        $('.language-switcher__flag-ru').css({ 'display': 'none' });
        isLanguageSwitcherOpen2 = false;
        return
    }
    $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '100%', 'z-index': '8888' });
    $('.language-switcher__btn').css({ 'display': 'none' });
    $('.language-switcher__flag-ru').css({ 'display': 'none' });
    isLanguageSwitcherOpen = false;
    selectedLanguage = 'en';
});

$('.language-switcher__flag-ru').click(function () {
    if (selectedLanguage == 'ru' && isLanguageSwitcherOpen2 == false) {
        $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '200%', 'z-index': '8888' });
        $('.language-switcher__flag-en').css({ 'display': 'block' });
        isLanguageSwitcherOpen2 = true;
        return
    }
    if (isLanguageSwitcherOpen2 == true) {
        $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '100%', 'z-index': '8888' });
        $('.language-switcher__flag-en').css({ 'display': 'none' });
        isLanguageSwitcherOpen2 = false;
        return
    }
    $('.language-switcher__flag-container').css({ 'transition': 'height .5s', 'height': '100%', 'z-index': '8888' });
    $('.language-switcher__btn').css({ 'display': 'none' });
    $('.language-switcher__flag-en').css({ 'display': 'none' });
    isLanguageSwitcherOpen = false;
    selectedLanguage = 'ru';
});
/* ↑↑↑ /BEM-block: language-switcher ↑↑↑ */

/* ↓↓↓ BEM-block: message-to-mentor ↓↓↓ */
// open
$('.call-us-btn').click(function () {

    // clear previous values
    $('.message-to-mentor__subject').val('');
    $('.message-to-mentor__text').val('');

    $('.message-to-mentor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.message-to-mentor').css({ 'left': '0%' });
});
// close
$('.message-to-mentor__close-btn').click(function () {
    closeMessageToMentor();
});
// validation and close
$('.message-to-mentor__btn').click(function (e) {
    if ($('.message-to-mentor__text').val().length < 10) {
        e.preventDefault();
        $('.message-to-mentor__validation-warning').css({ 'height': '30px' });
    } else {
        var subject = $('.message-to-mentor__subject').val();
        var message = $('.message-to-mentor__text').val();
        var dat = {
            title : subject,
            body: message
        };
        $.ajax({
            url: "/Home/MassegeToMentor",
            type: "POST",
            data: dat,
            success: function (data) {
                $("#massegeConteiner").html(data);

                setTimeout(function() {
                    $('.message-from-mentor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
                    $('.message-from-mentor').css({ 'left': '0%' });
                }, 1000);
            }
        });

        closeMessageToMentor();
    }
});
$('.message-to-mentor__text').keyup(function () {
    if ($(this).val().length >= 10) {
        $('.message-to-mentor__validation-warning').css({ 'height': '0px' });
    }
});

function closeMessageToMentor() {
    $('.message-to-mentor').css({ 'left': '110%' });
    var tempMessageToMentorWidth = $('.message-to-mentor__holder').css('width');
    var tempMessageToMentorPadding = $('.message-to-mentor__holder').css('padding-left');
    setTimeout(function () {
        $('.message-to-mentor__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.message-to-mentor__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.message-to-mentor').css({ 'left': '-110%' });
    }, 500);
    setTimeout(function () {
        $('.message-to-mentor__validation-warning').css({ 'height': '0px' });
        $('.message-to-mentor__holder').css({ 'width': tempMessageToMentorWidth, 'padding': tempMessageToMentorPadding });
    }, 1000);
}
/* ↑↑↑ /BEM-block: message-to-mentor ↑↑↑ */

/* ↓↓↓ BEM-block: message-from-mentor ↓↓↓ */
// open
$('.tempBTN').click(function () {

    $('.message-from-mentor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.message-from-mentor').css({ 'left': '0%' });
});
// close
$('.message-from-mentor__btn, .message-from-mentor__close-btn').click(function () {
    closeMessageFromMentor()
});

function closeMessageFromMentor() {
    $('.message-from-mentor').css({ 'left': '110%' });
    var tempMessageFromMentorWidth = $('.message-from-mentor__holder').css('width');
    var tempMessageFromMentorPadding = $('.message-from-mentor__holder').css('padding-left');
    setTimeout(function () {
        $('.message-from-mentor__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.message-from-mentor__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.message-from-mentor').css({ 'left': '-110%' });
    }, 500);
    setTimeout(function () {
        $('.message-from-mentor__holder').css({ 'width': tempMessageFromMentorWidth, 'padding': tempMessageFromMentorPadding });
    }, 1000);
}
/* ↑↑↑ /BEM-block: message-from-mentor ↑↑↑ */

/* ↓↓↓ BEM-block: change-password ↓↓↓ */
// open
$('#btnPassword').click(function () {
    // видалити старі підказки, якщо вони були
    $('#change-password-validation-label, #change-password-input-validation, #new-password-validation-label, #new-password-input-validation').remove();
    $('#change-password-input, #new-password-input').val('');
    // проанімувати
    $('.change-password__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.change-password').css({ 'left': '0%' });
});
// close
$('.change-password__btn-close, .change-password__close-btn').click(function () {
    closeChangePasswordPopup()
});
// validation
// $('.change-password__btn-send').click(function (e) {
    //if ($('#change-password-input').val().length < 6) {
    //    e.preventDefault();

    //    if (!$('#change-password-input-validation')[0]) {
    //        if ($('#language-span').text().toLowerCase() == 'язык:') {
    //            var tempLang = min6Symb[0]
    //        } else {
    //            var tempLang = min6Symb[1]
    //        }

    //        $('#change-password-input').after('<label id="change-password-validation-label"></label>\
    //                                     <div id="change-password-input-validation">'
    //            + tempLang +
    //            '</div>');
    //        $('#change-password-input-validation').css('height', '30px');
    //    }

    //} else if ($('#change-password-input').val() != $('#new-password-input').val()) {
    //    e.preventDefault();

    //    if (!$('#new-password-input-validation')[0]) {
    //        if ($('#language-span').text().toLowerCase() == 'язык:') {
    //            var tempLang = notSamePass[0]
    //        } else {
    //            var tempLang = notSamePass[1]
    //        }
    //        $('#new-password-input').after('<label></label>\
    //                                  <div id="new-password-input-validation">'
    //            + tempLang +
    //            '</div>');
    //        $('#new-password-input-validation').css('height', '30px');
    //    }

    //} else {
    //    closeChangePasswordPopup()
    //}
// });
$('#change-password-input').keyup(function (e) {
    if ($('#change-password-input').val().length >= 6) {
        $('#change-password-input-validation').css('height', '0px');
        setTimeout(function () {
            $('#change-password-validation-label, #change-password-input-validation').remove();
        }, 500);
    }
});
$('#new-password-input').keyup(function (e) {
    if ($('#change-password-input').val() != $('#new-password-input').val()) {
        $('#new-password-input-validation').css('height', '0px');
        setTimeout(function () {
            $('#new-password-validation-label, #new-password-input-validation').remove();
        }, 500);
    }
});

function closeChangePasswordPopup() {
    $('.change-password').css({ 'left': '110%' });
    var tempChangePasswordWidth = $('.change-password__holder').css('width');
    var tempChangePasswordPadding = $('.change-password__holder').css('padding-left');
    setTimeout(function () {
        $('.change-password__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.change-password__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.change-password').css({ 'left': '-110%' });
    }, 500);
    setTimeout(function () {
        $('.change-password__holder').css({ 'width': tempChangePasswordWidth, 'padding': tempChangePasswordPadding });
    }, 1000);
}
/* ↑↑↑ /BEM-block: change-password ↑↑↑ */

/* ↓↓↓ BEM-block: deposit-confirmation ↓↓↓ */
// open
$('.tempBTN3').click(function () {
  // $('.make-cash-withdrawal__input').val('');
  $('.deposit-confirmation__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
  $('.deposit-confirmation').css({ 'left': '0%' });
});
// close
$('.deposit-confirmation__close-btn, .deposit-confirmation__btn-no').click(function () {
  $('.deposit-confirmation').css({ 'left': '110%' });
  closeDepositConfirmationPopup()
});

$('.deposit-confirmation__btn-yes').click(function(){
  // do something and then:
  alert("do something");
  closeDepositConfirmationPopup()
});

function closeDepositConfirmationPopup() {
  var tempDepositConfirmationWidth = $('.make-cash-withdrawal__holder').css('width');
  var tempDepositConfirmationPadding = $('.make-cash-withdrawal__holder').css('padding-left');
  setTimeout(function () {
    $('.deposit-confirmation__holder').css({ 'width': '0px', 'padding': '0px' });
    $('.deposit-confirmation__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
    $('.deposit-confirmation').css({ 'left': '-110%' });
  }, 500);
  setTimeout(function () {
    $('.deposit-confirmation__holder').css({ 'width': tempDepositConfirmationWidth, 'padding': tempDepositConfirmationPadding });
  }, 1000);
}
/* ↑↑↑ /BEM-block: deposit-confirmation ↑↑↑ */

/* ↓↓↓ BEM-block: make-cash-withdrawal ↓↓↓ */
// open
$('.tempBTN2').click(function () {
    $('.make-cash-withdrawal__input').val('');
    $('.make-cash-withdrawal__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.make-cash-withdrawal').css({ 'left': '0%' });
});
// close
$('.make-cash-withdrawal__btn-close, .make-cash-withdrawal__close-btn').click(function () {
    closemakeCashWithdrawalPopup()
});
// validation
$('.make-cash-withdrawal__btn-send').click(function (e) {
    if ($('.make-cash-withdrawal__input').val() == '') {
        e.preventDefault();
    } else {
        closemakeCashWithdrawalPopup()
    }
});
// input - only for numbers
$('.make-cash-withdrawal__input').keypress(function (e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
        return false;
    }
});

function closemakeCashWithdrawalPopup() {
    $('.make-cash-withdrawal').css({ 'left': '110%' });
    var tempMakeCashWithdrawalWidth = $('.make-cash-withdrawal__holder').css('width');
    var tempMakeCashWithdrawalPadding = $('.make-cash-withdrawal__holder').css('padding-left');
    setTimeout(function () {
        $('.make-cash-withdrawal__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.make-cash-withdrawal__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.make-cash-withdrawal').css({ 'left': '-110%' });
    }, 500);
    setTimeout(function () {
        $('.make-cash-withdrawal__holder').css({ 'width': tempMakeCashWithdrawalWidth, 'padding': tempMakeCashWithdrawalPadding });
    }, 1000);
}
/* ↑↑↑ /BEM-block: make-cash-withdrawal ↑↑↑ */

/* ↓↓↓ BEM-block: profile-editor ↓↓↓ */
//open
$('#profile-editor').click(function () {
    $('.profile-editor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
    $('.profile-editor').css({ 'left': '0%' });
});

// simple close
$('.profile-editor__close-btn').click(function () {
    closeProfilePopup();
});

// ↓↓↓ phone-input - number selection ↓↓↓
$("#prof-phone").keypress(function (e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);

    if (!$("#prof-phone").val()) {
        if (chr != 1 && chr != 2 && chr != 3 &&
            chr != 4 && chr != 5 && chr != 6 &&
            chr != 7 && chr != 8 && chr != 9 &&
            chr != 0 && chr != '+' && e.keyCode != 8) {
            return false
        }
    } else {
        if (chr != 1 && chr != 2 && chr != 3 &&
            chr != 4 && chr != 5 && chr != 6 &&
            chr != 7 && chr != 8 && chr != 9 &&
            chr != 0 && e.keyCode != 8) {
            return false
        }
    }
});
// ↑↑↑ phone-input - number selection ↑↑↑

// ↓↓↓ validation and close ↓↓↓
$('.profile-editor__btn').click(function (e) {

    if ($('#prof-fname').val().length < 2) {
        e.preventDefault();
        $('#prof-fname-info').css({ 'transition': 'height .5s', 'height': '30px', 'margin-top': '10px' });
        return
    }

    if ($('#prof-lname').val().length < 2) {
        e.preventDefault();
        $('#prof-lname-info').css({ 'transition': 'height .5s', 'height': '30px', 'margin-top': '10px' });
        return
    }

    if ($('#prof-country').val().length < 3) {
        e.preventDefault();
        $('#prof-country-info').css({ 'transition': 'height .5s', 'height': '30px', 'margin-top': '10px' });
        return
    }

    if ($('#prof-phone').val().length < 11) {
        e.preventDefault();
        $('#prof-phone-info').css({ 'transition': 'height .5s', 'height': '30px', 'margin-top': '10px' });
        return
    }
    var data = {
        IdCustomer: $('#customerId').val(),
        CustomerFirstName: $('#prof-fname').val(),
        CustomerLastName: $('#prof-lname').val(),
        CustomerGender: $('#genderId').val(),
        CustomerCountry: $('#prof-country').val(),
        CustomerCity: $('#prof-city').val(),
        CustomerAddress: $('#prof-adres').val(),
        CustomerPhone: $('#prof-phone').val()
    };
    $.ajax({
        url: "/Home/EditProfileComplit",
        type: "POST",
        data: data,
        success: function (data) {
            $("#massegeConteiner").html(data);
            setTimeout(function () {
                $('.message-from-mentor__positioning-wrapper').css({ 'zIndex': '8888', 'background-color': 'rgba(0,0,0,.8)' });
                $('.message-from-mentor').css({ 'left': '0%' });
            }, 1000);
        }
    });
    closeProfilePopup();
});

$('#prof-fname').keyup(function () {
    if ($('#prof-fname').val().length >= 2) {
        $('#prof-fname-info').css({ 'transition': 'height .5s', 'height': '0px', 'margin-top': '0px' });
    }
});

$('#prof-lname').keyup(function () {
    if ($('#prof-lname').val().length >= 2) {
        $('#prof-lname-info').css({ 'transition': 'height .5s', 'height': '0px', 'margin-top': '0px' });
    }
});

$('#prof-country').keyup(function () {
    if ($('#prof-country').val().length >= 3) {
        $('#prof-country-info').css({ 'transition': 'height .5s', 'height': '0px', 'margin-top': '0px' });
    }
});

$('#prof-phone').keyup(function () {
    if ($('#prof-phone').val().length >= 13) {
        $('#prof-phone-info').css({ 'transition': 'height .5s', 'height': '0px', 'margin-top': '0px' });
    }
});
// ↑↑↑ validation and close ↑↑↑

function closeProfilePopup() {
    $('.profile-editor').css({ 'left': '110%' });
    var tempProfileEditorWidth = $('.profile-editor__holder').css('width');
    var tempProfileEditorPadding = $('.profile-editor__holder').css('padding-left');
    setTimeout(function () {
        $('.profile-editor__holder').css({ 'width': '0px', 'padding': '0px' });
        $('.profile-editor__positioning-wrapper').css({ 'zIndex': '-1', 'background-color': 'rgba(0,0,0,0)' });
        $('.profile-editor').css({ 'left': '-110%' });
        //$('#prof-lname, #prof-fname, #prof-country, #prof-phone').val('');
    }, 500);
    setTimeout(function () {
        $('.profile-editor__validation-warning').css({ 'height': '0px', 'margin-top': '0px' });
        $('.profile-editor__holder').css({ 'width': tempProfileEditorWidth, 'padding': tempProfileEditorPadding });
    }, 1000);
}
/* ↑↑↑ /BEM-block: profile-editor ↑↑↑ */

/* ↓↓↓ BEM-block: make-lodgement ↓↓↓ */
var popupHeight;
// поява
$('.central-part__btn').click(function () {
    $(".check_pay").val(0);
    $('.check_pay').prop("checked", false);
    // чистка попереднього input'у
    $('#currencyAmount').val('');
    $('#terminalId').val('');
    $('.make-lodgement__info').css({ 'height': '0px' });

    popupHeight = 26 * 2 + 50 * $('.make-lodgement__pay-system').length + 10 * ($('.make-lodgement__pay-system').length - 1);

    $('.make-lodgement__positioning-wrapper').css({ 'z-index': '8888', 'background-color': 'rgba(0,0,0,.8' });

    $('.make-lodgement').css({ 'transition': 'top .2s', 'top': '50%' });

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'width .3s', 'width': '90%' });
    }, 200);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'height .3s', 'height': popupHeight });
        $('.make-lodgement__pay-system').css({ 'display': 'block' });
    }, 500);

    setTimeout(function () {
        $('.make-lodgement__pay-system').css({ 'transition': '.3s', 'left': '0px' });
    }, 800);

    setTimeout(function () {
        $('.make-lodgement__close-btn').css({ 'transition': '.5s', 'transform': 'rotate(180deg)' });
        $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({ 'transition': 'width .5s', 'width': '24px' });
    }, 1100);

    setTimeout(function () {
        $('.make-lodgement__triangle').css({ 'transition': '.3s', 'right': '8px' });
    }, 1600);
});

// кліки
$('.make-lodgement__pay-system:eq(0)').click(function () {
    choosePayTerminal(this, '44px', 1)
});

$('.make-lodgement__pay-system:eq(1)').click(function () {
    choosePayTerminal(this, '104px', 2)
});

$('.make-lodgement__pay-system:eq(2)').click(function () {
    choosePayTerminal(this, '164px', 3)
});

function choosePayTerminal(THIS, trianglePosition, terminalId) {
    $('.make-lodgement__triangle').css({ 'transition': '.5s', 'top': trianglePosition });
    $('.make-lodgement').css({ 'transition': 'height .3s', 'height': popupHeight + 76 });
    $('.make-lodgement__pay-block').css({ 'transition': '.5s', 'height': '80px' });

    $('#terminalId').val(terminalId);

    $('#make-lodgement__currency-select').empty();
    var tempCurrencyArr = $(THIS).attr('data-currency-names').split(' ');
    for (var i = 0; i < tempCurrencyArr.length; i++) {
        $('#make-lodgement__currency-select').append('<option value="' + tempCurrencyArr[i] + '">' + tempCurrencyArr[i] + '</option>');
    }
}

// закриття
$('.make-lodgement__close-btn').click(function (e) {
    $('.make-lodgement__info').css({ 'height': '0px' });
    $('.make-lodgement__pay-block').css({ 'transition': '.3s', 'height': '0px' });
    $('.make-lodgement').css({ 'transition': 'height .3s', 'height': popupHeight });
    $('.make-lodgement__triangle').css({ 'transition': '.3s', 'right': '-12px' });

    setTimeout(function () {
        $('.make-lodgement__triangle').css({ 'top': '44px' });
    }, 300);

    setTimeout(function () {
        $('.make-lodgement__pay-system:even').css({ 'transition': '.3s', 'left': '120%' });
        $('.make-lodgement__pay-system:odd').css({ 'transition': '.3s', 'left': '-120%' });
    }, 400);

    setTimeout(function () {
        $('.make-lodgement__close-btn').css({ 'transition': '.5s', 'transform': 'rotate(0deg)' });
        $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({ 'transition': 'width .5s', 'width': '0px' });
    }, 700);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'height .3s', 'height': '20px' });
        $('.make-lodgement__pay-system').css({ 'display': 'none' });
    }, 1200);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'width .3s', 'width': '120px' });
    }, 1500);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'top .2s', 'top': '-10%' });
    }, 1800);

    setTimeout(function () {
        $('.make-lodgement__positioning-wrapper').css({ 'transition': 'background-color .3s', 'z-index': '-1', 'background-color': 'rgba(0,0,0,0' });
    }, 2100);
});

function closeMakeLodgementPopup() {

    $('.make-lodgement-VISA').css({ 'transition': '.2s', 'height': '0px' });
    $('.make-lodgement-MasterCard').css({ 'transition': '.2s', 'height': '0px' });
    $('.make-lodgement').css({ 'transition': 'height .2s', 'height': '162px' });
    $('.make-lodgement__triangle').css({ 'transition': '.2s', 'right': '-12px' });

    setTimeout(function () {
        $('.make-lodgement__triangle').css({ 'top': '74px' });
    }, 200);

    setTimeout(function () {
        $('.make-lodgement__pay-system:even').css({ 'transition': '.2s', 'left': '110%' });
        $('.make-lodgement__pay-system:odd').css({ 'transition': '.2s', 'left': '-110%' });
    }, 300);

    setTimeout(function () {
        $('.make-lodgement__close-btn').css({ 'transition': '.3s', 'transform': 'rotate(0deg)' });
        $('.make-lodgement__close-btn-line1, .make-lodgement__close-btn-line2').css({ 'transition': 'width .3s', 'width': '0px' });
    }, 500);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'height .2s', 'height': '20px' });
        $('.make-lodgement__pay-system').css({ 'display': 'none' });
    }, 800);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'width .2s', 'width': '120px' });
    }, 1000);

    setTimeout(function () {
        $('.make-lodgement').css({ 'transition': 'top .2s', 'top': '-10%' });
        $('.make-lodgement__positioning-wrapper').css({ 'transition': 'background-color .3s', 'z-index': '-1', 'background-color': 'rgba(0,0,0,0' });
    }, 1200);
}


// валiдацiя та закриття
//----------------------------------------------------- РАБОТА С ПЛАТЕЖКОЙ ----------------------------------------------------------
$('#make-lodgement-btn').click(function (e) {
    var i = $(".check_pay").val();
    if ($('#currencyAmount').val() != '' && i != 0) {

        $('#make-lodgement-btn').css('display', 'none');
        $('#make-lodgement-notBtn').css('display', 'flex');

        var paySystem = $('#terminalId').val();
        var payAmount = $('#currencyAmount').val();
        var payCurrency = $('select[name="currency"]').val();
        var dat = {
            count: payAmount,
            curensy: payCurrency,
            paySystem: paySystem
        };
        $.ajax({
            url: "/Home/CheckSum?count=" + payAmount + "&curensy=" + payCurrency,
            type: "GET",
            success: function (data1) {
                if (data1 == "ok") {
                    $.ajax({
                        url: "/Home/AddDeposit",
                        type: "POST",
                        data: dat,
                        success: function (data) {
                            $('#make-lodgement-btn').css({ 'display': 'block' });
                            $('#make-lodgement-notBtn').css('display', 'none');
                            $('.make-lodgement__pay-block').css('height', '0px');
                            closeMakeLodgementPopup();
                            if (data != null) {
                                $('#massegeConteiner').html(data);
                            }
                        }
                    });
                } else {
                    $('#make-lodgement-btn').css({ 'display': 'block' });
                    $('#make-lodgement-notBtn').css('display', 'none');
                    $('.make-lodgement').css('height', popupHeight + 76 + 30);
                    $('.make-lodgement__pay-block').css('height', 110);
                    $('.make-lodgement__info').css({ 'height': '30px' }).text(data1);
                }
            }
        });
    }
});


//----------------------------------------------------- РАБОТА С ПЛАТЕЖКОЙ ----------------------------------------------------------

// inputs - only for numbers
$('.make-lodgement__pay-block input').keypress(function (e) {
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
        return false;
    }
});
/* ↑↑↑ /BEM-block: make-lodgement ↑↑↑ */
/* ↑↑↑ /BEM-blocks ↑↑↑ */