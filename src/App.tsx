import React, { useState } from "react";
import { IToast, IToastType } from "./components/Toast";
import ToastList, { IToastListPosition } from "./components/ToastList";
import "./app.css";

function App() {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const [type, setType] = useState<IToastType>("success");
  const [autoClose, setAutoClose] = useState<boolean>(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState<number>(5);
  const [position, setPosition] = useState<IToastListPosition>("top-right");

  function showToast(message: string, type: IToastType) {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  }

  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function removeAllToasts() {
    setToasts([]);
  }

  function handleAutoCloseChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAutoClose(Boolean(event.target.checked));
  }

  function handleAutoCloseDurationChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAutoCloseDuration(Number(event.target.checked));
  }

  function handlePositionChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setPosition(event.target.value as IToastListPosition);
  }

  function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setType(event.target.value as IToastType);
  }

  function handleShowToastClick(): void {
    showToast(`A ${type} message`, type);
  }

  return (
    <>
      <ToastList data={toasts} position={position} removeToast={removeToast} />

      <main className="grid place-items-center h-screen">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-5xl font-bold">React Toast Notifications</h1>

              <p className="py-6">
                Implementation of the tutorial{" "}
                <a
                  className="link link-primary"
                  href="https://blog.logrocket.com/how-to-create-custom-toast-component-react/"
                >
                  How to create a custom toast component with React
                </a>{" "}
                by{" "}
                <a
                  className="link link-primary"
                  href="https://blog.logrocket.com/author/uzochukwuodozi/"
                  rel="author"
                >
                  Uzochukwu Eddie Odozi
                </a>{" "}
                with strict{" "}
                <a
                  className="link link-neutral"
                  href="https://www.typescriptlang.org/"
                >
                  TypeScript
                </a>{" "}
                and{" "}
                <a className="link link-neutral" href="https://daisyui.com/">
                  daisyUI
                </a>
                .
              </p>
            </div>

            <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Auto-dismiss?</span>

                    <input
                      type="checkbox"
                      name="autoClose"
                      checked={autoClose}
                      className="checkbox"
                      onChange={handleAutoCloseChange}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="duration">
                    <span className="label-text">
                      Duration ({String(autoCloseDuration).padStart(2, "0")}{" "}
                      seconds)
                    </span>
                  </label>

                  <input
                    id="duration"
                    type="number"
                    min={1}
                    max={30}
                    disabled={!autoClose}
                    value={autoCloseDuration}
                    className="input input-bordered"
                    onChange={handleAutoCloseDurationChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="position">
                    <span className="label-text">Position</span>
                  </label>

                  <select
                    id="position"
                    value={position}
                    className="select select-bordered"
                    onChange={handlePositionChange}
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="type">
                    <span className="label-text">Type</span>
                  </label>

                  <select
                    id="type"
                    value={type}
                    className="select select-bordered"
                    onChange={handleTypeChange}
                  >
                    <option value="info">info</option>
                    <option value="success">success</option>
                    <option value="error">error</option>
                    <option value="warning">warning</option>
                  </select>
                </div>

                <div className="card-actions mt-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleShowToastClick}
                  >
                    Show Toast
                  </button>

                  <button
                    className="btn btn-outline btn-primary"
                    onClick={removeAllToasts}
                  >
                    Clear Toasts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
