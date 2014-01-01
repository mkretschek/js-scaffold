define(function () {
  // These events are defined in the Clipboard API specification.
  // @see http://www.w3.org/TR/clipboard-apis/#event-types-and-details
  return {
    // @interface Event
    // NOTE: in IE this event uses the DragEvent interface.
    // Occurs before the selection is copied from the document and provides a
    // possibility to enable the Copy menu item.
    BEFORE_COPY : 'beforecopy',

    // @interface Event
    // NOTE: in IE this event uses the DragEvent interface.
    // Occurs before the selection is cut from the document and provides a
    // possibility to enable the Cut menu item.
    BEFORE_CUT : 'beforecut',

    // @interface Event
    // NOTE: in IE this event uses the DragEvent interface.
    // Occurs before the contents of the clipboard are pasted into the
    // document and provides a possibility to enable the Paste menu item.
    BEFORE_PASTE : 'beforepaste',

    // @interface ClipboardEvent
    // The text selection has been added to the clipboard.
    COPY : 'copy',

    // @interface ClipboardEvent
    // The text selection has been removed from the document and added to
    // the clipboard.
    CUT : 'cut',

    // @interface ClipboardEvent
    // Data has been transfered from the system clipboard to the document.
    PASTE : 'paste'
  };
});
