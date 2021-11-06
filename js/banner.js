function construct_banner() {
    // if(video_list.force_bilibili)
    $.getJSON("live-info/slides.json", function(slide_info) {
        let indicator = [], item_data = [];
        for(let i=0; i<slide_info.length; ++i) {
            // Dot
            let indicator_class = (i === 0) ? "active" : "";
            indicator.push('<li data-target="#main-carousel" data-slide-to="'+i+'" class="'+indicator_class+'"></li>');
            if (i === 0) {
                indicator_class = " active";
            }
            const item_info = slide_info[i];
            //Check whether we have a force url.
            let target_url = '/';
            if(item_info.url.length > 0) {
                target_url = item_info.url;
            } else {
                if(item_info['youtube-url'].length > 0 && !video_list.force_bilibili) {
                    target_url = item_info['youtube-url'];
                } else {
                    target_url = item_info['bilibili-url'];
                }
            }
            // Content
            let item_html = [
                '<div class="item'+indicator_class+'">',
                '<a href="'+target_url+'" target="_blank" rel="noreferrer noopener">',
                '<img class="slide" src="/live-info/'+item_info.img+'" alt="'+i+' slide">',
                '<div class="carousel-caption">',
                '<div class="carousel-container">',
                '<h1>'+item_info.title+'</h1>',
                '<p></p>',
                '</div>',
                '</div>',
                '</a>',
                '</div>'
            ];
            item_data.push(item_html.join('\n'));
        }
        $('#banner-indicator').html(indicator.join('\n'));
        $('#banner-content').html(item_data.join('\n'));
    });
}