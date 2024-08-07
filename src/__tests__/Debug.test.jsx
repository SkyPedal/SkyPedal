import { render, screen } from "@testing-library/react";

import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Debug", () => {
  it("renders without crashing", () => {
    render(<p> 0.00 km </p>);
    screen.debug();
    screen.getByText(/km/i);
    expect(screen.getByText(/0\.00\s*km/)).toBeInTheDocument();
  });
});
