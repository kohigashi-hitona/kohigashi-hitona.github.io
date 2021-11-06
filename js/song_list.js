var locale = navigator.language;
let song_list_cache = [];
let target_records = [];
let is_medley_mode = false;

function song_name_to_base64(song_name) {
    return window.btoa(unescape(encodeURIComponent(song_name)));
}

function clear_active() {
    $('#p-live-list').removeClass('active');
    $('#p-song-list').removeClass('active');
    $('#p-medley-list').removeClass('active');
    $('#p-song-statistic').removeClass('active');
}

function get_day_str(live_date) {
    return (live_date.getMonth()+1) + '-' + live_date.getDate();
}

function create_live_link(live_url, date, is_y) {
    return '<a class="one-line" href="'+live_url+'" rel="noreferrer noopener">'
        + date.toLocaleDateString(locale)+' @&nbsp;'+create_live_icon(is_y ? 'y': 'b') +
        '</a>';
}

function render_live_link(live_data) {
    let live_url = '';
    if(live_data.url_y.length > 0) {
        if(song_list.force_bilibili) {
            live_url = live_data.url_b;
        } else {
            live_url = live_data.url_y;
        }
    } else {
        live_url = live_data.url_b;
    }
    return create_live_link(live_url, live_data.date, live_data.url_y.length > 0);
}

function view_song_list_on(record) {
    const record_date = record.date,
        record_url = '#setori&date='+record_date.getFullYear()+'-'+(record_date.getMonth()+1)+'-'+record_date.getDate();
    return '<a class="clickable-header" href="'+record_url+'">'+view_date_song_list()+'</a>';
}

function on_day_change(year, id) {
    //Set the multi-language URL.
    language_list(lan_page_base, lan_my_lan, '#setori&year='+year+'&id='+id);
    //Get the day information.
    const date_info = song_list.day_list[year][id];
    const live_date = date_info[0], live_id = date_info[1];
    $('#day-display').html(get_day_str(live_date) + ' <span className="caret"></span>');
    //Set the text to page.
    const live_data = song_list.records[live_id];
    $('#p-live-list-title').text(live_data.title);
    //Check whether we have youtube url.
    $('#p-live-list-date').html(render_live_link(live_data));
    let song_li_list = [], last_indent = false;
    for(let i=0; i<live_data.songs.length; ++i) {
        //Check indent.
        const song_name = live_data.songs[i];
        if(song_name[0] === '\t') {
            if(!last_indent) {
                song_li_list.push('<ul>');
            }
            last_indent = true;
        } else {
            if(last_indent) {
                song_li_list.push('</ul>');
            }
            last_indent = false;
        }
        let song_info_url = '#song-info&';
        if(last_indent) {
            song_info_url += 'is_medley&';
        }
        song_info_url += 'song_name=' + song_name_to_base64(live_data.songs[i]);
        song_li_list.push('<li><a class="clickable-header" href="'+song_info_url+'">'+live_data.songs[i]+'</a></li>');
    }
    $('#p-live-songs').html(song_li_list.join('\n'));
}

function is_year_id_valid(year, id) {
    year = parseInt(year);
    id = parseInt(id);
    if(isNaN(year) || isNaN(id)) {
        return false;
    }
    //Parse the date string.
    if(!(year in song_list.day_list)) {
        return false;
    }
    //Check whether the date exist.
    const year_dates = song_list.day_list[year];
    return id > -1 && id < year_dates.length;
}

function show_song_list_year(year) {
    const current_text = $('#year-display').text();
    if(parseInt(current_text) === year) {
        return;
    }
    $('#year-display').html(year + ' <span className="caret"></span>');
    //Create the date list of the year.
    const dates = song_list.day_list[year];
    let date_list = [];
    for(let i=0; i<dates.length; ++i) {
        const day_url = '#setori&year='+year+'&id='+i;
        date_list.push('<li><a href="'+day_url+'">'+get_day_str(dates[i][0])+'</a></li>');
    }
    $('#day-list').html(date_list.join('\n'));
}

function on_live_list_year_change(year) {
    show_song_list_year(year);
    //Show the item.
    on_day_change(year, 0);
}

