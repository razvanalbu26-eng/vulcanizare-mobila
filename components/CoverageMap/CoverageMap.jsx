"use client";

import dynamic from "next/dynamic";

const CoverageMapInner = dynamic(() => import("./CoverageMapInner.jsx"), {
  ssr: false,
});

export default function CoverageMap(props) {
  return <CoverageMapInner {...props} />;
}
