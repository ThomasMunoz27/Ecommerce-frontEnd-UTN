import Swal from "sweetalert2";

export const succesAlert = (title:String, subtitle?:string) => {
    Swal.fire({
    icon: "success",
    title: title,
    text: subtitle
});
}