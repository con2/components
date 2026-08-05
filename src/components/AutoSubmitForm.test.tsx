import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AutoSubmitForm } from "./AutoSubmitForm";

describe("AutoSubmitForm", () => {
  it("renders children inside a <form>", () => {
    render(
      <AutoSubmitForm>
        <input aria-label="field" name="field" />
      </AutoSubmitForm>,
    );
    expect(screen.getByLabelText("field")).toBeInTheDocument();
  });

  it("requests form submission when a contained field changes", () => {
    // jsdom does not implement requestSubmit; stub it so we can observe the call.
    const requestSubmit = vi
      .spyOn(HTMLFormElement.prototype, "requestSubmit")
      .mockImplementation(() => {});

    render(
      <AutoSubmitForm>
        <input aria-label="field" name="field" defaultValue="" />
      </AutoSubmitForm>,
    );

    fireEvent.change(screen.getByLabelText("field"), {
      target: { value: "new value" },
    });

    expect(requestSubmit).toHaveBeenCalledTimes(1);
    requestSubmit.mockRestore();
  });
});
