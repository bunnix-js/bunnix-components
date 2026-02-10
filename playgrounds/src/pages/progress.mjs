import { useState, useEffect } from "@bunnix/core";
import { Column, Row, Heading, Text, ProgressBar } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function ProgressPage() {
  const animatedProgress = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const prev = Number(animatedProgress.get?.() ?? 0);
      const next = prev + 1;
      animatedProgress.set(next > 100 ? 0 : next);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return Column(
    { gap: 32, padding: "large" },

    // Page Header
    Column(
      { gap: 8 },
      Heading({ h1: true }, "ProgressBar"),
      Text(
        { color: "secondary" },
        "Simple progress indicator with customizable colors using background color tokens.",
      ),
    ),

    // Basic Progress
    ComponentShowcase({
      title: "Basic Progress",
      description: "Default progress bar with primary color",
      code: `ProgressBar({ value: 60 })`,
      example: ProgressBar({ value: 60 }),
    }),

    // Different Values
    ComponentShowcase({
      title: "Different Values",
      description: "Progress bars showing various completion levels",
      code: `Column(
  { gap: 16 },
  ProgressBar({ value: 25 }),
  ProgressBar({ value: 50 }),
  ProgressBar({ value: 75 }),
  ProgressBar({ value: 100 }),
)`,
      example: Column(
        { gap: 16 },
        ProgressBar({ value: 25 }),
        ProgressBar({ value: 50 }),
        ProgressBar({ value: 75 }),
        ProgressBar({ value: 100 }),
      ),
    }),

    // Semantic Colors
    ComponentShowcase({
      title: "Semantic Colors",
      description: "Semantic colors for success, warning, danger, and link states.",
      code: `Column(
  { gap: 16 },
  Column(
    { gap: 4 },
    Text("Success: Operation completed"),
    ProgressBar({ value: 80, color: "success" }),
  ),
  Column(
    { gap: 4 },
    Text("Warning: Please review"),
    ProgressBar({ value: 55, color: "warning" }),
  ),
  Column(
    { gap: 4 },
    Text("Error: Something went wrong"),
    ProgressBar({ value: 35, color: "error" }),
  ),
  Column(
    { gap: 4 },
    Text("Link: Click here"),
    ProgressBar({ value: 65, color: "link" }),
  ),
)`,
      example: Column(
        { gap: 16 },
        Column(
          { gap: 4 },
          Text("Success: Operation completed"),
          ProgressBar({ value: 80, color: "success" }),
        ),
        Column(
          { gap: 4 },
          Text("Warning: Please review"),
          ProgressBar({ value: 55, color: "warning" }),
        ),
        Column(
          { gap: 4 },
          Text("Error: Something went wrong"),
          ProgressBar({ value: 35, color: "error" }),
        ),
        Column(
          { gap: 4 },
          Text("Link: Click here"),
          ProgressBar({ value: 65, color: "link" }),
        ),
      ),
    }),

    // Custom Heights
    ComponentShowcase({
      title: "Custom Heights",
      description: "Adjust the height to fit your design",
      code: `Column(
  { gap: 16 },
  ProgressBar({ value: 60, height: 4 }),
  ProgressBar({ value: 60, height: 8 }),
  ProgressBar({ value: 60, height: 12 }),
  ProgressBar({ value: 60, height: 20 }),
)`,
      example: Column(
        { gap: 16 },
        ProgressBar({ value: 60, height: 4 }),
        ProgressBar({ value: 60, height: 8 }),
        ProgressBar({ value: 60, height: 12 }),
        ProgressBar({ value: 60, height: 20 }),
      ),
    }),

    // Animated Progress
    ComponentShowcase({
      title: "Animated Progress",
      description: "Progress bar with reactive state updates",
      code: `const progress = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    const prev = Number(progress.get?.() ?? 0);
    const next = prev + 1;
    progress.set(next > 100 ? 0 : next);
  }, 50);

  return () => clearInterval(interval);
}, []);

ProgressBar({ value: progress, color: "primary" })`,
      example: Column(
        { gap: 8 },
        ProgressBar({ value: animatedProgress, color: "primary" }),
        Text(
          { color: "secondary", fontSize: "0.875rem" },
          animatedProgress.map((v) => `Progress: ${Math.round(v)}%`),
        ),
      ),
    }),

    // With Labels
    ComponentShowcase({
      title: "With Labels",
      description: "Combining progress bars with text labels",
      code: `Column(
  { gap: 16 },
  Column(
    { gap: 4 },
    Row(
      { fillWidth: true, justifyContent: "space-between" },
      Text("Task 1"),
      Text({ color: "secondary" }, "75%"),
    ),
    ProgressBar({ value: 75 }),
  ),
  Column(
    { gap: 4 },
    Row(
      { fillWidth: true, justifyContent: "space-between" },
      Text("Task 2"),
      Text({ color: "secondary" }, "40%"),
    ),
    ProgressBar({ value: 40, color: "secondary" }),
  ),
)`,
      example: Column(
        { gap: 16 },
        Column(
          { gap: 4 },
          Row(
            { fillWidth: true, justifyContent: "space-between" },
            Text("Task 1"),
            Text({ color: "secondary" }, "75%"),
          ),
          ProgressBar({ value: 75 }),
        ),
        Column(
          { gap: 4 },
          Row(
            { fillWidth: true, justifyContent: "space-between" },
            Text("Task 2"),
            Text({ color: "secondary" }, "40%"),
          ),
          ProgressBar({ value: 40, color: "secondary" }),
        ),
      ),
    }),
  );
}
