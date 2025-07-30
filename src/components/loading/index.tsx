import React, { forwardRef, useRef } from "react";
import "./Loading.scss";

export type SDKLoadingRef = {
  show: () => void;
  hide: () => void;
};

export const SDKLoading = forwardRef((props: {}, ref) => {
  const [visible, setVisible] = React.useState(false);
  const count = useRef(0);

  React.useImperativeHandle(
    ref,
    (): SDKLoadingRef => ({
      show() {
        count.current = count.current + 1;
        setVisible(true);
      },
      hide() {
        if (count.current > 1) {
          count.current = count.current - 1;
        } else {
          setVisible(false);
          count.current = 0;
        }
      },
    })
  );

  return (
    <>
      {visible && (
        <div className="content-loading">
          <div className="loader-loading"></div>
        </div>
      )}
    </>
  );
});
