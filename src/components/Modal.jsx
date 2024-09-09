import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

function Modal({ show, onClose, children }) {
  return (
    <Dialog
      open={show}
      onClose={() => onClose()}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          className={
            'relative w-[440px] bg-white flex flex-col items-center p-4 rounded-2xl'
          }
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Modal;
