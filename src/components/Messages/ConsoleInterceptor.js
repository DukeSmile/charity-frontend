import { error } from "../../core/store/slices/MessagesSlice";
import store from "../../core/store/store";

// List of error messages we wish to intercept
const interceptedConsoleMessages = ["Wrong network, please switch to fantom"];

// Intercepts an error sent to console and dispatches it to the message framework.
var consoleInterceptor = function (message) {
  if (interceptedConsoleMessages.includes(message)) {
    store.dispatch(error(message));
  }
  // console._error_old(message);
};
consoleInterceptor.isInterceptor = true;

// Replaces the console.error function by our interceptor
if (console.error.isInterceptor !== true) {
  console._error_old = console.error;
  console.error = consoleInterceptor;
}
