import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const Message = (message, type = null, options = {hideProgressBar: true}) => {
  const { t } = useTranslation();
  if (type == null) {
    toast(t(message), options)
  } else if (type === "error") {
    toast.error(t(message), options)
  } else if (type === "info") {
    toast.info(t(message), options)
  }
}