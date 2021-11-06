var ico_map = {'y': 'nav-icon icon-youtube', 'b': 'nav-icon icon-bilibili'}
var locale = navigator.language;

function create_live_icon(live_site) {
    live_site = live_site.toLowerCase();
    if(live_site in ico_map) {
        return '<div class="' + ico_map[live_site] + '"></div>';
    }
    return '';
}

function get_live_icon(video_info) {
    return create_live_icon(video_info[0]);
}

function get_live_url(video_info, force_b) {
    if(force_b) {
        return video_info[3];
    }
    return (video_info[2].length > 0) ? video_info[2] : video_info[3];
}

function load_video_list(video_list, callback) {
    $.getJSON("live-info/videos.json", function(video_records) {
        //Parse the date.
        for(var i=0; i<video_records.length; ++i) {
            video_records[i][4] = new Date(video_records[i][4]);
        }
        video_list.records = video_records;
        callback(video_list);
    });
}

function create_video_row(video_info, force_b) {
    row_src = ["<tr>",
        '<td>'+get_live_icon(video_info)+'</td>',
        '<td><a href="'+ get_live_url(video_info, force_b) + '" rel="noreferrer noopener">' + video_info[1] + "</a></td>",
        "<td>"+ video_info[4].toLocaleDateString(locale) + "</td>",
        "</tr>"]
    return row_src.join("\n");
}

function create_default_list(video_list) {
    create_list(video_list.records, video_list.force_bilibili);
}

function create_list(records, force_b) {
    $('#count-of-results').text(records.length);
    $('#search_results').empty();
    for(var i=0; i<records.length; ++i) {
        $('#search_results').append(create_video_row(records[i], force_b));
    }
}

function filter_list(video_list, keyword) {
    //Extract the keywords.
    var total_list = video_list.records;
    var force_b = video_list.force_bilibili;
    keyword = keyword.trim();
    if(keyword.length === 0) {
        create_list(total_list, force_b);
        return;
    }
    //Split the keyword into multiple case.
    let keywords = keyword.toLowerCase().split(' ');
    //Check whether the name contain the keywords.
    let filtered_list = []
    for(let i=0; i<total_list.length; ++i) {
        let added = false;
        let lower_name = total_list[i][1].toLowerCase();
        for(let j=0; j<keywords.length; ++j) {
            if(lower_name.match(keywords[j])) {
                filtered_list.push(total_list[i]);
                added = true;
                break;
            }
        }
        if(added) {
            continue;
        }
        let date_str = total_list[i][4].toLocaleDateString(locale);
        for(let j=0; j<keywords.length; ++j) {
            if(date_str.match(keywords[j])) {
                filtered_list.push(total_list[i]);
                break;
            }
        }
    }
    //Update the list.
    create_list(filtered_list, force_b);
}