import { FixedView, SafeArea, Tabbar, Badge } from "@vnmfify/core";

import Target from "../target";
import Vnmf from "@vnxjs/vnmf";
import "./index.scss";
import images from "../../res/images";
import strings from "../../res/strings";
import { Image, View } from "@vnxjs/components";
import { _global } from "../../global";
import _router from "../../router";

interface TabBarProps {
  className?: string;
  tabs?: any;
  tabIndex: number;
}

export default function TabBar(props: TabBarProps) {
  let { tabIndex, tabs } = props;

  if (!tabs) {
    tabs = [
      {
        title: strings().home,
        page: "pages/home/HomeScreen",
        image: images.ic_home_inactive,
        imageActive: images.ic_home,
      },
      {
        title: strings().history,
        page: "pages/history/HistoryScreen",
        image: images.ic_history_inactive,
        imageActive: images.ic_history,
      },
      {
        title: strings().my_voucher,
        page: `pages/voucher/VoucherScreen`,
        image: images.ic_voucher_inactive,
        imageActive: images.ic_voucher,
      },
      {
        title: strings().member,
        page: "pages/member/MemberScreen",
        image: images.ic_member_inactive,
        imageActive: images.ic_member,
      },
    ];
  }

  // 'pages/home/HomeScreen',
  // "pages/history/HistoryScreen",
  // "pages/voucher/VoucherScreen",
  // "pages/member/MemberScreen"

  function onTabChanged(tabUrl: string) {
    if (_global.appInfo.currentTabUrl !== tabUrl) {
      _global.appInfo.currentTabUrl = tabUrl;
      _router._relaunch({
        url: tabUrl,
        params: {
          withTab: true,
        },
      });
    }
  }

  return (
    <Target type="h5">
      <FixedView position="bottom" className="fixed-view-tabbar">
        <Tabbar
          className="custom-color"
          defaultValue={0}
          value={tabIndex}
          onChange={onTabChanged}
        >
          {tabs.map((tabItem: any, idx: number) => {
            const { title, page, image, imageActive } = tabItem;
            return (
              <Tabbar.TabItem
                icon={
                  <Image
                    style={`width: 24px; height: 24px;`}
                    mode="center"
                    src={tabIndex === idx ? imageActive : image}
                  />
                }
                key={page}
                style={`color:${tabIndex === idx ? "#024C3E" : " "}`}
              >
                {title}
              </Tabbar.TabItem>
            );
          })}
        </Tabbar>
        <SafeArea position="bottom" />
      </FixedView>
    </Target>
  );
}
