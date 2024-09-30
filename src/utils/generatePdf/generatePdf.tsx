import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Img from '../../assets/enrollment/certificate-new.png'; 


export function generateCertificate(name:string, courseName:string, date:any, download = true) {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });


    const img : any = new Image();
    img.onload = function() {
  
        doc.addImage(this, 'PNG', 0, 0, 297, 210);

  
        doc.setFontSize(40);
        doc.setTextColor(0, 0, 0); 
        doc.setFont('helvetica', 'bold'); 
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
            
            const pdfBlob = doc.output('blob');
         
        }
    };

    img.crossOrigin = '';
    img.src = Img; 
}
