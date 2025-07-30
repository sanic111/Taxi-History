import React, { forwardRef, useState } from "react";
import {
  HomeProps,
  HomeScreenViewDelegate,
  HomeScreenViewModel,
  HomeScreenViewModelState,
} from "./HomeScreenViewModel";
import "./HomeScreen.scss";
import ViewScreenController from "../../components/MVVM/ViewController";
import { View, Text, Image } from "@vnxjs/components";
import classNames from "classnames";
import { appPrefixClassname } from "../../styles/prefix";
import Page from "../../components/page/page";
import { _global } from "../../global";
import _router from "../../router";
import HorizontalList from "../../components/horizontalList/HorizontalList";
import { res } from "../../res";

export default class HomeScreenViewController
  extends ViewScreenController<
    HomeProps,
    HomeScreenViewModelState,
    HomeScreenViewModel
  >
  implements HomeScreenViewDelegate {
  constructor(props: HomeProps) {
    super(props, new HomeScreenViewModelState(), new HomeScreenViewModel());
  }

  componentWillMount(): void {
    console.log("will mount");
  }

  componentDidMount(): void {
    console.log("did mount");
    setTimeout(() => {
      this._vm._run();
      // this._vm.getLocationAddress(); 
    }, 1000);
  }

  componentWillUnmount(): void {
    console.log("will  unmount");
  }

  _didAnyAction = () => {
    console.log("binding VC");
    _router._openHomeScreen({
      selected: this._vms.selected,
      yeudoi: "yeudoi",
    });
  };

  _data = [1, 2, 3, 4, 5, 6];

  _renderItem = (item: number[], index: number) => {
    const _getColor = () => {
      switch (this._vms.selected) {
      }
    };
    return (
      <View
        className="item-content"
        style={
          this._vms.selected
            ? "background-color:red"
            : this._vms.selected
            ? "background-color:blue"
            : "background-color:blue"
        }
        onClick={this._vm._func}
      ></View>
    );
  };

   render() {
  return (
    <View className={classNames(appPrefixClassname("tab-page"))}>
      <View className="header" style={{ padding: 16, background: "#f5f5f5" }}>
        <View
          className="btn-goto-example"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "#1890ff",
            color: "#fff",
            borderRadius: 4,
            cursor: "pointer",
          }}
          onClick={() => _router._openExampleScreen()}
        >
          Chuyển sang Example
        </View>
      </View>
      <Page
        key="home_page"
        title="home"
        className="home-screen"
        ignoreTopSafeArea
      >
        <View className="test">
          <HorizontalList
            data={this._data}
            renderItem={this._renderItem}
            classNameItem="item-list"
          />
          <Text>
            Địa chỉ: {this._vms.address}
          </Text>
          <View
            className="btn-get-address"
            style={{ marginTop: 16, padding: 8, background: "#1890ff", color: "#fff", borderRadius: 4, textAlign: "center", cursor: "pointer" }}
            onClick={() => this._vm._getlistHistoryAddOn()}
          >
            Lấy địa chỉ
          </View>
        </View>
      </Page>
    </View>
  );
}
}
