import Swal from "sweetalert2"
import "./swal.scss"

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  showCloseButton: true,
})

const swalConfig = {
  success: {
    title: "Record Successfully Updated",
    iconHtml: `<svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Success_alert</title>
        <g id="Success_alert" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Hover" transform="translate(2.000000, 2.000000)" stroke-width="1.5">
                <rect id="Rectangle" stroke="#4CAF50" fill="#4CAF50" x="-0.75" y="-0.75" width="17.5" height="17.5" rx="8.75"></rect>
                <polyline id="Path" stroke="#FFFFFF" points="5.33333333 8.33333333 7.11113333 10 10.6666667 6"></polyline>
            </g>
        </g>
    </svg>`,
    closeButtonHtml: `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Alert_close</title>
    <g id="Alert_close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M9.33333333,-9.08509624e-13 L9.333,6.666 L16,6.66666667 L16,9.33333333 L9.333,9.333 L9.33333333,16 L6.66666667,16 L6.666,9.333 L0,9.33333333 L0,6.66666667 L6.666,6.666 L6.66666667,-9.08999482e-13 L9.33333333,-9.08509624e-13 Z" id="Close-Button" fill="#4CAF50" transform="translate(8.000000, 8.000000) rotate(-315.000000) translate(-8.000000, -8.000000) "></path>
    </g>
    </svg>`,
    customClass: {
      popup: "success-popup",
      title: "success-title",
    },
  },
  error: {
    title: "Update failed. Please try again",
    iconHtml: `<svg width="30px" height="28px" viewBox="0 0 30 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Error icon - Notification</title>
    <g id="Error-icon---Notification" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Hover-Copy" transform="translate(7.000000, 6.000000)">
            <rect id="Rectangle" stroke="#D50000" stroke-width="1.5" fill="#D50000" x="-0.75" y="-0.75" width="17.5" height="17.5" rx="8.75"></rect>
            <polygon id="Shape" fill="#FFFFFF" transform="translate(8.000000, 6.500000) rotate(-180.000000) translate(-8.000000, -6.500000) " points="9 9 7 9 7 4 9 4"></polygon>
            <polygon id="Shape" fill="#FFFFFF" transform="translate(8.000000, 11.000000) rotate(-180.000000) translate(-8.000000, -11.000000) " points="9 12 7 12 7 10 9 10"></polygon>
        </g>
    </g>
    </svg>`,
    closeButtonHtml: `<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Close-Notification</title>
    <g id="Close-Notification" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon id="path-1" fill="#D50000" fill-rule="nonzero" transform="translate(6.000000, 6.000000) rotate(45.000000) translate(-6.000000, -6.000000) " points="7 0 7 5 12 5 12 7 6.999 7 7 12 5 12 4.999 7 0 7 0 5 5 5 5 0"></polygon>
    </g>
</svg>`,
    customClass: {
      popup: "error-popup",
      title: "error-title",
    },
  },
}

const ToastSuccess = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  showCloseButton: true,
  ...swalConfig["success"],
})

const ToastError = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  showCloseButton: true,
  ...swalConfig["error"],
})

export { Toast, swalConfig, ToastSuccess, ToastError }
