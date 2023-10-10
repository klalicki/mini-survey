"use client";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CopyAll, Check, Loop } from "@mui/icons-material";
export const SaveControls = () => {
  const router = useRouter();
  const initialID = Object.keys(router.query)[0];
  useEffect(
    () => {
      if (router.isReady) {
        console.log("running effect with " + initialID);

        loadFromServer(initialID || "new");
      } else {
        console.log("router not ready");
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );
  console.log(initialID);
  // try to load from the API using initalID first. if that fails, get a new ID from the API.

  const { loadFromServer, saveToServer, isSynced } =
    useContext(SectionListContext);

  return (
    <div className="save-controls">
      <button
        className="btn-standard"
        onClick={() => {
          const url = window.location.href + "";

          navigator.clipboard.writeText(url);
        }}
      >
        <CopyAll /> Copy edit link
      </button>

      <button
        className="btn-standard"
        onClick={() => {
          saveToServer();
        }}
      >
        Saved {isSynced ? <Check /> : <Loop />}
      </button>
    </div>
  );
};