function load_song_list_page(callback) {
    clear_active();
    $('#p-live-list').addClass('active');
    $('#p-content').load('live-list.html', function() {
        song_list_title();
        //Set the date.
        const all_days = song_list.day_list;
        let years = Object.keys(all_days);
        for(let i=0; i<years.length; ++i) {
            years[i] = parseInt(years[i]);
        }
        years.sort().reverse();
        //Construct the year list.
        let year_items = [];
        for(let i=0; i<years.length; ++i) {
            const year_url = '#setori&year='+years[i]+'&id=0';
            year_items.push('<li><a href="'+year_url+'">'+years[i]+'</a></li>');
        }
        $('#year-list').html(year_items.join('\n'));
        //Show the latest year.
        if(callback === null) {
            on_live_list_year_change(years[0]);
        } else {
            //Call the callback.
            callback();
        }
    });
}

function find_setori_index(date_str) {
    //Parse the date string.
    let date = new Date(date_str);
    const date_year = date.getFullYear();
    if(!(date_year in song_list.day_list)) {
        return -1;
    }
    //Check whether the date exist.
    const year_dates = song_list.day_list[date_year];
    for(let i=0; i<year_dates.length; ++i) {
        if(year_dates[i][0].getMonth() === date.getMonth() && date.getDate() === year_dates[i][0].getDate()) {
            return i;
        }
    }
    return -1;
}

function show_song_list_on_date(date_str) {
    //Parse the date string.
    let date = new Date(date_str);
    //Show the date.
    load_song_list_page(function() {
        let setori_index = find_setori_index(date_str);
        if(setori_index === -1) {
            return;
        }
        const date_year = date.getFullYear();
        show_song_list_year(date_year);
        on_day_change(date_year, setori_index);
    });
}

function get_limited_songs(song_statistics) {
    let limited_youtube = [], limited_bilibili = [], not_limited = [];
    for(let i=0; i<song_statistics.length; ++i) {
        const song_info = song_statistics[i][1];
        if(song_info.b_count.length === 0) {
            limited_youtube.push(song_statistics[i]);
        } else if(song_info.y_count.length === 0) {
            limited_bilibili.push(song_statistics[i]);
        } else {
            not_limited.push(song_statistics[i]);
        }
    }
    return {'youtube': limited_youtube, 'bilibili': limited_bilibili, 'both': not_limited};
}

function check_and_load_stream_statistic() {
    //Check the song statistic.
    if(!('stream_statistic' in song_list)) {
        let stream_statistic = {};
        //Count the limited singles.
        stream_statistic.limited_songs = get_limited_songs(song_list.song_statistic);
        stream_statistic.limited_medley = get_limited_songs(song_list.medley_statistic);
        //Set the result.
        song_list.stream_statistic = stream_statistic;
    }
}

function show_limited_song(limited_songs) {
    $('#p-statistic-panel').load('statistic-limited.html', function() {
        //Render the single chart.
        const ctx = document.getElementById('single_chart');
        const single_chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Youtube',
                    'BiliBili',
                    unlimited_songs()
                ],
                datasets: [{
                    label: 'Dataset',
                    data: [limited_songs.youtube.length, limited_songs.bilibili.length, limited_songs.both.length],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            }
        });
        //Render the header of the table.
        const table_header = song_record_table_title();
        for(let i=0; i<table_header.length; ++i) {
            $('#p-limited-youtube-header-'+i).text(table_header[i]);
            $('#p-limited-bilibili-header-'+i).text(table_header[i]);
        }
        $('#p-youtube-limited-title').text(song_limited_youtube());
        $('#p-bilibili-limited-title').text(song_limited_bilibili());
        //Render the song counter.
        song_results_label('p-youtube-count', 'p-youtube-reults');
        $('#p-youtube-reults').text(limited_songs.youtube.length);
        song_results_label('p-bilibili-count', 'p-bilibili-reults');
        $('#p-bilibili-reults').text(limited_songs.bilibili.length);
        //Render the youtube song list.
        render_song_tables(limited_songs.youtube, 'p-youtube-limited-songs');
        render_song_tables(limited_songs.bilibili, 'p-bilibili-limited-songs');
    });
}

