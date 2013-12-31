define(function () {
  // DOM L2 & L3 events
  // NOTE: Unless stated otherwise, all events are from the DOM Level3 spec.
  return {
    // Type: UIEvent
    // The loading of a resource has been aborted.
    ABORT : 'abort',

    // Type: FocusEvent
    // An element has lost focus (does not bubble).
    BLUR : 'blur',

    // Type: Event
    // Spec: DOM L2
    // An element loses focus and its value changed since gaining focus.
    CHANGE : 'change',

    // Type: MouseEvent
    // A pointing device button has been pressed and released on an element.
    CLICK : 'click',

    // Type: CompositionEvent
    // The composition of a passage of text has been completed or canceled.
    COMPOSITION_END : 'compositionend',

    // Type: CompositionEvent
    // The composition of a passage of text is prepared (similar to keydown
    // for a keyboard input, but works with other inputs such as speech
    // recognition).
    COMPOSITION_START : 'compositionstart',

    // Type: CompositionEvent
    // A character is added to a passage of text being composed.
    COMPOSITION_UPDATE : 'compositionupdate',

    // Type: MouseEvent
    // A pointing device button is clicked twice on an element.
    DOUBLE_CLICK : 'dblclick',

    // Type: UIEvent
    // A resource failed to load.
    ERROR : 'error',

    // Type: FocusEvent
    // An element has received focus (does not bubble).
    FOCUS : 'focus',

    // Type: FocusEvent
    // An element is about to receive focus (bubbles).
    FOCUS_IN : 'focusin',

    // Type: FocusEvent
    // An element is about to lose focus (bubbles).
    FOCUS_OUT : 'focusout',

    // Type: KeyboardEvent
    // A key is pressed down.
    KEY_DOWN : 'keydown',

    // Type: KeyboardEvent
    // A key is pressed down and that key normally produces a character
    // value (use input [HTML5] instead).
    KEY_PRESS : 'keypress',

    // Type: KeyboardEvent
    // A key is released.
    KEY_UP : 'keyup',

    // Type: UIEvent
    // A resource and its dependent resources have finished loading.
    LOAD : 'load',

    // Type: MouseEvent
    // A pointing device button (usually a mouse) is pressed on an element.
    MOUSE_DOWN : 'mousedown',

    // Type: MouseEvent
    // A pointing device is moved onto the element that has the listener
    // attached.
    MOUSE_ENTER : 'mouseenter',

    // Type: MouseEvent
    // A pointing device is moved off the element that has the listener
    // attached.
    MOUSE_LEAVE : 'mouseleave',

    // Type: MouseEvent
    // A pointing device is moved over an element.
    MOUSE_MOVE : 'mousemove',

    // Type: MouseEvent
    // A pointing device is moved off the element that has the listener
    // attached or off one of its children.
    MOUSE_OUT : 'mouseout',

    // Type: MouseEvent
    // A pointing device is moved onto the element that has the listener
    // attached or onto one of its children.
    MOUSE_OVER : 'mouseover',

    // Type: MouseEvent
    // A pointing device button is released over an element.
    MOUSE_UP : 'mouseup',

    // Type: Event
    // Spec: DOM L2
    // A form is reset.
    RESET : 'reset',

    // Type: UIEvent
    // The document view has been resized.
    RESIZE : 'resize',

    // Type: UIEvent
    // The document view or an element has been scrolled.
    SCROLL : 'scroll',

    // Type: UIEvent
    // Some text is being selected.
    SELECT : 'select',

    // Spec: DOM L2
    // A form is submitted.
    SUBMIT : 'submit',

    // Type: UIEvent
    // The document or a dependent resource is being unloaded.
    UNLOAD : 'unload',

    // Type: WheelEvent
    // Support: Gecko 17
    // A wheel button of a pointing device is rotated in any direction.
    WHEEL : 'wheel'
  };
});
