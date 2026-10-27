"use client";

import { ModalButton } from "@con2/components";

export default function ModalButtonPage() {
  return (
    <div>
      <h1>ModalButton</h1>

      <h2>With an action (form-based modal)</h2>
      <ModalButton
        title="Edit profile"
        label="Edit profile…"
        messages={{ cancel: "Cancel", submit: "Save" }}
        action={(formData) => {
          alert(`Submitted: ${formData.get("nickname")}`);
        }}
      >
        <label className="form-label" htmlFor="nickname">
          Nickname
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          className="form-control"
          defaultValue="Ada"
        />
      </ModalButton>

      <h2 className="mt-3">Without an action (confirm-to-close)</h2>
      <ModalButton
        title="Selected filters"
        label="View selected filters…"
        messages={{ cancel: "Cancel", submit: "Save" }}
        confirmLabel="Done"
      >
        <p>Category: Workshops</p>
        <p>Date: Any</p>
      </ModalButton>

      <h2 className="mt-3">
        Disabled with a reason (hover to see the tooltip)
      </h2>
      <ModalButton
        title="Remove survey"
        className="btn btn-outline-danger"
        messages={{ cancel: "Cancel", submit: "Remove" }}
        disabled
        disabledReason="In order to remove this survey, remove all of its language versions first."
      >
        <p>Are you sure you want to remove the survey?</p>
      </ModalButton>
    </div>
  );
}
