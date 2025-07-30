import React from "react";
import ViewModelState from "../../components/MVVM/ViewModelState";
import { _global } from "../../global";
import moment from "moment";
import _router from "../../router";
import api from "../../network/API";
import HomeScreenViewController from "./HomeScreen";
import ViewModel from "../../components/MVVM/ViewModel";
import { VNPSDKUtils } from "vnpay-sdk-core-mini-app";
import { BookingHistoryType } from "src/network/Type";

export type HomeProps = {
  selected: boolean;
  yeudoi: string;
};

/// Đây chính là Class chứa state, khởi tạo các thuộc tính chính là khởi tạo state và giá trị ban đầu của nó
export class HomeScreenViewModelState extends ViewModelState {
  selected: boolean = true;
  address: string = "";
  isDataLoadedChangeHistory: boolean = false;
}
export interface HomeScreenViewDelegate {
  _didAnyAction: () => void;
  _setDataListAddOn: (data: BookingHistoryType[]) => void;
}

export class HomeScreenViewModel extends ViewModel<
  HomeProps,
  HomeScreenViewModelState,
  HomeScreenViewDelegate
> {
  getLocationAddress = () => {
    console.log("Gọi getLocationAddress");
    api._getLocationAddress({
      location: { lat: "21.028511", lng: "105.804817" },
      callback: (response) => {
        console.log("getLocationAddress", response);
        this._vms.address = response.address || "Không tìm thấy địa chỉ";
        this._vms._psu();
      },
    });
  };

  _run = () => {
    // VNPSDKUtils._formatString("sss");
    this._vms.selected = false;
    this._vms._psu();
    console.log(this._params?.yeudoi);
  };

  _func = () => {
    console.log("1111", this._vms.selected);
    this._vms.selected = !this._vms.selected;
    this._vms._psu();
  };

  _getListTicket = (data?: boolean) => {};
  _getlistHistoryAddOn = () => {
    _global.event.loading.current?.show();
    api._request({
      urlPath: "/add_on/get_addon_history",
      body: {
        params: {},
        body: {
          bankPhone: "0777001403",
          binCode: "970419",
          pageIndex: 1,
          pageSize: 20,
          queryId: 870281,
          requestDate: "20241213141625",
          requestId: "1734074185247",
          sourceBook: "Agribank",
          langId: "VN",
          styleCode: "0",
          screenSize: "393.000000*852.000000",
          sdkVersion: "1.0.0",
          deviceModel: "iPhone",
          deviceType: 2,
        },
        method: "POST",
      },
      callback: {
        onSuccess: (response) => {
          alert("ress =>" + JSON.stringify(response));
          _global.event.loading.current?.hide();
          const newDataListHistory = response.json?.coreData?.data;
          if (newDataListHistory) {
            this._d._setDataListAddOn(newDataListHistory);
            this._vms.isDataLoadedChangeHistory = true;
            this._vms._psu();
          }
        },
        onError: (response) => {
          _global.event.loading.current?.hide();
          console.log("errrr =>", response);
        },
      },
    });
  };
}
