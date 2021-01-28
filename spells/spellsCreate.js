// this file will stop the spell creation form from refreshing the page, it will instead stay on the same page.

$('form.spellsCreate').on('submit', function() {

    var that = $(this),
        url = that.attr('action'),
        type = that.attr('method'),
        data = {};

    that.find('[name]').each(function(index, value) {
        var that = $(this),
            name = that.attr('name'),
            value = that.val();

            data[name] = value;
    })

    $.ajax({
        url: url,
        type: type,
        async: false,
        data: data
    });

    // This will clear the text form that the message box is in.
    $("form.spellsCreate")[0].reset();
    toggleSpellsCreateUi();
    loadList();
    return false;
});
