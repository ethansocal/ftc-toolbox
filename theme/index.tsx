"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
