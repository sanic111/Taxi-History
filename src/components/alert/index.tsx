import React, { forwardRef, useState, useRef } from "react";
import "./index.scss";
import { Dialog } from "@vnmfify/core";
import { Image, View } from "@vnxjs/components";
import images from "../../res/images";
import strings from "../../res/strings";

interface Props {}

type ParamsAlert = {
  message: any;
  onHide?: () => void;
  typeButton?: "1" | "2";
  titleLeftBtn?: string;
  titleRightBtn?: string;
  onRight?: () => void;
  onLeft?: () => void;
  imageTop?: string;
  touchOutside?: boolean;
};

export type SDKAlertRef = {
  show: (params: ParamsAlert) => void;
  hide: () => void;
};

const SDKAlert = (props: Props, ref: React.ForwardedRef<SDKAlertRef>) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [imageTop, setImageTop] = useState("");
  const [typeButton, setTypeButton] = useState<"1" | "2" | undefined>("1");
  const [leftTitle, setLeftTitle] = useState("");
  const [rightTitle, setRightTitle] = useState(strings().close);
  const [touchOutside, setTouchOutside] = useState<boolean | undefined>(
    undefined
  );
  const _onPressHide = useRef<() => void>();
  const _onPressRight = useRef<() => void>();
  const _onPressLeft = useRef<() => void>();
  React.useImperativeHandle(
    ref,
    (): SDKAlertRef => ({
      show(params: ParamsAlert) {
        setMessage(params.message);
        _onPressHide.current = params.onHide;
        _onPressRight.current = params.onRight;
        _onPressLeft.current = params.onLeft;
        setOpen(true);
        setTypeButton(params.typeButton);
        setLeftTitle(params.titleLeftBtn ?? "");
        setRightTitle(params.titleRightBtn ?? strings().close);
        setImageTop(params.imageTop ?? "");
        console.log("touchOutside ", params.touchOutside);
        if (params.touchOutside == undefined) {
          setTouchOutside(true);
        } else {
          setTouchOutside(params.touchOutside!!);
        }
      },
      hide() {
        setOpen(false);
      },
    })
  );

  const _onRightClick = () => {
    setOpen(false);
    _onPressRight.current && _onPressRight.current();
  };

  const _onLeftClick = () => {
    setOpen(false);
    _onPressLeft.current && _onPressLeft.current();
  };

  const _onHide = () => {
    console.log("touchOutsideclicked ", touchOutside);
    setOpen(false);
    _onPressHide.current && _onPressHide.current();
  };

  return (
    <Dialog
      open={open}
      onClose={touchOutside ? _onHide : () => {}}
      className="custom-dialog"
    >
      <View className="view-header-image"></View>

      <Dialog.Header className={imageTop.length > 0 ? "view-header-alert" : ""}>
        {imageTop.length > 0 && (
          <Image src={imageTop} mode="aspectFill" className="image-top-alert" />
        )}
        {strings().notification}
      </Dialog.Header>
      <Dialog.Content>
        <View style={"color:black;"}>{message}</View>
      </Dialog.Content>
      <Dialog.Actions>
        <div className="view-bottom-button-alert">
          {typeButton === "2" && (
            <div
              onClick={_onLeftClick}
              className={"button-alert"}
              style={{
                backgroundColor: "white",
                marginRight: "12px",
                borderColor: "#C99500",
              }}
            >
              <p
                className="text-title"
                style={{
                  color: "#C99500",
                }}
              >
                {leftTitle}
              </p>
            </div>
          )}
          <div
            onClick={_onRightClick}
            className={
              typeButton === "2" ? "button-alert" : "right-button-alert"
            }
          >
            <p className="text-title">{rightTitle}</p>
          </div>
        </div>
      </Dialog.Actions>
    </Dialog>
  );
};

export default forwardRef(SDKAlert);
