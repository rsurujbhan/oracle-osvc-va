RightNow.namespace('Custom.Widgets.chat.OvaOriginalEndUserMessage');
Custom.Widgets.chat.OvaOriginalEndUserMessage = RightNow.Widgets.extend({
    /**
     * Widget constructor.
     */
    constructor: function () {
        RightNow.Event.subscribe("evt_chatEngagementParticipantAddedResponse", this._handleParticipantAdded, this);
    },

    /**
     * _handleParticipantAdded method
     */
    _handleParticipantAdded: function (type, args) {
        //console.info("_handleParticipantAdded");
        //console.log(type);
        //console.log(args);

        if (args[0].data.virtualAgent && args[0].data.role === "LEAD") {
            this._sendOriginalEuMessage();
        }
    },

    /**
     * _sendOriginalEuMessage method
     */
    _sendOriginalEuMessage: function () {
        //console.info("_sendOriginalEuMessage");
        var eo = new RightNow.Event.EventObject(this, {
            data: {
                messageBody: this.data.attrs.eu_message_text,
                isEndUserPost: true,
                isOffTheRecord: false
            }
        });

        RightNow.Event.fire("evt_chatPostMessageRequest", eo);
    }
});