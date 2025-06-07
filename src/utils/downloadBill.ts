import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { errorAlert } from "./errorAlert";

export const downloadBill = () => {
    const closeBill = document.querySelector(".disguiseInPdf") as HTMLElement
    if (closeBill !== null) {
        closeBill.style.display = "none"; // Oculto al x
    }

    const bill = document.getElementById('bill') // Busco la factura para imprimir
    if (!bill){
        errorAlert('Error', 'No se pudo descargar la factura')
        if (closeBill) closeBill.style.display = "block" 
        return
    }

    // Genero PDF
    html2canvas(bill).then((canvas) => {
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const imgWidth = pdfWidth
        const imgHeight = (canvas.height * pdfWidth) / canvas.width

        if (imgHeight <= pdfHeight) {
            // Entra todo en una sola pagina
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        } else {
            // Se necesitan mas paginas
            const pageHeight = pdfHeight
            const canvasHeight = canvas.height
            const canvasPageHeight = (canvas.width * pageHeight) / pdfWidth

            let renderedHeight = 0
    
            while (renderedHeight < canvasHeight) { 
                const pageCanvas = document.createElement("canvas")
                pageCanvas.width = canvas.width
                pageCanvas.height = canvas.height

                const context = pageCanvas.getContext("2d")
                if (context) {

                    context.drawImage(canvas, 0, renderedHeight, canvas.width,canvasPageHeight, 0,0, canvas.width, canvasPageHeight)
                    const pageImgData = pageCanvas.toDataURL("image/png")
                    if (renderedHeight > 0) pdf.addPage()
                    pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pdfHeight )
                }

                renderedHeight += canvasPageHeight
            }
        }


        
        pdf.save('factura_todo_campeones.pdf')

        if (closeBill) closeBill.style.display = "block" // Vuelvo a mostrar la x
    })
    
    
}