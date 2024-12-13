import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const alertInitialState: AlertType = {
  alertMessage: "",
  severity: "success",
  active: false
} as const;

type AlertType = {
  alertMessage: string,
  severity: AlertColor,
  active: boolean,
}

interface AlertApiResponse {
  alertMessage: string,
  severity: AlertColor
}

const fillAlertContent = (context: string, type: string): AlertType => {
  return alertInitialState;
}

const fillAlertApiResponse = (alertMessage: string, severity: AlertColor): AlertType => {
  return {
    active: true,
    alertMessage,
    severity
  };
}

const alertSlice = createSlice({
  name: 'alerts',
  initialState: alertInitialState,
  reducers: {
    showAlert: (state, params: PayloadAction<AlertApiResponse>) => {
      const { alertMessage, severity } = params.payload;
      state = {
        alertMessage,
        severity,
        active: true
      } 
      return state;
    },

    alertApiResponse: (state, params: PayloadAction<AlertApiResponse>) => {
      const { alertMessage, severity } = params.payload;

      const alertContent: AlertType = fillAlertApiResponse(alertMessage, severity);
      state = alertContent;
      return state;
    },

    closeAlert: (state) => {
      state = alertInitialState;
      return state;
    }
  }
})

export const { showAlert, alertApiResponse, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;