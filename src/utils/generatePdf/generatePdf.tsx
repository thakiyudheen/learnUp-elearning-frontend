import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Img from '../../assets/enrollment/certificate-new.png'; // Path to your certificate background image

// Function to generate a PDF certificate
export function generateCertificate(name:string, courseName:string, date:any, download = true) {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    // Load the image and generate the PDF
    const img : any = new Image();
    img.onload = function() {
        // Add image to PDF
        doc.addImage(this, 'PNG', 0, 0, 297, 210);

        // Add Congratulations message
        doc.setFontSize(40);
        doc.setTextColor(0, 0, 0); // Black color
        doc.setFont('helvetica', 'bold'); // Set font to helvetica bold
        doc.text('CONGRATULATIONS', 148.5, 50, { align: 'center' });

        // Add student name
        doc.setFontSize(30);
        doc.setTextColor(0, 0, 0); // Black color
        doc.setFont('helvetica', 'bold'); // Set font to helvetica bold
        doc.text(name, 148.5, 100, { align: 'center' });

        // Add course completion text
        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        doc.text('for successfully completing the', 148.5, 120, { align: 'center' });

        // Add course name
        doc.setFontSize(25);
        doc.setFont('helvetica', 'bold');
        doc.text(courseName, 148.5, 140, { align: 'center' });

        // Add date of completion
        doc.setFontSize(15);
        doc.setFont('helvetica', 'normal');
        doc.text('08/07/2024', 148.5, 180, { align: 'center' });

        // Handle PDF output
        if (download) {
            // Save the PDF with the name "Certificate.pdf"
            doc.save('Certificate.pdf');
        } else {
            // Optional: Do something else with the PDF
            // For example, you can return the PDF data as a Blob
            const pdfBlob = doc.output('blob');
            // Perform further actions with pdfBlob, e.g., upload to server
        }
    };

    img.crossOrigin = '';
    img.src = Img; // Replace with the path to your certificate image
}
