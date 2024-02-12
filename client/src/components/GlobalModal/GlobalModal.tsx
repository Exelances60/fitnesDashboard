import React from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectModalProps,
  selectModalType,
  setHideModal,
} from "@/store/slices/modalSlice";

const GlobalModal = () => {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector(selectModalType);
  const modalProps = useAppSelector(selectModalProps);

  return (
    <Modal
      title={modalProps.title}
      open={modalVisible}
      width={modalProps.width ? modalProps.width : 520}
      onCancel={() => dispatch(setHideModal())}
      footer={modalProps.footer ? modalProps.footer : null}
    >
      {modalProps?.children}
    </Modal>
  );
};

export default GlobalModal;
