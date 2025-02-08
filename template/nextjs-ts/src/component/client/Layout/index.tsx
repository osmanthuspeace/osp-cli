"use client";

import React from "react";
import { Direction } from "../../../type";

export interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
  direction: Direction;
}

export default function Layout({ children, direction }: LayoutProps) {
  const childrenArr = React.Children.toArray(children);

  return (
    <div
      className={`layout-${direction}`}
      style={{
        display: "flex",
        flexDirection: direction,
        height: "100%",
      }}
    >
      {childrenArr.map((child, index) => (
        <div
          key={index}
          className="layout-item"
          style={index === childrenArr.length - 1 ? { flex: 1 } : {}}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
