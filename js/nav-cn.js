const contacts = ['推特', '油管', 'B站', 'FANBOX'];

function today_luck() {
    return "今天的运势";
}

function forecast_title() {
    return '本周直播预告';
}

function medley_label() {
    return '（串烧）'
}

function sort_ascend() {
    return '↑升序';
}

function sort_descend() {
    return '↓降序';
}

function view_date_song_list() {
    return '查看当日歌单';
}

function day_of_the_week(day) {
    switch (day) {
        case 0:
            return '星期日';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
    }
}

function unlimited_songs() {
    return '非限定曲';
}

function statistic_sidebar() {
    $('#limited-songs').text('限定单曲');
    $('#limited-medley').text('限定串烧曲');
}

function util_list_nav() {
    $('#p-label-omikuji').text('御神签');
    $('#p-label-hitona-button').text('人鱼按钮');
}

function song_list_nav() {
    $('#p-label-live-list').text('歌单');
    $('#p-label-song-list').text('单曲列表');
    $('#p-label-medley-list').text('串烧列表');
    $('#p-label-song-statistic').text('统计');
}

function set_song_detail_title() {
    $('#p-last-live-title').text('最后一次演唱：');
    $('#p-total-sing-title').text('直播中演唱次数：');
    $('#p-youtube-sing-title').text('在油管上演唱次数：');
    $('#p-bilibili-sing-title').text('在B站上演唱次数：');
}

function song_list_title() {
    $('#p-date-selector-title').text('直播日期');
}

function song_record_table_title() {
    return ['曲名', '最近一次演唱', '演唱次数', '油管演唱次数', 'B站演唱次数'];
}

function song_results_label(host_id, number_id) {
    $('#'+host_id).html('<span id="'+number_id+'"></span><span> 个结果</span>');
}

function song_limited_youtube() {
    return '油管限定曲';
}

function song_limited_bilibili() {
    return 'B站限定曲';
}

function song_record_title() {
    song_results_label('num-of-results', 'p-count-of-results');
    $('#p-search-song').attr('placeholder', '搜索歌曲');
}

function set_nav(page_base) {
    var nav_brand = $('#nav-brand');
    nav_brand.text('小东人鱼非官方直播信息站');
    nav_brand.attr('href', 'index-cn.html');
    $('#nav-stream').text('直播');
    $('#nav-calender').text('日历');
    $('#nav-single').text('单曲');
    $('#nav-song-list').text('歌单');
    $('#nav-utils').text('摸鱼');
    nav_urls('cn');
    language_list(page_base, 'cn');
}

function set_footer() {
    $('#f-stores').text('官方商店');
    $('#f-channels').text('频道连接');
    $('#f-lives-info').text('直播间');

    $('#f-booth').text('Booth');
    $('#f-twitter').text('Twitter');
    $('#f-youtube').text('Youtube');
    $('#f-bilibili').text('Bilibili');
    $('#f-fanbox').text('Pixiv FANBOX');
    $('#f-twitcasting').text('TwitCasting');
    $('#f-bilibili-schedule').text('BiliBili主播日历');
    $('#f-bilibili-live').text('BiliBili直播间');

    $('#f-maintainer').html('本站由小人鱼们设计、构建和维护。');
    $('#f-license').html('源代码以<a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io/blob/master/LICENSE" rel="license noopener" target="_blank">HITONA软件协议</a>授权（网站源代码可在<a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io">这里</a>获取），所有的数据以<a href="https://creativecommons.org/licenses/by/3.0/" rel="license noopener" target="_blank">CC 3.0</a>的形式分发。')
}