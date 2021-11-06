let current_page = '', lan_page_base = '', lan_my_lan = '';

var languages = {
    'cn': '中文',
    'jp': '日本語',
    'en': 'English',
}

function nav_urls(my_lan) {
    $('#nav-stream').attr('href', 'index-'+my_lan+'.html');
    $('#nav-calender').attr('href', 'calender-'+my_lan+'.html');
    $('#nav-single').attr('href', 'single-'+my_lan+'.html');
    $('#nav-song-list').attr('href', 'song-list-'+my_lan+'.html');
    $('#nav-utils').attr('href', 'utils-'+my_lan+'.html');
}

function language_list(page_base, my_lan, suffix) {
    //Construct the current page string.
    current_page = page_base + '-' + my_lan;
    lan_page_base = page_base;
    lan_my_lan = my_lan;
    $('#nav-li-'+page_base).addClass('nav-header-active');
    // Get the current language from the list.
    $('#nav-my-language').html(languages[my_lan]+'<span class="caret"></span>');
    //Insert all the other languages.
    var nav_lan_list = [];
    for (const [lan, lan_text] of Object.entries(languages)) {
        if(lan === my_lan) {
            continue;
        }
        let nav_href = page_base+'-'+lan+'.html';
        if(suffix !== undefined) {
            nav_href += suffix;
        }
        nav_lan_list.push('<li><a href="'+nav_href+'">'+lan_text+'</a></li>');
    }
    $('#nav-language-list').html(nav_lan_list.join('\n'));
}