import Toast, { IToast } from "./Toast";

export type IToastListPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type ToastListProps = {
  data: IToast[];
  position: IToastListPosition;
  removeToast: (id: number) => void;
};

const toastListConfigMap = {
  "top-left": "toast-top toast-start",
  "top-right": "toast-top toast-end",
  "bottom-left": "toast-bottom toast-start",
  "bottom-right": "toast-bottom toast-end",
};

function ToastList({ data, position, removeToast }: ToastListProps) {
  if (!data.length) return null;

  const toastListConfig = toastListConfigMap[position];

  function handleClose(toastId: number): () => void {
    return () => {
      removeToast(toastId);
    };
  }

  return (
    <aside className={`toast ${toastListConfig} z-10`} aria-live="assertive">
      {data.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={handleClose(toast.id)}
        />
      ))}
    </aside>
  );
}

export default ToastList;