function show_statistic() {
    clear_active();
    $('#p-song-statistic').addClass('active');
    $('#p-content').load('song-statistic.html', function() {
        //Load the sidebar data.
        statistic_sidebar();
        //Check and load the song information.
        check_and_load_song_info();
        //Update the statistic information.
        check_and_load_stream_statistic();
        //Check the hash info.
        if('limited-medley' in song_list.args) {
            $('#l-limited-medley').addClass('active');
            language_list(lan_page_base, lan_my_lan, '#statistic&limited-medley');
            show_limited_song(song_list.stream_statistic.limited_medley);
            return;
        }
        //Load statistic panel, check the hash tag.
        $('#l-limited-songs').addClass('active');
        language_list(lan_page_base, lan_my_lan, '#statistic&limited');
        show_limited_song(song_list.stream_statistic.limited_songs);
    })
}

function check_and_load_day_list() {
    //Check live list empty.
    if(!('day_list' in song_list)) {
        let all_days = {};
        const records = song_list.records;
        //Parse the date.
        for(let i=0; i<records.length; ++i) {
            let live_date = new Date(records[i]['date']);
            records[i]['date'] = live_date;
            //Check whether the year already has.
            let live_year = live_date.getFullYear();
            if(live_year in all_days) {
                all_days[live_year].push([live_date, i]);
            } else {
                all_days[live_year] = [[live_date, i]];
            }
        }
        song_list.day_list = all_days;
    }
}

function count_song(song_statistic, song_name, is_y, live_id) {
    let song_info = {};
    if(song_name in song_statistic) {
        //Increase the counter.
        song_info = song_statistic[song_name];
        song_info.count += 1;
    } else {
        song_info = {'count': 1, 'y_count': [], 'b_count': [], 'last_live': live_id};
    }
    if(is_y) {
        song_info.y_count.push(live_id);
    } else {
        song_info.b_count.push(live_id);
    }
    song_statistic[song_name] = song_info;
}

function song_sort_name(a, b) {
    return a[0] === b[0] ? 0 : (a[0] < b[0] ? -1 : 1);
}

function song_sort_date(a, b) {
    const a_date = song_list.records[a[1].last_live].date, b_date = song_list.records[b[1].last_live].date;
    return (a_date === b_date) ? 0 : (a_date < b_date ? -1 : 1);
}

function song_sort_count(a, b) {
    return a[1]['count'] - b[1]['count'];
}

function song_sort_y_count(a, b) {
    return a[1]['y_count'].length - b[1]['y_count'].length;
}

function song_sort_b_count(a, b) {
    return a[1]['b_count'].length - b[1]['b_count'].length;
}

const song_sort_function = {
    0: song_sort_name,
    1: song_sort_date,
    2: song_sort_count,
    3: song_sort_y_count,
    4: song_sort_b_count,
};

function render_song_tables(song_records, content_name) {
    let song_items = [];
    for(let i=0; i<song_records.length; ++i) {
        const song_item = song_records[i];
        const song_info = song_item[1];
        let song_url = '#song-info&';
        if(is_medley_mode) {
            song_url += 'is_medley&';
        }
        song_url += 'song_name=' + song_name_to_base64(song_item[0]);
        const item_html = ['<tr>',
            '<td><a href="'+song_url+'">'+song_item[0]+'</a></td>',
            '<td>'+render_live_link(song_list.records[song_info.last_live])+', '+view_song_list_on(song_list.records[song_info.last_live])+'</td>',
            '<td>'+song_info.count+'</td>',
            '<td>'+song_info.y_count.length+'</td>',
            '<td>'+song_info.b_count.length+'</td>',
            '</tr>'];
        song_items.push(item_html.join('\n'));
    }
    $('#'+content_name).html(song_items.join('\n'));
}

function render_song_items(song_records) {
    $('#p-count-of-results').text(song_records.length);
    render_song_tables(song_records, 'p-song-list-content');
}

