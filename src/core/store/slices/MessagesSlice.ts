import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MESSAGES_MAX_DISPLAY_DURATION = 60000;
let nb_messages = 0;

interface Message {
  id: number;
  title: string;
  text: string;
  severity: string;
  created: number;
  open: boolean;
  detail: any;
}
interface MessagesState {
  items: Array<Message>;
}
// Adds a message to the store
const createMessage = function (state: MessagesState, severity: string, title: string, text: string, detail = null) {
  let message: Message = {
    id: nb_messages++,
    severity,
    title,
    text,
    created: Date.now(),
    open: true,
    detail,
  };
  state.items.push(message);
  state.items = state.items.slice(0);
};
const initialState: MessagesState = {
  items: [],
};
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Creates an error message
    error(state, action: PayloadAction<string>) {
      createMessage(state, "error", "Error", action.payload);
    },
    // Creates an information message
    info(state, action: PayloadAction<string>) {
      createMessage(state, "info", "Information", action.payload);
    },
    // Creates an swap message
    multiChainSwap(state, action: PayloadAction<any>) {
      if (state.items.length === 0) {
        createMessage(state, "info", action.payload.title, '', action.payload);
      } else {
        const index = state.items.findIndex(item => item?.detail?.type === 'swap');
        if (index >= 0) {
          state.items[index].detail = action.payload;
        }
      }
    },
    // Closes a message
    close(state, action: PayloadAction<Message>) {
      if(!document.body.hasAttribute("is-paralyzed") || window.confirm("Are you sure to execute this action?")) {
        state.items = state.items.map(message => {
          return message.id === action.payload.id ? Object.assign({}, message, {open: false}) : message;
        });
      }
    },
    closeAll(state) {
        state.items = [];
    },
    // Finds and removes obsolete messages
    handle_obsolete(state) {
      let activeMessages = state.items.filter(message => {
        return Date.now() - message.created < MESSAGES_MAX_DISPLAY_DURATION;
      });
      if (state.items.length !== activeMessages.length) {
        state.items = activeMessages;
      }
    },
  },
});

export const { error, info, close, handle_obsolete } = messagesSlice.actions;

export default messagesSlice.reducer;
