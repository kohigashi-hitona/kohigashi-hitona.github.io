function create_banner(button_text) {
    const banner_div = [
        '<div class="container">',
        '<div class="hitona-links">',
        '<button id="hitona-twitter" type="button" class="btn btn-default"><span><div class="nav-icon icon-twitter"></div></span>'+button_text[0]+'</button>',
        '<button id="hitona-youtube" type="button" class="btn btn-default"><span><div class="nav-icon icon-youtube"></div></span>'+button_text[1]+'</button>',
        '<button id="hitona-bilibili" type="button" class="btn btn-default"><span><div class="nav-icon icon-bilibili"></div></span>'+button_text[2]+'</button>',
        '<button id="hitona-fanbox" type="button" class="btn btn-default"><span><div class="nav-icon icon-fanbox"></div></span>'+button_text[3]+'</button>',
        '</div>',
        '</div>'
    ]
    let banner = $('.hitona-banner');
    banner.empty();
    banner.append(banner_div.join('\n'));
    //Set links
    document.getElementById('hitona-twitter').onclick = function () {
        window.location.href = 'https://twitter.com/kohigashihitona';
    }
    document.getElementById('hitona-youtube').onclick = function () {
        window.location.href = 'https://www.youtube.com/channel/UCV2m2UifDGr3ebjSnDv5rUA';
    }
    document.getElementById('hitona-bilibili').onclick = function () {
        window.location.href = 'https://space.bilibili.com/441382432';
    }
    document.getElementById('hitona-fanbox').onclick = function () {
        window.location.href = 'https://kohigashihitona.fanbox.cc/';
    }
}
