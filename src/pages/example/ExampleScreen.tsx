import React from "react";
import {
  ExampleProps,
  ExampleScreenViewModel,
  ExampleScreenViewModelState,
  ExampleScreenViewDelegate,
} from "./ExampleScreenViewModel";
import "./ExampleScreen.scss";
import ViewScreenController from "../../components/MVVM/ViewController";
import { View, Text, Image, Input } from "@vnxjs/components";
import classNames from "classnames";
import { appPrefixClassname } from "../../styles/prefix";
import Page from "../../components/page/page";
import { _global } from "../../global";
import _router from "../../router";
import BButton from "../../components/button";

export default class ExampleScreenViewController
  extends ViewScreenController<
    ExampleProps,
    ExampleScreenViewModelState,
    ExampleScreenViewModel
  >
  implements ExampleScreenViewDelegate {
  constructor(props: ExampleProps) {
    super(
      props,
      new ExampleScreenViewModelState(),
      new ExampleScreenViewModel()
    );
  }
  _onInputChange = (value: string) => {
    this._vms.inputText = value;
    this._vms._psu();
  };
  _addName = () => {
    if (this._vms.inputText.trim() !== "") {
      this._vms.arrListName.push(this._vms.inputText);
      this._vms.inputText = "";
      this._vms._psu();
    } else {
      alert("Vui lòng nhập tên!");
    }
  };
  _removeName = (index: number) => {
    this._vms.arrListName.splice(index, 1);
    this._vms._psu();
  };
  _editName = (index: number, newName: string) => {
    if (newName.trim() !== "") {
      this._vms.arrListName[index] = newName;
      this._vms._psu();
    } else {
      alert("Vui lòng nhập tên mới!");
    }
  };
  componentDidMount(): void {}

  componentWillUnmount(): void {}

  render() {
    return (
      <View className={classNames(appPrefixClassname("tab-page"))}>
        <Page
          key="example_page"
          title="example"
          className="example-screen"
          ignoreTopSafeArea
        >
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
            onClick={() => _router._goBack()}
          >
            Back
          </View>
          <View className="input-container">
            <Input
              value={this._vms.inputText}
              className="input-example"
              placeholder="Enter text here"
              style={{
                margin: "16px 0",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              onInput={(e) => this._vm._onInputChange(e.detail.value)}
            />
            <BButton
              type="gradient"
              className="add-button"
              title="Thêm"
              onClick={this._vm._addName}
            />
          </View>
          <View className="list-container">
            {this._vms.arrListName.map((name, index) => (
              <View key={index} className="list-item">
                <Text className="item-text">{name}</Text>
                <BButton
                  data-index={index}
                  type="border"
                  className="remove-button"
                  title="Xoá"
                  onClick={this._vm._removeName.bind(this._vm, index)}
                />
                <BButton
                  type="border"
                  className="edit-button"
                  title="Sửa"
                  onClick={() =>
                    this._vm._editName(
                      index,
                      prompt("Nhập tên mới:", name) || name
                    )
                  }
                  // onClick={this._vm._editName.bind(
                  //   this._vm,
                  //   index,
                  //   prompt("Nhập tên mới:", name) || name
                  // )}
                />
              </View>
            ))}
          </View>
        </Page>
      </View>
    );
  }
}