function display_song_items(song_records) {
    song_list_cache = song_records;
    //Sort the song items as expected.
    if(song_list.sort_column in song_sort_function) {
        song_list_cache.sort(song_sort_function[song_list.sort_column]);
        if(song_list.reverse) {
            song_list_cache.reverse();
        }
    }
    //Render the song items.
    render_song_items(song_list_cache);
}

function filter_songs(keyword) {
    //Loop and search the result.
    keyword = keyword.toLowerCase();
    let search_results = [];
    for(let i=0; i<target_records.length; ++i) {
        if(target_records[i][0].toLowerCase().match(keyword)) {
            search_results.push(target_records[i]);
        }
    }
    display_song_items(search_results);
}

function on_column_click(column_id) {
    for(let i=0; i<5; ++i) {
        $('#sort-mark-'+i).text('');
    }
    if(song_list.sort_column !== column_id) {
        song_list.sort_column = column_id;
        song_list.reverse = false;
    } else {
        song_list.reverse = !song_list.reverse;
    }
    if(song_list.reverse) {
        $('#sort-mark-'+column_id).text(sort_descend());
    } else {
        $('#sort-mark-'+column_id).text(sort_ascend());
    }
    display_song_items(song_list_cache);
}

function convert_statistic_to_records(statistic_records) {
    let song_names = Object.keys(statistic_records);
    song_names.sort();
    let song_records = [];
    for(let i=0; i<song_names.length; ++i) {
        song_records.push([song_names[i], statistic_records[song_names[i]]]);
    }
    return song_records;
}

function check_and_load_song_info() {
    //Check live list empty.
    if(!('song_statistic' in song_list)) {
        let song_statistic = {}, medley_statistic = {};
        const records = song_list.records;
        for(let i=0; i<records.length; ++i) {
            const live_record = records[i];
            const is_y = (live_record.url_y.length > 0);
            const songs = live_record.songs;
            //Only count the song which is not in medley.
            let medley = [], normal = [], last_medley = false;
            for(let j=0; j<songs.length; ++j) {
                if(songs[j][0] === '\t') {
                    //Last title is medley title, remove it.
                    if(!last_medley) {
                        normal.pop();
                    }
                    medley.push(songs[j]);
                    last_medley = true;
                } else {
                    normal.push(songs[j]);
                    last_medley = false;
                }
            }
            for(let j=0; j<normal.length; ++j) {
                count_song(song_statistic, normal[j], is_y, i);
            }
            for(let j=0; j<medley.length; ++j) {
                count_song(medley_statistic, medley[j], is_y, i);
            }
        }
        //Sort the song list.
        song_list.song_statistic = convert_statistic_to_records(song_statistic);
        song_list.medley_statistic = convert_statistic_to_records(medley_statistic);
    }
}

function show_song_list(is_medley) {
    check_and_load_song_info();
    clear_active();
    is_medley_mode = is_medley;
    let suffix = '#';
    if(is_medley) {
        $('#p-medley-list').addClass('active');
        suffix += 'medley-list';
    } else {
        $('#p-song-list').addClass('active');
        suffix += 'song-list';
    }
    //Update the language list URL.
    language_list(lan_page_base, lan_my_lan, suffix);
    $('#p-content').load('song-list.html', function() {
        //Set the title.
        song_record_title();
        const table_header = song_record_table_title();
        $('#p-song-name').text(table_header[0]);
        $('#p-song-last').text(table_header[1]);
        $('#p-song-times').text(table_header[2]);
        $('#p-song-at-youtube').text(table_header[3]);
        $('#p-song-at-bilibili').text(table_header[4]);
        //Add event listener.
        document.getElementById('p-search-song').oninput = function(event) {
            filter_songs(event.target.value);
        }
        //Hook the sort function.
        document.getElementById('p-song-header-0').onclick = function(event) {on_column_click(0);}
        document.getElementById('p-song-header-1').onclick = function(event) {on_column_click(1);}
        document.getElementById('p-song-header-2').onclick = function(event) {on_column_click(2);}
        document.getElementById('p-song-header-3').onclick = function(event) {on_column_click(3);}
        document.getElementById('p-song-header-4').onclick = function(event) {on_column_click(4);}
        if(is_medley) {
            target_records = song_list.medley_statistic;
        } else {
            target_records = song_list.song_statistic;
        }
        //Reset the sort column and reverse state.
        song_list.sort_column = 0;
        song_list.reverse = false;
        if(song_list.reverse) {
            $('#sort-mark-0').text(sort_descend());
        } else {
            $('#sort-mark-0').text(sort_ascend());
        }
        display_song_items(target_records);
    });
}

