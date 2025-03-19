import useWordle from "./useWordle";
import { renderHook, act } from "@testing-library/react";

describe("useWordle", () => {
  test("handleKeyUp adds correct colors for repeated letters", () => {
    const { result } = renderHook(() => useWordle("water"));

    act(() => {
      ["o", "t", "t", "e", "r"].forEach((key) => {
        result.current.handleKeyUp({ key });
      });
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.pastGuesses[0]).toEqual([
      { key: "o", color: "grey" },
      { key: "t", color: "grey" },
      { key: "t", color: "green" },
      { key: "e", color: "green" },
      { key: "r", color: "green" },
    ]);
  });

  test("handleKeyUp adds correct colors for green letters", () => {
    const { result } = renderHook(() => useWordle("apple"));

    act(() => {
      ["a", "p", "p", "l", "e"].forEach((key) => {
        result.current.handleKeyUp({ key });
      });
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.pastGuesses[0]).toEqual([
      { key: "a", color: "green" },
      { key: "p", color: "green" },
      { key: "p", color: "green" },
      { key: "l", color: "green" },
      { key: "e", color: "green" },
    ]);
  });

  test("handleKeyUp adds correct colors for yellow and grey letters", () => {
    const { result } = renderHook(() => useWordle("apple"));

    act(() => {
      ["p", "a", "l", "e", "x"].forEach((key) => {
        result.current.handleKeyUp({ key });
      });
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.pastGuesses[0]).toEqual([
      { key: "p", color: "yellow" },
      { key: "a", color: "yellow" },
      { key: "l", color: "yellow" },
      { key: "e", color: "yellow" },
      { key: "x", color: "grey" },
    ]);
  });

  test("handleKeyUp assigns correct colors for mixed green, yellow, and grey letters", () => {
    const { result } = renderHook(() => useWordle("apple"));

    act(() => {
      ["a", "p", "x", "l", "e"].forEach((key) => {
        result.current.handleKeyUp({ key });
      });
      result.current.handleKeyUp({ key: "Enter" });
    });

    expect(result.current.pastGuesses[0]).toEqual([
      { key: "a", color: "green" },
      { key: "p", color: "green" },
      { key: "x", color: "grey" },
      { key: "l", color: "green" },
      { key: "e", color: "green" },
    ]);
  });
});
