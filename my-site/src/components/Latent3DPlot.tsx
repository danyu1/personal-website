'use client';

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import type { PlotData, Layout, Config } from "plotly.js";

// client-side only
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Point = { PC1: number; PC2: number; PC3: number; Category: string };
type Payload = {
  points: Point[];
  explained_variance_ratio?: number[];
  meta?: Record<string, unknown>;
};

export default function Latent3DPlot() {
  const [data, setData] = useState<Point[] | null>(null);
  const [evr, setEVR] = useState<number[] | undefined>(undefined);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/latent_pca.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((payload: Payload) => {
        setData(payload.points);
        setEVR(payload.explained_variance_ratio);
      })
      .catch((e) => setErr(String(e)));
  }, []);

  if (err) {
    return <div className="text-red-400 text-sm">Failed to load 3D plot data: {err}</div>;
  }
  if (!data) {
    return <div className="text-slate-400 text-sm">Loading 3D plot…</div>;
  }

  // Group by Category for separate traces
  const byCat = data.reduce<Record<string, Point[]>>((acc, p) => {
    (acc[p.Category] ||= []).push(p);
    return acc;
  }, {});

  // Use Partial<PlotData> to avoid union over-restrictions
  const traces: Partial<PlotData>[] = Object.entries(byCat).map(([cat, pts]) => ({
    type: "scatter3d",
    mode: "markers", // literal value accepted by Plotly
    name: cat,
    x: pts.map((p) => p.PC1),
    y: pts.map((p) => p.PC2),
    z: pts.map((p) => p.PC3),
    marker: { size: 3, opacity: 0.85 },
  }));

  const titleText =
    evr && evr.length >= 3
      ? `Latent Space (PCA) — PC1 ${Math.round(evr[0] * 100)}%, PC2 ${Math.round(
          evr[1] * 100
        )}%, PC3 ${Math.round(evr[2] * 100)}%`
      : "Latent Space (PCA)";

  const layout: Partial<Layout> = {
  title: { text: titleText }, // ✅ correct for new typings
  autosize: true,
  height: 520,
  scene: {
    xaxis: { title: { text: "PC1" } },
    yaxis: { title: { text: "PC2" } },
    zaxis: { title: { text: "PC3" } },
    aspectmode: "cube",
    bgcolor: "rgba(0,0,0,0)",
  },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  legend: { orientation: "h", y: -0.1 },
  margin: { l: 0, r: 0, t: 40, b: 0 },
};

  const config: Partial<Config> = {
    displayModeBar: true,
    responsive: true,
  };

  return (
    <div className="w-full">
      <Plot data={traces} layout={layout} config={config} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
