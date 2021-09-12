// Chèn và thay thế các giá trị cần target vào file .html
// <script>
//         Validator({
//             form: '#form-1',
//             errorSelector: '.form-message',
//             formGroupSelector: '.form-group',
//             rules: [
//                 Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
//                 Validator.isRequired('#email'),
//                 Validator.isEmail('#email'),
//                 Validator.minLength('#password', 6),
//                 Validator.isRequired('#password_confirmation'),
//                 Validator.isConfirmed('#password_confirmation', function() {
//                     return document.querySelector('#form-1 #password').value;
//                 }, 'Mật khẩu nhập lại không chính xác')
//             ],
//             onSubmit: function(data) {
//                 console.log(data);
//             }
//         });
//     </script>

function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorMessage;
        var inputParentElement = getParent(inputElement, options.formGroupSelector)
        var errorElement = inputParentElement.querySelector(options.errorSelector)
            // Lấy ra các rules của selectorRules[rule.selector]
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rules và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0, length = rules.length; i < length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputParentElement.classList.add('invalid')
        } else {
            errorElement.innerText = "";
            inputParentElement.classList.remove('invalid')
        }
        return !errorMessage;
    }

    function inputReturn(inputElement) {
        var inputParentElement = getParent(inputElement, options.formGroupSelector)
        var errorElement = inputParentElement.querySelector(options.errorSelector)
        errorElement.innerText = '';
        inputParentElement.classList.remove('invalid');
    }
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
                e.preventDefault();
                var isFormValid = true;
                options.rules.forEach(function(rule) {
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if (!isValid) {
                        isFormValid = false;
                    }
                });
                if (isFormValid) {
                    if (typeof options.onSubmit === 'function') {
                        var enableInputs = formElement.querySelectorAll('[name]:not([disable])')
                        var formValues = Array.from(enableInputs).reduce(function(values, input) {
                            values[input.name] = input.value
                            return values;
                        }, {});
                        options.onSubmit(formValues);
                    }
                }
            }
            // Xử lý lặp qua mỗi rule và lắng nghe sự kiện

        options.rules.forEach(function(rule) {
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                        // value: inputElement.value
                        // test func: rule.test
                        validate(inputElement, rule);
                    }
                    //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    inputReturn(inputElement)
                }
            }
        })
    }
}
// Định nghĩa rules
// Nguyên tắc của các rules: 
// 1. Khi có lỗi => trả ra message lỗi
// 2. Khi hợp lệ => không trả ra gì (undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập không chính xác'
        }
    }
}