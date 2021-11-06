function is_valid(today, forcast_day) {
    if(today.getFullYear() !== forcast_day.getFullYear()) {
        //Ignore the date.
        return false;
    }
    return !(today.getMonth() > forcast_day.getMonth() || today.getDate() > forcast_day.getDate());

}

function parse_time(time_str) {
    let colon_pos = time_str.indexOf(':');
    if(colon_pos === -1) {
        return [];
    }
    //Parse the hour and minute.
    return [parseInt(time_str.substr(0, colon_pos)), parseInt(time_str.substr(colon_pos+1))];
}

function get_min(val) {
    if(val < 10) {
        return '0' + val.toString();
    }
    return val.toString();
}

function load_forecast() {
    $.getJSON("live-info/forecast.json", function(forecast_result) {
        //Parse the forecast result.
        if(forecast_result.length === 0) {
            return;
        }
        const local_date = new Date();
        let display_list = [];
        //Convert the forecast date to date.
        for(let i=0; i<forecast_result.length; ++i) {
            forecast_result[i].date = new Date(forecast_result[i].date);
            if(!is_valid(local_date, forecast_result[i].date)) {
                continue;
            }
            //The time is JST.
            forecast_result[i].time = parse_time(forecast_result[i].time);
            if(forecast_result[i].platform === "b") {
                //Bilibili live, the URL is fixed.
                forecast_result[i].url = "https://live.bilibili.com/21547895";
            }
            //Check whether the time and date is passed.
            display_list.push(forecast_result[i]);
        }
        if(display_list.length === 0) {
            return;
        }
        //Construct the URL.
        $('#forecast').load('forecast.html', function() {
            $('#forecast-title').text(forecast_title());
            let stream_html = [];
            for(let i=0; i<display_list.length; ++i) {
                const sdate = display_list[i].date;
                const stime = display_list[i].time;
                let stream_info = ['<div class="time-row">',
                    '<a href="'+display_list[i].url+'">',
                    '<div class="nav-icon icon-bilibili">',
                    '</div>&nbsp;',
                    sdate.getFullYear() + '-'+get_min(sdate.getMonth()+1)+'-'+get_min(sdate.getDate())+'  '+
                    '('+day_of_the_week(sdate.getDay())+') '+
                    stime[0]+':'+get_min(stime[1])+'(JST) / '+
                    (stime[0]-1)+':'+get_min(stime[1])+'(CST)  '+display_list[i].title,
                    '</a>',
                    '</div>'];
                stream_html.push(stream_info.join(''));
            }
            $('#stream-info').html(stream_html.join('\n'));
        })
    });
}