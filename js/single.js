function generate_card(card_info) {
    let single_url = card_info.y_url;
    if(single_url.length === 0 || single_list.force_bilibili) {
        single_url = card_info.b_url;
    }
    let card_htmls = [
        '<div class="col">',
        '<div class="card shadow-sm">'];
    card_htmls.push('<a href="'+single_url+'">');
    let card_extend = [
        '<img class="bd-placeholder-img card-img-top" src="'+card_info.img+'" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">',
        '<rect width="100%" height="100%" fill="#55595c"></rect>',
        '</img>',
        '</a>',
        '<div class="card-body">',
        '<p class="card-text">'+card_info.title+'</p>',
        '<div class="d-flex justify-content-between align-items-center">'
    ];
    card_htmls = card_htmls.concat(card_extend);
    if(card_info.y_url.length > 0) {
        card_htmls.push('<a href="'+card_info.y_url+'"><button type="button" class="album-btn btn btn-sm btn-outline-secondary"><span><div class="nav-icon icon-youtube"></div></span>Youtube</button></a>');
    }
    if(card_info.b_url.length > 0) {
        card_htmls.push('<a href="'+card_info.b_url+'" rel="noreferrer noopener"><button type="button" class="album-btn btn btn-sm btn-outline-secondary"><span><div class="nav-icon icon-bilibili"></div></span>BiliBili</button></a>');
    }
    card_extend =[
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ];
    card_htmls = card_htmls.concat(card_extend);
    return card_htmls.join('\n');
}

function render_single_cards(records) {
    //Set the cards.
    $('#p-count-of-results').text(records.length);
    //Render the cards.
    const row_start = '<div class="row">', row_end = '</div>';
    let card_html = [row_start], card_column = 0;
    for(let i=0; i<records.length; ++i) {
        card_html.push(generate_card(records[i]));
        ++card_column;
        if(card_column === 4) {
            card_column = 0;
            card_html.push(row_end);
            card_html.push(row_start);
        }
    }
    card_html.push('</div>');
    $('#hitona-single').html(card_html.join('\n'));
}

function search_single(keyword) {
    //Filter the singles.
    if(keyword.length === 0) {
        render_single_cards(single_list.records);
        return;
    }
    //Update the keyword.
    keyword = keyword.toLowerCase();
    //Filter the list with the keyword.
    let results = [];
    for(let i=0; i<single_list.records.length; ++i) {
        const single_record = single_list.records[i];
        if(single_record.title.toLowerCase().match(keyword)) {
            results.push(single_record);
        }
    }
    render_single_cards(results);
}

function create_single_card(single_list) {
    //Loop and generate the records.
    render_single_cards(single_list.records);
}

function load_single_list(single_list, callback) {
    $.getJSON("live-info/single.json", function(single_records) {
        //Parse the date.
        single_records.reverse();
        single_list.records = single_records;
        callback(single_list);
    });
}