"use client";
import { SectionListContext } from "@/contexts/SectionListContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export const SaveControls = () => {
  const router = useRouter();
  const initialID = Object.keys(router.query)[0];
  // const [dbID,setDBID]=useState(router.query)
  useEffect(
    () => {
      console.log("running effect with " + initialID);
      if (initialID) {
        loadFromServer(initialID);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialID]
  );
  console.log(initialID);
  // try to load from the API using initalID first. if that fails, get a new ID from the API.

  const { loadFromServer, saveToServer } = useContext(SectionListContext);

  return (
    <div className="save-controls">
      <button
        onClick={() => {
          loadFromServer(initialID);
        }}
      >
        load?
      </button>
      <button
        onClick={() => {
          saveToServer();
        }}
      >
        save?
      </button>
    </div>
  );
};
