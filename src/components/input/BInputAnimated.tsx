import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  HTMLAttributes,
  FormEventHandler,
} from "react";
import "./BInputAnimated.scss";
import { ITouchEvent, Text, View } from "@vnxjs/components";
import { Image, Input } from "@vnmfify/core";
import images from "../../res/images";
import strings from "../../res/strings";

interface Props {
  title?: string;
  important?: boolean;
  rightIcon?: string;
  clearIcon?: boolean;
  onPressRightIcon?: () => void;
  type?:
    | "none"
    | "search"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
  listenValueChange?: (str: string) => void;
  listenValueChangeWithNotFocus?: (str: string) => void;
  typeCheck?: "fullname" | "phone" | "email" | "default" | "no-space";
  maxLength?: number;
  disableEnter?: boolean;
  disable?: boolean;
  onFocus?: () => void;
  onClick?: () => void;
}
export type BInputAnimatedRef = {
  _setValue: (str: string) => void;
  _getValue: () => string;
  _clearValue: () => void;
  _clearError: () => void;
  _onBlur: () => void;
};

const BInputAnimated = (
  props: Props,
  ref: React.ForwardedRef<BInputAnimatedRef>
) => {
  const [isFocus, setFocus] = useState(false);
  const [isAnim, setAnim] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  React.useImperativeHandle(
    ref,
    (): BInputAnimatedRef => ({
      _setValue(str) {
        if (str.length > 0 && str !== value) {
          setAnim(true);
          setTimeout(() => {
            setValue(str);
            setAnim(false);
            if (error.length > 0) {
              setError("");
            }
          }, 150);
        } else {
          setTimeout(() => {
            setValue(str);
            if (error.length > 0) {
              setError("");
            }
          }, 150);
        }
      },
      _getValue() {
        return value.trim();
      },
      _clearValue() {
        setValue("");
      },
      _clearError() {
        setError("");
      },
      _onBlur() {
        setFocus(false);
      },
    })
  );
  const _refInput = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const _onFocus = () => {
    if (props.disable !== true) {
      setFocus(true);
      _refInput.current?.focus();
      props.onFocus && props.onFocus();
    }
  };
  const randomID = Math.random();

  useEffect(() => {
    if (isFocus) {
      props.listenValueChange && props.listenValueChange(value);
    } else {
      props.listenValueChangeWithNotFocus &&
        props.listenValueChangeWithNotFocus(value);
    }
  }, [value]);

  const _onBlur = () => {
    setFocus(false);
  };

  const _onChange = (e: { target: { value: string } }) => {
    let str = e.target.value;
    if (error.length > 0) {
      setError("");
    }
    if (props.typeCheck === "fullname") {
      str = str.replace(
        /([^A-Za-z ĐỲÝỴỶỸÙÚỤỦŨƯỪỨỰỬỮÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÌÍỊỈĨÈÉẸẺẼÊỀẾỆỂỄÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáảạâăàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ])/g,
        ""
      );
      e.target.value = str;
    } else if (props.typeCheck === "phone") {
      str = str.replace(/([^0-9])/g, "");
      e.target.value = str;
    } else if (props.typeCheck === "no-space") {
      str = str.replace(/([^0-9a-zA-Z])/g, "");
      e.target.value = str;
    }

    if (props.disableEnter) {
      str = str.replace(new RegExp("\n", "g"), " ");
    }
    setValue(str);
  };
  // useEffect(() => {
  //   const element = document.getElementById(`input-field${randomID}`);
  //   if (element) {
  //     element.style.height = "20px";
  //     element.style.height = element.scrollHeight + "px";
  //     element.style.minHeight = "20px";
  //   }
  // }, [value]);

  const _onPaste = (event) => {
    // console.log("Paste", event.clipboardData.getData("Text"));
    if (props.typeCheck === "fullname") {
      if (
        !/^[A-Za-z ĐỲÝỴỶỸÙÚỤỦŨƯỪỨỰỬỮÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÌÍỊỈĨÈÉẸẺẼÊỀẾỆỂỄÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáảạâăàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+$/.test(
          event.clipboardData.getData("Text")
        )
      ) {
        event.preventDefault();
      }
    }
  };

  const _pressRightIcon = (ev: ITouchEvent) => {
    ev.stopPropagation();
    props.onPressRightIcon && props.onPressRightIcon();
  };

  const _onKeyDown = (e) => {
    if (e.key === "Enter" && props.disableEnter) {
      e.preventDefault();
    }
  };

  const _pressClearIcon = (ev: ITouchEvent) => {
    ev.stopPropagation();
    setValue("");
  };

  return (
    <View className="wrap-input-container" onClick={props.onClick}>
      <View
        className="base-input-container"
        onClick={_onFocus}
        style={isFocus ? `border-color: #00723580;` : ""}
      >
        <Text
          className={
            isFocus || value.length > 0 || isAnim
              ? "title-input-up"
              : "title-input-down"
          }
        >
          {props.title}
          {props.important !== false && (
            <Text style={{ color: "#FF2C00" }}> *</Text>
          )}
        </Text>
        {props.rightIcon && (
          <Image
            src={props.rightIcon}
            className="right-icon"
            mode="aspectFill"
            onClick={_pressRightIcon}
          />
        )}
        {props.clearIcon && value.length > 0 && (
          <Image
            src={images.ic_clear_text}
            className="clear-icon"
            mode="aspectFill"
            onClick={_pressClearIcon}
          />
        )}
        <input
          className="input-field"
          id={`input-field${randomID}`}
          ref={_refInput}
          onBlur={_onBlur}
          value={value}
          onChange={_onChange}
          inputMode={props.type ?? "text"}
          maxLength={props.maxLength ?? 50}
          onPaste={_onPaste}
          onKeyDown={_onKeyDown}
          disabled={props.disable}
        />
        {/* <View
          className={isFocus ? "line-active" : "line-inactive"}
          style={error.length > 0 ? "background-color:#FF2C00" : ""}
        /> */}
      </View>

      {/* <Text className="text-error-input-animated">{error}</Text> */}
    </View>
  );
};

export default forwardRef(BInputAnimated);