function search_song_info(song_name, records) {
    for(let i=0; i<records.length; ++i) {
        if(records[i][0] === song_name) {
            return records[i];
        }
    }
    return null;
}

function show_song_info(is_medley, song_name) {
    //Show the song info.
    check_and_load_song_info();
    clear_active();
    is_medley_mode = is_medley;
    let suffix = '#song-info&';
    if(is_medley) {
        $('#p-medley-list').addClass('active');
        suffix += 'is_medley&';
    } else {
        $('#p-song-list').addClass('active');
    }
    suffix += 'song_name=' + song_name;
    //Update Multi-language URL.
    language_list(lan_page_base, lan_my_lan, suffix);
    $('#p-content').load('song-info.html', function() {
        //Set the title.
        set_song_detail_title();
        //Restore the song name.
        song_name = decodeURIComponent(escape(window.atob(song_name)));
        //Set the title.
        let song_title = song_name;
        if(is_medley) {
            song_title += medley_label();
        }
        $('#p-song-title').text(song_title);
        //Loop up the song title.
        const song_detail = search_song_info(song_name, is_medley ? song_list.medley_statistic : song_list.song_statistic);
        if(song_detail === null) {
            return;
        }
        const song_info = song_detail[1];
        $('#p-total-times').text(song_info.count);
        $('#p-youtube-times').text(song_info.y_count.length);
        $('#p-bilibili-times').text(song_info.b_count.length);
        $('#p-last-live').html(render_live_link(song_list.records[song_info.last_live]));
        //Render live list.
        let live_html = [];
        for(let i=0; i<song_info.y_count.length; ++i) {
            const record = song_list.records[song_info.y_count[i]];
            live_html.push('<li>'+render_live_link(record)+', '+view_song_list_on(record)+'</li>');
        }
        $('#p-youtube-lives').html(live_html.join('\n'));
        live_html = [];
        for(let i=0; i<song_info.b_count.length; ++i) {
            const record = song_list.records[song_info.b_count[i]];
            live_html.push('<li>'+render_live_link(record)+', '+view_song_list_on(record)+'</li>');
        }
        $('#p-bilibili-lives').html(live_html.join('\n'));
    });
}

function load_song_list(song_list, callback) {
    $.getJSON("live-info/song_list.json", function(records) {
        song_list.records = records;
        //Statistic the live days.
        callback(song_list);
    });
}

function handle_hash_args() {
    check_and_load_day_list();
    //Process the arguments.
    song_list.args = parse_parameter();
    if('statistic' in song_list.args) {
        show_statistic();
        return;
    }
    if('song-list' in song_list.args) {
        show_song_list(false);
        return;
    }
    if ('medley-list' in song_list.args) {
        show_song_list(true);
        return;
    }
    if ('song-info' in song_list.args && 'song_name' in song_list.args) {
        if(song_list.args.song_name.length > 0) {
            show_song_info('is_medley' in song_list.args, song_list.args.song_name);
            return;
        }
    }
    //Default operation, just show the setori.
    if('date' in song_list.args && find_setori_index(song_list.args.date) !== -1) {
        show_song_list_on_date(song_list.args.date);
        return;
    }
    if ('year' in song_list.args && 'id' in song_list.args && is_year_id_valid(song_list.args.year, song_list.args.id)) {
        //Show the date.
        load_song_list_page(function() {
            const date_year = parseInt(song_list.args.year);
            show_song_list_year(date_year);
            on_day_change(date_year, parseInt(song_list.args.id));
        });
        return;
    }
    load_song_list_page(null);
}

function on_song_list_loaded(song_list) {
    //Process the hash result.
    handle_hash_args();
    //Set the hash change function.
    window.addEventListener('hashchange', handle_hash_args, false);
}