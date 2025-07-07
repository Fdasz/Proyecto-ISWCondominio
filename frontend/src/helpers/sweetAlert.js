import Swal from 'sweetalert2';

export async function deleteDataAlert() {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  })
}

export const showSuccessAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
};

export const showErrorAlert = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
};