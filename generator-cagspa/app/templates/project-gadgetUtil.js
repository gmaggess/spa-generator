var gadgetUtil = {
    showNotification: function() {
        var notificationHeader;
        var notificationBody;
        if (!arguments || arguments.length === 0) {
            return false;
        }
        if (arguments.length === 1) {
            notificationHeader = MSG_dialog_header;
            notificationBody = arguments[0];
        } else {
            notificationHeader = arguments[0];
            notificationBody = arguments[1];
            for (var i = 2; i < arguments.length; i++) {
                notificationBody = notificationBody.replace("{" + (i - 2) + "}", arguments[i]);
            }
        }
        $('#wcAdminDialogHeader').text(notificationHeader);
        $('#wcAdminDialogBody').text(notificationBody);
        $('#wcAdminDialogButton').click(gadgetUtil.closeDialog);
        $('#wcAdminDialog').show();
        return true;
    },
    closeDialog: function(event) {
        event.stopPropagation();
        $('#wcAdminDialog').hide();
    }
}