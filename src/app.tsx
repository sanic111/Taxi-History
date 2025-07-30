import { Component, PropsWithChildren } from "react";
import "./app.scss";
import { Provider } from "react-redux";
import { SDKLoading } from "./components/loading";
import SDKAlert from "./components/alert";
import { store } from "./redux/store/store";
import api from "./network/API";
// import eruda from "eruda";
import { SDK_GOLF_STORAGE_FIELDS, _global } from "./global";
import Vnmf from "@vnxjs/vnmf";
import moment from "moment";
import { VNPSDKUtils } from "vnpay-sdk-core-mini-app";
import _router from "./router";
import { res } from "./res";
import images from "./res/images";

function init() {
  //device info
  api._getDeviceInfo((res) => {
    _global.deviceInfo.safeAreaTop = res.safe_area_top;
    _global.deviceInfo.safeAreaBottom = res.safe_area_bottom;
    _global.deviceInfo.screenWidth = res.screen_width;
    _global.deviceInfo.screenHeight = res.screen_height;
    _global.deviceInfo.sdk_version = res.sdk_version;
    console.log("Device Info =>", res);
  });
  api._getAppData((res) => {
    _global.appInfo = {
      ..._global.appInfo,
      ...res.data,
    };
    console.log("_getAppData", _global.appInfo, res);
  });
  //--------

  res.images = images;
}
init();

let el = document.createElement("div");
document.body.appendChild(el);
// eruda.init({
//   container: el,
//   tool: ["console", "elements"],
// });

// var oldLog = console.error;

// console.error = function(...items) {
//   oldLog.apply(this, items);
//   Sentry.captureException(
//     `An error excute at ${moment().format("DD/MM/yyyy HH:mm:ss")}`
//   );
// };

class App extends Component<PropsWithChildren> {
  componentWillMount(): void {}

  componentDidMount() {
    this._addlistenerBackPress();
  }
  componentDidShow() {}
  componentDidHide() {}

  _lastTime = 0;
  _addlistenerBackPress = () => {
    api._addEmitBackPress((res) => {
      let currentTime = moment()
        .toDate()
        .getTime();
      if (currentTime - this._lastTime <= 500) {
        //prevent
        this._lastTime = currentTime;
        return;
      }
      this._lastTime = currentTime;
      const stamp = Vnmf.getCurrentInstance().router?.params?.stamp;
      if (stamp === "1") {
        api._backApp();
      } else {
        Vnmf.navigateBack({ delta: 1 });
        _global.event.loading.current?.hide();
      }
      api._emit({
        action: "emit_remove",
        name: "on_back_pressed",
        data: null,
        callback: () => {},
      });
      this._addlistenerBackPress();
    });
  };

  render() {
    // this.props.children It's the page that's about to be rendered.
    return (
      <Provider store={store}>
        {this.props.children}
        <SDKLoading ref={_global.event.loading} />
        <SDKAlert ref={_global.event.alert} />
      </Provider>
    );
  }
}

export default App;
