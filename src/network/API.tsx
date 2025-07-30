import { VNPSDKHttpRequest } from "vnpay-sdk-core-mini-app";
import {} from "./Type";
import mcConfig from "../config/mc.config";
import packageJson from "../../package.json";
import strings from "../res/strings";
import { _global } from "../global";

export class HttpErrorCode {
  static VNPAPI_HTTP_ERROR = "-2000";
  static VNPAPI_RESPONSE_STRING_PARSING_ERROR = "-2001";
  static VNPAPI_CANCELLED = "-2002";
  static VNPAPI_HTTP_TIMEOUT = "-2003";
  static VNPAPI_HTTP_NO_INTERNET = "-2004";
}

class API {
  private http = new VNPSDKHttpRequest.default(mcConfig.jsInterfaceName);
  _backApp(data: any | undefined = undefined) {
    this.http._backApp(data);
  }
  _log(text) {
    this.http._log(text);
  }
  _cameraScannerQR(
    action:
      | "start_camera"
      | "stop_camera"
      | "pause_camera"
      | "turn_on_flash"
      | "turn_off_flash",
    frame?: {
      x: number;
      y: number;
      width: number;
      height: number;
      borderRadius: number;
    },
    callback?: (response: VNPSDKHttpRequest.CameraScanResponseType) => void
  ) {
    this.http._cameraScannerQR(action, frame, callback);
  }
  _getDeviceInfo(
    callback: (response: VNPSDKHttpRequest.DeviceInfoResponseType) => void
  ) {
    this.http._getDeviceInfo(callback);
  }

  lang = "vi";
  _getLang = () => {
    return this.lang;
  };
  _setLang = (lang: string) => {
    this.lang = lang;
  };

  _getLocationDevice = (
    callback: (
      response: VNPSDKHttpRequest.GetDeviceLocationResponseType
    ) => void
  ) => {
    this.http._getDeviceLocation(callback);
  };

  _pickNumberContact = (
    callback: (response: VNPSDKHttpRequest.PickAContactResponseType) => void
  ) => {
    this.http._pickAContact(callback);
  };

  _pickAContact(
    callback: (response: VNPSDKHttpRequest.PickAContactResponseType) => void
  ) {
    this.http._pickAContact(callback);
  }

  _getDeviceLocation(
    callback: (
      response: VNPSDKHttpRequest.GetDeviceLocationResponseType
    ) => void
  ) {
    const _currentTime = new Date().getTime();

    this.http._getDeviceLocation(callback);
  }
  _storage(params: {
    type: "SAVE" | "GET" | "DELETE";
    data: {
      field: string;
      value?: string;
    };
    callback: (response: VNPSDKHttpRequest.StorageResponseType & any) => void;
  }) {
    this.http._storage(params);
  }

  //// Đây là hàm cho request SDK - Không dùng có thể remove
  _request(params: {
    urlPath: string;
    body: any;
    callback: VNPSDKHttpRequest.CallbackType;
    showAlert?: boolean;
  }) {
    let method = "POST";
    let headers = {};
    let timeout = 180;
    console.log("REQ: ", params.urlPath, "body: ", params.body);
    return this.http._request({
      urlPath: params.urlPath,
      params: {
        sdkVersion: packageJson.version,
      },
      body: { ...params.body, sdkVersion: packageJson.version },
      method: method,
      headers: headers,
      callback: {
        onError: (response) => {
          console.log("RES: ", response);
          if (
            response.code === HttpErrorCode.VNPAPI_CANCELLED ||
            response.code === HttpErrorCode.VNPAPI_HTTP_ERROR ||
            response.code === HttpErrorCode.VNPAPI_HTTP_TIMEOUT
          ) {
            response.message = strings().alert_timeout_Content;
          }
          if (response.code === HttpErrorCode.VNPAPI_HTTP_NO_INTERNET) {
            response.message = strings().alert_nointernet_Content;
          }

          if (params.showAlert !== false) {
            _global.event.alert.current?.show({
              message: `${response.message} (${response.code})`,
            });
          }
          params.callback.onError(response);
        },
        onSuccess: (response) => {
          console.log("RES: ", response);
          params.callback.onSuccess(response);
          if (response.json.hotline) {
            _global.appInfo.hotline = response.json.hotline;
          }
        },
      },
      timeout: timeout,
    });
  }

