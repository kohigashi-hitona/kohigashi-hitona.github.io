function clear_active() {
    $('#p-omikuji').removeClass('active');
    $('#p-hitona-button').removeClass('active');
}

function handle_hash_args() {
    //Update the title.
    clear_active();
    //Process the arguments.
    const args = parse_parameter();
    if('hitona-button' in args) {
        language_list(lan_page_base, lan_my_lan, '#hitona-button');
        $('#p-hitona-button').addClass('active');
        show_hitona_button();
        return;
    }
    //Load the default action.
    language_list(lan_page_base, lan_my_lan, '#omikuji');
    $('#p-omikuji').addClass('active');
    show_omikuji();
}

function load_function() {
    //Process the hash result.
    handle_hash_args();
    //Set the hash change function.
    window.addEventListener('hashchange', handle_hash_args, false);
}