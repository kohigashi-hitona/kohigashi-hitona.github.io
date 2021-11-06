let all_years = [];
const big_month = new Set([1, 3, 5, 7, 8, 10, 12]), small_month = new Set([4, 6, 9, 11]);

function month_days(year, month) {
    if(big_month.has(month)) {
        return 31;
    }
    if(small_month.has(month)) {
        return 30;
    }
    if(month === 2) {
        // Check leap year.
        if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    }
    return -1;
}

function update_month_links(year) {
    //Update the month list.
    let month_items = [];
    for(let i=1; i<13; ++i) {
        month_items.push('<li><a href="#year='+year+'&month='+i+'">'+i+'</a></li>');
    }
    $('#month-list').html(month_items.join('\n'));
}

function is_year_and_month_valid(year, month) {
    return !isNaN(year) && !isNaN(month) && (all_years.indexOf(year) > -1) && month > 0 && month < 13;
}

function show_the_url_calender() {
    video_list.args = parse_parameter();
    //Update the month links.
    if(!('year' in video_list.args) || !('month' in video_list.args)) {
        return;
    }
    //Parse the value.
    const target_year = parseInt(video_list.args.year);
    const target_month = parseInt(video_list.args.month);
    if(is_year_and_month_valid(target_year, target_month)) {
        update_month_links(target_year);
        show_calender(target_year, target_month);
    }
}

function first_day(year, month) {
    return new Date(year, month-1, 1, 0, 0, 0, 0).getDay();
}

function show_calender(year, month) {
    //Update the language list URL.
    language_list(lan_page_base, lan_my_lan, '#year='+year+'&month='+month);
    //Display the calender.
    $('#year-display').html(year + ' <span className="caret"></span>');
    $('#month-display').html(month + ' <span className="caret"></span>');
    let days = month_days(year, month);
    let day_begin = first_day(year, month);
    let day_htmls = ['<tr>'];
    let day_remain = 7;
    //Filter the dates.
    let live_on_month = [];
    let records = video_list.records;
    for(let i=0; i<records.length; ++i) {
        if(records[i][4].getFullYear() === year && records[i][4].getMonth()+1 === month) {
            live_on_month.push(records[i]);
        }
    }
    //Push blank to day begins.
    for(let i=0; i<day_begin; ++i) {
        day_htmls.push('<td></td>');
        day_remain -= 1;
    }
    let calender_days = $('#calender-days'), vertical_days = $('#vertical-days');
    calender_days.empty();
    vertical_days.empty();
    for(let i=0; i<days; ++i) {
        let single_day_html = '<td>';
        let vertical_day_html = '<tr><td><div>';
        if(day_remain === 7 || day_remain === 1) {
            single_day_html += '<span class="vertical-rest-day">'+(i+1)+'</span>';
            vertical_day_html += '<span class="vertical-rest-day">';
        } else {
            single_day_html += (i+1);
            vertical_day_html += '<span class="vertical-day">';
        }
        vertical_day_html += (i+1)+' '+day_of_the_week(7-day_remain)+'</span></div>';
        while(live_on_month.length > 0 && live_on_month[live_on_month.length-1][4].getDate() === i+1) {
            let live_info = live_on_month[live_on_month.length-1];
            live_on_month.pop();
            //Add the records.
            let live_html = '<a href="'+get_live_url(live_info, video_list.force_bilibili)+'" rel="noreferrer noopener"><span>'+get_live_icon(live_info)+ live_info[1] + '</span></a>';
            single_day_html += '<div>'+live_html+'</div>';
            vertical_day_html += '<div class="vertical-calender-item">'+live_html+'</div>';
        }
        vertical_day_html += '</td></tr>';
        single_day_html += '</td>';
        vertical_days.append(vertical_day_html);
        day_htmls.push(single_day_html);
        day_remain -= 1;
        if(day_remain === 0) {
            day_htmls.push('</tr>');
            calender_days.append(day_htmls.join('\n'));
            day_htmls = ['<tr>'];
            day_remain = 7;
        }
    }
    while(day_remain > 0) {
        day_htmls.push('<td></td>');
        day_remain -= 1;
    }
    day_htmls.push('</tr>');
    calender_days.append(day_htmls.join('\n'));
}

function calender_category(video_list) {
    //Statistic the year.
    let records = video_list.records;
    let years = new Set();
    for(let i=0; i<records.length; ++i) {
        years.add(records[i][4].getFullYear());
    }
    years = Array.from(years);
    years.sort().reverse();
    all_years = years;
    //Set the year information.
    let year_items = [];
    for(let i=0; i<years.length; ++i) {
        year_items.push('<li><a href="#year='+years[i]+'&month=1">'+years[i]+'</a></li>');
    }
    $('#year-list').html(year_items.join('\n'));
    //Calculate the display year and month.
    let display_year = years[0], display_month = 1, date = new Date;
    if(date.getFullYear() === years[0]) {
        // Set the current year.
        display_month = date.getMonth() + 1;
    } else {
        display_month = 12;
    }
    //Construct the horizontal head.
    let calender_head = ['<tr>'];
    for(let i=0; i<7; ++i) {
        if(i===0 || i===6) {
            calender_head.push('<th class="vertical-rest-day">'+day_of_the_week(i)+'</th>');
        } else {
            calender_head.push('<th>'+day_of_the_week(i)+'</th>');
        }
    }
    calender_head.push('</tr>');
    $('#calender-head').html(calender_head.join('\n'));
    //Check the arguments.
    const page_args = video_list.args;
    if('year' in page_args && 'month' in page_args) {
        let target_year = parseInt(page_args.year), target_month = parseInt(page_args.month);
        if(is_year_and_month_valid(target_year, target_month)) {
            display_year = target_year;
            display_month = target_month;
        }
    }
    //Update the calender selector.
    update_month_links(display_year);
    show_calender(display_year, display_month);
    //Update the page hash change signal.
    window.addEventListener('hashchange', show_the_url_calender, false);
}