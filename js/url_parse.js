let page_base_url = '';

function split_first(raw, key) {
    const pos = raw.indexOf(key);
    if(pos===-1) {
        return [raw, ''];
    }
    return [raw.substring(0, pos), raw.substring(pos+1)]
}

function parse_parameter() {
    //Extract the parameter from the URL.
    const root_exp = new RegExp('.*(?=\/)'), page_url=window.location.href;
    const root = root_exp.exec(page_url).toString() + '/';
    let page_params = split_first(page_url.substring(root.length), '#');
    page_base_url = root + page_params[0];
    page_params = page_params[1];
    //Parse and construct the keys.
    let keys = {};
    for(let i of page_params.split('&')) {
        const param_info = split_first(i, '=');
        keys[param_info[0]] = param_info[1];
    }
    return keys;
}