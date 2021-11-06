const contacts = ['Twitter', 'Youtube', 'Bilibili', 'Fanbox'];

function today_luck() {
    return "Today's fortune";
}

function forecast_title() {
    return 'Stream Schedule';
}

function medley_label() {
    return '(Medley)'
}

function sort_ascend() {
    return '↑Ascend';
}

function sort_descend() {
    return '↓Descend';
}

function view_date_song_list() {
    return 'View the song list';
}

function day_of_the_week(day) {
    switch (day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}

function unlimited_songs() {
    return 'Unlimited songs';
}

function statistic_sidebar() {
    $('#limited-songs').text('Limited Singles');
    $('#limited-medley').text('Limited Medley');
}

function util_list_nav() {
    $('#p-label-omikuji').text('Omikuji');
    $('#p-label-hitona-button').text('Hitona Button');
}

function song_list_nav() {
    $('#p-label-live-list').text('Song List');
    $('#p-label-song-list').text('Single song');
    $('#p-label-medley-list').text('Medley song');
    $('#p-label-song-statistic').text('Statistic');
}

function set_song_detail_title() {
    $('#p-last-live-title').text('Last sung: ');
    $('#p-total-sing-title').text('Times total: ');
    $('#p-youtube-sing-title').text('Times on Youtube: ');
    $('#p-bilibili-sing-title').text('Times on Bilibili: ');
}

function song_list_title() {
    $('#p-date-selector-title').text('Live Date');
}

function song_record_table_title() {
    return ['Song Name', 'Last sung', 'Times', 'Times @ Youtube', 'Times @ Bilibili'];
}

function song_results_label(host_id, number_id) {
    $('#'+host_id).html('<span id="'+number_id+'"></span><span> results</span>');
}

function song_limited_youtube() {
    return 'Youtube Limited';
}

function song_limited_bilibili() {
    return 'Bilibili Limited';
}

function song_record_title() {
    song_results_label('num-of-results', 'p-count-of-results');
    $('#p-search-song').attr('placeholder', 'Search songs');
}

function set_nav(page_base) {
    var nav_brand = $('#nav-brand');
    nav_brand.text('Unofficial Hitona Stream Information');
    nav_brand.attr('href', 'index-en.html');
    $('#nav-stream').text('Stream');
    $('#nav-calender').text('Calender');
    $('#nav-single').text('Single');
    $('#nav-song-list').text('Song List');
    $('#nav-utils').text('Toy');
    nav_urls('en');
    language_list(page_base, 'en');
}

function set_footer() {
    $('#f-stores').text('Official Stores');
    $('#f-channels').text('Channels');
    $('#f-lives-info').text('Live Rooms');

    $('#f-booth').text('Booth');
    $('#f-twitter').text('Twitter');
    $('#f-youtube').text('Youtube');
    $('#f-bilibili').text('Bilibili');
    $('#f-fanbox').text('Pixiv Fanbox');
    $('#f-twitcasting').text('TwitCasting');
    $('#f-bilibili-schedule').text('BiliBili Schedule');
    $('#f-bilibili-live').text('BiliBili Live');

    $('#f-maintainer').html('Designed, built and maintained with all the love in the world by <a href="https://space.bilibili.com/31049854">小东人魚午安社</a> and all Koningyos.');
    $('#f-license').html('Code licensed <a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io/blob/master/LICENSE" rel="license noopener" target="_blank">HITONA SOFTWARE LICENSE</a> (avilable at <a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io">Github</a>), docs <a href="https://creativecommons.org/licenses/by/3.0/" rel="license noopener" target="_blank">CC BY 3.0</a>.')
}