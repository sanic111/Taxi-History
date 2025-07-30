/**
 * @flow
 */
const path = require("path");
const fs = require("fs");
// const chalk = require('chalk')
const argv = require("yargs-parser")(process.argv.slice(1));

String.prototype.format = function() {
  let a = this;
  for (let k in arguments) {
    a = a.replace(("{" + k + "}").toRegex("g"), arguments[k]);
  }
  return a;
};

String.prototype.toRegex = function(option = "i") {
  let regexStr = this.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, "\\$&");
  regexStr = regexStr.replace(/\s/g, "\\s?");
  //   console.log("regex: {0}".format(regexStr));
  return new RegExp(regexStr, option);
};

// console.log(argv);
const folder = argv._[1];
const screen = argv._[2];
// console.log("folder", folder, screen);

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

var scss_code = `@import "~@vnmfify/core/styles/prefix";
@import "~@vnmfify/core/styles/variables";
@import "../../styles/prefix";`;
var scss_file = "{0}/{1}Screen.scss".format(folder, screen);
fs.writeFileSync(scss_file, scss_code);

var controller_code = `import React from "react";
import {
  {0}Props,
  {0}ScreenViewModel,
  {0}ScreenViewModelState,
  {0}ScreenViewDelegate
} from "./{0}ScreenViewModel";
import "./{0}Screen.scss";
import ViewScreenController from "../../components/MVVM/ViewController";
import { View, Text, Image } from "@vnxjs/components";
import classNames from "classnames";
import { appPrefixClassname } from "../../styles/prefix";
import Page from "../../components/page/page";
import { _global } from "../../global";
import _router from "../../router";

export default class {0}ScreenViewController extends ViewScreenController<
  {0}Props,
  {0}ScreenViewModelState,
  {0}ScreenViewModel
>
  implements {0}ScreenViewDelegate {
  constructor(props: {0}Props) {
    super(props, new {0}ScreenViewModelState(), new {0}ScreenViewModel());
  }

  componentDidMount(): void {}

  componentWillUnmount(): void {}

  

  render() {
    return (
      <View className={classNames(appPrefixClassname("tab-page"))}>
        <Page
          key="{1}_page"
          title="{1}"
          className="{1}-screen"
          ignoreTopSafeArea
        >
          <></>
        </Page>
      </View>
    );
  }
}
`;

controller_code = controller_code.format(screen, screen.toLowerCase());
var controller_file = "{0}/{1}Screen.tsx".format(folder, screen);
fs.writeFileSync(controller_file, controller_code);

var model_code = `import React from "react";
import ViewModelState from "../../components/MVVM/ViewModelState";
import { _global } from "../../global";
import _router from "../../router";
import api from "../../network/API";
import {0}ScreenViewController from "./{0}Screen";
import ViewModel from "../../components/MVVM/ViewModel";
import { VNPSDKUtils } from "vnpay-sdk-core-mini-app";

export type {0}Props = {};

/// Đây chính là Class chứa state, khởi tạo các thuộc tính chính là khởi tạo state và giá trị ban đầu của nó
export class {0}ScreenViewModelState extends ViewModelState {}

export interface {0}ScreenViewDelegate {}

export class {0}ScreenViewModel extends ViewModel<
  {0}Props,
  {0}ScreenViewModelState,
  {0}ScreenViewDelegate
> {}`;

model_code = model_code.format(screen);
var model_file = "{0}/{1}ScreenViewModel.tsx".format(folder, screen);
fs.writeFileSync(model_file, model_code);
