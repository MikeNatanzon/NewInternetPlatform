import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal configuration skeleton
 */
export interface ModalConfig {
  id: string;
  title: string;
  description: string;
  icon?: IconDefinition;
  iconColor?: string;
  showCloseButton?: boolean;
  cancelButtonLabel?: string;
  showCancelButton?: boolean;
  okButtonLabel?: string;
  showOkButton?: boolean;
  okButtonClick?: () => void;
  cancelButtonClick?: () => void;
  closeButtonClick?: () => void;
}
