    $(document).ready(function() {
        const consolShort = document.getElementById('consolidator');
        const consolCre = document.getElementById('credit');

        const list = document.getElementById('consolidator_list');
        const placeList = document.getElementById('place_list');
        const seat_class = document.getElementById('seat_class');
        const data = {
            place_list: [{
                    stt: '001',
                    code: 'SGN',
                    city: 'Hồ Chí Minh'
                },
                {
                    stt: '002',
                    code: 'HAN',
                    city: 'Hà Nội'
                },
                {
                    stt: '003',
                    code: 'DAD',
                    city: 'Đà Nẵng'
                },
                {
                    stt: '004',
                    code: 'HUI',
                    city: 'Huế'
                },
                {
                    stt: '005',
                    code: 'NHA',
                    city: 'Nha Trang'
                },
                {
                    stt: '006',
                    code: 'DLI',
                    city: 'Đà Lạt'
                },
                {
                    stt: '007',
                    code: 'PQC',
                    city: 'Phú Quốc'
                },
                {
                    stt: '008',
                    code: 'HPH',
                    city: 'Hải Phòng'
                },
                {
                    stt: '009',
                    code: 'UIH',
                    city: 'Qui Nhơn'
                },
                {
                    stt: '010',
                    code: 'PTH',
                    city: 'Phan Thiết'
                },
                {
                    stt: '011',
                    code: 'VDH',
                    city: 'Quảng Bình'
                }
            ],
            consolidator_list: [{
                    id: '001',
                    full_name: 'CÔNG TY TNHH HỒNG NGỌC HÀ',
                    short_name: 'HNH',
                    credit: 200000000
                },
                {
                    id: '002',
                    full_name: 'CÔNG TY TNHH ÉN VIỆT',
                    short_name: 'ENVIET',
                    credit: 10000000
                },
                {
                    id: '003',
                    full_name: 'CÔNG TY TNHH PNR',
                    short_name: 'PNR',
                    credit: 50000000
                },
                {
                    id: '004',
                    full_name: 'CÔNG TY TNHH ÁNH SAO THIÊN',
                    short_name: 'AST',
                    credit: 30000000
                },
                {
                    id: '005',
                    full_name: 'CÔNG TY TNHH DU LỊCH TRẦN VIỆT',
                    short_name: 'TRANVIET',
                    credit: 50000000
                },
                {
                    id: '006',
                    full_name: 'CÔNG TY TNHH EXPERANTOUR',
                    short_name: 'EXPERANTOUR',
                    credit: 80000000
                },
                {
                    id: '007',
                    full_name: 'CÔNG TY TNHH TRƯỜNG THỊNH',
                    short_name: 'TRUONGTHINH',
                    credit: 30000000
                }
            ],
            seat_class: [{
                    id: 'c01',
                    name: 'Hạng Phổ Thông',
                },
                {
                    id: 'c02',
                    name: 'Phổ Thông Đặc Biệt',
                },
                {
                    id: 'c03',
                    name: 'Hạng Thương Gia',
                },
                {
                    id: 'c04',
                    name: 'Hạng Nhất',
                }

            ],
            location: [{ code: 'BKK', city: 'Bangkok', airport: 'All airports', country: 'Thailand', cat: 1 },
                { code: 'BKK', city: 'Bangkok', airport: 'Suvarnabhumi Intl', country: 'Thailand', cat: 2 },
                { code: 'DMK', city: 'Bangkok', airport: 'Don Mueang Intl', country: 'Thailand', cat: 2 },
                { code: 'HAN', city: 'Hà Nội', airport: 'Nội Bài', country: 'Vietnam', cat: 1 },
                { code: 'SGN', city: 'Hồ Chí Minh', airport: 'Tân Sơn Nhất', country: 'Vietnam', cat: 1 },
                { code: 'PAR', city: 'Paris', airport: 'All airports', country: 'France', cat: 1 },
                { code: 'CDG', city: 'Paris', airport: 'Charles De Gaulle', country: 'France', cat: 2 },
                { code: 'ORY', city: 'Paris', airport: 'Orly', country: 'ChinaFrance', cat: 2 },
                { code: 'SHA', city: 'Shanghai', airport: 'All airports', country: 'China', cat: 1 },
                { code: 'SHA', city: 'Shanghai', airport: 'Honggiao Intl', country: 'China', cat: 2 },
                { code: 'PVG', city: 'Shanghai', airport: 'Pudong', country: 'China', cat: 2 },
            ],
            render: function() {
                const htmls = this.consolidator_list.map((consolidator, index) => {
                    return `
                <option value="${consolidator.full_name} (${consolidator.short_name})"></option>    
                 `
                });
                list.innerHTML = htmls.join('');
                const city = this.place_list.map((city, index) => {
                    return `
                <option value="${city.city} (${city.code})"></option>
                `
                });
                placeList.innerHTML = city.join('');
                const seatClass = this.seat_class.map((seat, index) => {
                    return `
                <option value="${seat.name}"></option>
                `
                });
                seat_class.innerHTML = seatClass.join('');
            },
            start: function() {
                this.render();
            }
        };
        data.start();

        //MultiCity
        $('#flights').on('click', '#mul-plus', function() {
            renderMoreMulti();
        });

        let searchCity;
        $('#flights').on("focus", ".place_list", function(e) {
            renderPlace(e);
            showPlace(e);
            searchCity = e.target.id;
            $('#input_search').focus();
        });

        $('#flights').on("click", ".search_place", function(e) {
            // const click_id = e.target.id; vì sao id lúc get được lúc không?
            const click_id = jQuery(this).attr("id");
            selected_city(click_id);
            $('#place').css("display", "none");
        });

        $(document).click(function(e) {
            if (!$(e.target).closest(".place, .items").length) {
                $('#place').css("display", "none");
            }
        });

        $('#flights').on('click', '.mul-down', function(e) {
            let target = $('#' + e.target.id).parent().parent();
            target.remove();
        });

        $('#consolidator').on("change", listen_consol);

        $('#consolidator').on('mousedown', function(e) {
            $(this).val('');
        });

        function selected_city(codeId) {
            data.location.map((local, index, arr) => {
                if (codeId.includes(`${arr[index].code}`)) {
                    let city = `${arr[index].city}, ${arr[index].country} (${arr[index].code})`;
                    return $('#' + searchCity).val(city);
                }
            });
        };

        function listen_consol() {
            data.consolidator_list.map((consolidator, index) => {
                if ((consolShort.value).includes(`${consolidator.full_name}`)) {
                    consolShort.value = consolidator.full_name;
                    let str = formatCash(consolidator.credit);
                    consolCre.value = str;
                }
            });
        }

        $('.cnt-up').on('click', function(e) {
            let click_id = e.target.id;
            if (click_id == 'infant-up') {
                if ($('#infantNo').val() >= $('#adultNo').val()) {
                    $('#infantNo').val($('#adultNo').val());
                } else {
                    $('#infantNo').get(0).value++;
                }
            }
            if (click_id == 'child-up') {
                if ($('#childNo').val() >= 0 && $('#childNo').val() < 9) {
                    $('#childNo').get(0).value++;
                }
            }
            if (click_id == 'adult-up') {
                if ($('#adultNo').val() >= 0 && $('#adultNo').val() < 9) {
                    $('#adultNo').get(0).value++;
                }
            }
        });
        $('.cnt-down').on('click', function(e) {
            let click_id = e.target.id;
            if (click_id == 'infant-down') {
                if ($('#infantNo').val() > 0 && $('#childNo').val() <= 9) {
                    $('#infantNo').get(0).value--;
                }
            }
            if (click_id == 'child-down') {
                if ($('#childNo').val() > 0 && $('#childNo').val() <= 9) {
                    $('#childNo').get(0).value--;
                }
            }
            if (click_id == 'adult-down') {
                if ($('#adultNo').val() > 0 && $('#adultNo').val() <= 9) {
                    $('#adultNo').get(0).value--;
                }
            }
        });

        $('.flight').on("click", function() {
            $('.hotel').removeClass('active');
            $('.service').removeClass('active');
            $('.flight').addClass('active');
        });
        $('.hotel').on("click", function() {
            $('.flight').removeClass('active');
            $('.service').removeClass('active');
            $('.hotel').addClass('active');
        });
        $('.service').on("click", function() {
            $('.hotel').removeClass('active');
            $('.flight').removeClass('active');
            $('.service').addClass('active');
        });

        $('.oneway').on("click", function() {
            $('.twoway').removeClass('active');
            $('.multicity').removeClass('active');
            if ($(".input_date").parents().is('div#div_date')) {
                $(".input_date").parent().unwrap();
            }
            $(".input_date").removeClass('input_date');

            $("#dep-1").addClass('input_sig_Calendar');
            $('.arrive').addClass('not-visible');
            $('.oneway').addClass('active');
            $('.more_flight').remove()
        });
        $('.twoway').on("click", function() {
            $('.oneway').removeClass('active');
            $('.multicity').removeClass('active');
            $('.arrive').removeClass('not-visible');
            $("#dep-1").removeClass('input_sig_Calendar');

            $("#dep-1").addClass('input_date');
            $("#dep-2").addClass('input_date');
            $('.twoway').addClass('active');
            const depValue = formatIdToDate($("#dep-1").val(), 2);
            const dep2Value = formatDateToID(depValue);
            $("#dep-2").val(dep2Value);
            $('.more_flight').remove();
        });
        $('.multicity').on("click", function() {
            $('.oneway').removeClass('active');
            $('.twoway').removeClass('active');
            if ($(".input_date").parents().is('div#div_date')) {
                $(".input_date").parent().unwrap();
            }
            $(".input_date").removeClass('input_date');

            $("#dep-1").addClass('input_sig_Calendar');
            $('.arrive').addClass('not-visible');
            $('.multicity').addClass('active');
            renderMulti();
        });

        function renderMulti() {
            const more_flight = `
            <div class="more_flight">
                <div class="items multi item1">
                    <span class="fa"><img src="../img/departure.png" alt="departure"></span>
                    <input id="more_depart" name="Điểm đi" type="text" placeholder="Thêm chặng bay" class="place_list form-control">
                </div>
                <div class="items multi item2">
                    <span class="fa"><img src="../img/arrival.png" alt="arrival"></span>
                    <input id="more_arriv" name="Điểm đến" type="text" placeholder="Thêm chặng bay" class="place_list form-control">
                </div>
                <div class="items multi item3 depCal">
                    <span class="fa"><img src="../img/calendar.png" alt="calendar"></span>
                    <input id="more_days" name="Ngày đi" placeholder="Ngày đi" type="text" class="input_sig_Calendar form-control"></input>

                </div>
                <div class="items multi btn">
                    <button class="multi-btn mul-up" id="mul-plus" type="button">+</button>
                </div>
            </div>
            `
            $("#flights").append(more_flight);
        };

        function renderMoreMulti() {
            const next_flight = `
            <div class="more_flight next_flight">
                <div class="items multi item1">
                    <span class="fa"><img src="../img/departure.png" alt="departure"></span>
                    <input name="Điểm đi" type="text" placeholder="Thêm chặng bay" class="place_list form-flight">
                </div>
                <div class="items multi item2">
                    <span class="fa"><img src="../img/arrival.png" alt="arrival"></span>
                    <input name="Điểm đến" type="text" placeholder="Thêm chặng bay" class="place_list form-flight">
                </div>
                <div class="items multi item3 depCal">
                    <span class="fa"><img src="../img/calendar.png" alt="calendar"></span>
                    <input name="Ngày đi" placeholder="Ngày đi" type="text" class="input_sig_Calendar form-calendar"></input>

                </div>
                <div class="items multi btn">
                    <button class="multi-btn mul-down" type="button">x</button>
                </div>
            </div>
            `

            $("#flights").append(next_flight);
        };

        $('body').on('mouseleave', '#mul-plus', function() {
            const mul_down = $('.mul-down');
            for (let i = 0, length = mul_down.length; i < length; i++) {
                mul_down[i].id = 'idmul' + i;
            }
            const next_flight = $('.form-flight');
            for (let i = 0, length = next_flight.length; i < length; i++) {
                next_flight[i].id = 'idflight' + i;
            }
            const cal_flight = $('.form-calendar');
            for (let i = 0, length = cal_flight.length; i < length; i++) {
                cal_flight[i].id = 'idcal' + i;
            }
        });

        // function hide(elements) {
        //     elements = elements.length ? elements : [elements];
        //     for (var index = 0; index < elements.length; index++) {
        //         elements[index].style.display = 'none';
        //     }
        // };

        function renderPlace(e) {
            const listPlace = `<div id="place" class="place">
                <div id="input_place">
                    <input id="input_search"></input>
                </div>
                `
            const html = data.location.map((local, index, arr) => {
                if (arr[index].cat == 1) {
                    return ` <div class="search_place city" id="${arr[index].code}${arr[index].cat}">
                <span class="city_img"><img src="../img/${arr[index].code}.png" alt="arrival"></span>
                <div class="city_name">${arr[index].airport}, ${arr[index].country}</div>
                <span class="city_code">${arr[index].code}</span>
            </div>`
                }
                if (arr[index].cat == 2) {
                    return `
                <div class="search_place city" id="${arr[index].code}${arr[index].cat}">
                <span class="city_img"><img src="../img/enter.png" alt="arrival"></span>
                <span class="city_img"><img src="../img/airport.png" alt="arrival"></span>
                <div class="city_name">
                    <div class="city_country">${arr[index].airport}</div>
                    <div class="airport">${arr[index].city}, ${arr[index].country}</div>
                </div>
                <span class="city_code">${arr[index].code}</span>
                </div>`
                }
            });
            const list = html.join('');
            $('#place').remove();
            const click_id = e.target.id;
            $('#' + click_id).parent().append(listPlace);
            $('#place').append(list)
        };

        function showPlace(e) {
            $('#place').css("display", "flex");
        };

        function formatCash(e) {
            let str = JSON.stringify(e);
            return str.split('').reverse().reduce((prev, next, index) => {
                return ((index % 3) ? next : (next + ',')) + prev
            })
        };

        function formatIdToDate(date, n) {
            let dd = parseInt(date.split('-')[0]);
            let mm = parseInt(date.split('-')[1]);
            let yyyy = parseInt(date.split('-')[2]);
            return new Date(yyyy, (mm - 1), dd + n);
        };

        function formatDateToID(date) {
            let dd = date.getDate();
            let mm = date.getMonth() + 1;
            let yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + date.getDate();
            } else {
                dd = date.getDate();
            }
            if (mm < 10) {
                mm = '0' + (date.getMonth() + 1);
            } else {
                mm = date.getMonth() + 1;
            }
            return dd + '-' + mm + '-' + yyyy;
        };
    })