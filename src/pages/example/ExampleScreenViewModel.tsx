import React from "react";
import ViewModelState from "../../components/MVVM/ViewModelState";
import { _global } from "../../global";
import _router from "../../router";
import api from "../../network/API";
import ExampleScreenViewController from "./ExampleScreen";
import ViewModel from "../../components/MVVM/ViewModel";
import { VNPSDKUtils } from "vnpay-sdk-core-mini-app";

export type ExampleProps = {};

/// Đây chính là Class chứa state, khởi tạo các thuộc tính chính là khởi tạo state và giá trị ban đầu của nó
export class ExampleScreenViewModelState extends ViewModelState {
  inputText: string = "";
  arrListName: string[] = [];
}

export interface ExampleScreenViewDelegate {
  // Các phương thức delegate sẽ được định nghĩa ở đây
  // Ví dụ: _didAnyAction: () => void;
  _onInputChange: (value: string) => void;
  _addName: () => void;
  _removeName: (index: number) => void;
  _editName: (index: number, newName: string) => void;
}

export class ExampleScreenViewModel extends ViewModel<
  ExampleProps,
  ExampleScreenViewModelState,
  ExampleScreenViewDelegate
> {
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
}
