const contacts = ['Twitter', 'Youtube', 'Bilibili', 'FANBOX'];

function today_luck() {
    return '今日の運勢';
}

function forecast_title() {
    return '小東スケジュール';
}

function medley_label() {
    return '（メドレ）'
}

function sort_ascend() {
    return '↑昇順';
}

function sort_descend() {
    return '↓降順';
}

function view_date_song_list() {
    return 'セトリを見る';
}

function day_of_the_week(day) {
    switch (day) {
        case 0:
            return '日曜日';
        case 1:
            return '月曜日';
        case 2:
            return '火曜日';
        case 3:
            return '水曜日';
        case 4:
            return '木曜日';
        case 5:
            return '金曜日';
        case 6:
            return '土曜日';
    }
}

function unlimited_songs() {
    return '限定されていない曲';
}

function statistic_sidebar() {
    $('#limited-songs').text('限定曲');
    $('#limited-medley').text('限定メドレ');
}

function util_list_nav() {
    $('#p-label-omikuji').text('御神籤');
    $('#p-label-hitona-button').text('ひとなボタン');
}

function song_list_nav() {
    $('#p-label-live-list').text('セトリ');
    $('#p-label-song-list').text('曲');
    $('#p-label-medley-list').text('メドレ曲');
    $('#p-label-song-statistic').text('統計');
}

function set_song_detail_title() {
    $('#p-last-live-title').text('最後に歌った日：');
    $('#p-total-sing-title').text('全回数：');
    $('#p-youtube-sing-title').text('Youtubeでの回数：');
    $('#p-bilibili-sing-title').text('Bilibiliでの回数：');
}

function song_list_title() {
    $('#p-date-selector-title').text('配信日');
}

function song_record_table_title() {
    return ['曲名', '最後に歌った日', '全回数', 'Youtubeでの回数', 'Bilibiliでの回数'];
}

function song_results_label(host_id, number_id) {
    $('#'+host_id).html('<span id="'+number_id+'"></span><span> 件</span>');
}

function song_limited_youtube() {
    return 'Youtube 限定曲';
}

function song_limited_bilibili() {
    return 'BiliBili 限定曲';
}

function song_record_title() {
    song_results_label('num-of-results', 'p-count-of-results');
    $('#p-search-song').attr('placeholder', '曲を検索');
}

function set_nav(page_base) {
    var nav_brand = $('#nav-brand');
    nav_brand.text('非公式小東ひとな配信情報サイト');
    nav_brand.attr('href', 'index-jp.html');
    $('#nav-stream').text('配信');
    $('#nav-calender').text('カレンダ');
    $('#nav-single').text('シングル');
    $('#nav-song-list').text('セトリ');
    $('#nav-utils').text('おもちゃ');
    nav_urls('jp');
    language_list(page_base, 'jp');
}

function set_footer() {
    $('#f-stores').text('公式ストア');
    $('#f-channels').text('ひとなんチャネル');
    $('#f-lives-info').text('配信ルーム');

    $('#f-booth').text('Booth');
    $('#f-twitter').text('Twitter');
    $('#f-youtube').text('Youtube');
    $('#f-bilibili').text('Bilibili');
    $('#f-fanbox').text('Pixiv FANBOX');
    $('#f-twitcasting').text('TwitCasting');
    $('#f-bilibili-schedule').text('BiliBiliスケジュール');
    $('#f-bilibili-live').text('BiliBili配信ルーム');

    $('#f-maintainer').html('ひとながずっと幸せでいられますように。<br>このサイトは<a href="https://space.bilibili.com/31049854">小东人魚午安社</a>と小人魚のみんなが設計、構築、メンテナンスしています。');
    $('#f-license').html('コードライセンスは<a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io/blob/master/LICENSE" rel="license noopener" target="_blank">HITONAソフトライセンス</a>（コード本体は<a href="https://github.com/kohigashi-hitona/kohigashi-hitona.github.io">Github</a>であります）、データライセンスは <a href="https://creativecommons.org/licenses/by/3.0/" rel="license noopener" target="_blank">CC BY 3.0</a>。')
}