  /////// Đây là hàm request cho miniapp Bank - Không dùng có thể remove
  _requestBank(params: {
    mid: string;
    body: any;
    callback: VNPSDKHttpRequest.CallbackType;
    showAlert?: boolean;
  }) {
    let method = "POST";
    let headers = {};
    let timeout = 180;
    return this.http._request({
      urlPath: params.mid,
      params: { ...params.body },
      body: {},
      method: method,
      headers: headers,

      callback: {
        onError: (response) => {
          console.log("RES: ", response);
          if (
            response.code === HttpErrorCode.VNPAPI_CANCELLED ||
            response.code === HttpErrorCode.VNPAPI_HTTP_ERROR ||
            response.code === HttpErrorCode.VNPAPI_HTTP_TIMEOUT
          ) {
            response.message = strings().alert_timeout_Content;
          }
          if (response.code === HttpErrorCode.VNPAPI_HTTP_NO_INTERNET) {
            response.message = strings().alert_nointernet_Content;
          }

          if (params.showAlert !== false) {
            _global.event.alert.current?.show({
              message: `${response.message} (${response.code})`,
            });
          }
          params.callback.onError(response);
        },
        onSuccess: (response) => {
          console.log("RES: ", response);
          params.callback.onSuccess(response);
        },
      },
      timeout: timeout,
    });
  }

  // ...existing code...
  _getLocationAddress(params: {
    location: {
      lat: string;
      lng: string;
    };
    callback: (
      response: VNPSDKHttpRequest.GetLocationAddressResponseType
    ) => void;
  }) {
    console.log("API._getLocationAddress called", params);
    // Mock callback để test luồng code
    setTimeout(() => {
      params.callback({ address: "Mocked Address" });
    }, 1000);
    // this.http._getLocationAddress(params); // comment lại dòng này khi test mock
  }
// ...existing code...
  _payment(data: any) {
    this.http._payment(data);
  }
  _openDeviceSetting() {
    this.http._openDeviceSetting();
  }

  _openBrowser(url: string) {
    console.log(111111, url);
    this.http._openBrowser({
      url: url,
      callback(response) {
        console.log(response);
      },
    });
  }

  _emit(params: {
    action: "emit_add_listener" | "emit_send_data" | "emit_remove";
    name:
      | "pop_to_home"
      | "pop_to_history"
      | "app_moved_to_foreground"
      | "app_moved_to_background"
      | "on_back_pressed";
    data: any;
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void;
  }) {
    this.http._emit(params);
  }

  _addEmitPopToHome(
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void
  ) {
    //sau khi thanh toán xong
    //sự kiện người dùng muốn back về trang home của sdk
    this.http._emit({
      action: "emit_add_listener",
      name: "pop_to_home",
      data: {},
      callback: callback,
    });
  }

  _addEmitPopToHistory(
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void
  ) {
    //sau khi thanh toán xong
    //sự kiện người dùng muốn back về trang lịch sử của sdk
    this.http._emit({
      action: "emit_add_listener",
      name: "pop_to_history",
      data: {},
      callback: callback,
    });
  }

  _addEmitAppMovedToBackground(
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void
  ) {
    //sự kiện app đã bị người dùng ẩn xuống nền
    this.http._emit({
      action: "emit_add_listener",
      name: "app_moved_to_background",
      data: {},
      callback: callback,
    });
  }

  _addEmitAppMovedToForeground(
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void
  ) {
    //sự kiện app được mở trở lại lên window
    this.http._emit({
      action: "emit_add_listener",
      name: "app_moved_to_foreground",
      data: {},
      callback: callback,
    });
  }

  _getAppData(
    callback: (response: VNPSDKHttpRequest.AppDataResponseType) => void
  ) {
    this.http._getAppData(callback);
  }

  _addEmitBackPress(
    callback: (response: VNPSDKHttpRequest.EmitResponseType) => void
  ) {
    //sự kiện android bam nut back tren device
    this._emit({
      action: "emit_add_listener",
      name: "on_back_pressed",
      data: {},
      callback: callback,
    });
  }

  _saveImage(
    imageBase64: string,
    imageName: string = "image.png",
    callback: (response: any) => void
  ) {
    this.http._saveImage({
      data: imageBase64,
      callback: callback,
      name: imageName,
    });
  }
  _shareImage(
    imageBase64: string[],
    message: string = "",
    callback: (response: any) => void
  ) {
    this.http._shareImage({
      images: imageBase64,
      callback: callback,
      message: message,
    });
  }
}

const api = new API();
export default api;
