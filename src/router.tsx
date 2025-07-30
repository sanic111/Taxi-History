import React from "react";
import Vnmf from "@vnxjs/vnmf";
import { VNPSDKUtils } from "vnpay-sdk-core-mini-app";
import { _global } from "./global";
import { HomeProps } from "./pages/home/HomeScreenViewModel";
class Router {
  static _goBack = (count?: number) => {
    Vnmf.navigateBack({
      delta: count ?? 1,
      success(res) {
        const _listPages = Vnmf.getCurrentPages();
        if (_listPages && _listPages.length > 0) {
          const _currentPages = _listPages.slice(-(count ?? 1));
          _currentPages.map((e) => {
            const _element = document.getElementById(e.route ?? "");
            if (_element) {
              _element.style.transform = "translateX(0)";
            }

            setTimeout(() => {
              const _element = document.getElementById(e.route ?? "");
              if (_element) _element.style.transform = "";
            }, 270);
          });
        }
      },
    });
  };

  _lastTimeNavigate = new Date().getTime();
  _goBack = (count?: number) => {
    const _listPages = Vnmf.getCurrentPages();

    Vnmf.navigateBack({
      delta: count ?? 1,
      success(res) {
        if (_listPages && _listPages.length > 0) {
          const _currentPages = _listPages.slice(-(count ?? 1) - 1, -1);
          _currentPages.map((e) => {
            requestAnimationFrame(() => {
              const _element = document.getElementById(e.route ?? "");
              if (_element) {
                _element.style.transform = "translateX(0)";
                _element.style.transition = "all 0.25s ease-in-out";
              }

              setTimeout(() => {
                const _element = document.getElementById(e.route ?? "");
                if (_element) _element.style.transform = "";
              }, 270);
            });
          });
        }
      },
    });
  };

  _navigate = (data: { url: string; params?: Object }) => {
    const _params = VNPSDKUtils.encodeParams(data.params ?? {});
    const _currentPage = Vnmf.getCurrentInstance().router?.path;
    const _currentTimeNavigate = new Date().getTime();

    if (_currentTimeNavigate - this._lastTimeNavigate > 500) {
      this._lastTimeNavigate = _currentTimeNavigate;
      Vnmf.navigateTo({
        url: `${data.url}?data=${_params}`,
        success(res) {
          const _element = document.getElementById(_currentPage ?? "");
          console.log(_element);
          requestAnimationFrame(() => {
            if (_element) {
              _element.style.transform = "translateX(-30vw)";
              _element.style.transition = "all 0.4s ease-in-out";
            }
          });
        },
      });
    }
  };

  _relaunch = (data: { url: string; params?: Object }) => {
    const _params = VNPSDKUtils.encodeParams(data.params ?? {});
    Vnmf.reLaunch({
      url: `${data.url}?data=${_params}`,
    });
  };
  _openAnyScreen = () => {
    this._navigate({
      url: "path",
    });
  };
  _openHomeScreen = (params: HomeProps) => {
    _global.appInfo.currentTabUrl = "/pages/home/HomeScreen";
    this._relaunch({
      url: "/pages/home/HomeScreen",
      params: params,
    });
  };
 
  _openExampleScreen = (params?: any) => {
    // _global.appInfo.currentTabUrl = "/pages/example/ExampleScreen";
    this._navigate({
      url: "/pages/example/ExampleScreen",
      params: params,
    });
  };

}

const _router = new Router();

export default _router;

export function _getRouterData<T>(): T | undefined {
  if (Vnmf.getCurrentInstance().router?.params.data) {
    const _params = VNPSDKUtils.decodeParams(
      Vnmf.getCurrentInstance().router?.params.data ?? ""
    ) as T;
    return _params;
  } else {
    return undefined;
  }
}
