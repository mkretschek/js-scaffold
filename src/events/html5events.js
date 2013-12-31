define(function () {
  // HTML5 events
  // Note: Unless stated otherwise, the following events are defined in the
  // HTML5 spec.
  //
  // @see HTML5 (http://www.w3.org/TR/html5/index.html#events-0)
  // @see HTML5 media (http://www.w3.org/TR/html5/embedded-content-0.html#mediaevents)
  // @see HTML5 offline (http://www.w3.org/TR/html5/browsers.html#appcacheevents)
  // @see Server Sent Events (http://dev.w3.org/html5/eventsource/)
  
  return {
    // @interface Event
    // @see DOM L3's abort event.
    // Fired at the Window when the download was aborted by the user.
    // ABORT : 'abort',
    
    // @interface Event
    // @spec HTML5 media
    // @see Progress' abort event.
    // @see XMLHttpRequest's abort event.
    // The user agent stops fetching the media data before it is completely
    // downloaded, but not due to an error.
    // ABORT : 'abort',

    // @interface Event
    // The associated document has started printing or the print preview
    // has been closed.
    AFTER_PRINT : 'afterprint',

    // @interface Event
    // The associated document is about to be printed or previewed for
    // printing.
    BEFORE_PRINT : 'beforeprint',

    // @interface BeforeUnloadEvent
    BEFORE_UNLOAD : 'beforeunload',

    // @interface Event
    // @see DOM L3's blur event.
    // Fired at nodes losing focus.
    // BLUR  : 'blur',
    
    // @interface Event
    // @spec HTML5 offline
    // The resources listed in the manifest have been downloaded, and the
    // application is now cached.
    CACHED : 'cached',

    // @interface Event
    // @spec HTML5 media
    // The user agent can play the media, but estimates that not enough data
    // has been loaded to play the media up to its end without having to stop
    // for further buffering of content.
    CAN_PLAY : 'canplay',

    // @interface Event
    // @spec HTML5 media
    // The user agent can play the media, and estimates that enough data has
    // been loaded to play the media up to its end without having to stop for
    // further buffering of content.
    CAN_PLAY_THROUGH : 'canplaythrough',

    // @interface Event
    // An element loses focus and its value changed since gaining focus.
    CHANGE : 'change',

    // @interface Event
    // @see DOM L3's click event.
    // Fired at an element before its activation behavior is run.
    // CLICK : 'click',

    // @interface Event
    // @spec HTML5 offline
    // The user agent is checking for an update, or attempting to download
    // the cache manifest for the first time.
    CHECKING : 'checking',

    // @interface MouseEvent
    // The right button of the mouse is clicked (before the context menu is
    // displayed).
    CONTEXT_MENU : 'contextmenu',

    // @interface Event
    // The document has finished loading (but not its dependent resources).
    DOM_CONTENT_LOADED : 'DOMContentLoaded',

    // @interface Event
    // @spec HTML5 offline
    // The user agent has found an update and is fetching it, or is
    // downloading the resources listed by the manifest for the first time.
    DOWNLOADING : 'downloading',

    // @interface DragEvent
    // An element or text selection is being dragged (every 350ms).
    DRAG : 'drag',

    // @interface DragEvent
    // A drag operation is being ended (by releasing a mouse button or hitting
    // the escape key).
    DRAG_END : 'dragend',

    // @interface DragEvent
    // A dragged element or text selection enters a valid drop target.
    DRAG_ENTER : 'dragenter',

    // @interface DragEvent
    // A dragged element or text selection leaves a valid drop target.
    DRAG_LEAVE : 'dragleave',

    // @interface DragEvent
    // An element or text selection is being dragged over a valid drop target
    // (every 350ms).
    DRAG_OVER : 'dragover',

    // @interface DragEvent
    // The user starts dragging an element or text selection.
    DRAG_START : 'dragstart',

    // @interface DragEvent
    // An element is dropped on a valid drop target.
    DROP : 'drop',

    // @interface Event
    // @spec HTML5 media
    // The duration attribute has been updated.
    DURATION_CHANGE : 'durationchange',

    // @interface Event
    // @spec HTML5 media
    // The media has become empty; for example, this event is sent if the
    // media has already been loaded (or partially loaded), and the load()
    // method is called to reload it.
    EMPTIED : 'emptied',

    // @interface Event
    // @spec HTML5 media
    // Playback has stopped because the end of the media was reached.
    ENDED : 'ended',

    // @interface Event
    // @spec HTML5 media
    // @see Progress' error event.
    // @see XMLHttpRequest's error event.
    // An error occurs while fetching the media data.
    // ERROR : 'error',

    // @interface Event
    // @see DOM L3's error event.
    // Fired at elements when network and script errors occur.
    // ERROR : 'error',
    
    // @interface Event
    //
    // @spec HTML5 offline
    // An error occurred while downloading the cache manifest or updating
    // the content of the application.
    //
    //   * The manifest was a 404 or 410 page, so the attempt to cache
    //   the application has been aborted.
    //
    //   * The manifest hadn't changed, but the page referencing the
    //   manifest failed to download properly.
    //
    //   * A fatal error occurred while fetching the resources listed in
    //   the manifest.
    //
    //   * The manifest changed while the update was being run.
    //
    // @spec Server Sent Events
    // An event source connection has been failed.
    ERROR : 'error',

    // @interface Event
    // @see DOM L3's focus event.
    // Fired at nodes gaining focus.
    // FOCUS : 'focus',

    // @interface HashChangeEvent
    // The fragment identifier of the URL has changed (the part of the URL
    // after the #).
    HASH_CHANGE : 'hashchange',

    // @interface Event
    // The value of an element changes or the content of an element with the
    // attribute contenteditable is modified.
    INPUT : 'input',

    // @interface Event
    // A submittable element has been checked and doesn't satisfy its
    // constraints.
    INVALID : 'invalid',

    // @interface Event
    // @see DOM L3's load event.
    // Fired at the Window when the document has finished loading; fired at
    // an element containing a resource (e.g. img, embed) when its resource
    // has finished loading.
    // LOAD : 'load',
    
    // @interface Event
    // @spec HTML5 media
    // @see Progress' loadstart event.
    // @see XMLHttpRequest loadstart event.
    // The user agent begins looking for media data, as part of the resource
    // selection algorithm.
    // LOAD_START : 'loadstart',

    // @interface Event
    // @spec HTML5 media
    // The first frame of the media has finished loading.
    LOADED_DATA : 'loadeddata',

    // @interface Event
    // @spec HTML5 media
    // The metadata has been loaded.
    LOADED_METADATA : 'loadedmetadata',

    // @interface MessageEvent
    // @spec Server Sent Events
    // A message is received through an event source.
    MESSAGE : 'message',

    // @interface Event
    // @spec HTML5 offline
    // The manifest hadn't changed.
    NO_UPDATE : 'noupdate',

    // @interface Event
    // @spec HTML5 offline
    // The manifest was found to have become a 404 or 410 page, so the
    // application cache is being deleted.
    OBSOLETE : 'obsolete',

    // @interface Event
    // @spec HTML5 offline
    // The browser has lost access to the network.
    OFFLINE : 'offline',

    // @interface Event
    // @spec HTML5 offline
    // The browser has gained access to the network (but particular websites
    // might be unreachable).
    ONLINE : 'online',

    // @interface Event
    // @spec Server Sent Events
    // An event source connection has been established.
    OPEN : 'open',

    // @interface PageTransitionEvent
    // A session history entry is being traversed from.
    PAGE_HIDE : 'pagehide',

    // @interface PageTransitionEvent
    // A session history entry is being traversed to.
    PAGE_SHOW : 'pageshow',

    // @interface Event
    // @spec HTML5 media
    // Playback has been paused.
    PAUSE : 'pause',

    // @interface Event
    // @spec HTML5 media
    // Playback has begun.
    PLAY : 'play',

    // @interface Event
    // @spec HTML5 media
    // Playback is ready to start after having been paused or delayed due to
    // lack of data.
    PLAYING : 'playing',

    // @interface PopStateEvent
    // A session history entry is being navigated to (in certain cases).
    POP_STATE : 'popstate',

    // @interface Event
    // @spec HTML5 media
    // @see HTML5 offline's event (below).
    // @see Progress' progress event.
    // @see XMLHttpRequest's progress event.
    // The user agent is fetching media data.
    // PROGRESS : 'progress',

    // @interface ProgressEvent
    // @spec HTML5 offline
    // The user agent is downloading resources listed by the manifest.
    PROGRESS : 'progress',

    // @interface Event
    // @spec HTML5 media
    // The playback rate has changed.
    RATE_CHANGE : 'ratechange',

    // @interface Event
    // @see XMLHttpRequest's readystatechange event.
    // The readyState attribute of a document has changed.
    // READY_STATE_CHANGE : 'readystatechange',

    // @interface Event
    // A form is reset.
    // NOTE: this seems to be equivalent to (if not the same as) the DOM L2's
    // reset event.
    RESET : 'reset',

    // @interface Event
    // @spec HTML5 media
    // A seek operation completed.
    SEEKED : 'seeked',

    // @interface Event
    // @spec HTML5 media
    // A seek operation began.
    SEEKING : 'seeking',

    // @interface MouseEvent
    // A contextmenu event was fired on/bubbled to an element that has a
    // contextmenu attribute.
    SHOW : 'show',

    // @interface Event
    // @spec HTML5 media
    // The user agent is trying to fetch media data, but data is
    // unexpectedly not forthcoming.
    STALLED : 'stalled',

    // @interface Event
    // A form is submitted.
    // NOTE: this seems to be equivalent to (if not the same as) the DOM L2's
    // submit event.
    SUBMIT : 'submit',

    // @interface Event
    // @spec HTML5 media
    // Media data loading has been suspended.
    SUSPEND : 'suspend',

    // @interface Event
    // @spec HTML5 media
    // The time indicated by the currentTime attribute has been updated.
    TIME_UPDATE : 'timeupdate',

    // @interface Event
    // @see DOM L3's unload event
    // Fired at the Window object when the page is going away.
    // UNLOAD : 'unload',

    // @interface Event
    // @spec HTML5 offline
    // The resources listed in the manifest have been newly redownloaded,
    // and the script can use swapCache() to switch to the new cache.
    UPDATE_READY : 'updateready',

    // @interface Event
    // @spec HTML5 media
    // The volume has changed.
    VOLUME_CHANGE : 'volumechange',

    // @interface Event
    // @spec HTML5 media
    // Playback has stopped because of a temporary lack of data.
    WAITING : 'waiting'
  };
});
