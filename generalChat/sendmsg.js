// this script basically stops the chat form from sending the new message to the actual file
// it instead treats it as an ajax request to sendmsg.inc.php and stops the page from refreshing
$('form.chat').on('submit', function() {

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
        data: data
    });

    // This will clear the text form that the message box is in.
    $("form.chat")[0].reset();

    return false;
});
