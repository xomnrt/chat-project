import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import NewChannelModal from './CreateNewChannel';
import RenameChannelModal from './RenameChannel';
import DeleteChannelModal from './DeleteChannel';
import {
  selectCurrentModalType, selectIsOpen, actions as modalActions, selectModalProps,
} from '../../../slices/modalSlice';

const ModalVariants = {
  NewChannelModal,
  RenameChannelModal,
  DeleteChannelModal,
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectCurrentModalType);
  const modalProps = useSelector(selectModalProps);

  const isOpen = useSelector(selectIsOpen);
  const handleClose = () => dispatch(modalActions.toggleIsOpen());

  const ModalVariant = ModalVariants[modalType];

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {ModalVariant && <ModalVariant handleClose={handleClose} {...modalProps} />}
    </Modal>
  );
};

export default ModalWindow;
