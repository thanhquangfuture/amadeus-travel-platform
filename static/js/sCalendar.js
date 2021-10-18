$(document).ready(function() {
    const full_today = new Date();
    const today = new Date(full_today.getFullYear(), full_today.getMonth(), full_today.getDate());
    const today_month = today.getMonth();
    const today_year = today.getFullYear();

    const month_name = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
    const month_day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    let startInput;
    $('body').on("focus", ".input_sig_Calendar", function(e) {
        startInput = $('#' + e.target.id);
        renderCalendar();
        showCalendar(e, startInput);
        $('#place').css("display", "none");
    });

    function renderCalendar() {
        const calendar = `<div id="sig_calendar" value="">
            <div class="scalendar_header">
                <span id="prev" class="schange_month">&lt;</span>
                <span class="smonth_picker" id="smonth_picker"></span>
                <span id="year">2021</span>
                <span id="next" class="schange_month">&gt;</span>
            </div>
            <div class="scalendar_body">
                <div class="scalendar_week_day">
                    <div>CN</div>
                    <div>T2</div>
                    <div>T3</div>
                    <div>T4</div>
                    <div>T5</div>
                    <div>T6</div>
                    <div>T7</div>
                </div>
                <div id="sig_calendar_day" class="scalendar_days"></div>
            </div>
            <div class="smonth_list"></div>
        </div>`
        $('#sig_calendar').remove();
        const wrap = '<div id="sig_cal"></div>';
        if ($(".sig_Calendar").parent().is('div#sig_cal')) {
            $(".depCal").unwrap();
        }

        $(".depCal").wrap(wrap);
        $("#sig_cal").append(calendar);
    }

    function showCalendar(e, startInput) {
        let click_id = e.target.id;
        $('#sig_calendar').attr("value", click_id);
        $('#sig_calendar').css("display", "block");
        if (startInput.val() !== '') {
            let selected = startInput.val();
            let mm = parseInt(selected.split("-")[1] - 1);
            let yyyy = parseInt(selected.split("-")[2]);
            my_calendar(mm, yyyy);
            $('#' + selected).addClass('sselected_day');
        } else {
            let mm = today_month;
            let yyyy = today_year;
            my_calendar(mm, yyyy);
        }
    }
    $(document).click(function(event) {
        if (!$(event.target).closest("#sig_cal, #sig_calendar").length) {
            if ($("#sig_calendar").parent().is('div#sig_cal')) {
                $(".depCal").unwrap();
            }
            $('#sig_calendar').css("display", "none");
        }

    });
    $('body').on("click", ".schange_month", function(e) {
        let click_id = e.target.id;
        let current_month = $('#smonth_picker').text();
        let current_year = $('#year').text();
        let mm_index = month_name.findIndex(function(month) {
            return month == current_month;
        })
        let mm = 0
        if (mm_index == -1) {
            mm = today_month;
        } else {
            mm = mm_index
        }
        let next_mm = mm + 1;
        let yyyy = parseInt(current_year);
        if (click_id == 'next') {
            if (mm == 11) {
                mm = 0;
                yyyy += 1;
            } else {
                mm += 1
            }
            if (next_mm == 11) {
                next_mm = 0
            } else {
                next_mm += 1;
            }
        }
        if (click_id == 'prev') {
            if (mm == 0) {
                mm = 11;
                yyyy -= 1;
            } else {
                mm -= 1;
            }
            if (next_mm == 0) {
                next_mm = 11;
                next_yyyy -= 1;
            } else {
                next_mm -= 1;
            }
        }
        if (mm < today_month && yyyy == today_year) {
            mm = today_month;
        };
        $('#smonth_picker').text(month_name[mm]);
        $('#year').text(yyyy);
        my_calendar(mm, yyyy);
    });
    $('body').on("click", ".seach_day", function(e) {
        let click_id = e.target.id;
        $('#' + click_id).addClass('sselected_day');
        startInput.val(click_id);
        if ($("#sig_calendar").parent().is('div#sig_cal')) {
            $(".depCal").unwrap();
        }
        $('#sig_calendar').css('display', 'none');
    });

    $('body').on("click", ".change_year", function(e) {
        let click_id = e.target.id;
        let current_month = $('#smonth_picker').text();
        let current_year = $('#year').text();
        let mm = month_name.findIndex(function(month) {
            return month == current_month;
        });
        let yyyy = parseInt(current_year);
        if (click_id == 'next_year') {
            yyyy += 1;
        }
        if (click_id == 'prev_year') {
            yyyy -= 1;
        }
        $('#year').text(yyyy);
        my_calendar(mm, yyyy);
    });

    function day_of_feb(year) {
        if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    };

    function my_calendar(mm, yyyy) {
        $('#sig_calendar_day').html('');
        $('#smonth_picker').text(month_name[mm]);
        $('#year').text(yyyy);
        let days_of_month = month_day[mm];
        if (mm == 1) {
            days_of_month = day_of_feb(yyyy);
        }
        let first_day_of_month = new Date(yyyy, mm, 1);
        let no_of_days = days_of_month + first_day_of_month.getDay() - 1;

        for (let i = 0; i <= no_of_days; i++) {
            let day = document.createElement('div');
            if (i >= first_day_of_month.getDay()) {
                let my_day = i - first_day_of_month.getDay() + 1;
                let my_day_text = '';
                if (my_day < 10) {
                    my_day_text = '0' + my_day;
                } else {
                    my_day_text = my_day;
                }
                let mm_text = '';
                if ((mm + 1) < 10) {
                    mm_text = '0' + (mm + 1);
                } else {
                    mm_text = (mm + 1);
                }
                day.innerHTML = my_day;
                let my_date = new Date(yyyy, mm, my_day);
                if (my_date < today) {
                    day.classList.add('sold_day');
                } else {
                    day.classList.add('seach_day')
                }
                let picked_date = my_day_text + '-' + mm_text + '-' + yyyy;
                day.setAttribute('id', picked_date);
                if (today_year == yyyy && today_month == mm && today.getDate() == my_day) {
                    day.classList.add('stoday');
                }
            }
            $('#sig_calendar_day').append(day);
        }
    }
})