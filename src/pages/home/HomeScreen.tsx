import React from "react";
import {View, ScrollView} from "@vnxjs/components";
import ViewScreenController from "../../components/MVVM/ViewController";
import {HomeProps, HomeScreenViewDelegate, HomeScreenViewModel, HomeScreenViewModelState} from "./HomeScreenViewModel";
import BHeader from "../../components/header";
import TabBar from "../../components/tabbar";
import TripHistoryCard from "../../components/tripHistoryCard/TripHistoryCard";
import "./HomeScreen.scss";
import { BookingHistoryType } from "src/network/Type";

export default class HomeScreenViewController
  extends ViewScreenController<HomeProps, HomeScreenViewModelState, HomeScreenViewModel>
  implements HomeScreenViewDelegate
{
  constructor(props: HomeProps) {
    super(props, new HomeScreenViewModelState(), new HomeScreenViewModel());
  }
    _didAnyAction: () => void;

  // Delegate nhận data từ ViewModel
  _setDataListAddOn = (data: BookingHistoryType[]) => {
    this._vms.historyList = data;
    this._vms._psu();
  };

  // Gọi API khi mount
  componentDidMount() {
    this._vm._getlistHistoryAddOn();
  }

  render() {
    return (
      <View className="home-screen">
        <BHeader title="Lịch sử chuyến đi" type="white" />
        <ScrollView className="trip-list-scroll" style="flex:1;">
          {(this._vms.historyList || []).map((trip, idx) => (
            <TripHistoryCard
              key={idx}
              data={trip}
              statusType={trip.status as any}
              statusLabel={
                trip.status === "success"
                  ? "Thành công"
                  : trip.status === "warning"
                  ? "Đặt xe hiện tại"
                  : "Đã huỷ"
              }
              onRepeat={() => {}}
              onInvoice={trip.status === "success" ? () => {} : undefined}
            />
          ))}
        </ScrollView>
        <TabBar tabIndex={2} />
      </View>
    );
  }
}