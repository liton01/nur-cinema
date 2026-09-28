"use client";
import { useSaved } from "@/lib/useSaved";

export default function SaveButton({ item }) {
  const { toggle, has, ready } = useSaved();
  const on = ready && has(item);
  return (
    <button className={"btn" + (on ? " on" : "")} onClick={() => toggle(item)} disabled={!ready}>
      {on ? "Remove from my list" : "Add to my list"}
    </button>
  );
}
