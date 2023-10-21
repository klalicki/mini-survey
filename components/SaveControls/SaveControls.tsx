"use client";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CopyAll, Check, Loop } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

import absoluteUrl from "next-absolute-url";

export const SaveControls = () => {
  const [hostUrl, setHostUrl] = useState("");

  const router = useRouter();
  const initialID = router.query.pageID || "";
  console.log("from SaveControls", router.query.pageID);
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

  const { loadFromServer, saveToServer, isSynced, isReady } =
    useContext(SectionListContext);
  useEffect(() => {
    setHostUrl(window.location.href);
  }, [isSynced]);

  return (
    <div className="save-controls">
      <CopyToClipboard text={hostUrl}>
        <button disabled={!isReady} className="btn-standard">
          <CopyAll /> Copy edit link
        </button>
      </CopyToClipboard>

      <button
        disabled={!isReady}
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
